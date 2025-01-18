// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
//  import './ProductSection.css';

// export default function ProductSection() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await fetch("/api/item");
//         if (!response.ok) {
//           throw new Error("Failed to fetch items");
//         }
//         const data = await response.json();
//         setItems(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchItems();
//   }, []);

//   const filteredItems = items.filter((item) =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="relative w-72 h-3 bg-gray-200 rounded-full overflow-hidden">
//           <div className="absolute top-0 left-0 w-1/4 h-full bg-[#e30217] animate-progress-bar"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-center py-10 text-red-500">{error}</div>;
//   }

//   return (
//     <section id="products" className="container mx-auto my-10 px-4">
//    <h1 className="text-center text-4xl font-semibold text-[#590109] mb-8">Explore Our Collection</h1>

//    <div className="flex justify-center mb-6">
//    <input
//       type="text"
//       placeholder="Search for furniture..."
//       className="p-3 border border-gray-300 rounded-lg w-80 shadow-md focus:border-[#e30217] focus:outline-none"
//       value={searchQuery}
//       onChange={(e) => setSearchQuery(e.target.value)}
//    />
// </div>


// <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//    {filteredItems.map((item) => (
//       <Link
//          to={`/${item._id}`}
//          key={item._id}
//          className="product-card bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
//       >
//          <img src={item.imageUrl} alt={item.name} className="w-full h-64 object-cover" />
//          <div className="p-4">
//             <h2 className="text-lg font-bold text-center text-[#590109]">{item.name}</h2>
//             <div className="flex justify-between items-center mt-4">
//                <span className="text-green-600 font-semibold">Rs. {item.price}</span>
//                <span className="text-[#e30217] px-4 py-1 border border-[#e30217] rounded-lg hover:bg-[#e30217] hover:text-white transition">
//                   View Details
//                </span>
//             </div>
//          </div>
//       </Link>
//    ))}
// </div>


//     </section>
//   );
// }

import React, { useState, useEffect, useContext } from "react"; 
import { Link } from "react-router-dom";
import { CartContext } from "../../Components/context/CartContext.jsx";
import "./ProductSection.css";

export default function ProductSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { count, setCount, addItemToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/item");
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleAddToCart = (item) => {
    setCount(count + 1);
    addItemToCart(item);
    setSuccessMessage(`${item.name} added to cart!`);
    setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative w-72 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 w-1/4 h-full bg-[#e30217] animate-progress-bar"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <section id="products" className="container mx-auto my-10 px-4">
      <h1 className="text-center text-4xl font-semibold text-[#590109] mb-8">
        Explore Our Collection
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for furniture..."
          className="p-3 border border-gray-300 rounded-lg w-80 shadow-md focus:border-[#e30217] focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {successMessage && (
        <div className="text-center text-green-500 mb-4">{successMessage}</div>
      )}

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="product-card relative bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-center text-[#590109]">
                {item.name}
              </h2>
              <div className="flex justify-between items-center mt-4">
                <span className="text-green-600 font-semibold">
                  Rs. {item.price}
                </span>
                <button
                  className="text-[#e30217] px-4 py-1 border border-[#e30217] rounded-lg hover:bg-[#e30217] hover:text-white transition relative z-20"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <Link
              to={`/${item._id}`}
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold opacity-0 hover:opacity-100 transition-opacity z-10 pointer-events-auto"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
