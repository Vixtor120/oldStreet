import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider, useNotifications } from './context/NotificationContext';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Normativa from './pages/Normativa';
import Postulaciones from './pages/Postulaciones';
import Whitelist from './pages/Whitelist';
import AuthModal from './components/AuthModal';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'menu' | 'normativa' | 'postulaciones' | 'whitelist'>('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  
  const { user, loading } = useAuth();
  const { showWarning, showError } = useNotifications();

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentPage]);

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
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return <Menu onNavigate={handleNavigate} onOpenAuthModal={(mode) => {
          setAuthModalMode(mode);
          setAuthModalOpen(true);
        }} />;
      case 'normativa':
        return <Normativa onNavigate={handleNavigate} />;
      case 'postulaciones':
        return <Postulaciones onNavigate={handleNavigate} />;
      case 'whitelist':
        return <Whitelist onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-amber-400 text-xl flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Cargando...
        </div>
      </div>
    );
  }

  return (
    <>
      {renderPage()}
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
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
