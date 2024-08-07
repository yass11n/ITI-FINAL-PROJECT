import React from 'react';

const Modal = ({ children, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <button className="mb-2 text-red-500" onClick={closeModal}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
