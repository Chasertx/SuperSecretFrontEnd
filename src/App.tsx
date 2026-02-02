import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProjectsPage from './pages/ProjectsPage';
import UploadProjectPage from './pages/UploadProjectPage';
import EditProfilePage from './pages/EditProfilePage';
import Footer from './components/Footer';
import type { User } from './types';
import EditPortfolioPage from './pages/EditProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import AboutPage from './pages/AboutMePage';
import ContactPage from './pages/ContactPage';

function App() {

  const savedUser = localStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : null;

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/new" element={<UploadProjectPage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
            <Route path="/admin/edit-portfolio" element={<EditPortfolioPage />}/>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer/>
      </div>
    </Router>
  );
}

export default App;