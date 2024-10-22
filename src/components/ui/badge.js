// src/components/ui/badge.js
import React from 'react';

export const Badge = ({ variant, children }) => {
  const variantStyles = {
    default: "bg-green-100 text-green-800",
    secondary: "bg-yellow-100 text-yellow-800",
    destructive: "bg-red-100 text-red-800",
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${variantStyles[variant]}`}>
      {children}
    </span>
  );
};
