import React, { createContext, useContext, ReactNode } from 'react';
import { useNotification } from '../hooks/useNotification';
import NotificationModal from '../components/NotificationModal';

interface NotificationContextType {
  showSuccess: (title: string, message: string, options?: { autoClose?: boolean; duration?: number }) => void;
  showError: (title: string, message: string, options?: { autoClose?: boolean; duration?: number }) => void;
  showWarning: (title: string, message: string, options?: { autoClose?: boolean; duration?: number }) => void;
  showInfo: (title: string, message: string, options?: { autoClose?: boolean; duration?: number }) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications debe ser usado dentro de NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const { notification, hideNotification, showSuccess, showError, showWarning, showInfo } = useNotification();

  return (
    <NotificationContext.Provider value={{ showSuccess, showError, showWarning, showInfo }}>
      {children}
      <NotificationModal
        isOpen={notification.isOpen}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={hideNotification}
        autoClose={notification.autoClose}
        duration={notification.duration}
      />
    </NotificationContext.Provider>
  );
};
