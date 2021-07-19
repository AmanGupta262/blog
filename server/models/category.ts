import mongoose from "mongoose";

const categoryModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required."],
      trim: true,
      unique: true,
      maxlength: [50, "Category name is up to 50 chars long."],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", categoryModel);
