// EditProduct.js

import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
    const [formData, setFormData] = useState({ name: '', imageUrl: '', price: '', description: '', stock: '' });
    const { editProduct, loading, error } = useAdmin();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the existing product data using the ID from params
        const fetchProduct = async () => {
            const response = await axios.get(`/api/item/${id}`); // Assumes an endpoint to fetch a single product
            setFormData(response.data);
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await editProduct(id, formData);
        if (result) {
            alert('Product updated successfully!');
            navigate('/profile');
        }
    };

    return (
        <div className="max-w-md mx-auto p-5">
            <h2 className="text-2xl font-bold mb-5">Edit Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" id="name" value={formData.name} onChange={handleChange} required className="border p-2 w-full rounded" placeholder="Product Name" />
                <input type="text" id="imageUrl" value={formData.imageUrl} onChange={handleChange} className="border p-2 w-full rounded" placeholder="Image URL" />
                <input type="number" id="price" value={formData.price} onChange={handleChange} required className="border p-2 w-full rounded" placeholder="Price" />
                <textarea id="description" value={formData.description} onChange={handleChange} className="border p-2 w-full rounded" placeholder="Description" />
                {/* <input type="number" id="stock" value={formData.stock} onChange={handleChange} className="border p-2 w-full rounded" placeholder="Stock" /> */}
                <button type="submit" disabled={loading} className="bg-blue-600 text-white p-3 rounded-lg w-full">
                    {loading ? 'Updating...' : 'Update Product'}
                </button>
                {error && <p className="text-red-600">{error}</p>}
            </form>
        </div>
    );
};

export default EditProduct;
