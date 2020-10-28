import React, { useEffect } from 'react';

import {
  FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle,
} from 'react-icons/all';
import { Container } from './styles';
import { ToastMessage, useToast } from '../../../hooks/Toast';

interface ToastProps {
  message: ToastMessage;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message }) => {
  const { removeToast } = useToast();
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);
  return (
    <Container
      type={message.type}
      hasDescription={!!message.description}
    >
      {icons[message.type || 'info']}
      <div>
        <strong>{message.type}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
