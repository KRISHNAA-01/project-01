
// import React from "react";
// import "../Hero.css"; // Import the updated CSS for background

// export default function Hero() {
//   return (
//     <section className="hero-section flex flex-col justify-center items-center">
//       <h1 className="shop-name text-white text-[24px] lg:text-[48px]">
//         Furniweb
//       </h1>
//       <p className="tagline text-white text-[16px] lg:text-[24px] mt-[10px]">
//         Bringing Style and Comfort to Your Home
//       </p>
//       <a
//         title="Order"
//         href="#products"
//         className="order-button border border-white px-[20px] py-[10px] rounded-[6px] font-[500] text-white text-[14px] lg:text-[18px] mt-[30px] hover:bg-white hover:text-[#590109]"
//       >
//         Let's Order
//       </a>
//     </section>
//   );
// }
import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section flex flex-col justify-center items-center text-center text-white relative">
      <h1 className="shop-name text-4xl md:text-6xl font-bold relative z-10">
        Furniweb
      </h1>
      <p className="tagline text-lg md:text-2xl mt-4 relative z-10">
        Bringing Style and Comfort to Your Home
      </p>
      <a
        title="Order"
        href="#products"
        className="order-button border border-white px-6 py-3 rounded-lg font-semibold text-white hover:bg-white hover:text-[#590109] transition-colors duration-300 mt-8 relative z-10"
      >
        Let's Order
      </a>
    </section>
  );
}
