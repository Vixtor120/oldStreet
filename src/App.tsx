import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Normativa from './pages/Normativa';
import Whitelist from './pages/Whitelist';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'menu' | 'normativa' | 'whitelist'>('home');

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: 'home' | 'menu' | 'normativa' | 'whitelist') => {
    // Force immediate scroll to top for instant feedback
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return <Menu onNavigate={handleNavigate} />;
      case 'normativa':
        return <Normativa onNavigate={handleNavigate} />;
      case 'whitelist':
        return <Whitelist onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return renderPage();
};

export default App;
