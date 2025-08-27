// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("userinfo")) || null, // persist user info only
  token: null, // store token in Redux
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = action.payload.user;
      state.token = action.payload.token; // store token in Redux
      localStorage.setItem("userinfo", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null; // clear token on logout
      localStorage.removeItem("userinfo");
      // no need to handle cookies here
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userinfo", JSON.stringify(action.payload));
    },
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
