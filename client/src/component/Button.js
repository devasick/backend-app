// src/components/Button.js
import React from 'react';

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`flex items-center p-2 hover:bg-blue-700 rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;