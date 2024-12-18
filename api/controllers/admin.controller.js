// admin.controller.js
import Item from '../models/item.model.js';
import Order from '../models/order.model.js';
import { errorHandler } from '../utils/error.js';

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
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, { stock }, { new: true });
        if (!updatedItem) return next(errorHandler(404, 'Product not found.'));
        res.status(200).json(updatedItem);
    } catch (error) {
        next(errorHandler(500, 'Error updating stock.'));
    }
};export const getAllOrders = async (req, res, next) => {
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
// Fetch all users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, '-password'); // Fetch all users excluding their passwords
        res.status(200).json(users);
    } catch (error) {
        next(errorHandler(500, 'Error fetching users.'));
    }
};