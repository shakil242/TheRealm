import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
} from "@mui/material";

const MyNFTs = () => {
  const [nftList, setNftList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentNFT, setCurrentNFT] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: null,
  });

  // Table pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

 const fetchNFTs = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(buildApiUrl(API_ENDPOINTS.GET_MY_NFTS), {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.success) {
      // Filter NFTs with status "available"
      const availableNFTs = response.data.nfts.filter(nft => nft.status === "available");
      setNftList(availableNFTs);
    } else {
      toast.error(response.data.error || "Failed to load NFTs");
    }
  } catch (error) {
    toast.error(error.response?.data?.error || "Server error. Try again!");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchNFTs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this NFT?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(buildApiUrl(`/api/nfts/${id}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        toast.success("NFT deleted successfully!");
        setNftList((prev) => prev.filter((nft) => nft._id !== id));
      } else {
        toast.error(response.data.error || "Failed to delete NFT");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Server error. Try again!");
    }
  };

  const openEditDialog = (nft) => {
    setCurrentNFT(nft);
    setFormData({
      name: nft.name,
      price: nft.price,
      stock: nft.stock,
      description: nft.description,
      image: null,
    });
    setEditDialogOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdateNFT = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("description", formData.description);
      if (formData.image) data.append("image", formData.image);

      const response = await axios.put(
        buildApiUrl(`/api/nfts/update-nft/${currentNFT._id}`),
        data,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        toast.success("NFT updated successfully!");
        setNftList((prev) =>
          prev.map((nft) => (nft._id === currentNFT._id ? response.data.nft : nft))
        );
        setEditDialogOpen(false);
      } else {
        toast.error(response.data.error || "Failed to update NFT");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Server error. Try again!");
    }
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My NFTs</h1>

      {loading ? (
        <p className="text-gray-500">Loading NFTs...</p>
      ) : nftList.length === 0 ? (
        <p className="text-gray-500">No NFTs found. Add some new ones!</p>
      ) : (
        <>
          {/* NFT Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {nftList.map((nft) => (
              <div
                key={nft._id}
                className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
              >
                <img
                  src={`http://localhost:5001/uploads/${nft.image}`}
                  alt={nft.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="font-semibold text-lg text-gray-800 truncate">{nft.name}</h2>
                  <p className="text-purple-600 font-bold mt-1">PRICE: {nft.price}$</p>
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => openEditDialog(nft)}
                      className="w-1/2 bg-green-500 text-white py-2 hover:bg-green-700 transition"
                    >
                      UPDATE
                    </button>
                    <button
                      onClick={() => handleDelete(nft._id)}
                      className="w-1/2 bg-red-600 text-white py-2 hover:bg-red-700 transition"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* NFT Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nftList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((nft) => (
                  <TableRow key={nft._id}>
                    <TableCell>{nft.name}</TableCell>
                    <TableCell>${nft.price}</TableCell>
                    <TableCell>{nft.stock}</TableCell>
                    <TableCell>{nft.description}</TableCell>
                    <TableCell>
                      <Button color="primary" onClick={() => openEditDialog(nft)}>Edit</Button>
                      <Button color="error" onClick={() => handleDelete(nft._id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={nftList.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </TableContainer>
        </>
      )}

      {/* Edit NFT Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit NFT</DialogTitle>
        <DialogContent className="flex flex-col gap-3">
          <TextField label="Name" name="name" value={formData.name} onChange={handleFormChange} fullWidth />
          <TextField label="Price" name="price" type="number" value={formData.price} onChange={handleFormChange} fullWidth />
          <TextField label="Stock" name="stock" type="number" value={formData.stock} onChange={handleFormChange} fullWidth />
          <TextField label="Description" name="description" value={formData.description} onChange={handleFormChange} fullWidth multiline rows={3} />
          <input type="file" name="image" accept="image/*" onChange={handleFormChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleUpdateNFT} color="primary" variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyNFTs;
