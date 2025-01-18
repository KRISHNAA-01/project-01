// import React,{useContext} from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css';
// import { current } from '@reduxjs/toolkit';
// import { useSelector } from 'react-redux';
// import { CartContext } from '../context/CartContext';
// import CartIcon from '../../assets/Cart';

// const Header = () => {
//   const {currentUser}=useSelector(state=> state.user);
//   // const { count } = useContext(CartContext);

//   return (
//     <header className="header">
//       <div className="logo">
//         <Link to="/">Furniture Shop</Link>
//       </div>
//       <nav>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/about">About</Link></li>
//           <Link to='/profile'>
//           {currentUser ?(
//             <img className='rounded-full h-8 w-8 object-cover' src={currentUser.avatar} alt='user image'></img>
//           ):(
//             <li>Sign Up</li>
//           )}
//           </Link>
//           <Link
//         to="/cart"
//           title="Cart"
//           className="bg-[#e30217] text-white px-[30px] py-[10px] flex gap-[10px] rounded-[6px]"
//         >
//            Cart{/* {count} */}
//           <CartIcon />
//         </Link>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;
 

// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartIcon from '../../assets/Cart';
import './Header.css';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="header sticky top-0 bg-white shadow-lg z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="logo text-2xl font-bold text-[#590109]">
          <Link to="/">Laxmi Furniture</Link>
        </div>
        <nav className="flex items-center gap-8">
          <Link to="/" className="hover:text-[#e30217]">Home</Link>
          {/* <Link to="/about" className="hover:text-[#e30217]">About</Link> */}
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-8 w-8 object-cover border-2 border-[#590109]"
                src={currentUser.avatar}
                alt="User"
              />
            ) : (
              <span className="hover:text-[#e30217]">Sign Up</span>
            )}
          </Link>
          <Link
            to="/orders"
            className="relative bg-[#9e9495] text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            Orders
            
          </Link>
          <Link
            to="/cart"
            className="relative bg-[#e30217] text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            Cart
            <CartIcon />
          </Link>
          <Link to="/feedback">Feedback</Link>


        </nav>
      </div>
    </header>
  );
};

export default Header;
