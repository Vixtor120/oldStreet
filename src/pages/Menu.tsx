import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

interface MenuProps {
  onNavigate: (page: 'home' | 'menu' | 'normativa' | 'whitelist') => void;
}

const Menu: React.FC<MenuProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('generales');

  const tabs = [
    { id: 'generales', label: 'Generales', icon: '📋' },
    { id: 'ilegales', label: 'Ilegales', icon: '🚫' },
    { id: 'discord', label: 'Discord', icon: '💬' },
    { id: '18', label: '+18', icon: '🔞' },
    { id: 'streamers', label: 'Streamers', icon: '🎥' },
    { id: 'atracos', label: 'Atracos', icon: '💰' },
    { id: 'legales', label: 'Legales', icon: '⚖️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Partículas flotantes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Header con logo y navegación */}
      <Navbar onNavigate={onNavigate} currentPage="menu" />

      {/* Línea dorada */}
      <motion.div 
        className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-8"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      />

      {/* Contenido principal */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-8">
        <motion.div 
          className="max-w-6xl w-full"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Título importante y explicación del servidor */}
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.h2 
              className="text-4xl font-bold text-yellow-400 mb-4"
              style={{
                textShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
              }}
            >
              ¡Bienvenido a OldStreet!
            </motion.h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
              <motion.div 
                className="md:w-1/3"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <div 
                  className="rounded-lg shadow-lg border-2 border-yellow-500/30 max-w-full h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
                  style={{ maxHeight: '300px' }}
                >
                  <span className="text-5xl">🌆</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="md:w-2/3 space-y-4"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <motion.p 
                  className="text-xl text-gray-300 leading-relaxed text-left"
                  whileHover={{ color: "#ffffff" }}
                >
                  <span className="text-yellow-400 font-semibold">OldStreet</span> es un servidor de roleplay único donde la calidad y la seriedad en el rol son nuestra prioridad.
                </motion.p>
                
                <motion.p 
                  className="text-xl text-gray-300 leading-relaxed text-left"
                  whileHover={{ color: "#ffffff" }}
                >
                  Ofrecemos una experiencia inmersiva donde podrás vivir una segunda vida, interpretar profesiones realistas, 
                  interactuar con otros jugadores y formar parte de una historia en constante evolución.
                </motion.p>
                
                <motion.p 
                  className="text-xl text-gray-300 leading-relaxed text-left"
                  whileHover={{ color: "#ffffff" }}
                >
                  Antes de comenzar, familiarízate con nuestra normativa y completa el proceso de whitelist para unirte a nuestra comunidad.
                </motion.p>
                
                <motion.div 
                  className="bg-yellow-500/10 border-l-4 border-yellow-400 p-4 mt-4 rounded"
                >
                  <p className="text-lg text-yellow-100 font-semibold">¡Importante!</p>
                  <p className="text-gray-300">No tener conocimiento de las normas no te exime de tener que cumplirlas, y si hay cambios, son anunciados.</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Línea decorativa */}
          <motion.div 
            className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mb-12"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;
