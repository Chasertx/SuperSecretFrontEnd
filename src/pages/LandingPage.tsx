import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import type { User } from '../types';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  FileText, 
  Code2, 
  Database, 
  Terminal, 
  ChevronRight,
  Briefcase
} from 'lucide-react';

export default function LandingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKingProfile = async () => {
      try {
        const response = await api.get('/users/profile/king');
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch King profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchKingProfile();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="h-12 w-12 bg-emerald-500/20 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div>
        <p className="text-emerald-500 font-mono text-xs tracking-widest">LOADING_PROFILE...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-950 text-slate-200">
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Available for Projects
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
                {user?.firstName}<br />
                <span className="text-emerald-500">{user?.lastName}</span>
              </h1>

              <div className="space-y-4">
                <p className="text-2xl text-slate-100 font-medium">
                  {user?.title} — {user?.yearsOfExperience} Years of Excellence
                </p>
                <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
                  {user?.tagline1} <span className="text-slate-500">{user?.tagline2}</span>
                </p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                <button 
                  onClick={() => navigate('/projects')}
                  className="bg-emerald-500 text-slate-900 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-emerald-400 transition-all flex items-center gap-2 group shadow-xl shadow-emerald-500/20"
                >
                  Explore Projects
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                {user?.resumeUrl && (
                  <a href={user.resumeUrl} target="_blank" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-slate-800 transition-all border border-slate-800 flex items-center gap-2">
                    <FileText size={18} /> Resume
                  </a>
                )}
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative w-72 h-96 md:w-96 md:h-[500px] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                {user?.profileImageUrl ? (
                  <img src={user.profileImageUrl} alt="Profile" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800">
                    <Briefcase size={64} className="text-slate-700" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-900/30 border-y border-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-slate-500 text-xs font-black uppercase tracking-[0.3em] mb-12 text-center">Technical Ecosystem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="p-10 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/40 transition-all group">
              <Code2 className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
              <h3 className="text-xl font-bold text-white mb-6">Client Side</h3>
              <div className="flex flex-wrap gap-2">
                {user?.frontendSkills?.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-slate-950 text-slate-400 rounded-md text-[10px] font-bold uppercase border border-slate-800">{skill}</span>
                ))}
              </div>
            </div>

            <div className="p-10 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/40 transition-all group">
              <Terminal className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
              <h3 className="text-xl font-bold text-white mb-6">Server Side</h3>
              <div className="flex flex-wrap gap-2">
                {user?.backendSkills?.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-slate-950 text-slate-400 rounded-md text-[10px] font-bold uppercase border border-slate-800">{skill}</span>
                ))}
              </div>
            </div>

            <div className="p-10 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/40 transition-all group">
              <Database className="text-purple-500 mb-6 group-hover:scale-110 transition-transform" size={40} />
              <h3 className="text-xl font-bold text-white mb-6">Data & Cloud</h3>
              <div className="flex flex-wrap gap-2">
                {user?.databaseSkills?.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-slate-950 text-slate-400 rounded-md text-[10px] font-bold uppercase border border-slate-800">{skill}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-12 inline-block p-4 rounded-full bg-slate-900 border border-slate-800">
             <Github size={32} className="text-slate-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 leading-tight">
            {user?.bio || "Crafting robust backend architectures and seamless frontend experiences."}
          </h2>
          
          <div className="flex justify-center gap-10">
             {user?.gitHubLink && <a href={user.gitHubLink} target="_blank" className="text-slate-500 hover:text-white transition-all transform hover:-translate-y-1"><Github size={24}/></a>}
             {user?.linkedInLink && <a href={user.linkedInLink} target="_blank" className="text-slate-500 hover:text-emerald-500 transition-all transform hover:-translate-y-1"><Linkedin size={24}/></a>}
             {user?.instagramLink && <a href={user.instagramLink} target="_blank" className="text-slate-500 hover:text-pink-500 transition-all transform hover:-translate-y-1"><Instagram size={24}/></a>}
          </div>
        </div>
      </section>
    </div>
  );
}