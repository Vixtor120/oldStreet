import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import ForgotPasswordModal from './ForgotPasswordModal';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    discord_id: '',
    identifier: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const { showSuccess, showError } = useNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(formData.identifier, formData.password);
        showSuccess(
          '¡Bienvenido de vuelta!',
          `Has iniciado sesión correctamente como ${formData.identifier}.`
        );
        onClose();
      } else {
        await register(formData.email, formData.username, formData.password, formData.discord_id);
        setMode('login');
        setError('');
        setFormData({
          email: '',
          username: '',
          password: '',
          discord_id: '',
          identifier: ''
        });
        showSuccess(
          '¡Registro Exitoso!',
          'Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.',
          { duration: 5000 }
        );
        return;
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      username: '',
      password: '',
      discord_id: '',
      identifier: ''
    });
    setError('');
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 max-w-md w-full border-2 border-amber-500 shadow-2xl"
          style={{
            boxShadow: '0 0 50px rgba(245, 158, 11, 0.3)'
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-amber-400">
              {mode === 'login' ? '🔐 Iniciar Sesión' : '📝 Registro'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl transition-colors"
            >
              ✕
            </button>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-semibold">
                    📧 Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-400 focus:outline-none transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-semibold">
                    👤 Nombre de Usuario
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    required
                    minLength={3}
                    maxLength={50}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-400 focus:outline-none transition-colors"
                    placeholder="NombreUsuario"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-semibold">
                    🎮 ID de Discord
                  </label>
                  <input
                    type="text"
                    value={formData.discord_id}
                    onChange={(e) => setFormData({...formData, discord_id: e.target.value})}
                    required
                    pattern="[0-9]{17,19}"
                    title="Debe ser un ID de Discord válido (17-19 dígitos)"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-400 focus:outline-none transition-colors"
                    placeholder="123456789012345678"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Para obtener tu ID: Configuración → Avanzado → Modo Desarrollador → Click derecho en tu nombre
                  </p>
                </div>
              </>
            )}

            {mode === 'login' && (
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-semibold">
                  📧 Email o Usuario
                </label>
                <input
                  type="text"
                  value={formData.identifier}
                  onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-400 focus:outline-none transition-colors"
                  placeholder="Email o nombre de usuario"
                />
              </div>
            )}

            <div>
              <label className="block text-gray-300 mb-2 text-sm font-semibold">
                🔒 Contraseña
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-400 focus:outline-none transition-colors"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold py-3 rounded-lg hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 transition-all duration-300 shadow-lg"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Cargando...
                </span>
              ) : (
                mode === 'login' ? '🔐 Iniciar Sesión' : '📝 Registrarse'
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={switchMode}
              className="text-amber-400 hover:text-amber-300 transition-colors text-sm"
              disabled={loading}
            >
              {mode === 'login' 
                ? '¿No tienes cuenta? Regístrate aquí' 
                : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
            
            {mode === 'login' && (
              <div className="mt-2">
                <button
                  onClick={() => setShowForgotPassword(true)}
                  className="text-gray-400 hover:text-amber-400 transition-colors text-xs underline"
                  disabled={loading}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}
          </div>

          {mode === 'register' && (
            <div className="mt-4 p-3 bg-blue-900/30 border border-blue-500/50 rounded-lg">
              <p className="text-blue-200 text-xs">
                <strong>ℹ️ Nota:</strong> Tu rol de Discord se verificará automáticamente al registrarte. 
                Asegúrate de estar en el servidor de OldStreet.
              </p>
            </div>
          )}

          {showForgotPassword && (
            <ForgotPasswordModal 
              isOpen={showForgotPassword}
              onClose={() => setShowForgotPassword(false)}
            />
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
