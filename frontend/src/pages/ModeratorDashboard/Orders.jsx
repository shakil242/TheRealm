// src/pages/Moderator/Orders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { buildApiUrl, API_ENDPOINTS } from "../../config/api";
import { useAuth } from "../../Context/AuthContext";



const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const userId = user?._id;

  // Fetch all orders
const fetchOrders = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");
    if (!token) return console.error("Token missing");

    // Fetch orders for this moderator
    const response = await axios.get(
      buildApiUrl(API_ENDPOINTS.GET_SPECIFIC_CREATOR_ORDER.replace(
        ":userId",
        userId
      )),
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.data.success) {
      setOrders(response.data.orders);
    } else {
      console.error("Failed to fetch orders:", response.data.error);
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchOrders();
  }, []);

  // Confirm an order
  const handleConfirm = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        buildApiUrl(`${API_ENDPOINTS.CONFIRM_ORDER}/${orderId}`),
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("Order confirmed successfully!");
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: "confirmed" } : o
          )
        );
      } else {
        alert("Failed to confirm order.");
      }
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("Something went wrong.");
    }
  };

  if (loading) return <p className="text-center">Loading orders...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      <table className="w-full border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border">Buyer</th>
            <th className="p-3 border">NFT</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="p-3 border">{order.buyer?.username}</td>
                <td className="p-3 border">{order.nft?.name}</td>
                <td className="p-3 border">${order.nft?.price}</td>
                <td className="p-3 border capitalize">{order.status}</td>
                <td className="p-3 border">
                  {order.status === "pending" ? (
                    <button
                      onClick={() => handleConfirm(order._id)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Confirm
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      Confirmed
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-3 border text-center" colSpan="5">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
