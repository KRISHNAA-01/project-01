
// // Hero.jsx
// import React from "react";
// import "./Hero.css"

// export default function Hero() {
//   return (
//     <section className="h-[60vh] bg-cover bg-center bg-[url('/path/to/your/image.jpg')] flex flex-col justify-center items-center text-center text-white relative">
//       <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//       <h1 className="relative text-3xl md:text-5xl font-bold">Timeless Comfort, Modern Design</h1>
//       <a
//         title="Order"
//         href="#products"
//         className="relative mt-6 px-8 py-3 border border-white rounded-lg font-semibold text-white hover:bg-white hover:text-[#590109] transition"
//       >
//         Let's Order
//       </a>
//     </section>
//   );
// }
import React from "react";
import "../Hero.css"; // Import the updated CSS for background

export default function Hero() {
  return (
    <section className="hero-section flex flex-col justify-center items-center">
      <h1 className="shop-name text-white text-[24px] lg:text-[48px]">
        Furniweb
      </h1>
      <p className="tagline text-white text-[16px] lg:text-[24px] mt-[10px]">
        Bringing Style and Comfort to Your Home
      </p>
      <a
        title="Order"
        href="#products"
        className="order-button border border-white px-[20px] py-[10px] rounded-[6px] font-[500] text-white text-[14px] lg:text-[18px] mt-[30px] hover:bg-white hover:text-[#590109]"
      >
        Let's Order
      </a>
    </section>
  );
}
