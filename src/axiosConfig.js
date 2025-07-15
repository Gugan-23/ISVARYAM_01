// src/axiosConfig.js
import axios from 'axios';

// Use the correct backend URL
const instance = axios.create({
  baseURL: 'https://isvaryam-backend.onrender.com',
  withCredentials: true, // Important for cookies/sessions
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
instance.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor
instance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response?.status === 401) {
    // Handle unauthorized access
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default instance;
