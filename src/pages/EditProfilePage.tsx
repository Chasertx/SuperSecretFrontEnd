import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Added useSearchParams
import axios from 'axios'; 
import { 
  Save, Plus, X, ArrowLeft, Loader2, Upload, 
  FileCheck, Image as ImageIcon, Github, 
  Linkedin, Instagram, Crown, Globe, Briefcase, ExternalLink
} from 'lucide-react';
import api from '../api/axiosInstance';
import { toast } from 'react-hot-toast';

export default function EditPortfolioPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editProjectId = searchParams.get('edit'); // Check if we are editing a specific project
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  // Form state initialized to handle both Profile and Project fields
  const [formData, setFormData] = useState({
    // Profile Fields
    firstName: '',
    lastName: '',
    title: '',
    bio: '',
    tagline1: '',
    tagline2: '',
    yearsOfExperience: 0,
    instagramLink: '',
    gitHubLink: '',
    linkedinLink: '',
    profileImageUrl: '',
    resumeUrl: '',
    frontendSkills: [] as string[],
    backendSkills: [] as string[],
    databaseSkills: [] as string[],
    // Project Specific Fields (for when editProjectId exists)
    projectUrl: '',
    liveDemoURL: ''
  });
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
      try {
        if (editProjectId) {
          const response = await api.get(`/projects/storage/${editProjectId}`);
          console.log(response);
          // Handle case where API returns an array [project] instead of an object {project}
          const p = Array.isArray(response.data) ? response.data[0] : response.data;

          if (!p) {
            toast.error("Project not found");
            return;
          }

          setFormData(prev => ({
            ...prev,
            title: p.title || '',
            bio: p.description || '', 
            profileImageUrl: p.imageUrl || '', 
            projectUrl: p.projectUrl || '',
            liveDemoURL: p.liveDemoURL || ''
          }));
        } else {
          const response = await api.get('/users/profile/king');
          setFormData(response.data);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [editProjectId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
        ...prev, 
        [name]: name === 'yearsOfExperience' ? parseInt(value) || 0 : value 
    }));
  };

  const addSkill = (category: 'frontendSkills' | 'backendSkills' | 'databaseSkills', value: string) => {
    if (!value.trim()) return;
    setFormData(prev => ({
      ...prev,
      [category]: [...prev[category], value.trim()]
    }));
  };

  const removeSkill = (category: 'frontendSkills' | 'backendSkills' | 'databaseSkills', index: number) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'resume') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file); 
    data.append('bucketName', type === 'image' ? 'portfolioPhoto' : 'resumes');

    type === 'image' ? setUploadingImage(true) : setUploadingResume(true);

    try {
      const response = await axios.post(`${api.defaults.baseURL}/users/king/upload-asset`, data);
      const uploadedUrl = response.data.url;
      setFormData(prev => ({
        ...prev,
        [type === 'image' ? 'profileImageUrl' : 'resumeUrl']: uploadedUrl
      }));
      toast.success("Upload successful!");
    } catch (err: any) {
      toast.error("Upload failed");
    } finally {
      type === 'image' ? setUploadingImage(false) : setUploadingResume(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editProjectId) {
        // Prepare data for the Project PUT endpoint
        const projectData = new FormData();
        projectData.append('Title', formData.title);
        projectData.append('Description', formData.bio);
        projectData.append('ProjectUrl', formData.projectUrl);
        projectData.append('LiveDemoURL', formData.liveDemoURL);
        // Note: Image upload in this specific page is currently handling 
        // URL strings via the asset-upload endpoint.
        
        await api.put(`/projects/${editProjectId}`, projectData);
        toast.success("Project Updated!");
      } else {
        // Standard Profile Update
        await api.put('/users/update-profile', formData);
        toast.success("Portfolio Identity Published!");
      }
      navigate('/projects');
    } catch (err) {
      toast.error("Save failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
      <p className="text-slate-400 font-bold animate-pulse uppercase tracking-[0.2em]">
        {editProjectId ? 'Fetching Project Details...' : 'Recalling King Data...'}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center mb-12">
          <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-slate-500 hover:text-white transition-colors">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            Back
          </button>
          <div className="flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
            <Crown size={16} className="text-amber-500" />
            <span className="text-xs font-black text-amber-500 uppercase tracking-widest">
              {editProjectId ? 'Project Editor' : 'King Mode'}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          <section className="space-y-6 bg-slate-900/40 p-8 rounded-3xl border border-slate-800/60 shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-500/20 rounded-lg"><Globe size={20} className="text-emerald-500" /></div>
              <h2 className="text-xl font-bold text-white">
                {editProjectId ? 'Project Details' : 'Core Identity'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {!editProjectId && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">First Name</label>
                    <input name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:border-emerald-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Last Name</label>
                    <input name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:border-emerald-500 outline-none transition-all" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  {editProjectId ? 'Project Title' : 'Headline Title'}
                </label>
                <input name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:border-emerald-500 outline-none transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  {editProjectId ? 'Project Description' : 'Bio / Mission Statement'}
                </label>
                <textarea name="bio" rows={4} value={formData.bio} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:border-emerald-500 outline-none transition-all resize-none" />
              </div>

              {editProjectId && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">GitHub Repo URL</label>
                    <div className="relative">
                      <Github className="absolute left-3 top-3.5 text-slate-500" size={18} />
                      <input name="projectUrl" value={formData.projectUrl} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-10 focus:border-blue-500 outline-none" placeholder="https://github.com/..." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live Demo URL</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3.5 text-slate-500" size={18} />
                      <input name="liveDemoURL" value={formData.liveDemoURL} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-10 focus:border-blue-500 outline-none" placeholder="https://demo.com/..." />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Technical Ecosystem Section - Only show for profile edit */}
          {!editProjectId && (
             <section className="space-y-8 bg-slate-900/40 p-8 rounded-3xl border border-slate-800/60 shadow-xl">
               <div className="flex items-center gap-3 mb-2">
                 <div className="p-2 bg-blue-500/20 rounded-lg"><Briefcase size={20} className="text-blue-500" /></div>
                 <h2 className="text-xl font-bold text-white">Technical Ecosystem</h2>
               </div>
               {(['frontendSkills', 'backendSkills', 'databaseSkills'] as const).map((category) => (
                 <div key={category} className="space-y-4">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{category.replace('Skills', ' Skills')}</label>
                   <div className="flex flex-wrap gap-2 p-4 bg-slate-950/50 border border-slate-800 rounded-2xl min-h-[60px]">
                     {formData[category].map((skill, index) => (
                       <span key={index} className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-700 text-blue-400 rounded-lg text-xs font-bold transition-all hover:border-blue-500">
                         {skill}
                         <button type="button" onClick={() => removeSkill(category, index)} className="text-slate-500 hover:text-red-400"><X size={14}/></button>
                       </span>
                     ))}
                     <input type="text" placeholder="Add skill..." className="flex-1 bg-transparent border-none text-sm outline-none text-slate-300" 
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(category, e.currentTarget.value); e.currentTarget.value = ''; } }} />
                   </div>
                 </div>
               ))}
             </section>
          )}

          <section className="bg-slate-900/40 p-8 rounded-3xl border border-emerald-500/20 shadow-xl space-y-8">
            <h2 className="text-xl font-bold text-white mb-2">{editProjectId ? 'Project Media' : 'Media & Documents'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{editProjectId ? 'Project Thumbnail' : 'Display Avatar'}</label>
                <div className="flex items-center gap-6">
                  <div className={`relative group ${editProjectId ? 'w-40 h-24' : 'w-24 h-24'} rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl`}>
                    {formData.profileImageUrl ? (
                      <img src={formData.profileImageUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-700"><ImageIcon size={40} /></div>
                    )}
                    {uploadingImage && <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center"><Loader2 className="animate-spin text-emerald-500" /></div>}
                  </div>
                  <div className="space-y-2">
                    <input type="file" hidden ref={fileInputRef} onChange={(e) => handleFileUpload(e, 'image')} accept="image/*" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold text-sm flex items-center gap-2 transition-all">
                      <Upload size={16}/> {formData.profileImageUrl ? 'Change' : 'Upload'}
                    </button>
                  </div>
                </div>
              </div>

              {!editProjectId && (
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Master Resume (PDF)</label>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className={`p-3 rounded-xl ${formData.resumeUrl ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-500'}`}><FileCheck size={24} /></div>
                      <p className="text-xs font-bold text-slate-300 truncate">{formData.resumeUrl ? "Current_Resume.pdf" : "No file"}</p>
                    </div>
                    <input type="file" hidden ref={resumeInputRef} onChange={(e) => handleFileUpload(e, 'resume')} accept=".pdf" />
                    <button type="button" onClick={() => resumeInputRef.current?.click()} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-slate-700">
                      {uploadingResume ? <Loader2 className="animate-spin" size={18}/> : <Upload size={18}/>} Replace Resume
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="pt-6 border-t border-slate-800 flex justify-end gap-4">
             <button type="button" onClick={() => navigate(-1)} className="px-8 py-4 rounded-2xl font-bold text-slate-400 hover:text-white transition-colors">Discard</button>
             <button disabled={saving} type="submit" className="px-12 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 rounded-2xl font-black text-lg shadow-xl shadow-emerald-500/20 flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50">
               {saving ? <Loader2 className="animate-spin" /> : <Save size={24} />}
               {saving ? 'SAVING...' : editProjectId ? 'UPDATE PROJECT' : 'PUBLISH CHANGES'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}