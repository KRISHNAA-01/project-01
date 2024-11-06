// AddProduct.js
import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        imageUrl: '',
        price: '',
        description: '',
    });
    const { addProduct, loading, error } = useAdmin();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await addProduct(formData);
        if (result) {
            alert(result.message); // Display success message
            navigate('/profile'); // Redirect after adding
        }
    };

    return (
        <div className="max-w-md mx-auto p-5">
            <h2 className="text-2xl font-bold mb-5">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    id="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border p-2 w-full rounded"
                />
                <input
                    type="text"
                    id="imageUrl"
                    placeholder="Image URL"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />
                <input
                    type="number"
                    id="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="border p-2 w-full rounded"
                />
                <textarea
                    id="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white p-3 rounded-lg w-full"
                >
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
                {error && <p className="text-red-600">{error}</p>}
            </form>
        </div>
    );
};

export default AddProduct;
