import React, { useEffect, useState } from 'react';
import './CustomToast.css';

const Toast = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => setIsVisible(false), 2500);
    const removeTimer = setTimeout(onClose, 3000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);

  return (
    <div className={`custom-toast ${type} ${!isVisible ? 'hide' : ''}`}>
      {message}
      <button onClick={onClose}>닫기</button>
      <div className="progress-bar"></div>
    </div>
  );
};

export default Toast;
