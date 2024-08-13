import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { current } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const Header = () => {
  const {currentUser}=useSelector(state=> state.user)
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Furniture Shop</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <Link to='/profile'>
          {currentUser ?(
            <img className='rounded-full h-8 w-8 object-cover' src={currentUser.avatar} alt='user image'></img>
          ):(
            <li>Sign Up</li>
          )}
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
 