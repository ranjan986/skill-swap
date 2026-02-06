import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://skill-swap-app.onrender.com';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
