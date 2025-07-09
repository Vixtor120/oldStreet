import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

interface NormativaProps {
  onNavigate: (page: 'home' | 'menu' | 'normativa' | 'postulaciones' | 'whitelist') => void;
}

const ImportantNote = () => (
  <div className="bg-amber-500/10 border-l-4 border-amber-400 p-4 rounded mb-8">
    <p className="text-lg text-amber-100 font-semibold">¡Importante!</p>
    <p className="text-gray-300">No tener conocimiento de las mismas no te exime de no tener que cumplirlas, y si hay cambios, son anunciados.</p>
  </div>
);

const Normativa: React.FC<NormativaProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('generales');

  const tabs = [
    { id: 'generales', label: 'Generales', icon: '📝' },
    { id: 'ilegales', label: 'Ilegales', icon: '🚫' },
    { id: 'discord', label: 'Discord', icon: '💬' },
    { id: '18', label: '-18', icon: '🔞' },
    { id: 'streamers', label: 'Streamers', icon: '🎬' },
    { id: 'atracos', label: 'Atracos', icon: '💰' },
    { id: 'legales', label: 'Legales', icon: '⚖️' },
  ];

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
      <Navbar onNavigate={onNavigate} currentPage="normativa" />

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
          {/* Título y descripción */}
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.h2 
              className="text-4xl font-bold text-amber-400 mb-4"
              style={{
                textShadow: '0 0 20px rgba(251, 191, 36, 0.8)',
              }}
            >
              Normativa del Servidor
            </motion.h2>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-2 mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white border-2 border-amber-500'
                      : 'bg-gray-800/50 text-gray-300 border-2 border-gray-700 hover:border-amber-400 hover:text-amber-400'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Contenido de la normativa */}
          <motion.div 
            className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl p-8 backdrop-blur-sm border-2 border-amber-500/30 mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {activeTab === 'generales' ? (
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ImportantNote />

                {/* 0.1 - Nombres */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    0.1 - Nombres
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Está prohibido ponerse nombres de gente conocida o ya existente.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Queda altamente prohibido el uso de nombres troll o con doble sentido... (Elva Ginon, Benito Camela, etc etc...)
                    </p>
                  </motion.div>
                </div>
                
                {/* 0.2 - Expresiones y bugs */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    0.2 - Expresiones y bugs
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Está totalmente prohibido usar expresiones como «me lavo la cara» «con qué músculo» «fuera de mente» o «ya llega la tormenta» entre otros varios.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Si experimentas un bug [Y NO DECIR ESTÁ BUGATTI...], lo que se debe hacer es interpretar ese bugg como algo en la vida real.
                    </p>
                    <div className="pl-6 mt-2 text-gray-400 italic">
                      Ejemplo: Que el coche se te cierre y no te deja abrirlo, pues entonces roleas que se te quedaron las llaves en el interior.
                    </div>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Todo bugg indistintamente del beneficio es un bugg, lo que quiere decir que lo sancionaremos.
                    </p>
                  </motion.div>
                </div>

                {/* 0.3 - Interpretación de personaje */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    0.3 - Interpretación de personaje
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      La interpretación es muy importante, recuerda no salirte de tu PJ bajo ningún concepto es decir, si estás en una banda recuerda que la vida lujosa está muy lejos de tí y debe ser algo progresivo.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Características de tu PJ debes llevarlas a rajatabla, no nos sirve que empieces siendo chino y termines siendo gitano.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Si interpretas un personaje por ejemplo gitano o chino deberás llevar sus costumbres y tradiciones.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Si eres banda, recuerda llevar muy bien tu IDP por la sencilla razón de que si la policía te pilla muchas veces podrían tramitar un CK policial, así que no busques a la policía.
                    </p>
                  </motion.div>
                </div>

                {/* 0.4 - Fairplay */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    0.4 - Fairplay
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      En el role-play nadie gana, es decir para que haya una diversión mutua deberás perder al igual que tendrás momentos de ganar es importante que haya igualdad en todos los roles que se generen.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      La administración tiene el poder autoritario para modificar y/o interrumpir cualquier rol, siempre y cuando sea por el bien del beneficiario ejemplo: Para orientar y/o dar rol a una persona o darle forma a la historia que vosotros mismos estaréis creando.
                    </p>
                  </motion.div>
                </div>

                {/* 0.5 - Valoración de vida */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    0.5 - Valoración de vida
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Tenemos que tener en cuenta que el role-play es una forma de vivir en una segunda vida, con limitaciones y sin dejar de saber que no deja de ser un juego, pero para la diversión en su totalidad se deberá valorar vida de tu PJ como si fuera la tuya.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Esto también entrará el uso de niveles de armas, enfrentarte contra un subfusil con pistolas, cuchillos con pistolas etc... etc... la superioridad de armas, existe.
                    </p>
                  </motion.div>
                </div>

                {/* 0.6 - Forzar y evadir rol */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    0.6 - Forzar y evadir rol
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No permitiremos ninguna forma de forzar el rol, como por ejemplo molestar a una chica que no conoces de nada por el echo de ser una chica o con la policía por aburrimiento.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Si te desconectas en medio de un rol, no se permité usar los metodos OOC para que te esperen, pasas automaticamente a estar fuera de rol y ese rol ya no existe para tí, roleas quedarte insconsciente e incluso abandonar la zona desconociendo tus motivos para estar ahí...)
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Empezar con un rol agresivo a una persona sin motivo se catalogará como forzar rol.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Hacer una llamada falsa se considerará forzar rol y está prohibído.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Quedarse AFK en medio de un rol, o escondido en un rol se considerará evasion de rol.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Queda totalmente prohibido el uso de objetos inventados, si tu no tienes x objeto en tu inventario no puedes hacer como si lo tuvieras. Por ejemplo el uso de pastillas, vendas para tapar los ojos, mordazas, etc.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      El uso de los dados es obligatorio para evitar forzar roles, los dados están creados para que haya igualdad entre ambos, el uso correcto seria el siguiente:
                    </p>
                    <div className="pl-6 mt-2 text-gray-400">
                      – /me le intenta coger del cuello.<br/>
                      – /do ¿Podria?<br/>
                      Ahora ambos tiran dados, y el numero mayor seria quien ganaría el rol a su favor.
                    </div>
                  </motion.div>
                </div>

                {/* 0.7 - Roles de violaciones y amputaciones */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    0.7 - Roles de violaciones y amputaciones
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Queda altamente prohibido hacerlo sin consentimiento ni pactarlo con los que participen.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Se debe avisar a la administración y luego a los participantes.
                    </p>
                  </motion.div>
                </div>

                {/* 0.8 - Tercera persona */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    0.8 - Tercera persona
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Queda altamente prohibido hacer uso de tercera persona, en tiroteos con interacción de sacar información/posición de tu rival etc...
                    </p>
                  </motion.div>
                </div>

                {/* 0.9 - Interpretación de vehículos */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    0.9 - Interpretación de vehículos
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Deberás seguir las físicas y la lógica cuando vayas en un vehículo por ejemplo si estás conduciendo no podrás ir apuntando a una persona sin darle fair-play a que te tire el rol agresivo y te gané...
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Un vehículo con 1 rueda pinchada, podrá seguir su camino pero con reducción de velocidad, deberá ir a 100km/h máximo.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Un vehículo con 2 ruedas pinchadas, no podrá seguir su camino, deberá parar el vehículo o rolear un choque.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Todo choque se debe rolear a no ser que sea leve, como una rozadura con una pared todo dependerá a qué velocidad vaya también el vehículo.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No está permitido el comienzo de roles agresivos en vehículos.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Queda prohibido disparar a más de 35 km/h desde un vehículo y no se permite matar desde el vehículo.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ) : activeTab === 'ilegales' ? (
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ImportantNote />

                {/* 4.0 - Uso de fuerza */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    4.0 - Uso de fuerza
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Deberás valorar las armas, tu reputación y todo lo que ello conlleva. Por ejemplo: si ves a un CIVIL que te increpa o te insulta, no deberías ser tan torpe de sacar un arma sin más, o asustarle o hacerle daño.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Debes priorizar que tu estás en otro rango que cualquier civil, y no están a tu altura, podrias llamar la atencíon en una situación irrelevante para tu organización y perjudicarla.
                    </p>
                  </motion.div>
                </div>

                {/* 4.1 - Campeos y robos a grupos débiles */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    4.1 - Campeos y robos a grupos débiles
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Queda prohibido campear zonas, campear puntos y todo lo relacionado con este juego sucio. Debes ser legal y espontáneo (fairplay).
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Queda prohibido el NA (Noob Abuse) «Abuso de un Novato», es decir: robándole, obligándole a sacar dinero, pidiendo que use comandos para salir beneficiado, forzar a hacer algo en menús de interacciones o en cualquier otro abuso de está índole. Se le deberá dar un tiempo prudencial de adaptación.
                    </p>
                    <div className="bg-red-500/10 border-l-4 border-red-400 p-4 mt-4 rounded">
                      <p className="text-red-300">
                        <span className="font-semibold text-red-200">AVISO:</span> Este es el principio básico del fairplay, no se puede quitar lo poco que tiene a alguien que acaba de empezar en la ciudad. Si esto se produce, podría haber una investigación por parte de la administración para sancionar a los infractores.
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* 4.2 - Alcantarillas */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    4.2 - Alcantarillas
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Es un punto caliente, se podrá matar sin previo aviso y sin mandar entornos, por rol seria una zona altamente prohibida para todos con lo cual la policía te podría interceptar.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Se deberá enviar entorno al entrar por una alcantarilla y al salir de ella.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      La policía deberá mantener la compostura y no podrá ir a zona ni transitar dicha zona como si nada, excepto que se monte una redada.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No se podrá usar como método de huida, ni secuestros que no se hayan generado dentro.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No se puede forzar el entrar a una persona para fines de beneficios de punto caliente.
                    </p>
                  </motion.div>
                </div>

                {/* 4.3 - Fronteras y saltos de valla */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    4.3 - Fronteras y saltos de valla
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Si saltas una valla o encuentras un punto, debes tener en cuenta que estarán vigilando con cámaras constantemente. Si hay cámaras deberás enviar el entorno.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Si saltas el control a mucha velocidad, o apenas sin parar o saltándotelo deberás enviar entorno.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ) : activeTab === 'discord' ? (
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ImportantNote />

                {/* 1.0 - Respeto y convivencia */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    1.0 - Respeto y convivencia
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No se tolerarán faltas de respeto, insultos, lenguaje ofensivo, racismo, sexismo, homofobia o cualquier tipo de discriminación.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Cualquier forma de acoso, amenazas o bullying está completamente prohibido.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Está prohibido ponerse nombres de personas conocidas o troll.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Si surge un conflicto con otro usuario, intenta solucionarlo de manera pacífica, en caso necesario, contacta con un miembro del staff.
                    </p>
                  </motion.div>
                </div>

                {/* 1.1 - Uso de chat */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    1.1 - Uso de chat
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No está permitido compartir contenido para adultos, violento o de mal gusto en el servidor.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Está prohibido hacer spam, enviar mensajes excesivos o irrelevantes en los canales.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No se permite la promoción de otros servidores, canales o productos sin permiso del staff.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Cada canal tiene una finalidad, se borrará todo mensaje que no tenga nada que ver en el canal que sea.
                    </p>
                  </motion.div>
                </div>

                {/* 1.2 - Uso de micrófonos */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    1.2 - Uso de micrófonos
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Usa el micrófono de manera responsable, sin gritar o hacer ruidos molestos.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Asegúrate de tener un ambiente silencioso para no interrumpir a los demás jugadores con ruido de fondo.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Respeta el turno de palabra y deja a los demás hablar respetando.
                    </p>
                  </motion.div>
                </div>

                {/* 1.3 - Comparticiones */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    1.3 - Comparticiones
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Queda prohibido compartir otros servidores.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Cosas hardcore y/o sexuales.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Redes sociales de otras personas sin consentimientos.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ) : activeTab === '18' ? (
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-amber-400">
                    Normativa para Menores de 18 años
                  </h2>
                  <p className="text-gray-400 mt-2">
                    Reglas específicas para usuarios menores de edad
                  </p>
                </div>
                
                <ImportantNote />
                
                {/* 2.0 - Propiedad de facciones y bandas */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    2.0 - Propiedad de facciones y bandas
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Los menores de edad no podrán ser propietarios o líderes de alguna facción o banda.
                    </p>
                  </motion.div>
                </div>

                {/* 2.1 - Incremento de sanciones */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    2.1 - Incremento de sanciones
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Todos los reportes que involucren a menores de edad recibirán sanciones con un incremento de x2 en comparación que los demás jugadores o inclusive dependiendo de la consideración del STAFF podrá ser expulsado.
                    </p>
                  </motion.div>
                </div>

                {/* 2.2 - Prohibición de donaciones */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    2.2 - Prohibición de donaciones
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Los menores de edad no podrán realizar ningún tipo de donación al servidor.
                    </p>
                  </motion.div>
                </div>

                {/* 2.3 - Supervisión staff */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    2.3 - Supervisión staff
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Los menores de edad estarán bajo una supervisión más estricta por parte del staff. Si se detectan comportamientos inapropiados, las sanciones podrán ser más severas.
                    </p>
                  </motion.div>
                </div>

                {/* 2.4 - Roles agresivos y sexuales */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    2.4 - Roles agresivos y sexuales
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Queda prohibido que los menores participen en roles de sexuales y/o amputaciones.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ) : activeTab === 'streamers' ? (
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ImportantNote />

                {/* 3.0 - Reportes a streamers */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    3.0 - Reportes a streamers
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Si eres reportado o reportas deberás cerrar el stream, pausarlo o poner pantalla de espera y sin audio hasta que el reporte finalice. Esto es de estricta obligación.
                    </p>
                  </motion.div>
                </div>

                {/* 3.1 - Streams */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    3.1 - Streams
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Todo contenido deberá quedar resubido y pregrabado y no podrán ser modificados y/o borrados de lo contrario se tomará como una infracción.
                    </p>
                  </motion.div>
                </div>

                {/* 3.2 - Mínimos */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    3.2 - Mínimos
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      El directo o el contenido deberá tener un mínimo de 1 hora jugando al servidor, si lo promociones en el servidor de discord, no podrás ir a jugar a otro juego antes de que pase dicho tiempo.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Deberás hacer contenido antes de pasar 15 días inactivo o sin dar presencia de contenido, si se pasa dicha inactividad se deberá volver a pedir el rol.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Cambiar el titulo del contenido que no tenga relacion con OldStreet, será necesario cambiar el titulo del directo por razones obvias.
                    </p>
                  </motion.div>
                </div>

                {/* 3.3 - Incumplimientos */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    3.3 - Incumplimientos
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Cualquier incumplimiento de la normativa estando en directo o en algún contenido que publiques, ten en cuenta que la sanción podría ser mayor y se te podrá retirar el cargo de creador contenido, o llegados al caso, la expulsión del servidor.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ) : activeTab === 'atracos' ? (
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ImportantNote />

                {/* 5.0 - Actos delictivos generales */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    5.0 - Actos delictivos generales
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Todo tipo de rol ilegal, debe ser avisado para comprobar la disponibilidad de la policia. Ya que si no son suficientes, el rol no podria llevarse a cabo para ello existe el /polidispo.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      La policía tiene el derecho de anunciar la cancelación de un atraco en caso de que sea estrictamente necesario. Los atracadores deberán cancelar el rol iniciado, en caso de haber robado el botín y el robo sea cancelado, deberás notificar a la administración mediante un reporte, y se encargará de retirar el botín del inventario.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Siempre la policía deberá ser uno más que los atracadores.
                    </p>
                  </motion.div>
                </div>

                {/* 5.1 - Entornos */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    5.1 - Entornos
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      En todo los robos se deberá enviar un entorno indicando la siguiente información:
                    </p>
                    <div className="pl-8 space-y-2">
                      <p>⦁ Cuántos atracadores son.</p>
                      <p>⦁ Qué vehículo utilizan y el color del mismo.</p>
                      <p>⦁ Cuántos rehenes hay involucrados.</p>
                      <p>⦁ Vestimenta de los sujetos e intentando describir los colores.</p>
                      <p>⦁ Con qué armas están equipados.</p>
                    </div>
                    <div className="bg-gray-800/50 border-l-4 border-amber-400 p-4 mt-4 rounded">
                      <p className="text-gray-300">
                        <span className="font-semibold text-amber-400">EJEMPLO:</span> ¡Ayuda, soy Frank Jones, pasaba por la tienda de mi amigo y vi a un encapuchado con chaqueta negra y un bate entrar en la tienda y está amenazando a mi amigo. Llegó con una moto bati negra, y también lleva gorra azul y pantalones militares. ¡QUE VENGA ALGUIEN, AYUDA!
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* 5.2 - Tiempo de huida */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    5.2 - Tiempo de huida
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Para poder desconectarte deberás esperar 20 minutos, para dar fairplay a la policia.
                    </p>
                    <div className="bg-red-500/10 border-l-4 border-red-400 p-4 rounded">
                      <p className="text-red-300">
                        <span className="font-semibold text-red-200">AVISO:</span> Con esto último, avisamos que contamos con logs que nos muestran si lo haces.
                      </p>
                    </div>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Esto también aplica a roles agresivos con bandas u otras opciones, se debe esperar escondido.
                    </p>
                  </motion.div>
                </div>

                {/* 5.3 - Robo a personas */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    5.3 - Robo a personas
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Queda prohibido robo de comida o bebida.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No se puede obligar a nadie a sacar dinero del banco, ni robar en una zona de menú. (Ejemplo cuando alguien se cambia de ropa.)
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No se permite el robo a trabajadores que estén en su puesto trabajando o cercanias. (Se sabe claramente por la ropa del sujeto.)
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Si esposas a alguien para robarle (o un rol similar), asegúrate de quitarle las esposas después, de lo contrario podria incurrir en una sancion.
                    </p>
                  </motion.div>
                </div>

                {/* 5.4 - Badulaques, licorerías y gasolineras */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    5.4 - Badulaques, licorerías y gasolineras
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Para realizar un atraco serán necesarios como mínimo +2 policías de servicio.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Solo podrá haber un máximo de 2 atracadores.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No pueden haber tiradores ni bloqueos.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Los rehenes se rolean con los dados en esté caso con el policía cuando te pregunte ... ¿Cuántos rehenes tienes? deberás tirar dados y el policía también, si ganas tú tienes 2 rehenes, y si gana la policía tendrías 1.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No están autorizado el uso de cascos.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Las armas autorizadas son: cuerpo a cuerpo y pistolas.
                    </p>
                  </motion.div>
                </div>

                {/* 5.5 - Robos de vehículos */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    5.5 - Robos de vehículos
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Queda altamente prohibido el robo a vehículos del gobierno (incluyendo EMS, FBI, etc). La única excepción debe ser por motivo de peso, y que sea tu última salvación u opción. Se deberá rolear el GPS y las cámaras de la misma.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Al robar un vehículo se deberá tirar /forzar obligatoriamente.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Queda prohibido robar un vehículo sin motivo de peso o sin motivos previos.
                    </p>
                  </motion.div>
                </div>

                {/* 5.6 - Robos de ATM's */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    5.6 - Robos de ATM's
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Se podrán realizar cuando hayan +2 agentes de servicio.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Solo podrá haber un máximo de 1 atracador.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No se pueden hacer bloqueos ni tener tiradores.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No está autorizado el uso de cascos.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Las armas que se podrán usar son: cuerpo a cuerpo o pistolas.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No se tiene por qué esperar a la policía.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Se deberá enviar el entorno antes de hacer el atraco.
                    </p>
                  </motion.div>
                </div>

                {/* 5.7 - Joyería y casa de empeños */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    5.7 - Joyería y casa de empeños
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Necesarios como mínimo 4 policías disponibles y máximo 6 policías.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Solo podrá haber un máximo de 4 atracadores.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Podrá haber 1 tirador o bloqueo por parte de ambos bandos, colocado en una zona alta. El tirador solo puede usar pistola.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Las armas que se podrán usar son: cuerpo a cuerpo, pistolas y escopetas.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Se pueden secuestrar un máximo de 3 rehenes (NPC).
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No está autorizado el uso de cascos.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Se deberá esperar a la policía para negociar una vez que se consiga el botín.
                    </p>
                  </motion.div>
                </div>

                {/* 5.8 - Furgón */}
                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-bold text-amber-400 mb-4"
                    style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
                  >
                    5.8 - Furgón
                  </motion.h3>
                  <motion.div 
                    className="space-y-3 text-gray-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Serán necesarios como mínimo +3 policías de servicio y se debe indicar en el entorno cuántos sois.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No hay negociación.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No se podrá abatir al miembro el cual esté forzando la puerta.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No hay límite de participantes.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No está autorizado el uso de cascos.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Las armas que se podrán usar son: cuerpo a cuerpo, pistolas y escopetas.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      No se deberá esperar a la policía.
                    </p>
                    <p className="flex items-start">
                      <span className="text-amber-400 mr-2">≻</span>
                      Se deberá enviar el entorno antes de hacer el furgón.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="text-6xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🚧
                </motion.div>
                <h3 className="text-2xl font-bold text-amber-400 mb-4">Sección en construcción</h3>
                <p className="text-gray-300">Esta sección estará disponible próximamente</p>
              </motion.div>
            )}
          </motion.div>

          {/* Botones de navegación */}
          <motion.div 
            className="flex justify-center gap-6 mt-8 flex-wrap"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
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
            
            <motion.button 
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg border-2 border-purple-500"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('postulaciones')}
            >
              📝 Ver Postulaciones
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
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Unirse a Discord
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Normativa;
