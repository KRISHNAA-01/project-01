import React from 'react';
import ProductManagement from '../../Components/admin/ProductManagement';
import OrderManagement from '../../Components/admin/OrderManagement';
import AdminUsers from '../../Components/admin/AdminUsers';
import AdminReviews from '../../Components/admin/AdminReviews';
import { Link, Route, Routes } from 'react-router-dom';
import Header from '../../Components/Header/Header';

const AdminDashboard = () => (
  <div className="min-h-screen bg-gray-100">
    {/* <Header /> */}
    <div className="flex justify-end p-4">
      <Link to="/profile">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Profile
        </button>
      </Link>
    </div>
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Admin Dashboard</h1>
      
      <nav className="flex justify-center gap-8 mb-8">
        <Link
          to="products"
          className="text-lg font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Manage Products
        </Link>
        <Link
          to="orders"
          className="text-lg font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          View Orders
        </Link>
        <Link
          to="users"
          className="text-lg font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          users
        </Link>
        <Link
          to="reviews"
          className="text-lg font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          reviews
        </Link>

      </nav>
      
      <div className="bg-white shadow-lg rounded-lg p-6">
        <Routes>
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="reviews" element={<AdminReviews />} />

          
            
        </Routes>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
