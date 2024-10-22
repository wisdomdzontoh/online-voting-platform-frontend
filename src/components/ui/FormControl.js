// src/ui/FormControl.js

import React from 'react'

export function FormControl({ children, className = '' }) {
  return <div className={`form-control ${className}`}>{children}</div>
}
