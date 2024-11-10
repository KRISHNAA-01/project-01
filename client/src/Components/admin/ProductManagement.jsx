// ProductManagement.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/item');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleAddProduct = () => navigate('/add-product');

  const handleEditProduct = (productId) => navigate(`/edit-product/${productId}`);

  const handleDeleteProduct = async (productId) => {
    const confirmation = window.confirm("Are you sure you want to delete this product?");
    if (confirmation) {
      try {
        await axios.delete(`/api/products/${productId}`);
        alert('Product deleted successfully!');
        setProducts(products.filter((product) => product._id !== productId));
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold text-center my-8 text-gray-800">Manage Products</h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <button
        onClick={handleAddProduct}
        className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg py-3 mb-6 text-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200"
      >
        Add New Product
      </button>
      <div className="space-y-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="flex justify-between items-center bg-white border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-200"
          >
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-gray-700">{product.name}</h3>
              <p className="text-xl font-medium text-gray-500">${product.price}</p>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleEditProduct(product._id)}
                className="bg-blue-500 text-white py-2 px-5 rounded-lg font-medium shadow hover:bg-blue-600 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="bg-red-500 text-white py-2 px-5 rounded-lg font-medium shadow hover:bg-red-600 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
