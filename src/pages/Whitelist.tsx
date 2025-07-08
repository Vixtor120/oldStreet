import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

interface WhitelistProps {
  onNavigate: (page: 'home' | 'menu' | 'normativa' | 'whitelist') => void;
}

const Whitelist: React.FC<WhitelistProps> = ({ onNavigate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Información Personal
    discord: '',
    edad: '',
    comoEncontrasteServidor: '',
    
    // Experiencia Previa
    queAportaras: '',
    otrosServidores: '',
    porQueElegirte: '',
    
    // Conocimientos de Roleplay
    queEsRoleplay: '',
    loMasImportanteRoleplay: '',
    conceptosPocoComunes: '',
    
    // Situaciones de Roleplay
    situacionSuperdeportivo: '',
    situacionSecuestroPolicía: '',
    situacionPersecucion: '',
    situacionPoliciaCorrupto: '',
    
    // Conocimientos Técnicos
    queEsFairPlay: '',
    expresionMusculo: '',
    comandoDo: '',
    ejemplosEntorno: '',
    rolEntorno: '',
    protocoloViolacion: '',
    
    // Información del Personaje
    nombrePersonaje: '',
    historiaPersonaje: '',
    
    // Términos y Condiciones
    dificultadWhitelist: '0',
    aceptarNormativa: false,
    aceptarRevision: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('./send_whitelist.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert('¡Solicitud enviada exitosamente! Te contactaremos pronto.');
        // Reiniciar formulario
        setFormData({
          discord: '',
          edad: '',
          comoEncontrasteServidor: '',
          queAportaras: '',
          otrosServidores: '',
          porQueElegirte: '',
          queEsRoleplay: '',
          loMasImportanteRoleplay: '',
          conceptosPocoComunes: '',
          situacionSuperdeportivo: '',
          situacionSecuestroPolicía: '',
          situacionPersecucion: '',
          situacionPoliciaCorrupto: '',
          queEsFairPlay: '',
          expresionMusculo: '',
          comandoDo: '',
          ejemplosEntorno: '',
          rolEntorno: '',
          protocoloViolacion: '',
          nombrePersonaje: '',
          historiaPersonaje: '',
          dificultadWhitelist: '0',
          aceptarNormativa: false,
          aceptarRevision: false
        });
      } else {
        throw new Error(result.message || 'Error al enviar la solicitud');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar la solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
      <Navbar onNavigate={onNavigate} currentPage="whitelist" />
      
      {/* Línea dorada */}
      <motion.div 
        className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-8"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      />
      
      <div className="flex-1 w-full flex flex-col items-center justify-center p-4">
        <motion.div 
          className="rounded-xl shadow-2xl border-2 border-yellow-500 max-w-4xl w-full bg-black"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-white px-8 py-12 h-full">
            {/* Título principal */}
            <motion.div 
              className="text-center mb-8"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400"
                style={{
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.8)',
                }}
                whileHover={{
                  textShadow: '0 0 30px rgba(255, 215, 0, 1)',
                }}
              >
                Solicitud de Whitelist
              </motion.h1>
              
              {/* Línea decorativa */}
              <motion.div 
                className="flex items-center justify-center mb-6"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
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
              
              <motion.p 
                className="text-gray-300 text-lg max-w-3xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Complete el formulario para solicitar acceso a nuestro servidor de roleplay
              </motion.p>
            </motion.div>

            {/* Formulario */}
            <motion.form 
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              {/* Información Personal */}
              <motion.div 
                className="bg-gray-900/90 rounded-lg p-6 border-2 border-yellow-500/30"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                whileHover={{ borderColor: "rgba(255, 215, 0, 0.5)" }}
              >
                <motion.h3 
                  className="text-xl font-bold text-yellow-400 mb-4 flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="mr-2">👤</span>
                  Información Personal
                </motion.h3>
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1.8 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Discord: *
                    </label>
                    <p className="text-xs text-gray-400 mb-2">
                      Puedes poner tu nombre de discord o tu ID.
                    </p>
                    <input
                      type="text"
                      name="discord"
                      value={formData.discord}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="usuario#1234"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1.9 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Edad? *
                    </label>
                    <p className="text-xs text-gray-400 mb-2">
                      Sé totalmente sincero, tarde o temprano la gente se entera o en la voz se te nota.
                    </p>
                    <input
                      type="number"
                      name="edad"
                      value={formData.edad}
                      onChange={handleInputChange}
                      required
                      min="13"
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Tu edad"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 2.0 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Cómo encontraste la comunidad? *
                    </label>
                    <select
                      name="comoEncontrasteServidor"
                      value={formData.comoEncontrasteServidor}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    >
                      <option value="" disabled className="bg-gray-900 text-gray-400">
                        Selecciona una opción...
                      </option>
                      <option value="Por las listas de FIVEM" className="bg-gray-900 text-white">
                        Por las listas de FIVEM
                      </option>
                      <option value="Lo vi en alguna red social" className="bg-gray-900 text-white">
                        Lo vi en alguna red social
                      </option>
                      <option value="Por un amigo" className="bg-gray-900 text-white">
                        Por un amigo
                      </option>
                      <option value="Por un streamer" className="bg-gray-900 text-white">
                        Por un streamer
                      </option>
                      <option value="Usuario antiguo" className="bg-gray-900 text-white">
                        Usuario antiguo
                      </option>
                    </select>
                  </motion.div>
                </div>
              </motion.div>

              {/* Experiencia */}
              <motion.div 
                className="bg-gray-900/90 rounded-lg p-6 border-2 border-yellow-500/30"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.1 }}
                whileHover={{ borderColor: "rgba(255, 215, 0, 0.5)" }}
              >
                <motion.h3 
                  className="text-xl font-bold text-yellow-400 mb-4 flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="mr-2">🎮</span>
                  Experiencia
                </motion.h3>
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 2.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Qué crees que podrás aportar en la comunidad? *
                    </label>
                    <textarea
                      name="queAportaras"
                      value={formData.queAportaras}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Describe qué puedes aportar..."
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 2.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿En qué otros servidores estuviste? *
                    </label>
                    <textarea
                      name="otrosServidores"
                      value={formData.otrosServidores}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Menciona tus experiencias anteriores..."
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 2.4 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Por qué te debemos dejar entrar a ti y no a otro? *
                    </label>
                    <textarea
                      name="porQueElegirte"
                      value={formData.porQueElegirte}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Convéncenos de por qué eres especial..."
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Preguntas de Roleplay */}
              <motion.div 
                className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl p-6 border-2 border-yellow-500/30"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.5 }}
                whileHover={{ borderColor: "rgba(255, 215, 0, 0.5)" }}
              >
                <motion.h3 
                  className="text-xl font-bold text-yellow-400 mb-4 flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="mr-2">📝</span>
                  Preguntas de Roleplay
                </motion.h3>
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 2.6 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Para ti qué es el roleplay? *
                    </label>
                    <textarea
                      name="queEsRoleplay"
                      value={formData.queEsRoleplay}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Define qué es el roleplay para ti..."
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 2.7 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Qué dirías que es lo más importante en el roleplay? *
                    </label>
                    <textarea
                      name="loMasImportanteRoleplay"
                      value={formData.loMasImportanteRoleplay}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Explica qué es lo más importante..."
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 2.8 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Di 2 conceptos que no sean muy vistos en el roleplay: *
                    </label>
                    <textarea
                      name="conceptosPocoComunes"
                      value={formData.conceptosPocoComunes}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Menciona 2 conceptos poco comunes..."
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Situaciones de Roleplay */}
              <motion.div 
                className="bg-gray-900/90 rounded-lg p-6 border-2 border-yellow-500/30"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.8 }}
                whileHover={{ borderColor: "rgba(255, 215, 0, 0.5)" }}
              >
                <motion.h3 
                  className="text-xl font-bold text-yellow-400 mb-4 flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="mr-2">🎭</span>
                  Situaciones de Roleplay
                </motion.h3>
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 2.9 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Estás yendo por la montaña con tu superdeportivo y casualmente de la velocidad caes por un precipicio... y tiras un /auxilio... ¿Qué hay mal? *
                    </label>
                    <textarea
                      name="situacionSuperdeportivo"
                      value={formData.situacionSuperdeportivo}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Explica qué está mal en esta situación..."
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 3.0 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Secuestras un policía cuando hay 3 de servicio, tras intentar negociar no acordáis nada y decides matar al policía. ¿Qué hay mal? *
                    </label>
                    <textarea
                      name="situacionSecuestroPolicía"
                      value={formData.situacionSecuestroPolicía}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Explica qué está mal en esta situación..."
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 3.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Estás de persecución y llevas 15 minutos intentándote librar, casualmente se pone un civil en medio así haciendo que colisiones. ¿Cómo actúas ante dicha situación? *
                    </label>
                    <textarea
                      name="situacionPersecucion"
                      value={formData.situacionPersecucion}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Describe cómo actuarías..."
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 3.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tras una larga amistad entablas amistad con un policía y le sugieres que te venda armas de forma ilegal, quedáis con las armas en un lugar y tú le pagas. ¿Qué hay mal? *
                    </label>
                    <textarea
                      name="situacionPoliciaCorrupto"
                      value={formData.situacionPoliciaCorrupto}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Explica qué está mal en esta situación..."
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Preguntas Técnicas */}
              <motion.div 
                className="bg-gray-900/90 rounded-lg p-6 border-2 border-yellow-500/30"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 3.1 }}
                whileHover={{ borderColor: "rgba(255, 215, 0, 0.5)" }}
              >
                <motion.h3 
                  className="text-xl font-bold text-yellow-400 mb-4 flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="mr-2">🔧</span>
                  Preguntas Técnicas
                </motion.h3>
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 3.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Qué es Fair-play? *
                    </label>
                    <textarea
                      name="queEsFairPlay"
                      value={formData.queEsFairPlay}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Define qué es Fair-play..."
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 3.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Puedo usar la expresión "músculo" para referirme a teclas? ¿Cómo le dirías a un jugador qué tecla usar? *
                    </label>
                    <textarea
                      name="expresionMusculo"
                      value={formData.expresionMusculo}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Responde sobre el uso de 'músculo' y cómo comunicar teclas..."
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 3.4 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿El /do sirve para pensar? *
                    </label>
                    <textarea
                      name="comandoDo"
                      value={formData.comandoDo}
                      onChange={handleInputChange}
                      required
                      rows={2}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Explica para qué sirve el comando /do..."
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 3.5 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Pon 2 ejemplos de un /entorno y que no se repitan, es decir que no empiecen ni contengan nada del primer ejemplo. *
                    </label>
                    <textarea
                      name="ejemplosEntorno"
                      value={formData.ejemplosEntorno}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Escribe 2 ejemplos diferentes de /entorno..."
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 3.6 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Para ti qué es el rol de entorno? *
                    </label>
                    <textarea
                      name="rolEntorno"
                      value={formData.rolEntorno}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Explica qué es el rol de entorno..."
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 3.7 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Eres de una banda muy temida, pero tus rivales te secuestran y te violan/te cortan 2 dedos. ¿Está bien hecho, qué protocolos/pautas hay que seguir? *
                    </label>
                    <textarea
                      name="protocoloViolacion"
                      value={formData.protocoloViolacion}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Explica los protocolos para situaciones extremas..."
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Información del Personaje */}
              <motion.div 
                className="bg-gray-900/90 rounded-lg p-6 border-2 border-yellow-500/30"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 3.4 }}
                whileHover={{ borderColor: "rgba(255, 215, 0, 0.5)" }}
              >
                <motion.h3 
                  className="text-xl font-bold text-yellow-400 mb-4 flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="mr-2">🎭</span>
                  Información del Personaje
                </motion.h3>
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 3.8 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nombre de tu personaje: *
                    </label>
                    <input
                      type="text"
                      name="nombrePersonaje"
                      value={formData.nombrePersonaje}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Nombre y apellido del personaje"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 3.9 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Historia de tu personaje: *
                    </label>
                    <p className="text-xs text-gray-400 mb-2">
                      Todos los nuevos personajes deben contar con un presente, es necesario que nos cuente qué hace o que hará su personaje en Los Santos, qué busca en el futuro y si va llevar un rol legal o ilegal. Claramente su historia podría cambiar en el transcurso, por lo que es importante conocer únicamente el presente de su personaje.
                    </p>
                    <textarea
                      name="historiaPersonaje"
                      value={formData.historiaPersonaje}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Cuenta la historia presente de tu personaje..."
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Dificultad y Términos */}
              <motion.div 
                className="bg-gray-900/90 rounded-lg p-6 border-2 border-yellow-500/30"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 4.0 }}
                whileHover={{ borderColor: "rgba(255, 215, 0, 0.5)" }}
              >
                <motion.h3 
                  className="text-xl font-bold text-yellow-400 mb-4 flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="mr-2">⚖️</span>
                  Términos y Condiciones
                </motion.h3>
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 4.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Qué dificultad crees que está la whitelist?
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        name="dificultadWhitelist"
                        min="0"
                        max="10"
                        value={formData.dificultadWhitelist}
                        onChange={handleInputChange}
                        className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #eab308 0%, #eab308 ${(parseInt(formData.dificultadWhitelist) / 10) * 100}%, #374151 ${(parseInt(formData.dificultadWhitelist) / 10) * 100}%, #374151 100%)`
                        }}
                      />
                      <span className="text-yellow-400 font-bold text-lg min-w-[2rem]">
                        {formData.dificultadWhitelist}
                      </span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 4.2 }}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="aceptarNormativa"
                        checked={formData.aceptarNormativa}
                        onChange={(e) => setFormData(prev => ({ ...prev, aceptarNormativa: e.target.checked }))
                        }
                        className="mt-1 w-5 h-5 text-yellow-400 bg-gray-800 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
                        required
                      />
                      <label className="text-sm text-gray-300">
                        <span className="text-yellow-400">*</span> Acepto la normativa, los derechos de la comunidad y mis derechos como usuario.
                      </label>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 4.3 }}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="aceptarRevision"
                        checked={formData.aceptarRevision}
                        onChange={(e) => setFormData(prev => ({ ...prev, aceptarRevision: e.target.checked }))
                        }
                        className="mt-1 w-5 h-5 text-yellow-400 bg-gray-800 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
                        required
                      />
                      <label className="text-sm text-gray-300">
                        <span className="text-yellow-400">*</span> Acepto que la whitelist podrá ser revisada con una espera de tiempo, ya que se corrigen a mano por un STAFF.
                      </label>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Botones */}
              <motion.div 
                className="flex justify-center space-x-4 pt-4"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 4.0 }}
              >
                <motion.button 
                  type="button"
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg border-2 border-gray-500 relative overflow-hidden"
                  onClick={() => onNavigate('menu')}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(156, 163, 175, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-500 opacity-0"
                    whileHover={{ opacity: 0.2 }}
                  />
                  <span className="relative z-10">🏠 Volver al Menú</span>
                </motion.button>
                
                <motion.button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-gradient-to-r ${isSubmitting ? 'from-gray-600 to-gray-700' : 'from-yellow-600 to-yellow-700'} text-white font-bold py-3 px-8 rounded-lg shadow-lg border-2 ${isSubmitting ? 'border-gray-500' : 'border-yellow-500'} relative overflow-hidden ${isSubmitting ? 'cursor-not-allowed' : ''}`}
                  style={{
                    boxShadow: isSubmitting ? '0 0 20px rgba(156, 163, 175, 0.3)' : '0 0 20px rgba(255, 215, 0, 0.3)',
                    textShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
                  }}
                  whileHover={!isSubmitting ? {
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(255, 215, 0, 0.5)",
                  } : {}}
                  whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                >
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-r ${isSubmitting ? 'from-gray-400 to-gray-500' : 'from-yellow-400 to-yellow-600'} opacity-0`}
                    whileHover={!isSubmitting ? { opacity: 0.2 } : {}}
                  />
                  <span className="relative z-10">
                    {isSubmitting ? '📤 Enviando...' : '📤 Enviar Solicitud'}
                  </span>
                </motion.button>
              </motion.div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Whitelist;
