import axios from 'axios';

// 1. Create the base configuration
const api = axios.create({
  baseURL: 'https://super-secret-project.agreeablepond-bcdf2303.eastus2.azurecontainerapps.io/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Add the Security Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;