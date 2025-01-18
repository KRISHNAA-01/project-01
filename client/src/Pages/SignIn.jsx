import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { signInStart,signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../Components/OAuth';
import { CartContext } from '../Components/context/CartContext';
const SignIn = () => {
    const [formData, setFormData] = useState({});
    // const [error, setError] = useState(null);
    const {loading ,error}=useSelector((state)=> state.user);
    const dispatch = useDispatch();
    // const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const {fetchCartItems} =useContext(CartContext);
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        dispatch(signInStart());
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        
  
        if (data.success === false) {
          dispatch(signInFailure(data.message));
          return;
        }
        dispatch(signInSuccess(data));
        await fetchCartItems();
       
        // navigate("/", { replace: true });
        if (data.isAdmin) {
          navigate('/admin-dashboard', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } catch (err) {
        dispatch(signInFailure(err.message))
        // setError('An error occurred while signing up. Please try again.');
      }
    };
  
    
  return (<>
    <div className="text-center mt-7">
        <Link
          to="/"
          className="text-blue-700 text-lg font-semibold underline hover:text-blue-900 transition"
        >
          ← Return to Home
        </Link>
      </div>
    <div className='p-3 max-w-lg mx-auto'>
    

    <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
        type='email'
        placeholder='email'
        className='border p-3 rounded-lg'
        id='email'
        onChange={handleChange}
      />
      <input
        type='password'
        placeholder='password'
        className='border p-3 rounded-lg'
        id='password'
        onChange={handleChange}
      />

      <button
        disabled={loading}
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
      >
        {loading ? 'Loading...' : 'Sign In'}
      </button>
      <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  </>
  )
}

export default SignIn;