import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, LogIn, FileText, User, LogOut, Settings, Plus, Crown } from 'lucide-react';
import type { User as UserType } from '../types';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<UserType | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });


  useEffect(() => {
    const handleStorageUpdate = () => {
      const savedUser = localStorage.getItem('user');
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener('storage', handleStorageUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, []);

  const isProjectsPage = location.pathname === '/projects';
  
  const resumeLink = user?.resumeUrl || "/resume.pdf";

  const handleAddProjectClick = () => {
    if (user) {
      navigate('/projects/new');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload(); 
  };
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            PortfolioPro
          </Link>

          {isProjectsPage && (
            <button 
              onClick={handleAddProjectClick}
              className="hidden md:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-4 py-1.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-emerald-500/10 active:scale-95"
            >
              <Plus size={18} />
              <span>Add Project</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          
          {user?.role === 'King' && (
            <Link 
              to="/admin/edit-portfolio" 
              className="flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/50 rounded-lg text-amber-500 text-xs font-black uppercase tracking-tighter hover:bg-amber-500 hover:text-slate-900 transition-all shadow-lg shadow-amber-500/10 animate-pulse-slow"
            >
              <Crown size={14} />
              <span>King Editor</span>
            </Link>
          )}

          <a 
            href={resumeLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors text-sm font-medium"
          >
            <FileText size={18} />
            <span className="hidden sm:inline">Resume</span>
          </a>

          <Link to="/projects" className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors text-sm font-medium">
            <Briefcase size={18} />
            <span className="hidden sm:inline">Projects</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-3 md:gap-6 border-l border-slate-700 pl-6">
              {user.role?.toLowerCase() === 'admin' && (
                <Link 
                  to="/profile/edit" 
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-widest bg-emerald-400/10 px-3 py-1.5 rounded-lg transition-all"
                >
                  <Settings size={14} />
                  <span>Edit</span>
                </Link>
              )}

              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 overflow-hidden">
                  {user.profileImageUrl ? (
                    <img 
                      src={user.profileImageUrl} 
                      alt="User Avatar" 
                      className="w-full h-full object-cover" 
                    />
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
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-blue-600/20"
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