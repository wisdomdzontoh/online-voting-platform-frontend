// src/ui/FormLabel.js

import React from 'react'

export function FormLabel({ children, className = '' }) {
  return <label className={`form-label ${className}`}>{children}</label>
}
