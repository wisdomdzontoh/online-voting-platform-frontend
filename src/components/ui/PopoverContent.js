// src/ui/PopoverContent.js

import React from 'react'

export function PopoverContent({ children, className = '' }) {
  return <div className={`popover-content ${className}`}>{children}</div>
}
