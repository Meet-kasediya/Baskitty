import type { FC } from 'react';
import { useEffect } from 'react';


interface ToastMessageProps {
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number; // ms
}

const ToastMessage: FC<ToastMessageProps> = ({ message, show, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => onClose(), duration);
    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div
      className="toast show position-fixed bottom-0 end-0 m-3"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ minWidth: '200px', zIndex: 1100 }}
    >
      <div className="toast-header">
        <strong className="me-auto">Baskitty</strong>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
      <div className="toast-body">{message}</div>
    </div>
  );
};

export default ToastMessage;
