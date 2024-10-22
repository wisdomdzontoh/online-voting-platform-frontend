// src/ui/textarea.js

import React from 'react'

export function Textarea({ className = '', ...props }) {
  const baseStyles = 'w-full px-3 py-2 border rounded resize-none focus:outline-none focus:ring focus:ring-blue-300'
  const combinedStyles = `${baseStyles} ${className}`

  return <textarea className={combinedStyles} {...props} />
}
