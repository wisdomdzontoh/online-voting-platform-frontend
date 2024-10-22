// src/ui/FormMessage.js

import React from 'react'

export function FormMessage({ message = '', className = '' }) {
  return <p className={`form-message text-red-500 ${className}`}>{message}</p>
}
