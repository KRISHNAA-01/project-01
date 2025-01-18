// admin.controller.js
import Item from '../models/item.model.js';
import Order from '../models/order.model.js';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';
import Review from '../models/review.model.js';

// Fetch all users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, '-password'); // Exclude passwords
        res.status(200).json(users);
    } catch (error) {
        next(errorHandler(500, 'Error fetching users.'));
    }
};

// Fetch all reviews
export const getAllReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find()
            .populate('user', 'username email') // Populate user details
            .populate('product', 'name'); // Populate product details

        res.status(200).json(reviews);
    } catch (error) {
        next(errorHandler(500, 'Error fetching reviews.'));
    }
};
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndDelete(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
};

export const addProduct = async (req, res, next) => {
    try {
        const { name, imageUrl, price, description } = req.body;
        const newItem = new Item({ name, imageUrl, price, description });
        await newItem.save();
        res.status(201).json({ message: 'Product added successfully!' });
    } catch (error) {
        next(errorHandler(500, 'Error adding product.'));
    }
};

export const editProduct = async (req, res, next) => {
    try {
        const { name, imageUrl, price, description } = req.body;
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, {
            name, imageUrl, price, description
        }, { new: true });

        if (!updatedItem) return next(errorHandler(404, 'Product not found.'));
        res.status(200).json(updatedItem);
    } catch (error) {
        next(errorHandler(500, 'Error updating product.'));
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return next(errorHandler(404, 'Product not found.'));
        res.status(200).json({ message: 'Product deleted successfully!' });
    } catch (error) {
        next(errorHandler(500, 'Error deleting product.'));
    }
};

export const updateStock = async (req, res, next) => {
  try {
    const { stock } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true }
    );

    if (!updatedItem) return next(errorHandler(404, 'Product not found.'));
    res.status(200).json({ message: 'Stock updated successfully!', item: updatedItem });
  } catch (error) {
    next(errorHandler(500, 'Error updating stock.'));
  }
};


export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate('user', 'username email') // Populate user fields
            .populate('cartItems.product', 'name price'); // Populate product fields in cart items

        res.status(200).json(orders);
    } catch (error) {
        next(errorHandler(500, 'Error fetching orders.'));
    }
};

// Delete an order
export const deleteOrder = async (req, res, next) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return next(errorHandler(404, 'Order not found.'));
        res.status(200).json({ message: 'Order deleted successfully!' });
    } catch (error) {
        next(errorHandler(500, 'Error deleting order.'));
    }
};
// // Fetch all users
// export const getAllUsers = async (req, res, next) => {
//     try {
//         const users = await User.find({}, '-password'); // Fetch all users excluding their passwords
//         res.status(200).json(users);
//     } catch (error) {
//         next(errorHandler(500, 'Error fetching users.'));
//     }
// };
export const updateThreshold = async (req, res, next) => {
    try {
      const { threshold } = req.body;
      const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        { threshold },
        { new: true }
      );
      if (!updatedItem) return next(errorHandler(404, 'Product not found.'));
      res.status(200).json(updatedItem);
    } catch (error) {
      next(errorHandler(500, 'Error updating threshold.'));
    }
  };
  
//   export const updateOrderStatus = async (req, res) => {
//     try {
//       const { orderId } = req.params;
//       const { status, expectedDeliveryDate } = req.body;
  
//       const order = await Order.findById(orderId);
//       if (!order) {
//         return res.status(404).json({ message: 'Order not found' });
//       }
  
//       order.status = status;
  
//       if (status === 'order dispatched' && expectedDeliveryDate) {
//         order.expectedDeliveryDate = new Date(expectedDeliveryDate);
//       }
  
//       await order.save();
//       res.status(200).json({ message: 'Order status updated successfully', order });
//     } catch (error) {
//       res.status(500).json({ message: 'Error updating order status', error });
//     }
//   };
export const updateOrderStatus = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status, expectedDeliveryDate } = req.body;
  
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Update status
      order.status = status;
  
      // Ensure the expected delivery date is provided when dispatching the order
      if (status === 'order dispatched') {
        if (!expectedDeliveryDate) {
          return res
            .status(400)
            .json({ message: 'Expected delivery date is required for order dispatch' });
        }
        order.expectedDeliveryDate = new Date(expectedDeliveryDate);
      }
  
      await order.save();
      res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
      res.status(500).json({ message: 'Error updating order status', error });
    }
  };
  