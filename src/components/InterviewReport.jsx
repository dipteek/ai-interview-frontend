'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Target, 
  Clock, 
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  BookOpen,
  Award,
  Download,
  Share2
} from 'lucide-react';

export default function InterviewReport({ params }) {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [interviewId, setInterviewId] = useState(null);
  const router = useRouter();

  // Get params.id asynchronously
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setInterviewId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (interviewId) {
      fetchReportData();
    }
  }, [interviewId]);

  const fetchReportData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/voice/report/${interviewId}/`);
      if (!response.ok) throw new Error('Failed to fetch report data');
      const data = await response.json();
      setReportData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 8) return 'bg-green-100 border-green-300';
    if (score >= 6) return 'bg-yellow-100 border-yellow-300';
    return 'bg-red-100 border-red-300';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceIcon = (score) => {
    if (score >= 8) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (score >= 6) return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    return <XCircle className="w-5 h-5 text-red-600" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading interview report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading report: {error}</p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { interview, responses, performance_summary, recommendations } = reportData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-2 hover:bg-white rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Interview Report</h1>
                <p className="text-gray-600">{interview.job_role} - {new Date(interview.completed_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
                Share Report
              </button>
            </div>
          </div>

          {/* Overall Performance */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className={`inline-block px-6 py-4 rounded-2xl border-2 ${getScoreBgColor(interview.overall_score)}`}>
                  <div className={`text-3xl font-bold ${getScoreColor(interview.overall_score)}`}>
                    {interview.overall_score}/10
                  </div>
                  <p className="text-gray-600 font-medium">Overall Score</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Questions Attempted</p>
                  <p className="text-xl font-bold text-gray-900">{interview.questions_attempted}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg mr-4">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="text-xl font-bold text-gray-900">{interview.duration_minutes} min</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg mr-4">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Performance</p>
                  <p className="text-xl font-bold text-gray-900">{performance_summary?.performance_level}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Performance Summary */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Breakdown</h2>
              
              {performance_summary?.category_performance && (
                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Category Performance</h3>
                  {Object.entries(performance_summary.category_performance).map(([category, score]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">{category}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            style={{ width: `${(score / 10) * 100}%` }}
                          ></div>
                        </div>
                        <span className={`font-semibold ${getScoreColor(score)}`}>{score}/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {performance_summary?.difficulty_performance && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Difficulty Performance</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(performance_summary.difficulty_performance).map(([difficulty, score]) => (
                      <div key={difficulty} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${getDifficultyColor(difficulty)}`}>
                          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </div>
                        <div className={`text-xl font-bold ${getScoreColor(score)}`}>{score}/10</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recommendations</h2>
              
              {performance_summary?.strengths?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {performance_summary.strengths.map((strength, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {performance_summary?.weaknesses?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Areas for Improvement
                  </h3>
                  <ul className="space-y-2">
                    {performance_summary.weaknesses.map((weakness, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recommendations?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Study Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {recommendations.map((recommendation, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        {recommendation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Question Analysis */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Detailed Question Analysis</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {responses.map((response, index) => (
                <div key={index} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getPerformanceIcon(response.score)}
                        <h3 className="text-lg font-semibold text-gray-900">Question {index + 1}</h3>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(response.difficulty)}`}>
                          {response.difficulty}
                        </span>
                        {response.category && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {response.category}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full border ${getScoreBgColor(response.score)}`}>
                      <span className={`text-sm font-bold ${getScoreColor(response.score)}`}>
                        {response.score}/10
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-gray-700 mb-2">Question:</p>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{response.question}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-700 mb-2">Your Answer:</p>
                      <p className="text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">{response.user_answer}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-700 mb-2">Expected Answer:</p>
                      <p className="text-gray-600 bg-green-50 p-3 rounded-lg border border-green-200">{response.expected_answer}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-700 mb-2">Feedback:</p>
                      <p className="text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">{response.feedback}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Take Another Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}