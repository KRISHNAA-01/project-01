import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const SignIn = () => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
  
        if (data.success === false) {
          if (data.message.includes('duplicate key')) {
            setError('User with the same username/email already exists');
          } else {
            setError(data.message);
          }
          return;
        }
        setError(null);
        setSuccess(true);
        navigate('/'); // Set success to true if the user is created successfully
      } catch (err) {
        setError('An error occurred while signing up. Please try again.');
      }
    };
  
    
  return (

         <div className='p-3 max-w-lg mx-auto'>
      <h1>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
       
        <input type="email" id="email" placeholder='Email' onChange={handleChange} />
        <input type="password" id="password" placeholder='Password' onChange={handleChange} />
        <button type="submit">Sign In</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <p>Do not have an account?</p>
        <Link to={"/sign-up"}>
          <button>Sign Up</button>
        </Link>
      </div>
</div>
  )
}

export default SignIn;