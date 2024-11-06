import axios from 'axios';

// Set up a default Axios instance with `withCredentials: true`
const api = axios.create({
    baseURL: '/api', // Update to your actual backend URL
    withCredentials: true, // This ensures cookies are sent in each request
});

export default api;