import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';
import type { User } from '../types';

interface FooterProps {
  user?: User | null;
}

const Footer: React.FC<FooterProps> = ({ user }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-6 px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex items-center gap-4">
          <span className="text-white font-black text-lg tracking-tighter">
            PORTFOLIO<span className="text-emerald-500">PRO</span>
          </span>
          <span className="hidden md:block text-slate-600 text-xs">|</span>
          <p className="text-slate-500 text-[11px] font-medium uppercase tracking-wider">
            © {currentYear} {user?.firstName} {user?.lastName}
          </p>
        </div>
      
        <div className="flex items-center gap-3">
          {user?.gitHubLink && (
            <a href={user.gitHubLink} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
              <Github size={18} />
            </a>
          )}
          {user?.linkendInLink && (
            <a href={user.linkendInLink} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-emerald-500 transition-colors">
              <Linkedin size={18} />
            </a>
          )}
          {user?.instagramLink && (
            <a href={user.instagramLink} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-pink-500 transition-colors">
              <Instagram size={18} />
            </a>
          )}
          <a href={`mailto:${user?.email}`} className="text-slate-500 hover:text-emerald-400 transition-colors">
            <Mail size={18} />
          </a>
        </div>

        <div className="flex justify-center gap-10">
             {user?.gitHubLink && <a href={user.gitHubLink} target="_blank" className="text-slate-500 hover:text-white transition-all transform hover:-translate-y-1"><Github size={24}/></a>}
             {user?.linkendInLink && <a href={user.linkendInLink} target="_blank" className="text-slate-500 hover:text-emerald-500 transition-all transform hover:-translate-y-1"><Linkedin size={24}/></a>}
             {user?.instagramLink && <a href={user.instagramLink} target="_blank" className="text-slate-500 hover:text-pink-500 transition-all transform hover:-translate-y-1"><Instagram size={24}/></a>}
          </div>

        <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
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