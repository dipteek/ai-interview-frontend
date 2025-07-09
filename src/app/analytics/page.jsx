// src/app/analytics/page.js
'use client'
import { useState, useEffect, useContext } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ApiService from '@/lib/api'
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Code, 
  Award,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Filter,
  Download,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'
import Link from 'next/link'
import { FooterContext } from '@/context/FooterContext'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

export default function AnalyticsPage() {
  const { setDisplayFooter } = useContext(FooterContext)
  const { data: session, status } = useSession()
  const router = useRouter()
  
  // State management
  const [analytics, setAnalytics] = useState(null)
  const [timeRange, setTimeRange] = useState('30d')
  const [loading, setLoading] = useState(true)
  const [activeMetric, setActiveMetric] = useState('overview')
  const [comparisonData, setComparisonData] = useState(null)

  useEffect(() => {
    setDisplayFooter(false)
  }, [setDisplayFooter])

  // Authentication check
  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.push('/login')
  }, [session, status, router])

  // Fetch analytics data
  useEffect(() => {
    if (session) {
      fetchAnalytics()
    }
  }, [session, timeRange])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const data = await ApiService.getAnalytics(timeRange)
      setAnalytics(data.analytics)
      
      // Fetch comparison data for previous period
      const prevTimeRange = getPreviousTimeRange(timeRange)
      const compData = await ApiService.getAnalytics(prevTimeRange)
      setComparisonData(compData.analytics)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPreviousTimeRange = (range) => {
    const ranges = {
      '7d': '7d',
      '30d': '30d', 
      '90d': '90d',
      '1y': '1y'
    }
    return ranges[range] || '30d'
  }

  const getChangePercentage = (current, previous) => {
    if (!previous || previous === 0) return 0
    return ((current - previous) / previous * 100).toFixed(1)
  }

  const formatChange = (current, previous) => {
    const change = getChangePercentage(current, previous)
    const isPositive = change > 0
    const isNegative = change < 0
    
    return {
      value: Math.abs(change),
      isPositive,
      isNegative,
      icon: isPositive ? ArrowUp : isNegative ? ArrowDown : Minus
    }
  }

  // Colors for charts
  const chartColors = {
    primary: '#3B82F6',
    secondary: '#10B981', 
    tertiary: '#F59E0B',
    quaternary: '#EF4444',
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444'
  }

  const pieChartColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Analytics...</p>
        </div>
      </div>
    )
  }

  if (!session || !analytics) return null

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <BarChart3 className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <h1 className="text-xl font-bold">Analytics</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Time Range Filter */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>

            {/* Refresh Button */}
            <button
              onClick={fetchAnalytics}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            {/* Export Button */}
            <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Problems Solved</p>
                <p className="text-2xl font-bold text-white">{analytics.overview.total_problems}</p>
                {comparisonData && (
                  <div className="flex items-center mt-1">
                    {(() => {
                      const change = formatChange(analytics.overview.total_problems, comparisonData.overview.total_problems)
                      const Icon = change.icon
                      return (
                        <div className={`flex items-center space-x-1 text-xs ${
                          change.isPositive ? 'text-green-400' : change.isNegative ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          <Icon className="w-3 h-3" />
                          <span>{change.value}%</span>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Success Rate</p>
                <p className="text-2xl font-bold text-white">{analytics.overview.success_rate}%</p>
                {comparisonData && (
                  <div className="flex items-center mt-1">
                    {(() => {
                      const change = formatChange(analytics.overview.success_rate, comparisonData.overview.success_rate)
                      const Icon = change.icon
                      return (
                        <div className={`flex items-center space-x-1 text-xs ${
                          change.isPositive ? 'text-green-400' : change.isNegative ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          <Icon className="w-3 h-3" />
                          <span>{change.value}%</span>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Time</p>
                <p className="text-2xl font-bold text-white">{analytics.overview.avg_time}min</p>
                {comparisonData && (
                  <div className="flex items-center mt-1">
                    {(() => {
                      const change = formatChange(analytics.overview.avg_time, comparisonData.overview.avg_time)
                      const Icon = change.icon
                      return (
                        <div className={`flex items-center space-x-1 text-xs ${
                          change.isNegative ? 'text-green-400' : change.isPositive ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          <Icon className="w-3 h-3" />
                          <span>{change.value}%</span>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Current Streak</p>
                <p className="text-2xl font-bold text-white">{analytics.overview.current_streak}</p>
                {comparisonData && (
                  <div className="flex items-center mt-1">
                    {(() => {
                      const change = formatChange(analytics.overview.current_streak, comparisonData.overview.current_streak)
                      const Icon = change.icon
                      return (
                        <div className={`flex items-center space-x-1 text-xs ${
                          change.isPositive ? 'text-green-400' : change.isNegative ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          <Icon className="w-3 h-3" />
                          <span>{change.value}%</span>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Award className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Trend */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <span>Performance Trend</span>
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.performance_trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="success_rate" 
                    stroke={chartColors.primary}
                    strokeWidth={2}
                    dot={{ fill: chartColors.primary, strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Language Distribution */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Code className="w-5 h-5 text-green-500" />
              <span>Language Distribution</span>
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={analytics.language_distribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value}`}
                  >
                    {analytics.language_distribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Difficulty Breakdown & Daily Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Difficulty Breakdown */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-yellow-500" />
              <span>Difficulty Breakdown</span>
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.difficulty_breakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="difficulty" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="count" fill={chartColors.secondary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily Activity */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              <span>Daily Activity</span>
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.daily_activity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="problems_solved" 
                    stroke={chartColors.tertiary}
                    fill={chartColors.tertiary}
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Achievements & Study Plan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Achievements */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span>Recent Achievements</span>
            </h3>
            <div className="space-y-3">
              {analytics.achievements.slice(0, 5).map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <div className="text-2xl">{achievement.icon || '🏆'}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{achievement.title}</h4>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(achievement.earned_date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Study Plan Progress */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-500" />
              <span>Study Plan</span>
            </h3>
            <div className="space-y-4">
              {analytics.study_plan.map((plan, index) => (
                <div key={index} className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{plan.topic}</h4>
                    <span className="text-sm text-gray-400">{plan.estimated_time}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{plan.description}</p>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.random() * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Improvement Areas */}
        {analytics.improvement_areas.length > 0 && (
          <div className="mt-8">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-red-500" />
                <span>Areas for Improvement</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analytics.improvement_areas.map((area, index) => (
                  <div key={index} className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{area.topic}</h4>
                      <span className="text-sm text-red-400">{area.accuracy}%</span>
                    </div>
                    <p className="text-sm text-gray-400">{area.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
