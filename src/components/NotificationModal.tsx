import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface NotificationProps {
  isOpen: boolean;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const NotificationModal: React.FC<NotificationProps> = ({
  isOpen,
  type,
  title,
  message,
  onClose,
  autoClose = true,
  duration = 4000
}) => {
  React.useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'from-green-900/90 to-green-800/90',
          border: 'border-green-500/50',
          icon: '✅',
          iconBg: 'bg-green-500',
          titleColor: 'text-green-300',
          messageColor: 'text-green-100'
        };
      case 'error':
        return {
          bg: 'from-red-900/90 to-red-800/90',
          border: 'border-red-500/50',
          icon: '❌',
          iconBg: 'bg-red-500',
          titleColor: 'text-red-300',
          messageColor: 'text-red-100'
        };
      case 'warning':
        return {
          bg: 'from-amber-900/90 to-amber-800/90',
          border: 'border-amber-500/50',
          icon: '⚠️',
          iconBg: 'bg-amber-500',
          titleColor: 'text-amber-300',
          messageColor: 'text-amber-100'
        };
      case 'info':
        return {
          bg: 'from-blue-900/90 to-blue-800/90',
          border: 'border-blue-500/50',
          icon: 'ℹ️',
          iconBg: 'bg-blue-500',
          titleColor: 'text-blue-300',
          messageColor: 'text-blue-100'
        };
      default:
        return {
          bg: 'from-gray-900/90 to-gray-800/90',
          border: 'border-gray-500/50',
          icon: 'ℹ️',
          iconBg: 'bg-gray-500',
          titleColor: 'text-gray-300',
          messageColor: 'text-gray-100'
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-20 right-4 left-4 md:left-auto md:w-96 z-50"
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className={`bg-gradient-to-br ${typeStyles.bg} backdrop-blur-md rounded-xl border-2 ${typeStyles.border} shadow-2xl p-6 relative overflow-hidden`}>
              
              {/* Efectos de fondo */}
              <motion.div 
                className="absolute top-0 right-0 w-32 h-32 opacity-20"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1] 
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
              >
                <div className={`w-full h-full ${typeStyles.iconBg} rounded-full blur-3xl`}></div>
              </motion.div>

              {/* Contenido */}
              <div className="relative z-10">
                {/* Header con icono y botón cerrar */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <motion.div 
                      className={`w-12 h-12 ${typeStyles.iconBg} rounded-full flex items-center justify-center text-white text-xl font-bold mr-4 shadow-lg`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    >
                      {typeStyles.icon}
                    </motion.div>
                    <motion.h3 
                      className={`text-xl font-bold ${typeStyles.titleColor}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {title}
                    </motion.h3>
                  </div>
                  
                  <motion.button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors p-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Mensaje */}
                <motion.p 
                  className={`${typeStyles.messageColor} leading-relaxed mb-6`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {message}
                </motion.p>

                {/* Botón OK */}
                <motion.div 
                  className="flex justify-end"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    onClick={onClose}
                    className={`px-6 py-3 ${typeStyles.iconBg} text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-white/20`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Entendido
                  </motion.button>
                </motion.div>

                {/* Barra de progreso para auto-close */}
                {autoClose && (
                  <motion.div 
                    className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-xl"
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: duration / 1000, ease: "linear" }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;
