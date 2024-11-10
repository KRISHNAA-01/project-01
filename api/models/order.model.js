// // models/Order.js
// import mongoose from 'mongoose';

// const OrderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   billingInfo: {
//     firstName: String,
//     lastName: String,
//     email: String,
//     address: String,
//     address2: String,
//     country: String,
//     state: String,
//     zip: String,
//   },
//   cartItems: [
//     {
//       product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Item',
//         required: true,
//       },
//       name: String,
//       price: Number,
//       quantity: {
//         type: Number,
//         required: true,
//       },
//     },
//   ],
//   totalAmount: {
//     type: Number,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'Completed', 'Cancelled'],
//     default: 'Pending',
//   },
//   paymentInfo: {
//     orderId: String,
//     paymentId: String,
//     signature: String,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Order = mongoose.model('Order', OrderSchema);
// export default Order;

// models/Order.js// models/Order.js
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
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
  paymentInfo: { orderId: String, paymentId: String, signature: String },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
