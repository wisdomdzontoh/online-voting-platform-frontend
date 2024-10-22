// src/ui/PopoverTrigger.js

import React from 'react'

export function PopoverTrigger({ children, className = '', ...props }) {
  return (
    <button className={`popover-trigger ${className}`} {...props}>
      {children}
    </button>
  )
}
