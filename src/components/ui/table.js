// src/components/ui/table.js
import React from 'react';

export const Table = ({ children }) => {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      {children}
    </table>
  );
};

export const TableHeader = ({ children }) => {
  return (
    <thead className="bg-gray-100">
      {children}
    </thead>
  );
};

export const TableBody = ({ children }) => {
  return (
    <tbody>
      {children}
    </tbody>
  );
};

export const TableRow = ({ children }) => {
  return (
    <tr className="border-b hover:bg-gray-100">
      {children}
    </tr>
  );
};

export const TableHead = ({ children }) => {
  return (
    <th className="text-left p-3">{children}</th>
  );
};

export const TableCell = ({ children }) => {
  return (
    <td className="p-3">{children}</td>
  );
};
