// src/components/ui/card.js

import React from 'react';

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return <div className="border-b border-gray-200 pb-2">{children}</div>;
};

export const CardTitle = ({ children }) => {
  return <h2 className="text-xl font-bold">{children}</h2>;
};

export const CardContent = ({ children }) => {
  return <div className="pt-4">{children}</div>;
};
