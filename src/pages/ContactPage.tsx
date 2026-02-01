import React, { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, Instagram, ExternalLink, Send } from 'lucide-react';
import api from '../api/axiosInstance';
import type { User } from '../types';

const ContactPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKingProfile = async () => {
      try {
        const response = await api.get('/users/profile/king');
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchKingProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-32 pb-12 px-6">
      <div className="max-w-3xl mx-auto text-center">
        
        {/* Header Section */}
        <h1 className="text-5xl font-black tracking-tighter mb-4">
          Work <span className="text-emerald-500 italic">With</span> Me
        </h1>
        <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">
          I'm currently open to new opportunities, collaborations, or just talking shop about .NET architecture and AI.
        </p>

        {/* Contact Card */}
        <div className="bg-slate-800/40 border border-slate-700/50 p-8 md:p-12 rounded-3xl backdrop-blur-xl shadow-2xl shadow-black/50">
          
          {/* Email Button */}
          <div className="mb-12">
            <a 
              href={`mailto:${user?.email || 'chaseashby199@gmail.com'}`}
              className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-10 py-4 rounded-2xl font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/20"
            >
              <Send size={22} />
              SEND AN EMAIL
            </a>
            <p className="mt-4 text-slate-500 text-sm font-mono">{user?.email}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user?.gitHubLink && (
              <a 
                href={user.gitHubLink} 
                target="_blank" 
                rel="noreferrer"
                className="group flex flex-col items-center p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl hover:border-white/20 transition-all"
              >
                <Github className="text-slate-400 group-hover:text-white mb-3" size={28} />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">GitHub</span>
                <ExternalLink size={12} className="mt-2 text-slate-700 group-hover:text-emerald-500" />
              </a>
            )}

            
              <a 
                href={user?.linkendInLink} 
                target="_blank" 
                rel="noreferrer"
                className="group flex flex-col items-center p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl hover:border-blue-500/20 transition-all"
              >
                <Linkedin className="text-slate-400 group-hover:text-blue-400 mb-3" size={28} />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">LinkedIn</span>
                <ExternalLink size={12} className="mt-2 text-slate-700 group-hover:text-blue-500" />
              </a>
            

            {user?.instagramLink && (
              <a 
                href={user.instagramLink} 
                target="_blank" 
                rel="noreferrer"
                className="group flex flex-col items-center p-6 bg-slate-900/50 border border-slate-700/50 rounded-2xl hover:border-pink-500/20 transition-all"
              >
                <Instagram className="text-slate-400 group-hover:text-pink-500 mb-3" size={28} />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Instagram</span>
                <ExternalLink size={12} className="mt-2 text-slate-700 group-hover:text-pink-500" />
              </a>
            )}
          </div>
        </div>

        {/* Location/Status Footer */}
        <div className="mt-12 flex justify-center gap-8">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Available for new projects
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;