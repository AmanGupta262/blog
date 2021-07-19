import mongoose from "mongoose";

const categoryModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 50,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", categoryModel);
