import React, { useState } from 'react';
import { useNotification } from '../hooks/useNotification';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      showNotification({
        type: 'error',
        title: 'Campo requerido',
        message: 'Por favor ingresa tu email'
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showNotification({
        type: 'error',
        title: 'Email inválido',
        message: 'Por favor ingresa un email válido'
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('email', email);

      // TEMPORAL: Debug específico de base de datos
      const response = await fetch('/auth/request_password_reset_db_debug.php', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        showNotification({
          type: 'success',
          title: 'Email enviado',
          message: data.message
        });
        
        // Si hay info de debug, mostrarla en consola
        if (data.debug) {
          console.log('Debug info:', data.debug);
        }
        
        setEmail('');
        onClose();
      } else {
        showNotification({
          type: 'error',
          title: 'Error',
          message: data.message || 'Error al enviar el email'
        });
        
        // Mostrar debug info en consola para troubleshooting
        if (data.debug) {
          console.error('Debug info:', data.debug);
        }
      }
    } catch (error) {
      console.error('Error completo:', error);
      
      showNotification({
        type: 'error',
        title: 'Error de conexión',
        message: 'Error de conexión o respuesta inválida del servidor. Revisa la consola para más detalles.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-black border-2 border-amber-500 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-amber-500">🔐 Recuperar Contraseña</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              📧 Email de tu cuenta
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:border-amber-500 text-white"
              placeholder="tu.email@ejemplo.com"
              disabled={isLoading}
              required
            />
          </div>

          <div className="bg-gray-800 border border-gray-600 rounded-md p-4">
            <p className="text-gray-300 text-sm">
              <strong>📝 Instrucciones:</strong>
            </p>
            <ul className="text-gray-400 text-xs mt-2 space-y-1">
              <li>• Te enviaremos un enlace a tu email</li>
              <li>• El enlace será válido por 1 hora</li>
              <li>• Revisa tu carpeta de spam</li>
              <li>• Solo puedes usar el enlace una vez</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2 px-4 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-md transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Enviando...' : '📧 Enviar Email'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400 text-xs">
            ¿Recordaste tu contraseña?{' '}
            <button
              onClick={onClose}
              className="text-amber-500 hover:text-amber-400 underline"
              disabled={isLoading}
            >
              Volver al login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
