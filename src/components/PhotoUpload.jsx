import React, { useState } from "react";
import axios from "axios";

const PhotoUpload = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("instagram_access_token");

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    try {
      // First, upload the image to your server
      const uploadResponse = await axios.post(
        "YOUR_SERVER_UPLOAD_ENDPOINT",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = uploadResponse.data.url;

      // Then, create a container
      const containerResponse = await axios.post(
        `https://graph.instagram.com/me/media?image_url=${encodeURIComponent(
          imageUrl
        )}&caption=${encodeURIComponent(caption)}&access_token=${accessToken}`
      );

      const containerId = containerResponse.data.id;

      // Finally, publish the container
      await axios.post(
        `https://graph.instagram.com/me/media_publish?creation_id=${containerId}&access_token=${accessToken}`
      );

      alert("Photo uploaded successfully!");
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Error uploading photo. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
      />
      <textarea
        value={caption}
        onChange={handleCaptionChange}
        placeholder="Enter caption"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload to Instagram
      </button>
    </form>
  );
};

export default PhotoUpload;
