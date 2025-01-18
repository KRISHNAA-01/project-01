// controllers/order.controller.js
// controllers/order.controller.js
import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';
import Item from '../models/item.model.js'; // Import the Item model

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { billingInfo, totalAmount } = req.body;
    const userId = req.user.id;

    // Fetch the user's cart items and populate product details
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Prepare order items and track products to update stock
    const orderItems = [];
    const updatedProducts = [];

    for (const item of cart.items) {
      const product = await Item.findById(item.product._id);
  
      if (!product) {
          return res.status(404).json({ message: `Product not found: ${item.product.name}` });
      }
  
      try {
          await product.deductStock(item.quantity);
      } catch (error) {
          return res.status(400).json({ message: error.message });
      }
  
      // Add item to order
      orderItems.push({
          product: product._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
      });
  }

    // Save all updated products in a single operation
    const savePromises = updatedProducts.map(product => product.save());
    await Promise.all(savePromises);

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
    console.error('Error creating order:', error);
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
