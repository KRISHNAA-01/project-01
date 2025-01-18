import axios from 'axios';

// Set up a default Axios instance with `withCredentials: true`
// const api = axios.create({
//     baseURL: '/api', // Update to your actual backend URL
//     withCredentials: true, // This ensures cookies are sent in each request
// });
// After: Update for production
const api = axios.create({
    baseURL: 'https://project-01-1-vhio.onrender.com/api', // Replace with your deployed backend URL
    withCredentials:true,
});
export default api;
