// src/components/dashboard/RecentActivity.jsx
import { Clock, Code, Users } from 'lucide-react'
import Card, { CardContent, CardHeader } from '@/components/ui/Card'
import { formatDateTime } from '@/lib/utils'

export default function RecentActivity({ sessions }) {
  if (!sessions || sessions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No recent sessions. Start practicing now!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary-100 rounded-lg">
                  {session.type === 'coding' ? (
                    <Code className="w-5 h-5 text-primary-500" />
                  ) : (
                    <Users className="w-5 h-5 text-primary-500" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{session.title}</h4>
                  <p className="text-sm text-gray-600">{formatDateTime(session.date)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{session.score}%</p>
                  <p className="text-xs text-gray-500">{session.duration}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  session.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {session.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
