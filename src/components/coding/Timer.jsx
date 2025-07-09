// src/components/coding/Timer.jsx
import { useEffect, useState } from 'react'
import { Clock, Play, Pause, Square } from 'lucide-react'
import Button from '@/components/ui/Button'
import { formatTime } from '@/lib/utils'

export default function Timer({ 
  isRunning, 
  onStart, 
  onPause, 
  onStop, 
  initialTime = 0 
}) {
  const [time, setTime] = useState(initialTime)

  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const handleStart = () => {
    onStart()
  }

  const handlePause = () => {
    onPause()
  }

  const handleStop = () => {
    onStop(time)
    setTime(0)
  }

  return (
    <div className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-center space-x-2">
        <Clock className="w-5 h-5 text-gray-500" />
        <span className="text-lg font-mono font-bold text-gray-900">
          {formatTime(time)}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        {!isRunning ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleStart}
            className="flex items-center space-x-1"
          >
            <Play className="w-4 h-4" />
            <span>Start</span>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={handlePause}
            className="flex items-center space-x-1"
          >
            <Pause className="w-4 h-4" />
            <span>Pause</span>
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={handleStop}
          className="flex items-center space-x-1"
          disabled={time === 0}
        >
          <Square className="w-4 h-4" />
          <span>Stop</span>
        </Button>
      </div>

      <div className="text-sm text-gray-500">
        {isRunning ? 'Timer running...' : 'Timer stopped'}
      </div>
    </div>
  )
}
