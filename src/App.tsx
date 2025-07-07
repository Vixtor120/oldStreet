import React, { useState } from 'react';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Normativa from './pages/Normativa';
import Whitelist from './pages/Whitelist';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'menu' | 'normativa' | 'whitelist'>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return <Menu onNavigate={setCurrentPage} />;
      case 'normativa':
        return <Normativa onNavigate={setCurrentPage} />;
      case 'whitelist':
        return <Whitelist onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return renderPage();
};

export default App;
