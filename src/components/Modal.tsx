import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error' | 'warning';
  title: string;
  message: string;
  buttonText?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  type, 
  title, 
  message, 
  buttonText = 'Entendido' 
}) => {
  useEffect(() => {
    // Bloquear el scroll cuando el modal está abierto
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Limpiar efecto cuando el componente se desmonte
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  // Configuraciones de estilo según el tipo de modal
  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          borderColor: '#f59e0b',
          iconBg: 'linear-gradient(45deg, #f59e0b, #d97706)',
          icon: '✓',
          titleColor: '#f59e0b',
          buttonBg: '#f59e0b',
          boxShadow: 'rgba(245, 158, 11, 0.5)'
        };
      case 'error':
        return {
          borderColor: '#ef4444',
          iconBg: 'linear-gradient(45deg, #ef4444, #b91c1c)',
          icon: '❌',
          titleColor: '#ef4444',
          buttonBg: '#ef4444',
          boxShadow: 'rgba(239, 68, 68, 0.5)'
        };
      case 'warning':
        return {
          borderColor: '#f59e0b',
          iconBg: 'linear-gradient(45deg, #f59e0b, #d97706)',
          icon: '⚠️',
          titleColor: '#f59e0b',
          buttonBg: '#f59e0b',
          boxShadow: 'rgba(245, 158, 11, 0.5)'
        };
      default:
        return {
          borderColor: '#f59e0b',
          iconBg: 'linear-gradient(45deg, #f59e0b, #d97706)',
          icon: '✓',
          titleColor: '#f59e0b',
          buttonBg: '#f59e0b',
          boxShadow: 'rgba(245, 158, 11, 0.5)'
        };
    }
  };
  
  const styles = getStyles();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={`relative max-w-lg w-full mx-4 bg-black rounded-xl border-2 shadow-2xl`}
            style={{ 
              borderColor: styles.borderColor,
              boxShadow: `0 0 30px ${styles.boxShadow}`
            }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          >
            <div className="p-6 text-center">
              <div 
                className="mx-auto mb-6 rounded-full w-16 h-16 flex items-center justify-center"
                style={{
                  background: styles.iconBg,
                  boxShadow: `0 0 25px ${styles.boxShadow}`
                }}
              >
                <span className="text-white text-2xl">{styles.icon}</span>
              </div>
              
              <h3 
                className="text-2xl font-bold mb-4" 
                style={{ color: styles.titleColor }}
              >
                {title}
              </h3>
              
              <div 
                className="mb-6 text-gray-300 text-base"
                style={{ whiteSpace: 'pre-line' }}
              >
                {message}
              </div>
              
              <button
                onClick={onClose}
                className="font-bold py-3 px-8 rounded-lg text-black transition-all duration-300 hover:scale-105"
                style={{ 
                  background: styles.buttonBg,
                }}
              >
                {buttonText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
