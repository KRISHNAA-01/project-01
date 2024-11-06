// import React from "react";

// export default function Hero() {
//   return (
//     <section className="h-[350px] lg:h-[500px] bg-[#590109] flex flex-col justify-center items-center">
//       <h1 className="text-white text-[24px] lg:text-[48px]">Timeless Comfort, Modern Design</h1>
//       <a title="Order" href="#products" className="border border-white px-[20px] py-[10px] rounded-[6px] font-[500] text-[white] text-[14px] lg:text-[18px] mt-[30px] hover:bg-white hover:text-[#590109]">Let's Order</a>
//       {/* <input className="" type="text" placeholder="enter the product name" /> */}

//     </section>
//   );
// }


// Hero.jsx
import React from "react";

export default function Hero() {
  return (
    <section className="h-[60vh] bg-cover bg-center bg-[url('/path/to/your/image.jpg')] flex flex-col justify-center items-center text-center text-white relative">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <h1 className="relative text-3xl md:text-5xl font-bold">Timeless Comfort, Modern Design</h1>
      <a
        title="Order"
        href="#products"
        className="relative mt-6 px-8 py-3 border border-white rounded-lg font-semibold text-white hover:bg-white hover:text-[#590109] transition"
      >
        Let's Order
      </a>
    </section>
  );
}
