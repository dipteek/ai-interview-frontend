"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Award, 
  ArrowLeft, 
  HelpCircle, 
  Layout, 
  Loader2 
} from 'lucide-react';

export default function QuizPage() {
  const { jobId } = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeSpent, setTimeSpent] = useState(0);
  const [feedback, setFeedback] = useState({ show: false, isCorrect: false });

  useEffect(() => {
    const storedQuestions = localStorage.getItem('interviewQuestions');
    if (storedQuestions) {
      try {
        setQuestions(JSON.parse(storedQuestions));
      } catch (e) {
        console.error("Error parsing questions:", e);
      } finally {
        setLoading(false);
      }
    } else {
      router.push(`/interview/${jobId}`);
    }
  }, [jobId, router]);

  // Timer for tracking time spent
  useEffect(() => {
    if (!quizCompleted && !loading && questions.length > 0) {
      const timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizCompleted, loading, questions.length]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    // Show feedback before proceeding
    const isCorrect = selectedOption === questions[currentQuestionIndex].correct_chose;
    setFeedback({ show: true, isCorrect });
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Show feedback briefly, then proceed
    setTimeout(() => {
      setFeedback({ show: false, isCorrect: false });
      
      // Move to next question or complete quiz
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };
  
  const calculatePercentage = () => {
    return Math.round((score / questions.length) * 100);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-700 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading interview questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="flex items-center justify-center text-red-500 mb-4">
            <AlertCircle className="h-12 w-12" />
          </div>
          <h2 className="text-xl font-bold text-center mb-2">No Questions Available</h2>
          <p className="text-gray-600 text-center mb-6">We couldn't find any interview questions. Please return to the job details page.</p>
          <button 
            onClick={() => router.push(`/interview/${jobId}`)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Return to Job Details
          </button>
        </div>
      </div>
    );
  }

  // Ensure the currentQuestionIndex is within bounds
  const currentQuestion = questions[currentQuestionIndex] || {};

  // If currentQuestion is still undefined, show a fallback message
  if (!currentQuestion.question) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="flex items-center justify-center text-yellow-500 mb-4">
            <HelpCircle className="h-12 w-12" />
          </div>
          <h2 className="text-xl font-bold text-center mb-2">Question Error</h2>
          <p className="text-gray-600 text-center mb-6">The current question appears to be invalid. Please restart the interview.</p>
          <button 
            onClick={() => router.push(`/interview/${jobId}`)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Restart Interview
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
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
                  <Award className="h-10 w-10 text-blue-700" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Interview Assessment Complete</h2>
              <p className="text-gray-600 mt-2">You've completed all {questions.length} questions</p>
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
                    You scored {score} out of {questions.length} questions correctly
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Time spent: {formatTime(timeSpent)}
                  </p>
                </div>
              </div>
              
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
                    {formatTime(Math.round(timeSpent / questions.length))}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                <button
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setSelectedOption(null);
                    setScore(0);
                    setQuizCompleted(false);
                    setTimeSpent(0);
                  }}
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
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex justify-center md:justify-start">
                <span className="text-lg font-semibold">Interview Preparation Portal</span>
              </div>
              <p className="mt-4 md:mt-0 text-center md:text-right text-sm text-gray-400">
                © {new Date().getFullYear()} Your Company. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
      {/* Header */}
      <div className="bg-blue-700 text-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => router.push(`/interview/${jobId}`)}
                className="mr-3 p-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold">Interview in Progress</h1>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">{formatTime(timeSpent)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2">
        <div 
          className="bg-blue-600 h-2 transition-all duration-300" 
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="inline-flex items-center justify-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm text-gray-500">
                Score: {score}/{currentQuestionIndex}
              </span>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion.question}
            </h2>
            
            <div className="space-y-4 mb-6">
              {Object.entries(currentQuestion.multiple_choice).map(([key, value]) => (
                <div
                  key={key}
                  onClick={() => !feedback.show && handleOptionSelect(key)}
                  className={`p-5 border rounded-lg cursor-pointer transition-all hover:border-blue-300 
                    ${feedback.show && key === currentQuestion.correct_chose 
                      ? 'border-green-500 bg-green-50' 
                      : feedback.show && key === selectedOption && key !== currentQuestion.correct_chose 
                        ? 'border-red-500 bg-red-50' 
                        : selectedOption === key 
                          ? 'border-blue-500 bg-blue-50 shadow-sm' 
                          : 'border-gray-200'
                    }
                    ${feedback.show ? 'pointer-events-none' : ''}`
                  }
                >
                  <div className="flex">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full mr-3 flex items-center justify-center border
                      ${selectedOption === key 
                        ? 'border-blue-600 bg-blue-600 text-white' 
                        : 'border-gray-300'
                      }
                      ${feedback.show && key === currentQuestion.correct_chose 
                        ? 'border-green-600 bg-green-600 text-white' 
                        : feedback.show && key === selectedOption && key !== currentQuestion.correct_chose 
                          ? 'border-red-600 bg-red-600 text-white' 
                          : ''
                      }`
                    }>
                      <span className="text-xs font-bold">{key}</span>
                    </div>
                    <span className="text-gray-800">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            {feedback.show && (
              <div className={`mb-6 p-4 rounded-lg text-center animate-pulse ${
                feedback.isCorrect 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {feedback.isCorrect 
                  ? 'Correct! Well done.' 
                  : `Incorrect. The correct answer is ${currentQuestion.correct_chose}.`
                }
              </div>
            )}
            
            <button
              onClick={handleNextQuestion}
              disabled={!selectedOption || feedback.show}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center
                ${!selectedOption || feedback.show ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`
              }
            >
              {feedback.show ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : currentQuestionIndex === questions.length - 1 ? (
                <>
                  Finish Interview
                  <CheckCircle className="ml-2 h-5 w-5" />
                </>
              ) : (
                <>
                  Next Question
                  <ChevronRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}