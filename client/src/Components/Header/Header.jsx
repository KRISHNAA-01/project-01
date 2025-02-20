// // 

// // Header.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import CartIcon from '../../assets/Cart';
// import './Header.css';

// const Header = () => {
//   const { currentUser } = useSelector((state) => state.user);

//   return (
//     <header className="header sticky top-0 bg-white shadow-lg z-10">
//       <div className="container mx-auto flex items-center justify-between p-4">
//         <div className="logo text-2xl font-bold text-[#590109]">
//           <Link to="/">Laxmi Furniture</Link>
//         </div>
//         <nav className="flex items-center gap-8">
//           <Link to="/" className="hover:text-[#e30217]">Home</Link>
//           {/* <Link to="/about" className="hover:text-[#e30217]">About</Link> */}
//           <Link to="/profile">
//             {currentUser ? (
//               <img
//                 className="rounded-full h-8 w-8 object-cover border-2 border-[#590109]"
//                 src={currentUser.avatar}
//                 alt="User"
//               />
//             ) : (
//               <span className="hover:text-[#e30217]">Sign Up</span>
//             )}
//           </Link>
//           <Link
//             to="/orders"
//             className="relative bg-[#9e9495] text-white px-4 py-2 rounded-md flex items-center gap-2"
//           >
//             Orders
            
//           </Link>
//           <Link
//             to="/cart"
//             className="relative bg-[#e30217] text-white px-4 py-2 rounded-md flex items-center gap-2"
//           >
//             Cart
//             <CartIcon />
//           </Link>
//           <Link to="/feedback">Feedback</Link>


//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartIcon from '../../assets/Cart';
import './Header.css';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className={`header ${isHomePage ? 'home-header' : 'static-header'} fixed top-0 w-full z-10`}>
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="logo text-2xl font-bold text-white">
          <Link to="/">Laxmi Furniture</Link>
        </div>
        <nav className="flex items-center gap-4 md:gap-8">
          <Link to="/" className="text-white hover:text-[#e30217] transition-colors duration-300">Home</Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-8 w-8 object-cover border-2 border-white"
                src={currentUser.avatar}
                alt="User"
              />
            ) : (
              <span className="text-white hover:text-[#e30217] transition-colors duration-300">Sign Up</span>
            )}
          </Link>
          <Link
            to="/orders"
            className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-opacity-40 transition-colors duration-300"
          >
            Orders
          </Link>
          <Link
            to="/cart"
            className="bg-[#e30217] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#c40215] transition-colors duration-300"
          >
            Cart
            <CartIcon />
          </Link>
          <Link to="/feedback" className="text-white hover:text-[#e30217] transition-colors duration-300">Feedback</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
