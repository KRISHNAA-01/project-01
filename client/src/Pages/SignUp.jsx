import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" name="" id="username" placeholder='username' />
        <input type="text" name="" id="email" placeholder='email' />
        <input type="text" name="" id="password" placeholder='password' />
        <button>Sign up</button>
      </form>
      <div>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <button>Sign in</button>
        </Link>
      </div>
    </div>
  )
}

export default SignUp