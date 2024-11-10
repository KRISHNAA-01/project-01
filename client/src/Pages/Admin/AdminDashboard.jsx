import React from 'react';
import ProductManagement from '../../Components/admin/ProductManagement';
import OrderManagement from '../../Components/admin/OrderManagement';
import { Link, Route, Routes } from 'react-router-dom';
import Header from '../../Components/Header/Header';

const AdminDashboard = () => (
  <div className="min-h-screen bg-gray-100">
    <Header />
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
      </nav>
      
      <div className="bg-white shadow-lg rounded-lg p-6">
        <Routes>
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
        </Routes>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
