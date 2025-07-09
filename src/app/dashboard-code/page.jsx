// src/app/dashboard/page.js
'use client'
import { useState, useEffect, useContext } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ApiService from '@/lib/api'
import { 
  Code, 
  BarChart3, 
  Calendar, 
  Award, 
  Target, 
  Clock, 
  TrendingUp,
  Play,
  BookOpen,
  Users,
  Zap,
  Star,
  Trophy,
  CheckCircle,
  Settings,
  User,
  ArrowRight,
  Activity,
  PieChart,
  Lightbulb,
  RefreshCw
} from 'lucide-react'
import Link from 'next/link'
import { FooterContext } from '@/context/FooterContext'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts'

export default function DashboardPage() {
  const { setDisplayFooter } = useContext(FooterContext)
  const { data: session, status } = useSession()
  const router = useRouter()
  
  // State management
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [activeStreak, setActiveStreak] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    setDisplayFooter(false)
    
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    
    return () => clearInterval(timer)
  }, [setDisplayFooter])

  // Authentication check
  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.push('/login')
  }, [session, status, router])

  // Fetch dashboard data
  useEffect(() => {
    if (session) {
      fetchDashboardData()
    }
  }, [session])

  const fetchDashboardData = async (showRefreshing = false) => {
    if (showRefreshing) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }
    
    try {
      const data = await ApiService.getDashboardStats()
      setDashboardData(data)
      setActiveStreak(data.streak_info?.current_streak || 0)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      // Set fallback data
      setDashboardData({
        user_profile: { 
          first_name: session?.user?.name || 'Coder',
          total_problems_solved: 0
        },
        today_stats: { 
          problems_solved: 0, 
          daily_goal: 1, 
          time_spent_minutes: 0,
          daily_progress: 0 
        },
        weekly_stats: { 
          problems_solved: 0, 
          weekly_goal: 5,
          weekly_progress: { percentage: 0 }
        },
        streak_info: { current_streak: 0, longest_streak: 0 },
        performance_trend: [],
        language_distribution: [],
        difficulty_distribution: [],
        recent_activity: [],
        recent_achievements: []
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    fetchDashboardData(true)
  }

  // Chart colors
  const chartColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

  // Greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  // Get progress percentage for circular progress
  const getCircularProgress = (current, total) => {
    if (!total || total === 0) return 0
    return Math.min(100, (current / total) * 100)
  }

  // Format time display
  const formatTimeSpent = (minutes) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session || !dashboardData) return null

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-blue-500" />
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <div className="hidden md:flex items-center space-x-1 text-sm text-gray-400">
              <span>•</span>
              <span>{currentTime.toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors disabled:opacity-50"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            
            <Link 
              href="/analytics"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors flex items-center space-x-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </Link>
            
            <Link 
              href="/coding"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors flex items-center space-x-2"
            >
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">Start Coding</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {getGreeting()}, {dashboardData.user_profile?.first_name || session.user?.name || 'Coder'}! 👋
          </h2>
          <p className="text-gray-400">
            Ready to tackle some coding challenges today? Let's keep that streak going! 🚀
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Today's Progress */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-400 text-sm font-medium">Today's Progress</p>
                <p className="text-2xl font-bold text-white">
                  {dashboardData.today_stats?.problems_solved || 0}
                </p>
                <p className="text-xs text-gray-500">
                  Goal: {dashboardData.today_stats?.daily_goal || 1} problems
                </p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Target className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${getCircularProgress(
                    dashboardData.today_stats?.problems_solved || 0,
                    dashboardData.today_stats?.daily_goal || 1
                  )}%` 
                }}
              ></div>
            </div>
          </div>

          {/* Current Streak */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-400 text-sm font-medium">Current Streak</p>
                <p className="text-2xl font-bold text-white flex items-center space-x-2">
                  <span>{activeStreak}</span>
                  <span className="text-orange-500">🔥</span>
                </p>
                <p className="text-xs text-gray-500">
                  Best: {dashboardData.streak_info?.longest_streak || 0} days
                </p>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <span className="text-orange-500 text-xl">🔥</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full ${
                    i < activeStreak ? 'bg-orange-500' : 'bg-gray-700'
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Total Solved */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Solved</p>
                <p className="text-2xl font-bold text-white">
                  {dashboardData.user_profile?.total_problems_solved || 0}
                </p>
                <p className="text-xs text-gray-500">
                  Success Rate: {Math.round(dashboardData.weekly_stats?.weekly_progress?.percentage || 0)}%
                </p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Trophy className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="flex items-center space-x-1 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Active</span>
              </div>
            </div>
          </div>

          {/* Time Spent */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-400 text-sm font-medium">Time Spent</p>
                <p className="text-2xl font-bold text-white">
                  {formatTimeSpent(dashboardData.today_stats?.time_spent_minutes || 0)}
                </p>
                <p className="text-xs text-gray-500">Today</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Clock className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Activity className="w-3 h-3" />
              <span>Active session</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Chart */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span>Weekly Performance</span>
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Problems Solved</span>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboardData.performance_trend || []}>
                    <defs>
                      <linearGradient id="colorProblems" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#9CA3AF" 
                      fontSize={12}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
                      }}
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <Area
                      type="monotone"
                      dataKey="problems_solved"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      fill="url(#colorProblems)"
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Quick Actions & Language Stats */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Quick Actions</span>
              </h3>
              <div className="space-y-3">
                <Link 
                  href="/coding"
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30 border border-green-500/30 rounded-xl transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <Play className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-white group-hover:text-green-400">Start Coding</p>
                      <p className="text-xs text-gray-400">Practice problems</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-green-500 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link 
                  href="/analytics"
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 border border-blue-500/30 rounded-xl transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-white group-hover:text-blue-400">View Analytics</p>
                      <p className="text-xs text-gray-400">Detailed insights</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link 
                  href="/profile"
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30 border border-purple-500/30 rounded-xl transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-medium text-white group-hover:text-purple-400">Settings</p>
                      <p className="text-xs text-gray-400">Update profile</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-500 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Language Stats */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-orange-500" />
                <span>Languages</span>
              </h3>
              {Array.isArray(dashboardData.language_distribution) && dashboardData.language_distribution.length > 0 ? (
                <>
                  <div className="h-32 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={dashboardData.language_distribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={50}
                          dataKey="count"
                          label={false}
                        >
                          {dashboardData.language_distribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2">
                    {dashboardData.language_distribution.map((lang, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: chartColors[index % chartColors.length] }}
                          ></div>
                          <span className="text-gray-300 capitalize">{lang.language}</span>
                        </div>
                        <span className="text-gray-400 font-medium">{lang.count}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Code className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">No language data yet</p>
                  <p className="text-gray-500 text-xs">Start coding to see your language preferences!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-500" />
              <span>Recent Activity</span>
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {Array.isArray(dashboardData.recent_activity) && dashboardData.recent_activity.length > 0 ? (
                dashboardData.recent_activity.slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                    <div className={`p-2 rounded-lg ${
                      activity.status === 'accepted' 
                        ? 'bg-green-500/20' 
                        : 'bg-red-500/20'
                    }`}>
                      {activity.status === 'accepted' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Code className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{activity.problem_title}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          activity.problem_difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                          activity.problem_difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {activity.problem_difficulty}
                        </span>
                        <span className="text-blue-400">{activity.language}</span>
                        <span>•</span>
                        <span className="font-medium">{activity.score}%</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(activity.submitted_at).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400 font-medium">No recent activity</p>
                  <p className="text-sm text-gray-500 mb-4">Start solving problems to see your progress!</p>
                  <Link 
                    href="/coding"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start Coding</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span>Recent Achievements</span>
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {Array.isArray(dashboardData.recent_achievements) && dashboardData.recent_achievements.length > 0 ? (
                dashboardData.recent_achievements.slice(0, 5).map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="text-2xl">{achievement.icon || '🏆'}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white truncate">{achievement.title}</h4>
                      <p className="text-sm text-gray-400 line-clamp-2">{achievement.description}</p>
                    </div>
                    <div className="text-xs text-yellow-400 whitespace-nowrap">
                      {new Date(achievement.earned_at).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Star className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400 font-medium">No achievements yet</p>
                  <p className="text-sm text-gray-500">Keep coding to unlock achievements!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Weekly Goals Progress */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-500" />
            <span>Weekly Goals Progress</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Problems Solved Progress */}
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#374151"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${getCircularProgress(
                      dashboardData.weekly_stats?.problems_solved || 0,
                      dashboardData.weekly_stats?.weekly_goal || 5
                    ) * 0.628} 62.8`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-400">
                    {Math.round(getCircularProgress(
                      dashboardData.weekly_stats?.problems_solved || 0,
                      dashboardData.weekly_stats?.weekly_goal || 5
                    ))}%
                  </span>
                </div>
              </div>
              <h4 className="font-medium text-white">Problems Solved</h4>
              <p className="text-sm text-gray-400">
                {dashboardData.weekly_stats?.problems_solved || 0} / {dashboardData.weekly_stats?.weekly_goal || 5}
              </p>
            </div>

            {/* Streak Progress */}
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#374151"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#10B981"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${Math.min(100, activeStreak * 10) * 0.628} 62.8`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-green-400">{activeStreak}</span>
                </div>
              </div>
              <h4 className="font-medium text-white">Current Streak</h4>
              <p className="text-sm text-gray-400">Days in a row</p>
            </div>

            {/* Time Spent Progress */}
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#374151"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${Math.min(100, (dashboardData.today_stats?.time_spent_minutes || 0) / 60 * 100) * 0.628} 62.8`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-yellow-400">
                    {Math.round((dashboardData.today_stats?.time_spent_minutes || 0) / 60 * 10) / 10}h
                  </span>
                </div>
              </div>
              <h4 className="font-medium text-white">Time Spent</h4>
              <p className="text-sm text-gray-400">Today</p>
            </div>
          </div>
        </div>

        {/* Difficulty Progress */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-purple-500" />
            <span>Difficulty Progress</span>
          </h3>
          <div className="space-y-6">
            {(() => {
              const difficultyData = Array.isArray(dashboardData.difficulty_distribution) 
                ? dashboardData.difficulty_distribution 
                : [
                    { difficulty: 'Easy', count: 0, total: 10 },
                    { difficulty: 'Medium', count: 0, total: 15 },
                    { difficulty: 'Hard', count: 0, total: 5 }
                  ];
              
              return difficultyData.map((diff, index) => {
                const progress = getCircularProgress(diff.count, diff.total || 1)
                return (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className={`font-medium text-lg ${
                          diff.difficulty === 'Easy' ? 'text-green-400' :
                          diff.difficulty === 'Medium' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {diff.difficulty}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {diff.count} solved
                        </span>
                      </div>
                      <span className="text-gray-300 font-medium">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ease-out ${
                          diff.difficulty === 'Easy' ? 'bg-gradient-to-r from-green-500 to-green-400' :
                          diff.difficulty === 'Medium' ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                          'bg-gradient-to-r from-red-500 to-red-400'
                        }`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })
            })()}
          </div>
        </div>

        {/* Study Recommendations */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-indigo-500" />
            <span>Study Recommendations</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Recommendation cards */}
            <div className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Code className="w-4 h-4 text-blue-400" />
                <h4 className="font-medium text-white">Arrays & Hashing</h4>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Master fundamental data structures with array manipulation and hash table techniques.
              </p>
              <Link 
                href="/coding?category=arrays"
                className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                <span>Start practicing</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-4 h-4 text-green-400" />
                <h4 className="font-medium text-white">Two Pointers</h4>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Learn efficient techniques for solving array and string problems with optimal time complexity.
              </p>
              <Link 
                href="/coding?category=arrays&pattern=two-pointers"
                className="inline-flex items-center space-x-1 text-green-400 hover:text-green-300 text-sm font-medium"
              >
                <span>Start practicing</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <h4 className="font-medium text-white">Dynamic Programming</h4>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Break down complex problems into simpler subproblems with memoization strategies.
              </p>
              <Link 
                href="/coding?category=dynamic-programming"
                className="inline-flex items-center space-x-1 text-purple-400 hover:text-purple-300 text-sm font-medium"
              >
                <span>Start practicing</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <Link
          href="/coding"
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          <Play className="w-6 h-6 text-white" />
        </Link>
      </div>
    </div>
  )
}