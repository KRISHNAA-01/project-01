// controllers/order.controller.js
import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { billingInfo, totalAmount } = req.body;
    const userId = req.user.id;

    // Fetch the user's cart items
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Prepare order items
    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));

    // Create the order
    const order = new Order({
      user: userId,
      billingInfo,
      cartItems: orderItems,
      totalAmount,
      status: 'Pending',
    });

    await order.save();

    // Optionally clear the cart after order is placed
    await Cart.findOneAndUpdate({ user: userId }, { items: [] });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// Fetch all orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).populate('cartItems.product');

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};
