import axios from 'axios';

// Set up a default Axios instance with `withCredentials: true`
// const api = axios.create({
//     baseURL: '/api', // Update to your actual backend URL
//     withCredentials: true, // This ensures cookies are sent in each request
// });
// After: Update for production
const api = axios.create({
    baseURL: import.meta.env.PROD
      ? 'https://project-01-1-vhio.onrender.com/api' // Production backend URL
      : '/api', // Development URL (proxy in vite.config.js)
    withCredentials: true, // Ensures cookies are sent in each request
  });
export default api;
