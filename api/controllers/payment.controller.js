// controllers/payment.controller.js
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';
import Item from '../models/item.model.js'; // Import the Item model
const razorpay = new Razorpay({
  key_id: 'rzp_test_t9V1VZTLU2jhvd',
  key_secret: 'tg5OrxohACHlYw8IQnsLDUHz',
});

// Create a Razorpay order
export const createPaymentOrder = async (req, res) => {
    const { totalAmount } = req.body;
    console.log("Received totalAmount:", totalAmount);
    const userId = req.user.id;
    console.log("Received userid:", userId);
   
    try {
      const options = {
        amount: totalAmount * 100, // Amount in paise
        currency: 'INR',
        receipt: `receipt_${userId}_${Date.now()}`.slice(0,40),
      };
  
      try {
        const order = await razorpay.orders.create(options);
        console.log("Order created:", order);

        res.status(200).json({
            orderId: order.id,
            amount: options.amount,
            currency: options.currency,
            key: "rzp_test_t9V1VZTLU2jhvd", // Send Razorpay key for frontend use
        });
        
    } catch (error) {
        console.error("Error during order creation:", error);
        res.status(500).json({ message: 'Error creating payment order', error });
    }
    } catch (error) {
      res.status(500).json({ message: 'Error creating payment order', error });
    }
  };
  

// Verify Razorpay payment signature
// import Cart from '../models/cart'; // Import the Cart model
// import Order from '../models/Order'; // Import your Order model
// import crypto from 'crypto';
export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, billingInfo, totalAmount } = req.body;

  // Check if generated signature matches
  const generated_signature = crypto
    .createHmac('sha256', razorpay.key_secret)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    try {
      const userId = req.user.id;
      
      // Find the cart and populate items with product details
      const cart = await Cart.findOne({ user: userId }).populate('items.product');
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: 'No cart found for the user' });
      }

      // Ensure totalAmount is passed from the request body
      if (!totalAmount) {
        return res.status(400).json({ message: 'Total amount is required' });
      }

      // Format cart items for order creation
      const formattedCartItems = cart.items.map(cartItem => ({
        product: cartItem.product._id,
        name: cartItem.product.name,
        price: cartItem.product.price,
        quantity: cartItem.quantity,
      }));

      // Create the order
      const newOrder = new Order({
        user: userId,
        billingInfo,
        cartItems: formattedCartItems,
        totalAmount,
        status: 'Order Initiated',
        paymentInfo: {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
        },
      });

      await newOrder.save();
      await Cart.findOneAndUpdate({ user: userId }, { items: [] }); // Empty cart after successful order
      console.log("Payment verified and order created successfully in db");
      
      res.status(200).json({ message: 'Payment verified and order created successfully' });
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ message: 'Error verifying payment or creating order', error });
    }
  } else {
    res.status(400).json({ message: 'Invalid signature, payment verification failed' });
  }
};
// Fetch all orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).sort({createaAt: -1});
    console.log("Orders fetched:", orders);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};