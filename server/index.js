import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import nftRoutes from "./routes/nftRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js";
import path from "path";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

connectDB();


app.use(
  cors({
    origin: [
      "http://localhost:5000", 
      "http://localhost:3002", 
      "http://localhost:3001", 
      "http://localhost:5177", 
      "http://localhost:5176", 
      "http://localhost:5175", 
      "http://localhost:5174", 
      "http://localhost:5173", 
      "https://myapp.com"],
    credentials: true,
  })
);


app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/nfts',nftRoutes)

app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MongoDB: ${process.env.MONGO_URI}`);
  });
