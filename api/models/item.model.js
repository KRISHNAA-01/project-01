import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    }
  });
  
  const Item = mongoose.model("Item", itemSchema);
  
export default Item;