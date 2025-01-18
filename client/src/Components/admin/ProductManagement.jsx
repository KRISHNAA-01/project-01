// // ProductManagement.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ProductManagement = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('/api/item');
//       setProducts(response.data);
//     } catch (err) {
//       console.error('Error fetching products:', err);
//     }
//   };

//   const handleAddProduct = () => navigate('/add-product');

//   const handleEditProduct = (productId) => navigate(`/edit-product/${productId}`);
//   const handleDeleteProduct = async (productId) => {
//     const confirmation = window.confirm("Are you sure you want to delete this product?");
//     if (confirmation) {
//         try {
//             await axios.delete(`/api/admin/product/${productId}`, {
//                 withCredentials: true,
//             });
//             alert('Product deleted successfully!');
//             setProducts(products.filter((product) => product._id !== productId));
//         } catch (err) {
//             console.error('Error deleting product:', err);
//         }
//     }
// };

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-5 max-w-5xl mx-auto">
//       <h2 className="text-4xl font-bold text-center my-8 text-gray-800">Manage Products</h2>
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search by product name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-3 rounded-lg border border-gray-300 shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//         />
//       </div>
//       <button
//         onClick={handleAddProduct}
//         className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg py-3 mb-6 text-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200"
//       >
//         Add New Product
//       </button>
//       <div className="space-y-6">
//         {filteredProducts.map((product) => (
//           <div
//             key={product._id}
//             className="flex justify-between items-center bg-white border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-200"
//           >
//             <div className="flex-1">
//               <h3 className="text-2xl font-semibold text-gray-700">{product.name}</h3>
//               <p className="text-xl font-medium text-gray-500">${product.price}</p>
//               <p className="text-gray-600 mt-2">{product.description}</p>
//             </div>
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => handleEditProduct(product._id)}
//                 className="bg-blue-500 text-white py-2 px-5 rounded-lg font-medium shadow hover:bg-blue-600 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDeleteProduct(product._id)}
//                 className="bg-red-500 text-white py-2 px-5 rounded-lg font-medium shadow hover:bg-red-600 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductManagement;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../context/axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All'); // "All", "Low Stock", "Out of Stock"
  const [updatedValues, setUpdatedValues] = useState({});
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
        await axios.delete(`/api/admin/product/${productId}`);
        alert('Product deleted successfully!');
        setProducts(products.filter((product) => product._id !== productId));
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  const handleInputChange = (productId, field, value) => {
    setUpdatedValues((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const handleSubmitUpdates = async (productId) => {
    const updates = updatedValues[productId] || {};
    try {
      if (updates.stock !== undefined) {
        await api.put(`/admin/product/${productId}/stock`, { stock: updates.stock, withCredentials: true });
      }
      if (updates.threshold !== undefined) {
        await api.put(`/admin/product/${productId}/threshold`, { threshold: updates.threshold, withCredentials: true });
      }
      alert('Updates submitted successfully!');
      setUpdatedValues((prev) => ({ ...prev, [productId]: {} })); // Clear the values for the product
      fetchProducts();
    } catch (err) {
      console.error('Error submitting updates:', err);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'Low Stock') return matchesSearch && product.stock <= product.threshold;
    if (filter === 'Out of Stock') return matchesSearch && product.stock === 0;
    return matchesSearch;
  });

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold text-center my-8 text-gray-800">Manage Products</h2>
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="ml-4 p-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="All">All</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
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
            className={`flex justify-between items-center bg-white border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-200 ${
              product.stock === 0 ? 'border-red-500' : product.stock <= product.threshold ? 'border-yellow-500' : ''
            }`}
          >
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-gray-700">{product.name}</h3>
              <p className="text-xl font-medium text-gray-500">${product.price}</p>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                Stock: {product.stock} | Threshold: {product.threshold}
              </p>
              <div className="mt-2">
                <input
                  type="number"
                  placeholder="Update stock"
                  value={updatedValues[product._id]?.stock || ''}
                  className="p-2 border rounded-md w-24"
                  onChange={(e) => handleInputChange(product._id, 'stock', e.target.value)}
                />
              </div>
              <div className="mt-2">
                <input
                  type="number"
                  placeholder="Set threshold"
                  value={updatedValues[product._id]?.threshold || ''}
                  className="p-2 border rounded-md w-24"
                  onChange={(e) => handleInputChange(product._id, 'threshold', e.target.value)}
                />
              </div>
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
              <button
                onClick={() => handleSubmitUpdates(product._id)}
                className="bg-green-500 text-white py-2 px-5 rounded-lg font-medium shadow hover:bg-green-600 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Submit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
