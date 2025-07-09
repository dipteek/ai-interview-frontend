// src/components/ui/Alert.jsx
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react'

export default function Alert({ variant = 'info', children, className }) {
  const variants = {
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: Info,
      iconColor: 'text-blue-500'
    },
    success: {
      container: 'bg-green-50 border-green-200 text-green-800',
      icon: CheckCircle,
      iconColor: 'text-green-500'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      icon: AlertCircle,
      iconColor: 'text-yellow-500'
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: XCircle,
      iconColor: 'text-red-500'
    }
  }

  const { container, icon: Icon, iconColor } = variants[variant]

  return (
    <div className={cn('p-4 border rounded-lg flex items-start space-x-3', container, className)}>
      <Icon className={cn('h-5 w-5 mt-0.5 flex-shrink-0', iconColor)} />
      <div className="flex-1">{children}</div>
    </div>
  )
}
