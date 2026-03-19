import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await dbConnect();
    const settings = await SiteSettings.findOne({});
    // Assuming galleryImages is an array of strings: ["url1", "url2"]
    return NextResponse.json({ images: settings?.galleryImages || [] });
  } catch (error) {
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();

    // Get new files to upload
    const newFiles = formData.getAll("images");
    if (newFiles.length === 0) {
      return NextResponse.json(
        { success: false, message: "No images provided" },
        { status: 400 },
      );
    }

    // Upload to Cloudinary
    const uploadPromises = newFiles.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "gallery" }, (error, result) => {
            if (error) reject(error);
            else resolve(result?.secure_url || "");
          })
          .end(buffer);
      });
    });

    const newUploadedUrls = await Promise.all(uploadPromises);

    // Fetch existing settings to check the limit
    const settings = (await SiteSettings.findOne({})) || { galleryImages: [] };
    const combinedImages = [
      ...settings.galleryImages,
      ...newUploadedUrls,
    ].slice(0, 3); // Enforce max 3

    // Update Database
    await SiteSettings.findOneAndUpdate(
      {},
      { galleryImages: combinedImages },
      { upsert: true, new: true },
    );

    revalidatePath("/"); // Update UI cache
    return NextResponse.json({
      success: true,
      uploadedImages: newUploadedUrls,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get("url"); // Get the URL of the image to delete

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, message: "No URL provided" },
        { status: 400 },
      );
    }

    // 1. Delete from Cloudinary to save storage
    // Extracts public ID from URL (e.g., "gallery/filename" from "https://res.cloudinary.com/.../gallery/filename.jpg")
    const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    // 2. Remove the URL from the MongoDB array
    await SiteSettings.findOneAndUpdate(
      {},
      { $pull: { galleryImages: imageUrl } }, // $pull removes the specific string from the array
    );

    revalidatePath("/"); // Update UI cache
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
