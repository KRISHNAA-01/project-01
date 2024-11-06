// "use client";
// import React, { useState, useEffect } from "react";
// import styles from "./ProductSection.module.scss";
// import { Link } from "react-router-dom";

// export default function ProductSection() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch items from the backend
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await fetch("/api/item");
//         if (!response.ok) {
//           throw new Error("Failed to fetch items");
//         }
//         const data = await response.json();
//         setItems(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
//     fetchItems();
//   }, []);

//   // Filter the items based on the search query
//   const filteredItems = items.filter((item) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       item.name.toLowerCase().includes(query) ||
//       item.description.toLowerCase().includes(query)
//     );
//   });

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <section className="my-[40px]" id="products">
//       <h1 className="text-[28px] lg:text-[40px] text-[#590109] text-center mt-[40px] mb-[60px]">
//         Our Products
//       </h1>

//       {/* Search Bar */}
//       <div className="flex justify-center mb-[40px]">
//         <input
//           type="text"
//           placeholder="Search products..."
//           className="p-[10px] border border-gray-300 rounded-lg w-[300px]"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       <div className="flex flex-wrap justify-center gap-[60px]">
//         {filteredItems.map((item) => (
//           <Link
//             to={`/${item._id}`}  // Make sure you're using _id if using MongoDB
//             key={item._id}
//             className={`${styles.productCard} cursor-pointer`}
//           >
//             <img
//               src={item.imageUrl}  // Assuming your schema has imageUrl for images
//               height={200}
//               width={300}
//               alt={item.name}
//               className="h-[300px]"
//             />
//             <h2 className="text-center pt-[10px] text-[18px] font-[500]">
//               {item.name}
//             </h2>

//             <div className="flex justify-between p-[20px]">
//               <span className="text-green">Rs. {item.price}</span>
//               <span className="border border-[#e30217] text-[#e30217] px-[10px] cursor-pointer rounded-[6px]">
//                 View Details
//               </span>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }




// // "use client";
// // import React, { useState } from "react";
// // import styles from "./ProductSection.module.scss";
// // import itemsData from "../../utils/JSON/items.json";
// // import { Link } from "react-router-dom";

// // export default function ProductSection() {
// //   const [searchQuery, setSearchQuery] = useState("");

// //   const filteredItems = itemsData.filter((item) => {
// //     const query = searchQuery.toLowerCase();
// //     return (
// //       item.name.toLowerCase().includes(query) ||
// //       item.description.toLowerCase().includes(query)
// //     );
// //   });

// //   return (
// //     <section className="my-[40px]" id="products">
// //       <h1 className="text-[28px] lg:text-[40px] text-[#590109] text-center mt-[40px] mb-[60px]">
// //         Our Products
// //       </h1>
      
// //       {/* Search Bar */}
// //       <div className="flex justify-center mb-[40px]">
// //         <input
// //           type="text"
// //           placeholder="Search products..."
// //           className="p-[10px] border border-gray-300 rounded-lg w-[300px]"
// //           value={searchQuery}
// //           onChange={(e) => setSearchQuery(e.target.value)}
// //         />
// //       </div>

// //       <div className="flex flex-wrap justify-center gap-[60px]">
// //         {filteredItems.map((item) => (
// //           <Link
// //             to={`/${item.id}`}
// //             key={item.id}
// //             className={`${styles.productCard} cursor-pointer`}
// //           >
// //             <img src={item.image} height={200} width={300} alt={item.name} className="h-[300px]" />
// //             <h2 className="text-center pt-[10px] text-[18px] font-[500]">
// //               {item.name}
// //             </h2>

// //             <div className="flex justify-between p-[20px]">
// //               <span className="text-green">Rs. {item.price}</span>
// //               <span className="border border-[#e30217] text-[#e30217] px-[10px] cursor-pointer rounded-[6px]">
// //                 View Details
// //               </span>
// //             </div>
// //           </Link>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }


// ProductSection.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './ProductSection.css';

export default function ProductSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <section id="products" className="container mx-auto my-10 px-4">
      <h1 className="text-center text-3xl font-semibold text-[#590109] mb-6">Our Products</h1>
      
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border border-gray-300 rounded-lg w-72"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Link
            to={`/${item._id}`}
            key={item._id}
            className="product-card bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:-translate-y-1 hover:shadow-xl"
          >
            <img src={item.imageUrl} alt={item.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-bold text-center">{item.name}</h2>
              <div className="flex justify-between items-center mt-4">
                <span className="text-green-600 font-semibold">Rs. {item.price}</span>
                <span className="text-[#e30217] px-4 py-1 border border-[#e30217] rounded-lg hover:bg-[#e30217] hover:text-white transition">
                  View Details
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
