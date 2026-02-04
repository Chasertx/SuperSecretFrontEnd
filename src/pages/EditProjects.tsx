import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Upload, Loader2, AlertCircle } from 'lucide-react';
import api from '../api/axiosInstance';

export default function EditProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    ProjectUrl: '',
    LiveDemoURL: ''
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // 1. Fetch existing project data to pre-fill form
  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log("above api");
        const response = await api.get(`/projects/${id}`);
        console.log("below api definition");
        const p = response.data;
        console.log(p);
        setFormData({
          Title: p.title || '',
          Description: p.description || '',
          ProjectUrl: p.projectUrl || '',
          LiveDemoURL: p.liveDemoURL || ''
        });
        setPreviewUrl(p.imageUrl);
      } catch (err) {
        setError('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Local preview
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    // 2. Prepare Multipart Form Data (matches your Postman test)
    const data = new FormData();
    data.append('Title', formData.Title);
    data.append('Description', formData.Description);
    data.append('ProjectUrl', formData.ProjectUrl);
    data.append('LiveDemoURL', formData.LiveDemoURL);
    
    if (imageFile) {
      data.append('Image', imageFile);
    }

    try {
      // 3. The PUT request we verified in Postman
      await api.put(`/projects/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/projects');
    } catch (err: any) {
      setError(err.response?.data || 'Failed to update project.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-500" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 pt-28 pb-12 px-6">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Projects
        </button>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-8">Edit Project</h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3">
              <AlertCircle size={20} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Project Image</label>
              <div className="flex items-center gap-6">
                <div className="w-40 h-24 rounded-lg bg-slate-700 overflow-hidden border border-slate-600">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">No Image</div>
                  )}
                </div>
                <label className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                  <Upload size={18} />
                  Change Image
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
            </div>

            {/* Text Inputs */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={formData.Title}
                  onChange={(e) => setFormData({...formData, Title: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  required
                  rows={4}
                  value={formData.Description}
                  onChange={(e) => setFormData({...formData, Description: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">GitHub URL</label>
                  <input
                    type="url"
                    value={formData.ProjectUrl}
                    onChange={(e) => setFormData({...formData, ProjectUrl: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Live Demo URL</label>
                  <input
                    type="url"
                    value={formData.LiveDemoURL}
                    onChange={(e) => setFormData({...formData, LiveDemoURL: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20"
            >
              {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
              {saving ? 'Saving Changes...' : 'Save Project'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}