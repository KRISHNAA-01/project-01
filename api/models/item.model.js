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
    },
    stock: { type: Number, required: true, default: 0 },
  threshold: { type: Number, required: true, default: 10 },
  });
  
  // Method to deduct stock
itemSchema.methods.deductStock = function(quantity) {
  if (this.stock >= quantity) {
      this.stock -= quantity;
      return this.save();
  }
  return Promise.reject(new Error('Insufficient stock'));
};

const Item = mongoose.model('Item', itemSchema);

  
export default Item;