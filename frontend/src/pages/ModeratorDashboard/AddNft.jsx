import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { buildApiUrl } from "../../config/api";

const AddNFT = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
    category: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = files ? files[0] : null;

    setFormData((prev) => ({
      ...prev,
      [name]: file || value,
    }));

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
    data.append("category", formData.category);
    data.append("image", formData.image);

    try {
      await axios.post(buildApiUrl("/api/nfts"), data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("NFT added successfully!");
      setFormData({ name: "", description: "", image: null, price: "", category: "" });
      setPreview(null);
    } catch (err) {
      console.error(err.response || err);
      alert("Error adding NFT: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 800,
        mx: "auto",
        py: 4,
        px: 2,
        bgcolor: "#fff", // ebay style -> white background
      }}
    >
      <Typography variant="h5" fontWeight="600" gutterBottom>
        Create a New NFT Listing
      </Typography>

      {/* Name */}
      <TextField
        label="NFT Title"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
      />

      {/* Description */}
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        multiline
        rows={4}
        fullWidth
      />

      {/* Price + Category in a row */}
      <Box display="flex" gap={2}>
        <TextField
          label="Price (ETH)"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
          fullWidth
        />

        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <MenuItem value="art">Art</MenuItem>
            <MenuItem value="music">Music</MenuItem>
            <MenuItem value="collectible">Collectible</MenuItem>
            <MenuItem value="game">Game</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Upload */}
      <Button variant="outlined" component="label" sx={{ alignSelf: "flex-start" }}>
        Upload Image
        <input
          type="file"
          name="image"
          hidden
          accept="image/*"
          onChange={handleChange}
          required
        />
      </Button>

      {/* Preview */}
      {preview && (
        <Box
          component="img"
          src={preview}
          alt="Preview"
          sx={{
            width: "100%",
            maxHeight: 300,
            objectFit: "contain",
            border: "1px solid #ddd",
            p: 1,
          }}
        />
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="contained"
        sx={{
          bgcolor: "#3665f3", // ebay blue
          "&:hover": { bgcolor: "#264ec2" },
          fontWeight: "bold",
          alignSelf: "flex-start",
          mt: 2,
        }}
      >
        List NFT
      </Button>
    </Box>
  );
};

export default AddNFT;
