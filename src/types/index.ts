export interface Project {
  id: string;            
  userId: string;         
  title: string;          
  imageUrl?: string;      
  description: string;    
  projectUrl?: string;  
  liveDemoURL?: string;  
  createdAt: string;      
}

export interface AuthResponse {
  token: string;
  username: string;
}

export interface LoginRequest {
  username: string; 
  password: string; 
}

export interface User {
  id: string; 
  username: string;
  email: string;
  role: string;
  firstName?: string; 
  lastName?: string;

  title?: string;
  bio?: string;
  yearsOfExperience: number;
  profileImageUrl?: string;
  resumeUrl?: string;


  tagline1?: string;
  tagline2?: string;
  frontendSkills: string[]; 
  backendSkills: string[];
  databaseSkills: string[];


  instagramLink?: string;
  gitHubLink?: string;
  linkendInLink?: string;

  // Metadata
  createdAt: string; 
}

export interface ProjectUploadRequest {
  title: string;
  description: string;
  projectUrl?: string; 
  image: File;         
}