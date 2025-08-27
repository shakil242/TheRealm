import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";   // ✅ import Provider
import { store } from "./redux/store";    // ✅ import store

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>   {/* ✅ wrap App with Provider */}
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  </StrictMode>
);
