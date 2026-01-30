import React, { useState } from 'react';
import api from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', firstName: '', lastName: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed. Check your console.');
    }
  };

  return (
    <div className="pt-32 min-h-screen bg-slate-900 flex justify-center px-6">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-2xl w-full max-w-md border border-slate-700 h-fit">
        <h2 className="text-3xl font-bold text-white mb-6">Create Account</h2>
        <div className="space-y-4">
          <input type="text" placeholder="First Name" className="w-full p-3 rounded bg-slate-900 border border-slate-700 text-white" 
            onChange={e => setFormData({...formData, firstName: e.target.value})} />
          <input type="text" placeholder="Last Name" className="w-full p-3 rounded bg-slate-900 border border-slate-700 text-white" 
            onChange={e => setFormData({...formData, lastName: e.target.value})} />
          <input type="text" placeholder="Username" className="w-full p-3 rounded bg-slate-900 border border-slate-700 text-white" 
            onChange={e => setFormData({...formData, username: e.target.value})} />
          <input type="email" placeholder="Email" className="w-full p-3 rounded bg-slate-900 border border-slate-700 text-white" 
            onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Password" className="w-full p-3 rounded bg-slate-900 border border-slate-700 text-white" 
            onChange={e => setFormData({...formData, password: e.target.value})} />
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}