"use client";
import React, { useRef, useState } from "react";

const Gallery = () => {
  const imageRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    imageRef.current?.click();
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async () => {
    if (!file) return alert("Please select an image");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/imageUpload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Upload success:", data);
      alert("Image uploaded successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50">
      <h1 className="text-2xl font-semibold">Upload Your Image</h1>

      <button
        onClick={handleClick}
        className="bg-green-500 px-6 py-3 text-white rounded-2xl hover:bg-green-400 transition"
      >
        Choose Image
      </button>

      <input
        ref={imageRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />

      {preview && (
        <div className="flex flex-col items-center gap-4">
          <img
            src={preview}
            alt="Preview"
            className="w-48 h-48 object-cover rounded-xl shadow"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-yellow-500 px-6 py-2 rounded-xl hover:bg-yellow-400 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </div>
      )}
    </main>
  );
};

export default Gallery;
