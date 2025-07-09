import { useState, useCallback } from 'react';

export interface NotificationState {
  isOpen: boolean;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  autoClose?: boolean;
  duration?: number;
}

export const useNotification = () => {
  const [notification, setNotification] = useState<NotificationState>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    autoClose: true,
    duration: 4000
  });

  const showNotification = useCallback((config: Omit<NotificationState, 'isOpen'>) => {
    setNotification({
      ...config,
      isOpen: true
    });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, isOpen: false }));
  }, []);

  // Métodos de conveniencia
  const showSuccess = useCallback((title: string, message: string, options?: { autoClose?: boolean; duration?: number }) => {
    showNotification({
      type: 'success',
      title,
      message,
      autoClose: options?.autoClose ?? true,
      duration: options?.duration ?? 4000
    });
  }, [showNotification]);

  const showError = useCallback((title: string, message: string, options?: { autoClose?: boolean; duration?: number }) => {
    showNotification({
      type: 'error',
      title,
      message,
      autoClose: options?.autoClose ?? false, // Los errores no se cierran automáticamente por defecto
      duration: options?.duration ?? 6000
    });
  }, [showNotification]);

  const showWarning = useCallback((title: string, message: string, options?: { autoClose?: boolean; duration?: number }) => {
    showNotification({
      type: 'warning',
      title,
      message,
      autoClose: options?.autoClose ?? false,
      duration: options?.duration ?? 5000
    });
  }, [showNotification]);

  const showInfo = useCallback((title: string, message: string, options?: { autoClose?: boolean; duration?: number }) => {
    showNotification({
      type: 'info',
      title,
      message,
      autoClose: options?.autoClose ?? true,
      duration: options?.duration ?? 4000
    });
  }, [showNotification]);

  return {
    notification,
    showNotification,
    hideNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};
