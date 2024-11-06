// components/SignInPromptModal.js
import React from 'react';
import { Link } from 'react-router-dom';

const SignInPromptModal = ({ onClose, onSignIn }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">Please Sign In</h2>
        <p className="mb-4">You must be logged in to add items to your cart.</p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-200 text-black px-4 py-2 rounded"
          >
            Close
          </button>
          <Link to="/sign-in" className="bg-blue-600 text-white px-4 py-2 rounded">
          Sign In
        </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPromptModal;
