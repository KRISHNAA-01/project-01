import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../Components/OAuth';

const SignUp = () => {
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
      const res = await fetch('/api/auth/signup', {
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
      setSuccess(true); // Set success to true if the user is created successfully
    } catch (err) {
      setError('An error occurred while signing up. Please try again.');
    }
  };

  if (success) {
    return (
      <div className='p-3 max-w-lg mx-auto'>
        <h1>User created successfully!</h1>
        <button onClick={() => navigate('/sign-in')}>sign in right away!!</button>
      </div>
    );
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" id="username" placeholder='Username' onChange={handleChange} />
        <input type="email" id="email" placeholder='Email' onChange={handleChange} />
        <input type="password" id="password" placeholder='Password' onChange={handleChange} />
        <button type="submit">Sign up</button>
      <OAuth/> 
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <button>Sign in</button>
        </Link>

      </div>
    </div>
  );
};

export default SignUp;
