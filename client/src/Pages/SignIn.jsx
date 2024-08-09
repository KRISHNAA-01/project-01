import React from 'react'

const SignIn = () => {
    const[formData,setFormData]=useState({});
    const[errors,setErrors]=useState({});
    
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        
}

  return (
    <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Sign In</div>
                        <form className='flex flex-col' onSubmit={handleSubmit}>
                            <input type="text"
                            className="block mt-1 w-full"
                            placeholder="Email or username"
                            id="username"
                            onChange={handleChange}
                            />
                            <br/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <h1 className='bg-slate-500 p3 rounded-lg'>jdhsdg</h1>
    </>
  )
}

export default SignIn