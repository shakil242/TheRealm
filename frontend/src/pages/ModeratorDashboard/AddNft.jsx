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
  Paper,
} from "@mui/material";
import axios from "axios";
import { buildApiUrl } from "../../config/api";

const AddNFT = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
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
      setFormData({ name: "", description: "", image: null, price: "",  category: "" });
      setPreview(null);
    } catch (err) {
      console.error(err.response || err);
      alert("Error adding NFT: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f3f4f6"
      p={2}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          width: { xs: "100%", sm: 450 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4" color="primary" fontWeight="bold" textAlign="center">
          Add New NFT
        </Typography>

        <TextField
          label="NFT Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="NFT Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          multiline
          rows={3}
          fullWidth
        />

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
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
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

        <Button variant="contained" component="label">
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

        {preview && (
          <Box
            component="img"
            src={preview}
            alt="Preview"
            width="100%"
            height={200}
            sx={{ objectFit: "cover", borderRadius: 1, border: "1px solid #ccc" }}
          />
        )}

        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
          Add NFT
        </Button>
      </Paper>
    </Box>
  );
};

export default AddNFT;
