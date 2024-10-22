// src/ui/Popover.js

import React, { useState } from 'react'

export function Popover({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const togglePopover = () => setIsOpen(!isOpen)

  return <div onClick={togglePopover}>{isOpen && children}</div>
}
