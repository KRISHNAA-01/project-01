// "use client";
// import { useContext, useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import Header from "../../Components/Header/Header.jsx";
// import { CartContext } from "../../Components/context/CartContext.jsx";
// import { useSelector } from "react-redux";

// export default function Page() {
//   const { id } = useParams(); // Get the id from the route params
//   const [productDetails, setProductDetails] = useState(null);
//   const [productAdded, setProductAdded] = useState(false);
//   const [error, setError] = useState(""); // To handle potential errors
//   const [showSignInModal, setShowSignInModal] = useState(false);
//   const { currentUser } = useSelector((state) => state.user);
//   const {
//     count,
//     setCount,
//     addItemToCart,
//   } = useContext(CartContext);

//   useEffect(() => {
//     // Fetch product details from the database
//     const fetchProductDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/api/item/${id}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch product details");
//         }
//         const data = await response.json();
//         setProductDetails(data);
//       } catch (err) {
//         setError(err.message);
//         console.error("Error fetching product details:", err);
//       }
//     };

//     fetchProductDetails();
//   }, [id]);

//   const handleAddToCart = () => {
//     if (productDetails) {
//       setCount(count + 1);
//       addItemToCart(productDetails);
//       setProductAdded(true);
//     }
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!productDetails) {
//     return <div>Loading product details...</div>; // Loading state
//   }

//   return (
//     <>
//       <Header />
//       <div className="itemsDetailCard">
//         <h1 className="text-center font-[600] text-[30px]">
//           {productDetails?.name}
//         </h1>
//         <div className="p-[60px] flex justify-center flex-wrap gap-[60px] items-center">
//           <img
//             src={productDetails?.imageUrl} // Assuming the field name in MongoDB is 'imageUrl'
//             width={400}
//             height={400}
//             className="rounded-[6px]"
//             alt={productDetails?.name}
//           />
//           <div className="xl:w-[40%]">
//             <p className="text-[18px]">{productDetails?.description}</p>
//             <div className="flex justify-between pt-[50px]">
//               <span className="text-[18px] font-[500]">
//                 Rs. {productDetails?.price}
//               </span>
//               <div>
//                 <span
//                   className="border border-[#e30217] text-[#e30217] px-[10px] cursor-pointer rounded-[6px]"
//                   onClick={handleAddToCart}
//                 >
//                   Add
//                 </span>
//               </div>
//             </div>
//             {productAdded && (
//               <div className="pt-[20px]">
//                 <h2>Product added to cart!</h2>
//                 <Link
//                   to="/cart"
//                   className="border border-[#e30217] text-[#e30217] px-[10px] cursor-pointer rounded-[6px]"
//                 >
//                   Go to Cart
//                 </Link>
//               </div>
//             )}
//             <div className="pt-[20px] gap-[20px] flex justify-end">
//               <Link
//                 to="/#products"
//                 className="border border-[#e30217] text-[#e30217] px-[10px] cursor-pointer rounded-[6px]"
//               >
//                 Add More Products
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }




"use client";
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../Components/Header/Header.jsx";
import { CartContext } from "../../Components/context/CartContext.jsx";
import { useSelector } from "react-redux";
import SignInPromptModal from "../../Components/SignInPromptModal.jsx";
//  import SignInPromptModal from "../../components/SignInPromptModal";
import "./page.css"

export default function Page() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [productAdded, setProductAdded] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { count, setCount, addItemToCart } = useContext(CartContext);
  const [showSignInModal, setShowSignInModal] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/item/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProductDetails(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching product details:", err);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (!currentUser) {
      setShowSignInModal(true);
    } else if (productDetails) {
      setCount(count + 1);
      addItemToCart(productDetails);
      setProductAdded(true);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!productDetails) {
    return  <div className="loading-container">
    <span className="loading-text">Loading product details...</span>
  </div>;
  }

  return (
    <>
      <Header />
      <div className="itemsDetailCard">
        <h1 className="text-center font-[600] text-[30px]">
          {productDetails?.name}
        </h1>
        <div className="p-[60px] flex justify-center flex-wrap gap-[60px] items-center">
          <img
            src={productDetails?.imageUrl}
            width={400}
            height={400}
            className="rounded-[6px]"
            alt={productDetails?.name}
          />
          <div className="xl:w-[40%]">
            <p className="text-[18px]">{productDetails?.description}</p>
            <div className="flex justify-between pt-[50px]">
              <span className="text-[18px] font-[500]">
                Rs. {productDetails?.price}
              </span>
              <div>
                <span
                  className="border border-[#e30217] text-[#e30217] px-[10px] cursor-pointer rounded-[6px]"
                  onClick={handleAddToCart}
                >
                  Add
                </span>
              </div>
            </div>
            {productAdded && (
              <div className="pt-[20px]">
                <h2>Product added to cart!</h2>
                <Link
                  to="/cart"
                  className="border border-[#e30217] text-[#e30217] px-[10px] cursor-pointer rounded-[6px]"
                >
                  Go to Cart
                </Link>
              </div>
            )}
            <div className="pt-[20px] gap-[20px] flex justify-end">
              <Link
                to="/#products"
                className="border border-[#e30217] text-[#e30217] px-[10px] cursor-pointer rounded-[6px]"
              >
                Add More Products
              </Link>
            </div>
          </div>
        </div>
      </div>
      {showSignInModal && (
        <SignInPromptModal onClose={() => setShowSignInModal(false)} />
      )}
    </>
  );
}
