import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, LogIn, FileText, User, LogOut, Settings, Plus } from 'lucide-react';
import type { User as UserType } from '../types';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Get user data from local storage to check auth status
  const savedUser = localStorage.getItem('user');
  const user: UserType | null = savedUser ? JSON.parse(savedUser) : null;

  // 2. Identify if we are on the projects page
  const isProjectsPage = location.pathname === '/projects';
  const resumeLink = user?.resumeUrl || "/resume.pdf";

  // 3. Logic: Redirect to login if guest, otherwise proceed to upload form
  const handleAddProjectClick = () => {
    if (user) {
      navigate('/projects/new');
    } else {
      // We send them to login; you could also pass state here to redirect back later
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload(); 
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Left Side: Brand and Contextual Action */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            PortfolioPro
          </Link>

          {/* This button only appears on the Projects Page */}
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

        {/* Right Side: Navigation and User Profiles */}
        <div className="flex items-center gap-4 md:gap-8">
          
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
              
              {/* Profile Edit: Still gated by Admin role for security */}
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
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                  <User size={16} className="text-blue-400" />
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