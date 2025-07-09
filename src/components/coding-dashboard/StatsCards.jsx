// src/components/dashboard/StatsCards.jsx
import { Play, Trophy, TrendingUp, CheckCircle } from 'lucide-react'
import Card, { CardContent } from '@/components/ui/Card'

export default function StatsCards({ stats }) {
  const cards = [
    {
      title: 'Total Sessions',
      value: stats.totalSessions || 0,
      icon: Play,
      color: 'blue',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Average Score',
      value: `${stats.averageScore || 0}%`,
      icon: Trophy,
      color: 'yellow',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-500'
    },
    {
      title: 'Problems Solved',
      value: stats.completedProblems || 0,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-500'
    },
    {
      title: 'Current Streak',
      value: `${stats.streakDays || 0} days`,
      icon: TrendingUp,
      color: 'purple',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-500'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
