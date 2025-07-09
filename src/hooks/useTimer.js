// src/hooks/useTimer.js
import { useState, useEffect, useRef } from 'react'

export function useTimer(initialTime = 0, autoStart = false) {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(autoStart)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  const start = () => setIsRunning(true)
  const pause = () => setIsRunning(false)
  const reset = () => {
    setTime(initialTime)
    setIsRunning(false)
  }
  const stop = () => {
    setIsRunning(false)
    return time
  }

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
    stop,
    formattedTime: `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`
  }
}

