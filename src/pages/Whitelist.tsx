import React, { useState } from 'react';
import Navbar from '../components/Navbar';

interface WhitelistProps {
  onNavigate: (page: 'home' | 'menu' | 'normativa' | 'whitelist') => void;
}

const Whitelist: React.FC<WhitelistProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    discord: '',
    age: '',
    howFound: '',
    contribution: '',
    otherServers: '',
    whyChooseYou: '',
    whatIsRoleplay: '',
    mostImportantRoleplay: '',
    twoUncommonConcepts: '',
    situationSupercar: '',
    situationKidnapPolice: '',
    situationPersecution: '',
    situationCorruptPolice: '',
    whatIsFairPlay: '',
    muscleExpression: '',
    doCommand: '',
    environmentExamples: '',
    environmentRole: '',
    violationProtocol: '',
    characterName: '',
    characterHistory: '',
    whitelistDifficulty: '0',
    acceptRules: false,
    acceptReview: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Solicitud de whitelist enviada:', formData);
    alert('¡Solicitud enviada exitosamente! Te contactaremos pronto.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
      <Navbar onNavigate={onNavigate} currentPage="whitelist" />
      
      <div className="flex-1 w-full flex flex-col items-center justify-center p-4">
        <div className="rounded-xl shadow-2xl border-2 border-yellow-500 max-w-4xl w-full bg-black">
          <div className="text-white px-8 py-12 h-full">
            {/* Título principal */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400">
                Solicitud de Whitelist
              </h1>
              
              {/* Línea decorativa */}
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-1/3"></div>
                <div className="mx-4 text-yellow-400 text-xl">
                  ✦
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent w-1/3"></div>
              </div>
              
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Complete el formulario para solicitar acceso a nuestro servidor de roleplay
              </p>
            </div>

            {/* Formulario */}
            <form 
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Información Personal */}
              <div className="bg-gray-900/90 rounded-lg p-6 border-2 border-yellow-500/30">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
                  <span className="mr-2">👤</span>
                  Información Personal
                </h3>
                
                <div className="space-y-4">
                  <div>
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
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Edad? *
                    </label>
                    <p className="text-xs text-gray-400 mb-2">
                      Sé totalmente sincero, tarde o temprano la gente se entera o en la voz se te nota.
                    </p>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      min="13"
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Tu edad"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Cómo encontraste la comunidad? *
                    </label>
                    <select
                      name="howFound"
                      value={formData.howFound}
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
                  </div>
                </div>
              </div>

              {/* Experiencia */}
              <div className="bg-gray-900/90 rounded-lg p-6 border-2 border-yellow-500/30">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
                  <span className="mr-2">🎮</span>
                  Experiencia
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Qué crees que podrás aportar en la comunidad? *
                    </label>
                    <textarea
                      name="contribution"
                      value={formData.contribution}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Describe qué puedes aportar..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿En qué otros servidores estuviste? *
                    </label>
                    <textarea
                      name="otherServers"
                      value={formData.otherServers}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Menciona tus experiencias anteriores..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Por qué te debemos dejar entrar a ti y no a otro? *
                    </label>
                    <textarea
                      name="whyChooseYou"
                      value={formData.whyChooseYou}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Convéncenos de por qué eres especial..."
                    />
                  </div>
                </div>
              </div>

              {/* Preguntas de Roleplay */}
              <div className="bg-gray-900/90 rounded-lg p-6 border-2 border-yellow-500/30">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
                  <span className="mr-2">📝</span>
                  Preguntas de Roleplay
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Para ti qué es el roleplay? *
                    </label>
                    <textarea
                      name="whatIsRoleplay"
                      value={formData.whatIsRoleplay}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Define qué es el roleplay para ti..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Qué dirías que es lo más importante en el roleplay? *
                    </label>
                    <textarea
                      name="mostImportantRoleplay"
                      value={formData.mostImportantRoleplay}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Explica qué es lo más importante..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Di 2 conceptos que no sean muy vistos en el roleplay: *
                    </label>
                    <textarea
                      name="twoUncommonConcepts"
                      value={formData.twoUncommonConcepts}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Menciona 2 conceptos poco comunes..."
                    />
                  </div>
                </div>
              </div>

              {/* Situaciones de Roleplay */}
              <div className="bg-gray-900/90 rounded-lg p-6 border-2 border-yellow-500/30">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
                  <span className="mr-2">🎭</span>
                  Situaciones de Roleplay
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Estás yendo por la montaña con tu superdeportivo y casualmente de la velocidad caes por un precipicio... y tiras un /auxilio... ¿Qué hay mal? *
                    </label>
                    <textarea
                      name="situationSupercar"
                      value={formData.situationSupercar}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Explica qué está mal en esta situación..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Secuestras un policía cuando hay 3 de servicio, tras intentar negociar no acordáis nada y decides matar al policía. ¿Qué hay mal? *
                    </label>
                    <textarea
                      name="situationKidnapPolice"
                      value={formData.situationKidnapPolice}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Explica qué está mal en esta situación..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Estás de persecución y llevas 15 minutos intentándote librar, casualmente se pone un civil en medio así haciendo que colisiones. ¿Cómo actúas ante dicha situación? *
                    </label>
                    <textarea
                      name="situationPersecution"
                      value={formData.situationPersecution}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Describe cómo actuarías..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tras una larga amistad entablas amistad con un policía y le sugieres que te venda armas de forma ilegal, quedáis con las armas en un lugar y tú le pagas. ¿Qué hay mal? *
                    </label>
                    <textarea
                      name="situationCorruptPolice"
                      value={formData.situationCorruptPolice}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Explica qué está mal en esta situación..."
                    />
                  </div>
                </div>
              </div>

              {/* Preguntas Técnicas */}
              <div className="bg-gray-900/90 rounded-lg p-6 border-2 border-yellow-500/30">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
                  <span className="mr-2">🔧</span>
                  Preguntas Técnicas
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Qué es Fair-play? *
                    </label>
                    <textarea
                      name="whatIsFairPlay"
                      value={formData.whatIsFairPlay}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Define qué es Fair-play..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Puedo usar la expresión "músculo" para referirme a teclas? ¿Cómo le dirías a un jugador qué tecla usar? *
                    </label>
                    <textarea
                      name="muscleExpression"
                      value={formData.muscleExpression}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Responde sobre el uso de 'músculo' y cómo comunicar teclas..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿El /do sirve para pensar? *
                    </label>
                    <textarea
                      name="doCommand"
                      value={formData.doCommand}
                      onChange={handleInputChange}
                      required
                      rows={2}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Explica para qué sirve el comando /do..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Pon 2 ejemplos de un /entorno y que no se repitan, es decir que no empiecen ni contengan nada del primer ejemplo. *
                    </label>
                    <textarea
                      name="environmentExamples"
                      value={formData.environmentExamples}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Escribe 2 ejemplos diferentes de /entorno..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Para ti qué es el rol de entorno? *
                    </label>
                    <textarea
                      name="environmentRole"
                      value={formData.environmentRole}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Explica qué es el rol de entorno..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Eres de una banda muy temida, pero tus rivales te secuestran y te violan/te cortan 2 dedos. ¿Está bien hecho, qué protocolos/pautas hay que seguir? *
                    </label>
                    <textarea
                      name="violationProtocol"
                      value={formData.violationProtocol}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Explica los protocolos para situaciones extremas..."
                    />
                  </div>
                </div>
              </div>

              {/* Información del Personaje */}
              <div className="bg-gray-900/90 rounded-lg p-6 border-2 border-yellow-500/30">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
                  <span className="mr-2">🎭</span>
                  Información del Personaje
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nombre de tu personaje: *
                    </label>
                    <input
                      type="text"
                      name="characterName"
                      value={formData.characterName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Nombre y apellido del personaje"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Historia de tu personaje: *
                    </label>
                    <p className="text-xs text-gray-400 mb-2">
                      Todos los nuevos personajes deben contar con un presente, es necesario que nos cuente qué hace o que hará su personaje en Los Santos, qué busca en el futuro y si va llevar un rol legal o ilegal. Claramente su historia podría cambiar en el transcurso, por lo que es importante conocer únicamente el presente de su personaje.
                    </p>
                    <textarea
                      name="characterHistory"
                      value={formData.characterHistory}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Cuenta la historia presente de tu personaje..."
                    />
                  </div>
                </div>
              </div>

              {/* Dificultad y Términos */}
              <div className="bg-gray-900/90 rounded-lg p-6 border-2 border-yellow-500/30">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
                  <span className="mr-2">⚖️</span>
                  Términos y Condiciones
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ¿Qué dificultad crees que está la whitelist?
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        name="whitelistDifficulty"
                        min="0"
                        max="10"
                        value={formData.whitelistDifficulty}
                        onChange={handleInputChange}
                        className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #eab308 0%, #eab308 ${(parseInt(formData.whitelistDifficulty) / 10) * 100}%, #374151 ${(parseInt(formData.whitelistDifficulty) / 10) * 100}%, #374151 100%)`
                        }}
                      />
                      <span className="text-yellow-400 font-bold text-lg min-w-[2rem]">
                        {formData.whitelistDifficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="acceptRules"
                        checked={formData.acceptRules}
                        onChange={(e) => setFormData(prev => ({ ...prev, acceptRules: e.target.checked }))
                        }
                        className="mt-1 w-5 h-5 text-yellow-400 bg-gray-800 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
                        required
                      />
                      <label className="text-sm text-gray-300">
                        <span className="text-yellow-400">*</span> Acepto la normativa, los derechos de la comunidad y mis derechos como usuario.
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="acceptReview"
                        checked={formData.acceptReview}
                        onChange={(e) => setFormData(prev => ({ ...prev, acceptReview: e.target.checked }))
                        }
                        className="mt-1 w-5 h-5 text-yellow-400 bg-gray-800 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
                        required
                      />
                      <label className="text-sm text-gray-300">
                        <span className="text-yellow-400">*</span> Acepto que la whitelist podrá ser revisada con una espera de tiempo, ya que se corrigen a mano por un STAFF.
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-center space-x-4 pt-4">
                <button 
                  type="button"
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg border-2 border-gray-500 relative overflow-hidden"
                  onClick={() => onNavigate('menu')}
                >
                  <span className="relative z-10">🏠 Volver al Menú</span>
                </button>
                
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg border-2 border-yellow-500 relative overflow-hidden"
                  style={{
                    boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
                    textShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <span className="relative z-10">📤 Enviar Solicitud</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whitelist;
