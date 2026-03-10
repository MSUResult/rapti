import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { revalidatePath } from "next/cache";


export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      console.log("❌ Upload Error: No file provided");
      return NextResponse.json(
        { success: false, message: "No file" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "hero", public_id: "main-image", overwrite: true },
          (error, result) => {
            if (error) {
              console.error("❌ Cloudinary Error:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    console.log("✅ Cloudinary Upload Success:", uploadResult.secure_url);

    await SiteSettings.findOneAndUpdate(
      {},
      { heroImage: uploadResult.secure_url },
      { upsert: true, new: true }
    );

    // This is the magic: it updates the Hero page instantly
    revalidatePath("/");

    return NextResponse.json({ success: true, url: uploadResult.secure_url });
  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
