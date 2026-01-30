import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LogIn, User, LogOut, Settings, Plus, Crown, 
  Mail, Linkedin, Github, Instagram 
} from 'lucide-react';
import type { User as UserType } from '../types';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<UserType | null>(() => {
    const savedUser = localStorage.getItem('user');
    console.log(savedUser);
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const handleStorageUpdate = () => {
      const savedUser = localStorage.getItem('user');
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener('storage', handleStorageUpdate);
    return () => window.removeEventListener('storage', handleStorageUpdate);
  }, []);

  const isProjectsPage = location.pathname === '/projects';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload(); 
  };

  // Helper to ensure links are valid URLs
  const formatLink = (link: string | undefined, fallback: string) => link || fallback;

  // Social Links Component using API data
  const SocialLinks = () => (
    <div className="flex items-center gap-4 mr-2 border-r border-slate-800 pr-4">
      {/* Mail link using user email if available */}
      <a 
        href={`mailto:${user?.email || 'contact@example.com'}`} 
        className="text-slate-400 hover:text-emerald-400 transition-colors" 
        title="Contact"
      >
        <Mail size={20} />
      </a>

      {/* LinkedIn from API */}
      <a 
        href={formatLink(user?.linkedInLink, "https://linkedin.com")} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-slate-400 hover:text-blue-400 transition-colors" 
        title="LinkedIn"
      >
        <Linkedin size={20} />
      </a>

      {/* GitHub from API */}
      <a 
        href={formatLink(user?.gitHubLink, "https://github.com")} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-slate-400 hover:text-white transition-colors" 
        title="GitHub"
      >
        <Github size={20} />
      </a>

      {/* Instagram from API */}
      <a 
        href={formatLink(user?.instagramLink, "https://instagram.com")} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-slate-400 hover:text-pink-400 transition-colors" 
        title="Instagram"
      >
        <Instagram size={20} />
      </a>
    </div>
  );

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            PortfolioPro
          </Link>

          {isProjectsPage && user && (
            <button 
              onClick={() => navigate('/projects/new')}
              className="hidden md:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-4 py-1.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-emerald-500/10 active:scale-95"
            >
              <Plus size={18} />
              <span>Add Project</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          
          <SocialLinks />

          {user?.role === 'King' && (
            <Link 
              to="/admin/edit-portfolio" 
              className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/50 rounded-lg text-amber-500 text-xs font-black uppercase tracking-tighter hover:bg-amber-500 hover:text-slate-900 transition-all shadow-lg shadow-amber-500/10"
            >
              <Crown size={14} />
              <span>King Editor</span>
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-3 md:gap-6 border-l border-slate-700 pl-4">
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 overflow-hidden">
                  {user.profileImageUrl ? (
                    <img src={user.profileImageUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={16} className="text-blue-400" />
                  )}
                </div>
                <span className="hidden lg:inline text-sm font-semibold">{user.username}</span>
              </div>

              <button 
                onClick={handleLogout}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all"
            >
              <LogIn size={18} />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}