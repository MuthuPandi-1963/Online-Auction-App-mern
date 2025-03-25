import axios from "axios";

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "snapgram"); // Set in Cloudinary settings

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_CLOUDINARY_URL}/image/upload`, 
      formData
    );

    return response.data.secure_url; // Cloudinary returns a URL after upload
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};
