// src/components/ui/Button.jsx
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

const Button = forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  loading = false,
  children, 
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-500',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus-visible:ring-secondary-500',
    outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50 focus-visible:ring-primary-500',
    ghost: 'text-secondary-700 hover:bg-secondary-100 focus-visible:ring-secondary-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500'
  }
  
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg'
  }

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      ref={ref}
      {...props}
    >
      {loading && (
        <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  )
})

Button.displayName = 'Button'
export default Button
