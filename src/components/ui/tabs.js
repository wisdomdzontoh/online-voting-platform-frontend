// src/components/ui/tabs.js

import React from 'react';

export const Tabs = ({ value, onValueChange, children, className }) => {
  return (
    <div className={`tabs ${className}`}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          value,
          onValueChange,
        });
      })}
    </div>
  );
};

export const TabsList = ({ children }) => {
  return (
    <div className="flex space-x-4 border-b border-gray-200">
      {children}
    </div>
  );
};

export const TabsTrigger = ({ value, onValueChange, children }) => {
  return (
    <button
      onClick={() => onValueChange(value)}
      className="px-4 py-2 font-medium text-gray-600 hover:text-blue-600 focus:outline-none"
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children }) => {
  return <div>{React.Children.map(children, (child) => (child.props.value === value ? child : null))}</div>;
};
