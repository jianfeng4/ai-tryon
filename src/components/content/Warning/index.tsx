import React from 'react';

interface ModalProps {
  text: string;
  close: () => void;
}

const Modal: React.FC<ModalProps> = ({ text, close }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={close}>×</button>
        <p>{text}</p>
        <button className="confirm-btn" onClick={close}>OK</button>
      </div>
    </div>
  );
};

export default Modal;
