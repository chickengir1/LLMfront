import React, { useEffect, useState } from 'react';
import './CustomToast.css';

const Toast = ({ message, type, onClose }) => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
      setTimeout(() => {
        onClose();
      }, 500); 
    }, 2500); 

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`custom-toast ${type} ${hide ? 'hide' : ''}`}>
      {message}
      <button onClick={onClose}>닫기</button>
      <div className="progress-bar"></div> 
    </div>
  );
};

export default Toast;
