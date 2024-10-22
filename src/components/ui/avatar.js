// src/components/ui/avatar.js
import React from 'react';

export const Avatar = ({ className, children }) => {
  return (
    <div className={`rounded-full overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export const AvatarImage = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
    />
  );
};

export const AvatarFallback = ({ children }) => {
  return (
    <div className="flex items-center justify-center bg-gray-200 w-full h-full text-gray-600 font-bold">
      {children}
    </div>
  );
};
