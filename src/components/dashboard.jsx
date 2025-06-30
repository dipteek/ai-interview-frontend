'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Target, 
  Award, 
  Calendar,
  FileText,
  ChevronRight,
  Star,
  Brain,
  Zap
} from 'lucide-react';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/voice/dashboard/');
      if (!response.ok) throw new Error('Failed to fetch dashboard data');
      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-50';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getPerformanceLevel = (score) => {
    if (score >= 8) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 6) return { level: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (score >= 4) return { level: 'Average', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { level: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-100' };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading dashboard: {error}</p>
          <button 
            onClick={fetchDashboardData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { user_analytics, interview_history, remaining_attempts, statistics } = dashboardData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Dashboard</h1>
            <p className="text-gray-600">Track your interview performance and progress</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Interviews</p>
                  <p className="text-2xl font-bold text-gray-900">{user_analytics.total_interviews}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">{user_analytics.average_score}/10</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Best Score</p>
                  <p className="text-2xl font-bold text-gray-900">{statistics.best_score}/10</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Interviews Left Today</p>
                  <p className="text-2xl font-bold text-gray-900">{remaining_attempts}/3</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Progress Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Performance Trend</h2>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              
              {user_analytics.improvement_trend.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Interview Progress</span>
                    <span>Score</span>
                  </div>
                  {user_analytics.improvement_trend.map((point, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">
                            {index + 1}
                          </div>
                          <div className="flex-1 mx-4">
                            <div className="h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                style={{ width: `${(point.score / 10) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(point.score)}`}>
                            {point.score}/10
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Complete your first interview to see progress trends</p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              {/* Preferred Roles */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Most Attempted Roles</h3>
                {user_analytics.preferred_job_roles.length > 0 ? (
                  <div className="space-y-3">
                    {user_analytics.preferred_job_roles.slice(0, 3).map(([role, count], index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">{role}</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                          {count} time{count !== 1 ? 's' : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No interview history yet</p>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => router.push('/')}
                    className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    disabled={remaining_attempts === 0}
                  >
                    <span className="text-blue-800 font-medium">
                      {remaining_attempts > 0 ? 'Take New Interview' : 'No Attempts Left'}
                    </span>
                    <ChevronRight className="w-4 h-4 text-blue-600" />
                  </button>
                  
                  {interview_history.length > 0 && (
                    <button
                      onClick={() => router.push(`/dashboard/report/${interview_history[0].id}`)}
                      className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                    >
                      <span className="text-green-800 font-medium">View Latest Report</span>
                      <FileText className="w-4 h-4 text-green-600" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Interviews */}
          <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Recent Interviews</h2>
            </div>
            
            {interview_history.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {interview_history.map((interview) => {
                  const performance = getPerformanceLevel(interview.overall_score);
                  return (
                    <div key={interview.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{interview.job_role}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${performance.color} ${performance.bg}`}>
                              {performance.level}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              Score: {interview.overall_score}/10
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {interview.duration_minutes}min
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(interview.completed_at).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <div className="mt-2 flex flex-wrap gap-2">
                            {interview.tech_stack.slice(0, 3).map((tech, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                {tech}
                              </span>
                            ))}
                            {interview.tech_stack.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                                +{interview.tech_stack.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => router.push(`/dashboard/report/${interview.id}`)}
                          className="ml-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          View Report
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center">
                <Brain className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Interviews Yet</h3>
                <p className="text-gray-600 mb-6">Start your first interview to see detailed analytics and progress tracking</p>
                <button
                  onClick={() => router.push('/')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                  disabled={remaining_attempts === 0}
                >
                  <Zap className="w-4 h-4" />
                  {remaining_attempts > 0 ? 'Start Your First Interview' : 'No Attempts Left Today'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}