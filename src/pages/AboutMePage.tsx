import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { User, Code2, Briefcase, GraduationCap } from 'lucide-react';
import type { User as UserType } from '../types';

const AboutPage: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKingProfile = async () => {
      try {
        const response = await api.get('/users/profile/king');
        setUser(response.data);
      } catch (error) {
        console.error("Error loading About Me data:", error);
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
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
          <div className="relative">
            <div className="w-48 h-48 rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl shadow-emerald-500/10">
              <img 
                src={user?.profileImageUrl || '/default-avatar.png'} 
                alt="Chase Ashby" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-slate-800 p-3 rounded-xl border border-slate-700 shadow-xl">
              <Code2 className="text-emerald-400" size={24} />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              I'm <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                {user?.firstName} {user?.lastName}
              </span>
            </h1>
            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-xl">
              Full Stack Software Engineer specializing in high-scale .NET ecosystems and modern cloud architecture.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Bio */}
          <div className="md:col-span-2 space-y-6">
            <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <User size={20} className="text-blue-400" />
                Biography
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {user?.bio || "Full-stack developer focused on building robust, scalable applications with .NET 8 and modern frontend frameworks. Passionate about clean code, system architecture, and solving complex business problems."}
              </p>
            </section>
          </div>

          {/* Quick Stats/Links Sidebar */}
          <div className="space-y-6">
            <section className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">Current Focus</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <Briefcase size={16} className="text-emerald-500" />
                  Software Engineer @ American Eagle
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <GraduationCap size={16} className="text-blue-500" />
                  B.S. Computer Science
                </li>
              </ul>
            </section>

            <section className="bg-gradient-to-br from-blue-500/10 to-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20">
              <h3 className="text-sm font-black uppercase tracking-widest text-emerald-500 mb-2">Let's Connect</h3>
              <p className="text-xs text-slate-400 mb-4">Open for collaborations and technical discussions.</p>
              <a 
                href={`mailto:${user?.email}`}
                className="block w-full text-center bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-2 rounded-lg transition-all"
              >
                Send a Message
              </a>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;