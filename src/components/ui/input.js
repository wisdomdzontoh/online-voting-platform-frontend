// src/ui/input.js

import React from 'react'

export function Input({ className = '', ...props }) {
  const baseStyles = 'w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300'
  const combinedStyles = `${baseStyles} ${className}`

  return <input className={combinedStyles} {...props} />
}
