// src/components/ui/Spinner.jsx
import { cn } from '@/lib/utils'

export default function Spinner({ className, size = 'md' }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  return (
    <div className={cn('animate-spin', sizes[size], className)}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="32"
          strokeDashoffset="32"
          className="opacity-25"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="32"
          strokeDashoffset="24"
          className="opacity-75"
        />
      </svg>
    </div>
  )
}
