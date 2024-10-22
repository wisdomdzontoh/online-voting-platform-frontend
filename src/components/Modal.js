// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Ensure modal only renders when open
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition"
        >
          &times; {/* Close icon */}
        </button>
        {children}
      </div>
    </div>
  );
};



export default Modal;
