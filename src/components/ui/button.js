// src/components/ui/button.js
import React from 'react';

export const Button = ({ variant = 'primary', children, className, ...props }) => {
  const baseStyle = "px-4 py-2 rounded focus:outline-none focus:ring";
  const variantStyle = variant === 'outline' ? "border border-gray-300 text-gray-700" : "bg-blue-500 text-white";
  
  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};
