import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider, useNotifications } from './context/NotificationContext';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Normativa from './pages/Normativa';
import Postulaciones from './pages/Postulaciones';
import Whitelist from './pages/Whitelist';
import ResetPassword from './pages/ResetPassword';
import AuthModal from './components/AuthModal';

const AppRoutes: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  
  const { user, loading } = useAuth();
  const { showWarning, showError } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Manejar parámetro 'page' para fallback cuando .htaccess no funciona
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pageParam = urlParams.get('page');
    
    if (pageParam === 'reset-password' && location.pathname === '/') {
      // Construir la nueva URL con el token si existe
      const token = urlParams.get('token');
      const newPath = token ? `/reset-password?token=${token}` : '/reset-password';
      navigate(newPath, { replace: true });
    }
  }, [location, navigate]);

  const handleNavigate = (page: 'home' | 'menu' | 'normativa' | 'postulaciones' | 'whitelist') => {
    // Verificar permisos antes de navegar
    if (page === 'whitelist') {
      if (!user) {
        setAuthModalMode('login');
        setAuthModalOpen(true);
        return;
      }
      if (!user.can_access_whitelist) {
        showWarning(
          'Acceso Denegado',
          'Ya tienes whitelist aprobada. No puedes enviar otra solicitud.',
          { autoClose: false }
        );
        return;
      }
    }

    if (page === 'postulaciones') {
      if (!user) {
        setAuthModalMode('login');
        setAuthModalOpen(true);
        return;
      }
      if (!user.can_access_postulaciones) {
        showError(
          'Acceso Restringido',
          'Necesitas tener whitelist aprobada para acceder a las postulaciones.',
          { autoClose: false }
        );
        return;
      }
    }

    // Force immediate scroll to top for instant feedback
    window.scrollTo(0, 0);
    navigate(page === 'home' ? '/' : `/${page}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-yellow-500 text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home onNavigate={handleNavigate} />} />
        <Route path="/menu" element={<Menu onNavigate={handleNavigate} />} />
        <Route path="/normativa" element={<Normativa onNavigate={handleNavigate} />} />
        <Route path="/postulaciones" element={<Postulaciones onNavigate={handleNavigate} />} />
        <Route path="/whitelist" element={<Whitelist onNavigate={handleNavigate} />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <AppRoutes />
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
