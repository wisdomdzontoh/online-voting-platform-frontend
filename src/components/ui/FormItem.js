// src/ui/FormItem.js

import React from 'react'

export function FormItem({ children, className = '' }) {
  return <div className={`form-item ${className}`}>{children}</div>
}
