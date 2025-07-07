import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onNavigate: (page: 'home' | 'menu' | 'normativa' | 'whitelist') => void;
  currentPage: 'home' | 'menu' | 'normativa' | 'whitelist';
}

// NavItems component to avoid code duplication
interface NavItemsProps extends Omit<NavbarProps, 'currentPage'> {
  currentPage: 'home' | 'menu' | 'normativa' | 'whitelist';
  isMobile?: boolean;
}

const NavItems: React.FC<NavItemsProps> = ({ onNavigate, currentPage, isMobile = false }) => {
  const baseButtonClasses = `transition-colors relative ${isMobile ? 'w-full text-center py-2' : ''}`;
  
  return (
    <>
      <motion.button 
        className={`${baseButtonClasses} ${
          isMobile ? 'text-white hover:text-yellow-400' : 'hover:text-yellow-400'
        } ${currentPage === 'menu' ? 'text-yellow-400 font-semibold' : ''}`}
        whileHover={{ scale: 1.1 }}
        onClick={() => onNavigate('menu')}
      >
        INICIO
        {currentPage === 'menu' && !isMobile && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400" 
            layoutId="navbar-indicator"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.button>
      
      <motion.button 
        className={`${baseButtonClasses} ${
          isMobile ? 'text-white hover:text-yellow-400' : 'hover:text-yellow-400'
        } ${currentPage === 'normativa' ? 'text-yellow-400 font-semibold' : ''}`}
        whileHover={{ scale: 1.1 }}
        onClick={() => onNavigate('normativa')}
      >
        NORMATIVA
        {currentPage === 'normativa' && !isMobile && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400" 
            layoutId="navbar-indicator"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.button>

      <motion.a 
        href="https://discord.gg/AGAeg8tt" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`${isMobile ? 'w-full text-center py-2' : ''} text-white hover:text-indigo-400 transition-colors flex items-center justify-center`}
        whileHover={{ scale: 1.2, rotate: [0, -5, 5, -5, 0] }}
        title="Únete a nuestro Discord"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.393-.111.804-.21 1.18-.636-.091-1.269-.136-1.898-.136s-1.262.045-1.896.135c-.1-.376-.199-.787-.211-1.18a.077.077 0 0 0-.079-.036c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.183 0-2.157-1.068-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.068-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
        </svg>
        {isMobile && <span className="ml-2">Discord</span>}
      </motion.a>
      
      <motion.button 
        className={`${isMobile ? 'w-full ' : ''}border border-yellow-400 px-4 py-2 rounded transition-colors ${
          currentPage === 'whitelist' 
            ? 'bg-yellow-400 text-black font-semibold' 
            : isMobile
              ? 'text-white hover:bg-yellow-400 hover:text-black'
              : 'hover:bg-yellow-400 hover:text-black'
        }`}
        whileHover={{ scale: 1.05 }}
        onClick={() => onNavigate('whitelist')}
      >
        Whitelist
      </motion.button>
    </>
  );
};

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.div 
      className="relative z-10"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Desktop and Mobile Header */}
      <div className="flex justify-between items-center p-6">
        <motion.div 
          className="flex items-center space-x-4 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => onNavigate('home')}
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <img src="/images/logo.png" alt="Logo OldStreet" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-yellow-400">OldStreet</h1>
        </motion.div>

        {/* Hamburger Menu Button (Mobile Only) */}
        <button 
          className="lg:hidden text-yellow-400 p-2 hover:bg-yellow-400/10 rounded-lg"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <motion.div 
          className="hidden lg:flex items-center space-x-6 text-white"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <NavItems onNavigate={onNavigate} currentPage={currentPage} />
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-gray-900/95 border-t border-yellow-400/20"
          >
            <div className="flex flex-col items-center space-y-4 p-6">
              <NavItems 
                onNavigate={(page) => {
                  onNavigate(page);
                  setIsMenuOpen(false);
                }} 
                currentPage={currentPage}
                isMobile={true}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
