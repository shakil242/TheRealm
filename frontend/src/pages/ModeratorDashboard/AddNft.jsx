import React, { useState, useEffect } from "react";
import axios from "axios";
import { buildApiUrl } from "../../config/api";

const AddNFT = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null, // file
    price: "",
  });

  const [preview, setPreview] = useState(null); // for image preview

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = files ? files[0] : null;

    setFormData((prev) => ({
      ...prev,
      [name]: file || value,
    }));

    // Show preview if file is selected
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else if (name === "image") {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); 
    if (!token) return alert("You must be logged in");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("image", formData.image);

    try {
      const response = await axios.post(buildApiUrl("/api/nfts"), data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("NFT added successfully!");
      setFormData({ name: "", description: "", image: null, price: "" });
      setPreview(null);
    } catch (err) {
      console.error(err.response || err);
      alert("Error adding NFT: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className=" mt-20 flex justify-center items-center bg-gray-100">
  <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-2xl p-10 w-full max-w-md border border-gray-200">
    <h1 className="text-3xl font-extrabold mb-6 text-purple-600 text-center">
      Add New NFT
    </h1>
    <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="NFT Name"
        className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        required
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="NFT Description"
        className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price (ETH)"
        className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        required
      />
      <input
        type="file"
        name="image"
        onChange={handleChange}
        accept="image/*"
        className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        required
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-2 w-full h-48 object-cover rounded-lg border border-gray-300 shadow-sm"
        />
      )}

      <button
        type="submit"
        className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold mt-3"
      >
        Add NFT
      </button>
    </form>
  </div>
</div>

  );
};

export default AddNFT;
