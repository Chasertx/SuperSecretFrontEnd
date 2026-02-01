import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import { ExternalLink, Github, Loader2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string; // Ensure this matches your API response field
  githubUrl?: string; 
  liveUrl?: string;
  technologies: string[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
          {projects.map((project) => (
            <a 
              key={project.id} 
              // Card now links to projectUrl
              href={project.projectUrl || project.githubUrl || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="aspect-video w-full overflow-hidden bg-slate-700">
                <img 
                  src={project.imageUrl || 'https://via.placeholder.com/600x400'} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies?.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2.5 py-1 bg-slate-900 text-blue-400 text-xs font-semibold rounded-md border border-slate-700"
                    >
                      {tech}
                    </span>
                  )) || <span className="text-slate-500 text-xs italic">No tags</span>}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div className="flex items-center gap-4">
                    <Github className="text-slate-400 group-hover:text-white transition-colors" size={20} />
                    
                    {project.liveUrl && (
                      <button
                        onClick={(e) => {
                          e.preventDefault(); 
                          e.stopPropagation(); // Prevents the card's <a> tag from firing
                          window.open(project.liveUrl, '_blank');
                        }}
                        className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 text-sm font-bold uppercase"
                      >
                        Live Preview <ExternalLink size={16} />
                      </button>
                    )}
                  </div>
                  
                  {/* Text confirms it goes to GitHub (the projectUrl) */}
                  <span className="text-xs text-slate-500 group-hover:text-blue-400/70 font-medium">
                    View on GitHub →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}