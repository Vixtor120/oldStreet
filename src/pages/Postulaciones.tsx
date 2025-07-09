import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';

interface PostulacionesProps {
  onNavigate: (page: 'home' | 'menu' | 'normativa' | 'postulaciones' | 'whitelist') => void;
}

interface Postulacion {
  id: string;
  title: string;
  icon: string;
  description: string;
  requirements: string[];
  details?: string;
  status: 'open' | 'closed';
}

const Postulaciones: React.FC<PostulacionesProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<'ooc' | 'ic'>('ooc');

  const oocPostulaciones: Postulacion[] = [
    {
      id: 'staff',
      title: 'Staff',
      icon: '🛡️',
      description: 'Únete al equipo de administración del servidor',
      requirements: [
        'Tener más de 18 años',
        'No tener ninguna sanción',
        'Tener compromiso, ser staff no solamente es llevar un cargo',
        'Ser consciente de que es por voluntad propia, y sin ánimos de lucro, es tu forma de ayudar en la comunidad'
      ],
      details: '',
      status: 'open'
    },
    {
      id: 'streamers',
      title: 'Streamers',
      icon: '🎥',
      description: 'Forma parte de nuestro programa de streamers',
      requirements: [
        'Tener una de las siguientes redes sociales: Twitch (100 seguidores), Kick (100 seguidores), Youtube (100 suscriptores) o TikTok (250 seguidores)',
        'Más de 18 años',
        'Título del contenido: Ejemplo: Old Street RP | +18 | (Y lo que tu quieras…))'
      ],
      details: 'Ventajas:\n• Podrás publicitar y distribuir tu contenido.\n• Podrás solicitar y/o sugerir sobre posibles eventos para creadores de contenido para dar historia a su PJ más emocionante.\n• En conjunto con las administración, se realizará un finde cada mes un sorteo en los contenidos de todos los streammers, así haciendo fluidez entre la expectación.',
      status: 'open'
    }
  ];

  const icPostulaciones: Postulacion[] = [
    {
      id: 'bandas',
      title: 'Bandas',
      icon: '🔫',
      description: 'Crea o únete a una organización criminal',
      requirements: [
        'Ser más de 5 miembros y que sean activos',
        'El líder y el sublíder deberán ser +18',
        'Tener una experiencia previa en el servidor, mínimo 3 horas'
      ],
      details: '',
      status: 'open'
    },
    {
      id: 'lspd',
      title: 'LSPD',
      icon: '👮',
      description: 'Protege y sirve a la ciudad de Los Santos',
      requirements: [
        'Mínimo 21 años de edad',
        'Estatura mínima de 1,75m en hombres y 1,65m en mujeres',
        'Condición física y psicológica buena',
        'Presentación pulcra, peinado neutro y ausencia de barba y tatuajes visibles',
        'Tener licencias vigentes de turismo y motocicleta',
        'No tener antecedentes penales graves ni arrestos',
        'Compromiso de portar armas y en su caso utilizarlas',
        'Tener la nacionalidad sacada y en vigor, no se admiten residentes permanentes',
        'Tener conocimientos previos sobre la información de la LSPD'
      ],
      details: 'La academia de justicia de Los Santos es el órgano competente por parte del estado de San Andreas para la adquisición y formación de futuros aspirantes en cualquiera de las agencias estatales o locales dedicadas a velar por el cumplimiento de la justicia así como de la seguridad y defensa del estado de San Andreas con excepción del ejército.',
      status: 'open'
    },
    {
      id: 'lsmd',
      title: 'LSMD',
      icon: '🚑',
      description: 'Salva vidas como paramédico de Los Santos',
      requirements: [
        'Tener más de 18 años',
        'No tener ninguna sanción',
        'Tener compromiso, ser LSMD no solamente es llevar un cargo',
        'Ser consciente de que es por voluntad propia, y sin ánimos de lucro, es tu forma de ayudar en la comunidad'
      ],
      details: '',
      status: 'open'
    },
    {
      id: 'ayuntamiento',
      title: 'Ayuntamiento',
      icon: '🏛️',
      description: 'Participa en la política y administración de la ciudad',
      requirements: [
        'Experiencia en roleplay político',
        'Habilidades de liderazgo',
        'Conocimiento de leyes ciudadanas',
        'Capacidad de debate'
      ],
      details: '',
      status: 'closed'
    }
  ];

  const PostulacionCard = ({ postulacion, category }: { postulacion: Postulacion, category: 'ooc' | 'ic' }) => (
    <motion.div
      className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-xl p-6 border-2 border-amber-500/30 hover:border-amber-500/60 transition-all duration-300"
      whileHover={{ scale: 1.02, y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <span className="text-4xl mr-4">{postulacion.icon}</span>
        <div>
          <h3 className="text-2xl font-bold text-amber-400">{postulacion.title}</h3>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
            postulacion.status === 'open' 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {postulacion.status === 'open' ? 'Abiertas' : 'Cerradas'}
          </span>
        </div>
      </div>
      
      <p className="text-gray-300 mb-4">{postulacion.description}</p>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-amber-400 mb-2">Requisitos:</h4>
        <ul className="space-y-1">
          {postulacion.requirements.map((req: string, index: number) => (
            <li key={index} className="text-gray-300 flex items-center">
              <span className="text-amber-400 mr-2">•</span>
              {req}
            </li>
          ))}
        </ul>
      </div>

      {postulacion.details && postulacion.details.trim() !== '' && (
        <div className="mb-6 bg-gray-800/50 p-4 rounded-lg border border-amber-500/20">
          <div className="text-gray-300 whitespace-pre-line">{postulacion.details}</div>
        </div>
      )}
      
      <div className="flex justify-center">
        <motion.button
          className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg border-2 border-amber-500"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 20px rgba(245, 158, 11, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          disabled={postulacion.status !== 'open'}
          title={postulacion.status === 'open' ? 'Requiere Whitelist Aprobada' : 'Postulaciones Cerradas'}
        >
          {postulacion.status === 'open' ? 'Postularme (Whitelist Requerida)' : 'Cerradas'}
        </motion.button>
      </div>
    </motion.div>
  );

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
      <Navbar onNavigate={onNavigate} currentPage="postulaciones" />

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
          className="max-w-7xl w-full"
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
              className="text-4xl md:text-5xl font-bold text-amber-400 mb-4"
              style={{
                textShadow: '0 0 20px rgba(245, 158, 11, 0.8)',
              }}
            >
              Postulaciones
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 text-lg max-w-3xl mx-auto mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Únete a nuestro equipo o forma parte de las organizaciones de la ciudad
            </motion.p>

            {/* Aviso importante sobre whitelist */}
            <motion.div 
              className="max-w-4xl mx-auto mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <motion.div 
                className="bg-gradient-to-r from-red-900/80 to-orange-900/80 border-2 border-amber-500 rounded-xl p-6 shadow-2xl relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(245, 158, 11, 0.3)",
                    "0 0 30px rgba(245, 158, 11, 0.6)",
                    "0 0 20px rgba(245, 158, 11, 0.3)"
                  ]
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
              >
                {/* Efecto de brillo animado */}
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
                
                <div className="relative z-10 flex items-center justify-center text-center">
                  <motion.div 
                    className="text-4xl mr-4"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    ⚠️
                  </motion.div>
                  
                  <div>
                    <motion.h3 
                      className="text-2xl font-bold text-amber-400 mb-2"
                      style={{
                        textShadow: '0 0 10px rgba(245, 158, 11, 0.8)',
                      }}
                    >
                      ¡REQUISITO OBLIGATORIO!
                    </motion.h3>
                    
                    <motion.p 
                      className="text-white text-lg font-semibold"
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Debes haber pasado la <span className="text-amber-400 font-bold">WHITELIST</span> antes de poder postularte a cualquier posición
                    </motion.p>
                    
                    <motion.div 
                      className="mt-4"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.button
                        className="bg-gradient-to-r from-amber-600 to-amber-700 text-black font-bold py-3 px-6 rounded-lg shadow-lg border-2 border-amber-500"
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 0 20px rgba(245, 158, 11, 0.6)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onNavigate('whitelist')}
                      >
                        📋 Solicitar Whitelist Ahora
                      </motion.button>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="text-4xl ml-4"
                    animate={{ 
                      rotate: [0, -10, 10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.5
                    }}
                  >
                    ⚠️
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Selector de categorías */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="bg-gray-900/80 rounded-lg p-2 border-2 border-amber-500/30">
                <motion.button
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeCategory === 'ooc' 
                      ? 'bg-amber-500 text-black' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={() => setActiveCategory('ooc')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🛡️ Postulaciones OOC
                </motion.button>
                
                <motion.button
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeCategory === 'ic' 
                      ? 'bg-amber-500 text-black' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={() => setActiveCategory('ic')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🎭 Postulaciones IC
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Contenido de postulaciones */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {activeCategory === 'ooc' ? (
                <div>
                  <motion.h3 
                    className="text-2xl font-bold text-center text-amber-400 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Postulaciones Out of Character (OOC)
                  </motion.h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {oocPostulaciones.map((postulacion, index) => (
                      <motion.div
                        key={postulacion.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <PostulacionCard postulacion={postulacion} category="ooc" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <motion.h3 
                    className="text-2xl font-bold text-center text-amber-400 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Postulaciones In Character (IC)
                  </motion.h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {icPostulaciones.map((postulacion, index) => (
                      <motion.div
                        key={postulacion.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <PostulacionCard postulacion={postulacion} category="ic" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Información adicional */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl p-6 border-2 border-amber-500/30">
              <h4 className="text-xl font-bold text-amber-400 mb-4">📋 Información Importante</h4>
              <div className="text-gray-300 space-y-3">
                <div className="bg-amber-500/10 border-l-4 border-amber-400 p-3 rounded">
                  <p className="text-amber-200 font-semibold">🔸 <span className="text-amber-400">WHITELIST APROBADA</span> es OBLIGATORIA para todas las postulaciones</p>
                </div>
                <p>• Las postulaciones están sujetas a revisión y aprobación del staff</p>
                <p>• Los procesos pueden incluir entrevistas y períodos de prueba</p>
                <p>• Mantente activo en Discord para recibir actualizaciones</p>
                <p>• Cada organización tiene sus propios requisitos adicionales</p>
              </div>
            </div>
          </motion.div>

          {/* Botones de navegación */}
          <motion.div 
            className="flex justify-center gap-6 mt-8 flex-wrap"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <motion.button 
              className="bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg border-2 border-gray-500"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(156, 163, 175, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('menu')}
            >
              🏠 Volver al Menú
            </motion.button>
            
            <motion.button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg border-2 border-blue-500"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('whitelist')}
            >
              📋 Solicitar Whitelist
            </motion.button>

            <motion.a 
              href="https://discord.gg/AGAeg8tt"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg border-2 border-indigo-500 flex items-center gap-2"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.393-.111.804-.21 1.18-.636-.091-1.269-.136-1.898-.136s-1.262.045-1.896.135c-.1-.376-.199-.787-.211-1.18a.077.077 0 0 0-.079-.036c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.183 0-2.157-1.068-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.068-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
              </svg>
              Discord
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Postulaciones;
