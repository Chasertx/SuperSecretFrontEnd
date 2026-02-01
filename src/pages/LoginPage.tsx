import React, { useState } from 'react'; // Remove FormEvent from here
import api from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Use React.FormEvent here instead of just FormEvent
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/users/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/');
      window.location.reload(); 
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <form onSubmit={handleLogin} className="max-w-md w-full bg-slate-800 p-8 rounded-xl border border-slate-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
        <div className="space-y-4">
          <input
            type="email"
            className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:cursor-pointer">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}