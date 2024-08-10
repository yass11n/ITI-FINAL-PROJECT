import React from 'react';

const Modal = ({ children, closeModal,itClick}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center" onClick={itClick}>
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-end">
          <button className="text-red-500 hover:text-red-700" onClick={closeModal}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
