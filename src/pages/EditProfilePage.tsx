import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { User, FileText, Save, ArrowLeft } from 'lucide-react';
import type { User as UserType } from '../types';

export default function EditProfilePage() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '' });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const navigate = useNavigate();

  // Load existing user data on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user: UserType = JSON.parse(savedUser);
      setFormData({ firstName: user.firstName, lastName: user.lastName });
    }
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // We use FormData to support the PDF upload
    const data = new FormData();
    data.append('FirstName', formData.firstName);
    data.append('LastName', formData.lastName);
    if (resumeFile) data.append('Resume', resumeFile);

    try {
      // Sending to your update endpoint (e.g., /api/user/update)
      const response = await api.put('/user/update', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Update local storage so the Header reflects changes immediately
      localStorage.setItem('user', JSON.stringify(response.data));
      alert("Profile updated successfully!");
      navigate('/');
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="pt-32 min-h-screen bg-slate-900 px-6 flex justify-center">
      <div className="w-full max-w-xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6">
          <ArrowLeft size={20} /> Back
        </button>

        <form onSubmit={handleUpdate} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-600/20 rounded-lg text-blue-400">
              <User size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white">Edit Profile</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input type="text" value={formData.firstName} placeholder="First Name" 
              className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-white"
              onChange={e => setFormData({...formData, firstName: e.target.value})} />
            <input type="text" value={formData.lastName} placeholder="Last Name" 
              className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-white"
              onChange={e => setFormData({...formData, lastName: e.target.value})} />
          </div>

          <div className="space-y-2">
            <label className="text-slate-400 text-sm ml-1">Update Resume (PDF)</label>
            <div className="relative border-2 border-dashed border-slate-700 rounded-xl p-6 hover:border-emerald-500 transition-colors">
              <input type="file" accept=".pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={e => setResumeFile(e.target.files ? e.target.files[0] : null)} />
              <div className="flex items-center justify-center gap-3 text-slate-400">
                <FileText size={20} />
                <span>{resumeFile ? resumeFile.name : "Choose PDF file"}</span>
              </div>
            </div>
          </div>

          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-4 rounded-xl transition-all">
            <Save size={20} />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}