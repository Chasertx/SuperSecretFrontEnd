import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import { ExternalLink, Github, Loader2, Globe, CheckCircle2 } from 'lucide-react';
import type { Project } from '../types';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // URL State for selection
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get('edit');

  // Check user role from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isKing = user.role === 'King';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects/my-projects');
        setProjects(response.data);
      } catch (err: any) {
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleSelect = (id: string) => {
    if (!isKing) return;
    const newParams = new URLSearchParams(searchParams);
    if (selectedId === id) {
      newParams.delete('edit');
    } else {
      newParams.set('edit', id);
    }
    setSearchParams(newParams);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-slate-400 font-medium">Fetching your masterpieces...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Project Showcase</h1>
          <p className="text-slate-400 max-w-2xl">
            A collection of my work, ranging from full-stack applications to 
            experimentations with cloud architecture and UI design.
          </p>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-8">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const isSelected = selectedId === project.id;
            return (
              <div 
                key={project.id} 
                onClick={() => handleSelect(project.id)}
                className={`group relative flex flex-col bg-slate-800 border rounded-2xl overflow-hidden transition-all duration-300 
                  ${isKing ? 'cursor-pointer' : 'cursor-default'}
                  ${isSelected 
                    ? 'border-blue-500 ring-2 ring-blue-500/50 translate-y-[-4px] shadow-2xl shadow-blue-500/20' 
                    : 'border-slate-700 hover:border-slate-500'}`}
              >
                {/* Selection Indicator Overlay */}
                {isSelected && (
                  <div className="absolute top-3 right-3 z-20 bg-blue-500 text-white rounded-full p-1 shadow-xl animate-in zoom-in">
                    <CheckCircle2 size={20} />
                  </div>
                )}

                <div className="aspect-video w-full overflow-hidden bg-slate-700">
                  <img 
                    src={project.imageUrl || 'https://via.placeholder.com/600x400'} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className={`text-xl font-bold mb-2 transition-colors ${isSelected ? 'text-blue-400' : 'text-white'}`}>
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-700 flex items-center justify-between">
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()} // Prevents selection when clicking link
                      className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                      <Github size={18} /> Code
                    </a>

                    {project.liveDemoURL && (
                      <a
                        href={project.liveDemoURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()} // Prevents selection when clicking link
                        className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider"
                      >
                        <Globe size={18} /> Live Demo <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}