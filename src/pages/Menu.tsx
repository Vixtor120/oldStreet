import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

interface MenuProps {
  onNavigate: (page: 'home' | 'menu' | 'normativa' | 'whitelist') => void;
}

const Menu: React.FC<MenuProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Partículas flotantes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-20"
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
        className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-8"
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
          {/* Título principal */}
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.h2 
              className="text-4xl font-bold text-amber-400 mb-4"
              style={{
                textShadow: '0 0 20px rgba(245, 158, 11, 0.8)',
              }}
            >
              ¡Bienvenido a OldStreet!
            </motion.h2>
          </motion.div>

          {/* Sección principal con imagen y descripción */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {/* Imagen de fondo de GTA Roleplay */}
            <motion.div 
              className="relative rounded-lg overflow-hidden shadow-2xl border-2 border-amber-500/30"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="h-64 lg:h-80 bg-cover bg-center relative"
                style={{
                  backgroundImage: "url('/images/gta-roleplay.jpg')",
                  backgroundPosition: 'center'
                }}
              >
                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                
                {/* Texto sobre la imagen */}
                <div className="absolute bottom-4 left-4 right-4">
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-2"
                    style={{ textShadow: '0 0 10px rgba(0, 0, 0, 0.8)' }}
                  >
                    Vive Los Santos como Nunca Antes
                  </motion.h3>
                  <motion.p 
                    className="text-gray-200 text-sm"
                    style={{ textShadow: '0 0 8px rgba(0, 0, 0, 0.8)' }}
                  >
                    Roleplay auténtico en el mundo de GTA V
                  </motion.p>
                </div>

                {/* Efecto de brillo */}
                <motion.div 
                  className="absolute top-0 left-0 w-full h-full opacity-20"
                  animate={{
                    background: [
                      'linear-gradient(45deg, transparent 30%, rgba(245, 158, 11, 0.3) 50%, transparent 70%)',
                      'linear-gradient(45deg, transparent 30%, rgba(245, 158, 11, 0.1) 50%, transparent 70%)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Descripción del servidor */}
            <motion.div 
              className="space-y-6 flex flex-col justify-center"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.p 
                className="text-xl text-gray-300 leading-relaxed"
                whileHover={{ color: "#ffffff" }}
              >
                <span className="text-amber-400 font-semibold">OldStreet</span> es un servidor de roleplay único donde la calidad y la seriedad en el rol son nuestra prioridad.
              </motion.p>
              
              <motion.p 
                className="text-lg text-gray-300 leading-relaxed"
                whileHover={{ color: "#ffffff" }}
              >
                Ofrecemos una experiencia inmersiva donde podrás vivir una segunda vida, interpretar profesiones realistas, 
                interactuar con otros jugadores y formar parte de una historia en constante evolución.
              </motion.p>

              <motion.div 
                className="bg-amber-500/10 border-l-4 border-amber-400 p-4 rounded"
              >
                <p className="text-lg text-amber-100 font-semibold">¡Importante!</p>
                <p className="text-gray-300">Para unirte a nuestra comunidad, debes seguir estos pasos obligatorios.</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Pasos para unirse al servidor */}
          <motion.div 
            className="mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <h3 className="text-3xl font-bold text-amber-400 text-center mb-8">
              Pasos para Unirte al Servidor
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Paso 1: Discord */}
              <motion.div 
                className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl p-6 border-2 border-amber-500/30 relative overflow-hidden"
                whileHover={{ scale: 1.02, borderColor: "rgba(245, 158, 11, 0.6)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-black font-bold text-xl mr-4">
                      1
                    </div>
                    <h4 className="text-xl font-bold text-amber-400">Únete a Discord</h4>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Únete a nuestra <span className="text-amber-400 font-semibold">comunidad oficial</span> en Discord para estar al día con noticias, 
                    eventos y conectar con otros jugadores.
                  </p>

                  <motion.a
                    href="https://discord.gg/AGAeg8tt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold py-3 px-6 rounded-lg border-2 border-indigo-500 flex items-center justify-center gap-2"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    Unirse a Discord
                  </motion.a>
                </div>

                {/* Efecto de fondo */}
                <motion.div 
                  className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/10 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>

              {/* Paso 2: Normativa */}
              <motion.div 
                className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl p-6 border-2 border-amber-500/30 relative overflow-hidden"
                whileHover={{ scale: 1.02, borderColor: "rgba(245, 158, 11, 0.6)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-black font-bold text-xl mr-4">
                      2
                    </div>
                    <h4 className="text-xl font-bold text-amber-400">Leer la Normativa</h4>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Es <span className="text-amber-400 font-semibold">obligatorio</span> leer y entender todas las reglas del servidor. 
                    No conocer las normas no te exime de cumplirlas.
                  </p>

                  <motion.button 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-lg border-2 border-blue-500"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('normativa')}
                  >
                    📋 Leer Normativa
                  </motion.button>
                </div>

                {/* Efecto de fondo */}
                <motion.div 
                  className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />
              </motion.div>

              {/* Paso 3: Whitelist */}
              <motion.div 
                className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl p-6 border-2 border-amber-500/30 relative overflow-hidden"
                whileHover={{ scale: 1.02, borderColor: "rgba(245, 158, 11, 0.6)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-black font-bold text-xl mr-4">
                      3
                    </div>
                    <h4 className="text-xl font-bold text-amber-400">Solicitar Whitelist</h4>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Completa el formulario de whitelist con tus datos y conocimientos de roleplay. 
                    <span className="text-amber-400 font-semibold"> La revisión se hace manualmente</span>.
                  </p>

                  <motion.button 
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 rounded-lg border-2 border-green-500"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('whitelist')}
                  >
                    📝 Solicitar Whitelist
                  </motion.button>
                </div>

                {/* Efecto de fondo */}
                <motion.div 
                  className="absolute bottom-0 left-0 w-16 h-16 bg-green-500/10 rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Información adicional */}
          <motion.div 
            className="text-center mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <div className="bg-gray-900/90 rounded-lg p-6 border-2 border-amber-500/30">
              <h4 className="text-xl font-bold text-amber-400 mb-4">🎭 ¿Qué puedes hacer en OldStreet?</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
                <div className="space-y-2">
                  <p className="font-semibold text-amber-300">👮‍♂️ Trabajos Legales</p>
                  <p className="text-sm">Policía, Bombero, EMS, Abogado, Alcalde, Mecánico</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-amber-300">🏪 Negocios</p>
                  <p className="text-sm">Tiendas, Restaurantes, Talleres, Empresas</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-amber-300">🎪 Entretenimiento</p>
                  <p className="text-sm">Eventos, Fiestas, Competencias, Shows</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Botón de Discord */}
          <motion.div 
            className="flex justify-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <motion.div 
              className="bg-gray-900/90 rounded-lg p-4 border-2 border-amber-500/30"
            >
              <p className="text-center text-gray-300 mb-4">
                ¿Ya completaste todos los pasos? ¡Perfecto! Mantente conectado con nuestra comunidad:
              </p>
              <motion.a 
                href="https://discord.gg/AGAeg8tt"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg border-2 border-indigo-500 flex items-center justify-center gap-3"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Mantente Conectado en Discord
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;
