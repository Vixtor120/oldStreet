import React, { useState, useEffect } from 'react';
import { useNotification } from '../hooks/useNotification';

const ResetPassword: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    // Obtener token de la URL o de variable global (fallback)
    const urlParams = new URLSearchParams(window.location.search);
    let tokenParam = urlParams.get('token');
    
    // Fallback: leer de variable global si no está en URL
    if (!tokenParam && (window as any).RESET_PASSWORD_TOKEN) {
      tokenParam = (window as any).RESET_PASSWORD_TOKEN;
    }
    
    if (!tokenParam) {
      showNotification({
        type: 'error',
        title: 'Token requerido',
        message: 'Token de recuperación no encontrado en la URL'
      });
      setIsValidating(false);
      return;
    }
    
    setToken(tokenParam);
    validateToken(tokenParam);
  }, []);

  const validateToken = async (tokenToValidate: string) => {
    try {
      const response = await fetch(`/auth/reset_password_standalone.php?token=${tokenToValidate}`);
      const data = await response.json();
      
      console.log('Token validation response:', data); // Debug
      
      if (data.success) {
        setIsValidToken(true);
        setEmail(data.email);
      } else {
        console.error('Token validation failed:', data); // Debug
        showNotification({
          type: 'error',
          title: 'Token inválido',
          message: data.message || 'El token de recuperación es inválido o ha expirado'
        });
        setIsValidToken(false);
      }
    } catch (error) {
      console.error('Error validating token:', error);
      showNotification({
        type: 'error',
        title: 'Error de conexión',
        message: 'No se pudo validar el token. Intenta nuevamente.'
      });
      setIsValidToken(false);
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword.trim() || !confirmPassword.trim()) {
      showNotification({
        type: 'error',
        title: 'Campos requeridos',
        message: 'Por favor completa todos los campos'
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      showNotification({
        type: 'error',
        title: 'Contraseñas no coinciden',
        message: 'Las contraseñas ingresadas no son iguales'
      });
      return;
    }

    if (newPassword.length < 6) {
      showNotification({
        type: 'error',
        title: 'Contraseña muy corta',
        message: 'La contraseña debe tener al menos 6 caracteres'
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('token', token);
      formData.append('new_password', newPassword);
      formData.append('confirm_password', confirmPassword);

      const response = await fetch('/auth/reset_password_standalone.php', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        showNotification({
          type: 'success',
          title: 'Contraseña actualizada',
          message: data.message
        });
        
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        showNotification({
          type: 'error',
          title: 'Error',
          message: data.message || 'Error al actualizar la contraseña'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification({
        type: 'error',
        title: 'Error de conexión',
        message: 'Error de conexión. Intenta nuevamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidating) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Validando token de recuperación...</p>
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-black border-2 border-red-500 rounded-lg p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-500 mb-4">Token Inválido</h1>
          <p className="text-gray-300 mb-6">
            El enlace de recuperación es inválido, ha expirado o ya fue utilizado.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/'}
              className="w-full py-2 px-4 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-md transition-colors"
            >
              🏠 Volver al Inicio
            </button>
            <p className="text-gray-400 text-sm">
              ¿Necesitas un nuevo enlace? Solicita la recuperación de contraseña nuevamente.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-black border-2 border-amber-500 rounded-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="text-2xl font-bold text-amber-500 mb-2">Restablecer Contraseña</h1>
          <p className="text-gray-300 text-sm">Para: {email}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              🔑 Nueva Contraseña
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:border-amber-500 text-white"
              placeholder="Mínimo 6 caracteres"
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              🔐 Confirmar Contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:border-amber-500 text-white"
              placeholder="Repite la contraseña"
              disabled={isLoading}
              required
            />
          </div>

          <div className="bg-gray-800 border border-gray-600 rounded-md p-4">
            <p className="text-gray-300 text-sm mb-2">
              <strong>📋 Requisitos de contraseña:</strong>
            </p>
            <ul className="text-gray-400 text-xs space-y-1">
              <li className={newPassword.length >= 6 ? 'text-green-400' : ''}>
                • Al menos 6 caracteres
              </li>
              <li className={newPassword === confirmPassword && newPassword.length > 0 ? 'text-green-400' : ''}>
                • Las contraseñas deben coincidir
              </li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-md transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Actualizando...' : '🔐 Actualizar Contraseña'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => window.location.href = '/'}
            className="text-gray-400 hover:text-amber-500 text-sm underline"
            disabled={isLoading}
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
