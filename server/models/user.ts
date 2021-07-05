import mongoose from "mongoose";
import { IUser } from "../config/interface";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
      maxLength: [20, "Your name is up to 20 chars long"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      trim: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/amangupta/image/upload/v1625417587/image/upload/avatar_kvafwh.png",
    },
    role: {
      type: String,
      default: "user", // admin
    },
    type: {
      type: String,
      default: "normal", // fast
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
