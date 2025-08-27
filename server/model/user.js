import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
     type: String, 
     required: true, 
     unique: true, 
     trim: true 
    },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ["user", "vendor", "admin"], 
    default: "user" 
  },
  status: { 
    type: String, 
    enum: ["pending", "active", "rejected"], 
    default: "active" 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const User = mongoose.model("User", userSchema);
export default User;
