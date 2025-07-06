// src/axiosConfig.js
import axios from 'axios';

axios.defaults.baseURL = 'https://isvaryam-backend.onrender.com'; // ✅ Hardcoded always

axios.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default axios;
