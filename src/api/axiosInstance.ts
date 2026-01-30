import axios from 'axios';

const api = axios.create({
  // Use the env var, but fallback to your ACTUAL backend URL string
  baseURL: import.meta.env.VITE_API_URL || 'https://super-secret-project.agreeablepond-bcdf2303.eastus2.azurecontainerapps.io/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to attach the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;