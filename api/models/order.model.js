
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  billingInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    address2: { type: String },
    country: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    mobile: { type: String, required: true }, // New field
  },
  cartItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
      name: String,
      price: Number,
      quantity: { type: Number, required: true },
      reviewed: { type: Boolean, default: false }, // Tracks if a product has been reviewed
    
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
  paymentInfo: { orderId: String, paymentId: String, signature: String },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
