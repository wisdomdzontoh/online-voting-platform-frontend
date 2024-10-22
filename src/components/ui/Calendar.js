// src/ui/Calendar.js

import React, { useState } from 'react'
import { format } from 'date-fns'

export function Calendar({ mode = 'single', selected, onSelect }) {
  const [currentDate, setCurrentDate] = useState(selected || new Date())

  const handleDateChange = (date) => {
    setCurrentDate(date)
    onSelect(date)
  }

  return (
    <div className="calendar">
      <p>Selected Date: {format(currentDate, 'PPP')}</p>
      <button onClick={() => handleDateChange(new Date())}>Pick Today</button>
    </div>
  )
}
