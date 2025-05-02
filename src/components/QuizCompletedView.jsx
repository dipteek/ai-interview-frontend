"use client";
import { 
  ChevronLeft, 
  Award, 
  ArrowLeft, 
  Layout, 
  Clock, 
  Timer,
  CheckCircle
} from 'lucide-react';

export default function QuizCompletedView({
  score,
  questions,
  timeSpent,
  timeLimit,
  timeExpired,
  currentQuestionIndex,
  router,
  jobId,
  onRestart
}) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const calculatePercentage = () => {
    // If time expired, calculate based on questions answered
    const total = timeExpired ? currentQuestionIndex : questions.length;
    if (total === 0) return 0; // Avoid division by zero
    return Math.round((score / total) * 100);
  };

  const getPerformanceMessage = () => {
    const percentage = calculatePercentage();
    if (percentage >= 90) return "Outstanding! You're exceptionally prepared for this role.";
    if (percentage >= 75) return "Great job! You have a solid understanding of the requirements.";
    if (percentage >= 60) return "Good effort! A bit more preparation will make you ready.";
    return "Keep practicing! Focus on the areas where you need improvement.";
  };

  const getPerformanceColor = () => {
    const percentage = calculatePercentage();
    if (percentage >= 90) return "bg-green-100 text-green-800 border-green-200";
    if (percentage >= 75) return "bg-blue-100 text-blue-800 border-blue-200";
    if (percentage >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
      {/* Header */}
      <div className="bg-blue-700 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="flex items-center">
            <button 
              onClick={() => router.push('/')}
              className="mr-4 p-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold">Interview Complete</h1>
              <p className="text-blue-100 mt-1">Results and Performance</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-50 p-6 border-b border-blue-100 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                {timeExpired ? (
                  <Timer className="h-10 w-10 text-orange-600" />
                ) : (
                  <Award className="h-10 w-10 text-blue-700" />
                )}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {timeExpired ? "Time's Up!" : "Interview Assessment Complete"}
            </h2>
            <p className="text-gray-600 mt-2">
              {timeExpired 
                ? `You completed ${currentQuestionIndex} of ${questions.length} questions`
                : `You've completed all ${questions.length} questions`
              }
            </p>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="relative h-36 w-36">
                <div className="h-36 w-36 rounded-full bg-gray-100 flex items-center justify-center">
                  <div className="text-3xl font-bold text-blue-700">{calculatePercentage()}%</div>
                </div>
                <svg className="absolute top-0 left-0" width="144" height="144" viewBox="0 0 144 144">
                  <circle 
                    cx="72" 
                    cy="72" 
                    r="66" 
                    fill="none" 
                    stroke="#e5e7eb" 
                    strokeWidth="12" 
                  />
                  <circle 
                    cx="72" 
                    cy="72" 
                    r="66" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="12" 
                    strokeDasharray="415" 
                    strokeDashoffset={415 - (415 * calculatePercentage()) / 100} 
                    strokeLinecap="round" 
                    transform="rotate(-90 72 72)" 
                  />
                </svg>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-lg font-semibold text-gray-800">
                  You scored {score} out of {timeExpired ? currentQuestionIndex : questions.length} questions correctly
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mt-1">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Time spent: {formatTime(timeSpent)}
                  </span>
                  {timeLimit && (
                    <span className="flex items-center">
                      <Timer className="h-4 w-4 mr-1" />
                      Time limit: {timeLimit} minutes
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {timeExpired && (
              <div className="p-4 border rounded-lg mb-6 bg-orange-100 text-orange-800 border-orange-200">
                <p className="font-medium">
                  Your time ran out! You managed to answer {currentQuestionIndex} out of {questions.length} questions.
                </p>
              </div>
            )}
            
            <div className={`p-4 border rounded-lg mb-6 ${getPerformanceColor()}`}>
              <p className="font-medium">{getPerformanceMessage()}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex items-center mb-1">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-gray-700">Correct Answers</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{score}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex items-center mb-1">
                  <Clock className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-sm font-medium text-gray-700">Average Time per Question</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {formatTime(Math.round(timeSpent / (timeExpired ? currentQuestionIndex || 1 : questions.length)))}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
              <button
                onClick={onRestart}
                className="flex-1 py-3 px-4 bg-white border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                <Layout className="mr-2 h-4 w-4" />
                Restart Interview
              </button>
              <button
                onClick={() => router.push('/')}
                className="flex-1 py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Job Listings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}