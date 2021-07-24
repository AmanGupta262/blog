import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: 10,
    maxlength: 50,
  },
  description: {
      type: String,
      trim: true,
      required: true,
      minlength: 50,
      maxlength: 200,
  },
  content: {
    type: String,
    trim: true,
    required: true,
    minlength: 2000,
  },
  thumbnail: {
      type: String,
      required: true,
  },
  category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
  },
},{
    timestamps: true,
});

export default mongoose.model('Blog', blogSchema);