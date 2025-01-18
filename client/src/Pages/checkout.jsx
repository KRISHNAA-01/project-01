import React, { useContext } from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { CartContext } from "../Components/context/CartContext";
import { Link } from "react-router-dom";
import api from "../Components/context/axios";

const Checkout = () => {
  const { cartItem } = useContext(CartContext);

  // Calculate total price and items
  const subtotal = cartItem.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const totalItems = cartItem.reduce((total, item) => total + item.quantity, 0);
  const shipping = 30.0;
  const total = subtotal + shipping;

  // Handle Razorpay checkout
  const handleCheckout = async () => {
    const billingInfo = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      mobile: document.getElementById("mobile").value,
      address: document.getElementById("address").value,
      address2: document.getElementById("address2").value || '',
      country: document.getElementById("country").value,
      state: document.getElementById("state").value,
      zip: document.getElementById("zip").value,
    };

    if (!billingInfo.firstName || !billingInfo.lastName || !billingInfo.email || !billingInfo.mobile || !billingInfo.address || !billingInfo.country || !billingInfo.state || !billingInfo.zip) {
      alert("Please fill out all required billing information.");
      return;
    }

    try {
      const { data } = await api.post('/order/create-payment-order', {
        totalAmount: Number(total),
        billingInfo,
      });

      const { orderId, amount, currency, key } = data;

      const options = {
        key,
        amount,
        currency,
        order_id: orderId,
        handler: async (response) => {
          try {
            await api.post('/order/verify-payment', { ...response, billingInfo, totalAmount: Number(total) });
            alert('Payment successful and verified');
            window.location.reload();
          } catch (error) {
            alert('Payment verification failed');
          }
        },
        prefill: { name: billingInfo.firstName, email: billingInfo.email, contact: billingInfo.mobile },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert('Error in processing payment: ' + error.message);
    }
  };

  const EmptyCart = () => (
    <div className="container text-center py-20">
      <h4 className="text-2xl font-semibold text-gray-700">Your Cart is Empty</h4>

      <Link to="/" className="mt-6 inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg">
        <i className="fa fa-arrow-left"></i> Continue Shopping
      </Link>
      <h4 className="text-2xl font-semibold text-gray-700">Go to your Orders</h4>
      <Link to="/orders" className="mt-6 inline-block text-white bg-[#9e9495] hover:bg-[#234] px-6 py-3 rounded-lg">
        <i className="fa fa-arrow-left"></i> Orders
      </Link>
      
    </div>
  );

  const ShowCheckout = () => (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 my-10">
      <h2 className="text-center text-4xl font-bold text-gray-800">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
        
        <div className="md:col-span-2">
          <div className="p-6 border rounded-lg">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4">Billing Address</h4>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" id="firstName" placeholder="First name" className="form-input w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                <input type="text" id="lastName" placeholder="Last name" className="form-input w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <input type="email" id="email" placeholder="Email" className="form-input w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              <input type="text" id="mobile" placeholder="Mobile Number" className="form-input w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              <input type="text" id="address" placeholder="Address" className="form-input w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              <input type="text" id="address2" placeholder="Address 2 (Optional)" className="form-input w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select id="country" className="form-select w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  <option value="">Choose Country</option>
                  <option>India</option>
                </select>
                <select id="state" className="form-select w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  <option value="">Choose State</option>
                  <option>Maharashtra</option>
                </select>
                {/* <input type="text" id="zip" placeholder="Zip Code" className="form-input w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required /> */}
                <select id ='zip' className="form-select w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                <option value="">choose zip code</option>

                <option value="444101">444101</option>
                <option value="444203">444203</option>
                <option value="444001">444001</option>

                </select>
              </div>
            </form>
          </div>
        </div>

        <div>
          <div className="p-6 border rounded-lg">
            <h5 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h5>
            <ul className="space-y-2 text-gray-700">
              <li className="flex justify-between">
                <span>Products ({totalItems})</span>
                <span>₹ {Math.round(subtotal)}</span>
              </li>
              <li className="flex justify-between">
                <span>Shipping</span>
                <span>₹ {shipping}</span>
              </li>
              <li className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span>₹ {Math.round(total)}</span>
              </li>
            </ul>
            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-lg transition duration-300"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="container my-10 px-4">
        {cartItem.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;




// import React, { useContext, useState } from "react";
// import Header from "../Components/Header/Header";
// import Footer from "../Components/Footer/Footer";
// import { CartContext } from "../Components/context/CartContext";
// import { Link } from "react-router-dom";
// import api from "../Components/context/axios";

// const Checkout = () => {
//   const { cartItem } = useContext(CartContext);
//   const [zipCode, setZipCode] = useState("");
//   const [isZipValid, setIsZipValid] = useState(false);
//   const [shippingCost, setShippingCost] = useState(30);
//   const [isProceedEnabled, setIsProceedEnabled] = useState(false);

//   // Calculate total price and items
//   const subtotal = cartItem.reduce((total, item) => total + item.product.price * item.quantity, 0);
//   const totalItems = cartItem.reduce((total, item) => total + item.quantity, 0);
//   const total = subtotal + shippingCost;

//   // Handle Razorpay checkout
//   const handleCheckout = async () => {
//     const billingInfo = {
//       firstName: document.getElementById("firstName").value,
//       lastName: document.getElementById("lastName").value,
//       email: document.getElementById("email").value,
//       mobile: document.getElementById("mobile").value,
//       address: document.getElementById("address").value,
//       address2: document.getElementById("address2").value || '',
//       country: document.getElementById("country").value,
//       state: document.getElementById("state").value,
//       zip: document.getElementById("zip").value,
//     };

//     if (!billingInfo.firstName || !billingInfo.lastName || !billingInfo.email || !billingInfo.mobile || !billingInfo.address || !billingInfo.country || !billingInfo.state || !billingInfo.zip) {
//       alert("Please fill out all required billing information.");
//       return;
//     }

//     try {
//       const { data } = await api.post('/order/create-payment-order', {
//         totalAmount: Number(total),
//         billingInfo,
//       });

//       const { orderId, amount, currency, key } = data;

//       const options = {
//         key,
//         amount,
//         currency,
//         order_id: orderId,
//         handler: async (response) => {
//           try {
//             await api.post('/order/verify-payment', { ...response, billingInfo, totalAmount: Number(total) });
//             alert('Payment successful and verified');
//             window.location.reload();
//           } catch (error) {
//             alert('Payment verification failed');
//           }
//         },
//         prefill: { name: billingInfo.firstName, email: billingInfo.email, contact: billingInfo.mobile },
//       };
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       alert('Error in processing payment: ' + error.message);
//     }
//   };

//   const checkZipCode = () => {
//     const validZipCodes = {
//       "444203": { freeShippingThreshold: 3000, defaultShippingCost: 30 },
//       "444101": { shippingCost: 80 },
//       "444001": { shippingCost: 80 }
//     };
  
//     if (validZipCodes[zipCode]) {
//       setIsZipValid(true);
//       if (zipCode === "444203" && subtotal > 3000) {
//         setShippingCost(0); // Free shipping for 444203 if order value is above 3000
//       } else {
//         setShippingCost(validZipCodes[zipCode].shippingCost || validZipCodes[zipCode].defaultShippingCost || 30);
//       }
//       setIsProceedEnabled(true);
//     } else {
//       setIsZipValid(false);
//       setShippingCost(0);
//       setIsProceedEnabled(false);
//       alert("Sorry, we do not deliver to this zip code.");
//     }
//   };
//   const handleInputChange = (e) => {
//     const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
//     if (value.length <= 6) {
//       setZipCode(value); // Update state only if length is <= 6
//     }
//   };
  
  

//   const EmptyCart = () => (
//     <div className="container text-center py-20">
//       <h4 className="text-2xl font-semibold text-gray-700">Your Cart is Empty</h4>

//       <Link to="/" className="mt-6 inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg">
//         <i className="fa fa-arrow-left"></i> Continue Shopping
//       </Link>
//       <h4 className="text-2xl font-semibold text-gray-700">Go to your Orders</h4>
//       <Link to="/orders" className="mt-6 inline-block text-white bg-[#9e9495] hover:bg-[#234] px-6 py-3 rounded-lg">
//         <i className="fa fa-arrow-left"></i> Orders
//       </Link>
//     </div>
//   );

//   const ShowCheckout = () => (
//     <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 my-10">
//       <h2 className="text-center text-4xl font-bold text-gray-800">Checkout</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
//         <div className="md:col-span-2">
//           <div className="p-6 border rounded-lg">
//             <h4 className="text-2xl font-semibold text-gray-800 mb-4">Billing Address</h4>
//             <form className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <input type="text" id="firstName" placeholder="First name" className="form-input w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
//                 <input type="text" id="lastName" placeholder="Last name" className="form-input w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
//               </div>
//               <input type="email" id="email" placeholder="Email" className="form-input w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
//               <input type="text" id="mobile" placeholder="Mobile Number" className="form-input w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
//               <input type="text" id="address" placeholder="Address" className="form-input w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
//               <input type="text" id="address2" placeholder="Address 2 (Optional)" className="form-input w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <select id="country" className="form-select w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
//                   <option value="">Choose Country</option>
//                   <option>India</option>
//                 </select>
//                 <select id="state" className="form-select w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
//                   <option value="">Choose State</option>
//                   <option>Maharashtra</option>
//                 </select>
//                 <input
//                   type="text"
//                   id="zip"
//                   placeholder="Zip Code"
//                   className="form-input w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={zipCode}
//                   // onInput={(e) => setZipCode(e.target.value)}
//                   //  onInput={handleInputChange}
//                   maxLength={6}
//                   required
//                 />
//               </div>
//             </form>
//             {/* <button
//               onClick={checkZipCode}
//               className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
//             >
//               Check if Zip Code is Deliverable
//             </button> */}
//           </div>
//         </div>

//         <div>
//           <div className="p-6 border rounded-lg">
//             <h5 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h5>
//             <ul className="space-y-2 text-gray-700">
//               <li className="flex justify-between">
//                 <span>Products ({totalItems})</span>
//                 <span>₹ {Math.round(subtotal)}</span>
//               </li>
//               <li className="flex justify-between">
//                 <span>Shipping</span>
//                 <span>₹ {shippingCost}</span>
//               </li>
//               <li className="flex justify-between font-bold text-lg">
//                 <span>Total Amount</span>
//                 <span>₹ {Math.round(total)}</span>
//               </li>
//             </ul>
//             <button
//               onClick={handleCheckout}
//               disabled={!isProceedEnabled}
//               className={`w-full mt-6 ${isProceedEnabled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} text-white text-lg font-semibold py-3 rounded-lg transition duration-300`}
//             >
//               Proceed to Pay
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <Header />
//       <div className="container my-10 px-4">
//         {cartItem.length ? <ShowCheckout /> : <EmptyCart />}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Checkout;
