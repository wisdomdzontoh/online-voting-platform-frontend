// src/ui/FormField.js

import React from 'react'

export function FormField({ children, className = '' }) {
  return <div className={`form-field ${className}`}>{children}</div>
}
