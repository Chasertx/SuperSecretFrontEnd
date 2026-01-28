import React, { useState } from 'react';
import api from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  // 1. "What": Create the state variables to hold the text
  // 2. "Why": React needs these to 'remember' what you typed
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    // 1. Ensure the keys match exactly what you typed in Postman (e.g., 'email' or 'Email')
    const loginData = {
      username: email, // 'email' is the state variable from your input field
      password: password
    };

    const response = await api.post('/users/login', loginData);

    // 2. Make sure you are saving the user AND the token
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      
      // "What": Since response.data.user is missing, we create a basic object
      // "Why": The Header needs this object to avoid the "undefined" crash
      const userPayload = {
        username: email, // Using the email state from your input
        role: 'Admin'    // Hardcoding for now if you are the only user
      };
      
      localStorage.setItem('user', JSON.stringify(userPayload));
      
      navigate('/projects');
      window.location.reload();
    }
  } catch (err: any) {
    // If it says 'Invalid Credentials', the backend received the request 
    // but the data inside didn't match the DB.
    console.error("Login Error Details:", err.response?.data);
    setError("Invalid email or password.");
  }
};

  return (
    <div className="pt-32 min-h-screen bg-slate-900 flex justify-center px-6">
      <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded-2xl w-full max-w-md border border-slate-700 h-fit">
        <h2 className="text-3xl font-bold text-white mb-6">Welcome Back</h2>
        <div className="space-y-4">
          <input type="text" placeholder="Username" className="w-full p-3 rounded bg-slate-900 border border-slate-700 text-white" 
            onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full p-3 rounded bg-slate-900 border border-slate-700 text-white" 
            onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3 rounded-xl transition-colors">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}