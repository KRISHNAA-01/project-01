// AdminContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create context
const AdminContext = createContext();

// Custom hook to use AdminContext
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to add a new product
    const addProduct = async (productData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/admin/product', productData, {
                withCredentials: true, // ensure cookies are included
            });
            return response.data; // return success message
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding product');
        } finally {
            setLoading(false);
        }
    };

    // Function to edit a product
    const editProduct = async (id, updatedData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(`/api/admin/product/${id}`, updatedData, {
                withCredentials: true,
            });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating product');
        } finally {
            setLoading(false);
        }
    };

    // Function to delete a product
    const deleteProduct = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.delete(`/api/admin/product/${id}`, { withCredentials: true });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting product');
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch all users
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/api/admin/users', { withCredentials: true });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching users');
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch all reviews
    const fetchReviews = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/api/admin/reviews', { withCredentials: true });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching reviews');
        } finally {
            setLoading(false);
        }
    };
    // Function to delete a review
    const deleteReview = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.delete(`/api/admin/review/${id}`, { withCredentials: true });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting review');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminContext.Provider
            value={{
                addProduct,
                editProduct,
                deleteProduct,
                fetchUsers,
                fetchReviews,
                deleteReview,
                loading,
                error,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
