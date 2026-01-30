import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LogIn, User, LogOut, Plus, Crown, Info, Mail 
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
      console.log(savedUser);
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

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Left Side: Logo and Conditional Action */}
        <div className="flex items-center gap-4">
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

        {/* Right Side: Navigation & Auth */}
        <div className="flex items-center gap-6">
          
          {/* Main Navigation Links */}
          <div className="hidden sm:flex items-center gap-6 border-r border-slate-800 pr-6">
            <Link 
              to="/about" 
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
            >
              <Info size={16} className="text-blue-400" />
              <span>About Me</span>
            </Link>
            
            <Link 
              to="/contact" 
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
            >
              <Mail size={16} className="text-emerald-400" />
              <span>Contact</span>
            </Link>
          </div>

          {/* King Editor Button - Visible only for 'King' role */}
          {user?.role === 'King' && (
            <Link 
              to="/admin/edit-portfolio" 
              className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/50 rounded-lg text-amber-500 text-[10px] font-black uppercase tracking-tighter hover:bg-amber-500 hover:text-slate-900 transition-all shadow-lg shadow-amber-500/10"
            >
              <Crown size={14} />
              <span>King Editor</span>
            </Link>
          )}

          {/* User Profile / Login Section */}
          {user ? (
            <div className="flex items-center gap-3 md:gap-4 border-l border-slate-800 pl-6">
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 overflow-hidden">
                  {user.profileImageUrl ? (
                    <img src={user.profileImageUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={16} className="text-blue-400" />
                  )}
                </div>
                <span className="hidden lg:inline text-xs font-semibold">{user.username}</span>
              </div>

              <button 
                onClick={handleLogout}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full font-bold text-xs transition-all shadow-lg shadow-blue-600/20"
            >
              <LogIn size={16} />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}