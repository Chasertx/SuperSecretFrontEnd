import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Instagram, Mail, Code2 } from 'lucide-react';
import api from '../api/axiosInstance';
import type { User } from '../types';

const Footer: React.FC = () => {
  const [king, setKing] = useState<User | null>(null);

  useEffect(() => {
    const fetchKingData = async () => {
      try {
        const response = await api.get('/users/profile/king');
        setKing(response.data);
      } catch (error) {
        console.error("Footer: Error fetching king data", error);
      }
    };
    fetchKingData();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-4 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Brand & Copyright */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-r border-slate-800 pr-4">
            <Code2 className="text-emerald-400" size={18} />
            <span className="text-sm font-black tracking-tighter text-white">
              Portfolio<span className="text-emerald-500">Pro</span>
            </span>
          </div>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            © {currentYear} {king?.firstName} {king?.lastName}
          </p>
        </div>

        {/* Right: Socials & Contact */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            {king?.gitHubLink && (
              <a href={king.gitHubLink} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors" title="GitHub">
                <Github size={16} />
              </a>
            )}
            {king?.linkendInLink && (
              <a href={king.linkendInLink} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors" title="LinkedIn">
                <Linkedin size={16} />
              </a>
            )}
            {king?.instagramLink && (
              <a href={king.instagramLink} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-pink-500 transition-colors" title="Instagram">
                <Instagram size={16} />
              </a>
            )}
          </div>

          <div className="h-4 w-[1px] bg-slate-800 hidden md:block" />

          <a 
            href={`mailto:${king?.email}`}
            className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <Mail size={14} />
            <span className="text-[10px] font-black uppercase tracking-tighter">{king?.email || 'Contact'}</span>
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;