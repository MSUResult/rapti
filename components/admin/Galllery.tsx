"use client";
import React, { useRef, useState, useEffect } from "react";
import { Trash2, UploadCloud, Loader2 } from "lucide-react"; // Added Loader2 for loading state

const Gallery = () => {
  const imageRef = useRef(null);

  // State for newly selected files (local preview)
  const [files, setFiles] = useState([]);

  // State for already uploaded files from the database
  const [existingImages, setExistingImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // 1. Fetch existing images when the component loads
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Adjust this endpoint to match your actual GET route
        const res = await fetch("/api/imageUpload");
        const data = await res.json();

        if (res.ok) {
          setExistingImages(data.images || []);
        }
      } catch (error) {
        console.error("Error fetching existing images:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchImages();
  }, []);

  // Calculate the total number of images (existing in DB + newly selected)
  const totalImages = existingImages.length + files.length;

  const handleClick = () => {
    imageRef.current?.click();
  };

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    // Check limit against BOTH existing and new files
    if (totalImages + selectedFiles.length > 3) {
      return alert("You can only have a maximum of 3 images in total.");
    }

    // Create preview URLs and store file objects
    const newFiles = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Reset input
    if (imageRef.current) imageRef.current.value = "";
  };

  // Remove a newly selected file before uploading
  const removeNewImage = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // 2. Delete an already uploaded image from the database
  const deleteExistingImage = async (imageUrl) => {
    if (!confirm("Are you sure you want to permanently delete this image?"))
      return;

    try {
      // Pass the URL as a query parameter
      const res = await fetch(
        `/api/images?url=${encodeURIComponent(imageUrl)}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) throw new Error("Failed to delete image");

      // Update UI by filtering out that specific URL string
      setExistingImages((prev) => prev.filter((url) => url !== imageUrl));
      alert("Image deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete image");
    }
  };

  const handleSubmit = async () => {
    if (files.length === 0)
      return alert("Please select at least one new image.");

    try {
      setLoading(true);
      const formData = new FormData();

      files.forEach(({ file }) => {
        formData.append("images", file);
      });

      const res = await fetch("/api/imageUpload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Upload failed");

      console.log("Upload success:", data);
      alert("Images uploaded successfully ✅");

      // Assuming your API returns the newly saved image objects in `data.uploadedImages`
      // Add them to the existing images gallery
      if (data.uploadedImages) {
        setExistingImages((prev) => [...prev, ...data.uploadedImages]);
      } else {
        // Fallback: If your API doesn't return them, you could trigger a re-fetch here
        // window.location.reload();
      }

      // Clear the local files array after successful upload
      setFiles([]);
    } catch (error) {
      console.error(error);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // Show a loading spinner while initially fetching DB images
  if (fetching) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50 py-10">
      <h1 className="text-2xl font-bold text-gray-800">
        Gallery Management (Max 3)
      </h1>

      <button
        onClick={handleClick}
        disabled={totalImages >= 3}
        className="bg-blue-600 px-6 py-3 text-white rounded-2xl hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <UploadCloud size={20} /> Choose Images ({totalImages}/3)
      </button>

      <input
        ref={imageRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleChange}
      />

      {/* COMBINED GALLERY SECTION */}
      <div className="flex flex-col items-center gap-6 w-full max-w-3xl">
        {existingImages.length > 0 || files.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-6">
            {/* 1. Render Already Uploaded Images */}
            {/* 1. Render Already Uploaded Images */}
            {existingImages.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <img
                  src={imageUrl}
                  alt="Already Uploaded"
                  className="w-40 h-40 object-cover rounded-xl shadow-md border-2 border-green-400"
                />
                <div className="absolute top-0 left-0 bg-green-500 text-white text-xs px-2 py-1 rounded-tl-xl rounded-br-lg z-10 shadow">
                  Uploaded
                </div>
                <button
                  onClick={() => deleteExistingImage(imageUrl)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 hover:scale-110 transition-all z-20"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            {/* 2. Render New Files Preview */}
            {files.map((item, index) => (
              <div
                key={`new-${index}`}
                className="relative group opacity-90 hover:opacity-100 transition-opacity"
              >
                <img
                  src={item.preview}
                  alt={`Preview ${index}`}
                  className="w-40 h-40 object-cover rounded-xl shadow-md border-2 border-blue-400 border-dashed"
                />
                <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-tl-xl rounded-br-lg z-10 shadow">
                  New
                </div>
                <button
                  onClick={() => removeNewImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 hover:scale-110 transition-all z-20"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No images in your gallery yet.</p>
        )}

        {/* SUBMIT BUTTON (Only shows if there are NEW files to upload) */}
        {files.length > 0 && (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 px-8 py-3 text-white font-semibold rounded-xl shadow-lg hover:bg-green-500 disabled:opacity-50 transition w-full max-w-xs mt-4"
          >
            {loading
              ? "Uploading..."
              : `Submit ${files.length} New Image${files.length > 1 ? "s" : ""}`}
          </button>
        )}
      </div>
    </main>
  );
};

export default Gallery;
