import React, { useState } from 'react';
import api from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft } from 'lucide-react';

export default function UploadProjectPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");

    // "What": We use FormData instead of a regular JSON object
    // "Why": JSON cannot carry raw file data. FormData mimics a physical form submission
    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Description', description);
    formData.append('ProjectUrl', projectUrl);
    formData.append('Image', image);

    try {
      await api.post('/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' } // Tells Azure to expect a file
      });
      navigate('/projects');
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div className="pt-32 min-h-screen bg-slate-900 px-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6">
          <ArrowLeft size={20} /> Back
        </button>

        <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 space-y-6">
          <h2 className="text-3xl font-bold text-white">Add New Project</h2>
          
          <input type="text" placeholder="Project Title" className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white"
            onChange={e => setTitle(e.target.value)} required />

          <textarea placeholder="Description" rows={4} className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white"
            onChange={e => setDescription(e.target.value)} required />

          <input type="url" placeholder="Project URL (Optional)" className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white"
            onChange={e => setProjectUrl(e.target.value)} />

          <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
            <input type="file" accept="image/*" className="hidden" id="imageUpload"
              onChange={e => setImage(e.target.files ? e.target.files[0] : null)} />
            <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center gap-2 text-slate-400">
              <Upload size={32} />
              <span>{image ? image.name : "Click to upload project screenshot"}</span>
            </label>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all">
            Publish Project
          </button>
        </form>
      </div>
    </div>
  );
}