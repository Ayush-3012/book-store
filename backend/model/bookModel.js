import mongoose from "mongoose";

const bookSchema = {
  id: {
    type: String,
    required: true,
  },
  volumeInfo: {
    type: Object,
    required: true,
  },
};

export const Book = mongoose.model("Book", bookSchema);
