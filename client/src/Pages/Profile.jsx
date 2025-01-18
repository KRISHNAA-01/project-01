
import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from '../redux/user/userSlice';
import api from '../Components/context/axios';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    const autoSignOutTimer = setTimeout(async () => {
      try {
        // Dispatch signOutUserStart to indicate the process is beginning
        dispatch(signOutUserStart());

        // Call the backend for auto sign-out logic (like the manual sign-out function)
        const res = await fetch('/api/auth/signout');
        const data = await res.json();

        // Check if the response indicates a failure
        if (data.success === false) {
          dispatch(signOutUserFailure(data.message));
          return;
        }

        // Dispatch signOutUserSuccess if everything went well
        dispatch(signOutUserSuccess());

        // Optionally, you can show a message or log out the user from the frontend
        alert('You have been automatically signed out due to inactivity.');
      } catch (error) {
        // Dispatch signOutUserFailure if there's an error during the auto sign-out process
        dispatch(signOutUserFailure(error.message || 'Failed to sign out'));
      }
    }, 3600000); // Auto sign-out after 1 hour (3600000 milliseconds)

    // Cleanup function to clear the timeout if the component is unmounted
    return () => clearTimeout(autoSignOutTimer);
  }, [dispatch]);

  // Function to verify password
  const verifyPassword = async (password) => {
    try {
      const res = await fetch('/api/user/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentUser.email, password }),
      });
      const data = await res.json();
      return data.success; // returns true if the password is correct, otherwise false
    } catch (error) {
      console.error('Error verifying password:', error);
      return false;
    }
  };

  // Function to handle update after password verification
  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredPassword = prompt('Please re-enter your password to update your profile:');
    if (!enteredPassword) return; // Cancel if no password provided

    const isPasswordValid = await verifyPassword(enteredPassword);
    if (!isPasswordValid) {
      alert('Password verification failed. Please try again.');
      return;
    }

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  // Function to handle account deletion after password verification
  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm(
      "Do you really want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      const enteredPassword = prompt('Please enter your password to confirm:');
      if (!enteredPassword) return; // Cancel if no password provided

      const isPasswordValid = await verifyPassword(enteredPassword);
      if (!isPasswordValid) {
        alert('Password verification failed. Please try again.');
        return;
      }

      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
        navigate('/signup'); // Redirect after account deletion
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
    }
  };
  const handleSignOut = async () => {
    const confirmation = window.confirm("Are you sure you want to sign out?");
    if (confirmation) {
      try {
        dispatch(signOutUserStart());
        const res = await api.get('/auth/signout'); // Use `api` for consistent environment handling

        // const res = await fetch('/api/auth/signout');
        const data = await res.data;
        // const data = await res.json();
        if (data.success === false) {
          dispatch(signOutUserFailure(data.message));
          return;
        }
        dispatch(signOutUserSuccess(data));
      } catch (error) {
        dispatch(signOutUserFailure(error.message));
      }
    }
  };
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type='text'
          placeholder='username'
          defaultValue={currentUser.username}
          id='username'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          onChange={handleChange}
          id='password'
          className='border p-3 rounded-lg'
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        {currentUser.isAdmin && (
          <Link to="/admin-dashboard">
            <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95">
              Admin Dashboard
            </button>
          </Link>
        )}
      </form>
      <div className='flex justify-between mt-5'>
        {!currentUser.isAdmin && (
          <span
            onClick={handleDeleteUser}
            className='text-red-700 cursor-pointer'
          >
            Delete account
          </span>
        )}
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
    </div>
  );
}
