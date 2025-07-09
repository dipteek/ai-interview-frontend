// src/components/dashboard/QuickActions.jsx
import Link from 'next/link'
import { Code, Users, BarChart3 } from 'lucide-react'
import Card, { CardContent, CardHeader } from '@/components/ui/Card'

export default function QuickActions() {
  const actions = [
    {
      title: 'Coding Practice',
      description: 'Practice coding problems with AI-generated questions',
      href: '/coding',
      icon: Code,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500',
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      title: 'Mock Interviews',
      description: 'Practice behavioral and technical interviews',
      href: '/interviews',
      icon: Users,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500',
      badgeColor: 'bg-green-100 text-green-700'
    },
    {
      title: 'Analytics',
      description: 'View detailed performance analytics and insights',
      href: '/analytics',
      icon: BarChart3,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500',
      badgeColor: 'bg-purple-100 text-purple-700'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {actions.map((action, index) => (
        <Link key={index} href={action.href}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${action.bgColor}`}>
                  <action.icon className={`w-8 h-8 ${action.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-3">{action.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{action.description}</p>
              <div className={`inline-block px-3 py-1 rounded-full text-sm ${action.badgeColor}`}>
                Start Session
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
