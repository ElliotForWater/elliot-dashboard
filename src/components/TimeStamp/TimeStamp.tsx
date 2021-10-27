import React, { useState, useEffect } from 'react'

const Timestamp = () => {
  const [date, setDate] = useState(new Date())
  const timeFormat = Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric', hour12: false }).format(date)

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000)

    return () => clearInterval(timer)
  }, [])

  return <time dateTime={JSON.stringify(date.toLocaleTimeString)}>{timeFormat}</time>
}

export default Timestamp
