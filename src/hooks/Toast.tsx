import React, { createContext, useContext, useCallback } from 'react';

import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

const Toast = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => { console.log(); }, []);

  const removeToast = useCallback(() => { console.log(); }, []);

  return (
    <Toast.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
    </Toast.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(Toast);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export { ToastProvider, useToast };
