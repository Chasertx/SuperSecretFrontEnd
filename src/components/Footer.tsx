import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';
import api from '../api/axiosInstance';
import type { User } from '../types';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        console.log(savedUser);
        setUser(JSON.parse(savedUser));
        return;
      }

      try {
        const response = await api.get('/users/profile/king');
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
        console.error("Footer: Error fetching king profile", error);
      }
    };

    loadUser();
  }, []);

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-6 px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-6">
        
        {/* LEFT AREA: Brand and Copyright */}
        <div className="flex items-center justify-center md:justify-start gap-4">
          <span className="text-white font-black text-lg tracking-tighter shrink-0">
            PORTFOLIO<span className="text-emerald-500">PRO</span>
          </span>
          <span className="hidden lg:block text-slate-600 text-xs">|</span>
          <p className="text-slate-500 text-[11px] font-medium uppercase tracking-wider whitespace-nowrap">
            © {currentYear} {user?.firstName || 'Chase'} {user?.lastName || 'Ashby'}
          </p>
        </div>
      
        {/* CENTER AREA (RED CIRCLE): Social Icons */}
        <div className="flex items-center justify-center gap-6">
          {user?.gitHubLink && (
            <a href={user.gitHubLink} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-all hover:scale-110">
              <Mail size={20} />
            </a>
          )}
          {user?.linkedInLink && (
            <a href={user.linkedInLink} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-400 transition-all hover:scale-110">
              <Mail size={20} />
            </a>
          )}
          {user?.instagramLink && (
            <a href={user.instagramLink} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-pink-500 transition-all hover:scale-110">
              <Mail size={20} />
            </a>
          )}
          {user?.email && (
            <a href={`mailto:${user.email}`} className="text-slate-500 hover:text-emerald-400 transition-all hover:scale-110">
              <Mail size={20} />
            </a>
          )}
        </div>

        {/* RIGHT AREA: Navigation */}
        <div className="flex items-center justify-center md:justify-end gap-6 text-xs font-bold uppercase tracking-widest">
          <Link to="/contact" className="text-emerald-500 hover:text-emerald-400 transition-colors">
            Contact
          </Link>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-slate-500 hover:text-white transition-colors"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;