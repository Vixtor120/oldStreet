import React from 'react';
import { motion } from 'framer-motion';

interface HomeProps {
  onNavigate: (page: 'home' | 'menu' | 'normativa' | 'whitelist') => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Partículas flotantes animadas */}
      {[...Array(6)].map((_, i) => (
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

      <motion.div 
        className="rounded-xl shadow-2xl border-4 border-yellow-500 overflow-hidden max-w-5xl w-full relative bg-black"
        style={{
          minHeight: '700px',
          boxShadow: '0 0 50px rgba(255, 215, 0, 0.3), inset 0 0 50px rgba(0, 0, 0, 0.5)'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Borde animado */}
        <motion.div 
          className="absolute inset-0 rounded-xl border-4 border-yellow-400 opacity-30"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-black/40"></div>
        
        {/* Esquinas doradas animadas */}
        <motion.div 
          className="absolute top-4 left-4 w-20 h-20 border-t-4 border-l-4 border-yellow-400 rounded-tl-lg"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        <motion.div 
          className="absolute top-4 right-4 w-20 h-20 border-t-4 border-r-4 border-yellow-400 rounded-tr-lg"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5,
          }}
        />
        <motion.div 
          className="absolute bottom-4 left-4 w-20 h-20 border-b-4 border-l-4 border-yellow-400 rounded-bl-lg"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1,
          }}
        />
        <motion.div 
          className="absolute bottom-4 right-4 w-20 h-20 border-b-4 border-r-4 border-yellow-400 rounded-br-lg"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1.5,
          }}
        />
        
        {/* Elemento decorativo flotante solo ⚜️ */}
        <motion.div 
          className="absolute top-8 left-1/2 transform -translate-x-1/2 text-yellow-400 text-3xl opacity-60"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          ⚜️
        </motion.div>
        
        {/* Contenido principal */}
        <motion.div 
          className="relative z-10 text-center text-white px-8 py-16 h-full flex flex-col justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Título principal */}
          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-6 text-yellow-400 drop-shadow-2xl"
            style={{
              textShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4)',
              fontFamily: 'serif'
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{
              textShadow: '0 0 30px rgba(255, 215, 0, 1), 0 0 60px rgba(255, 215, 0, 0.6)',
            }}
          >
            ¡Bienvenid@!
          </motion.h1>

          {/* Línea decorativa */}
          <motion.div 
            className="flex items-center justify-center mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-1/3"></div>
            <motion.div 
              className="mx-4 text-yellow-400 text-xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              ✦
            </motion.div>
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-1/3"></div>
          </motion.div>

          {/* Descripción */}
          <motion.div 
            className="mb-10 space-y-6 max-w-4xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.p 
              className="text-lg md:text-xl leading-relaxed text-gray-100 drop-shadow-lg"
              whileHover={{ color: "#ffffff" }}
            >
              Aquí no solo encontrarás un servidor, sino una <motion.span 
                className="text-yellow-300 font-semibold"
                whileHover={{ color: "#fef08a" }}
              >comunidad comprometida</motion.span> con el rol serio y puro a la antigua, la calidad y las opciones a generar nuevos roles.
            </motion.p>
            
            <motion.p 
              className="text-lg md:text-xl leading-relaxed text-gray-100 drop-shadow-lg"
              whileHover={{ color: "#ffffff" }}
            >
              Nos esforzamos por ofrecerte un entorno donde cada historia cuenta, cada personaje es parte de un todo, y tú eres el <motion.span 
                className="text-yellow-300 font-semibold"
                whileHover={{ color: "#fef08a" }}
              >protagonista de tu propio destino</motion.span>. Explora nuevas posibilidades, vive roles como por ejemplo: bombero, abogado, alcalde o inclusive tener la tienda que siempre deseaste.
            </motion.p>
            
            <motion.p 
              className="text-lg md:text-xl leading-relaxed text-gray-100 drop-shadow-lg"
              whileHover={{ color: "#ffffff" }}
            >
              Desafíate y sumérgete en una ciudad donde tus decisiones marcan la diferencia. <motion.span 
                className="text-yellow-300 font-semibold"
                whileHover={{ color: "#fef08a" }}
              >Lo que imagines, aquí puedes hacerlo realidad</motion.span>.
            </motion.p>
          </motion.div>

          {/* Línea decorativa inferior */}
          <motion.div 
            className="flex items-center justify-center mb-10"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-1/4"></div>
            <div className="mx-4 text-yellow-400 flex space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.span 
                  key={i}
                  animate={{ 
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                >
                  ✦
                </motion.span>
              ))}
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-1/4"></div>
          </motion.div>

          {/* Botón de Inicio */}
          <motion.div 
            className="flex justify-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <motion.button 
              className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white font-bold py-4 px-12 rounded-lg shadow-lg border-2 border-yellow-500 relative overflow-hidden"
              style={{
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
                textShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 30px rgba(255, 215, 0, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('menu')}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0"
                whileHover={{ opacity: 0.2 }}
              />
              <span className="relative z-10">🚪 Iniciar</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;