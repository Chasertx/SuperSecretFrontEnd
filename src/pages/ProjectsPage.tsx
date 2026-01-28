import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import type { Project } from '../types';

// Replace this with your actual GUID from your database
const MY_PORTFOLIO_ID = "802a9231-6482-42a3-b5d1-cbe3bf994034"; 

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // 1. Check if a user is logged in via localStorage
        const savedUser = localStorage.getItem('user');
        const user = savedUser ? JSON.parse(savedUser) : null;

        // 2. Decide whose projects to show
        // If logged in, use their ID. Otherwise, use YOUR ID.
        const targetUserId = user ? user.id : MY_PORTFOLIO_ID;

        // 3. Request filtered data from your C# API
        const response = await api.get(`/projects/user/${targetUserId}`);
        setProjects(response.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="pt-32 text-center text-white">Loading Portfolio...</div>;

  return (
    <div className="pt-32 min-h-screen bg-slate-900 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">
          {projects.length > 0 ? "Featured Projects" : "No Projects Found"}
        </h1>
        <p className="text-slate-400 mb-10 italic">
          Viewing items for: {projects[0]?.userId === MY_PORTFOLIO_ID ? "Portfolio Owner" : "Current User"}
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map(project => (
            <div key={project.id} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform">
              {project.imageUrl && <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 mb-4 line-clamp-3">{project.description}</p>
                <div className="flex gap-4">
                  {project.projectUrl && (
                    <a href={project.projectUrl} target="_blank" className="text-blue-400 font-semibold hover:text-blue-300">Live Demo</a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}