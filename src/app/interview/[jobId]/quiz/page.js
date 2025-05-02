"use client";
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  HelpCircle, 
  Loader2, 
  Timer 
} from 'lucide-react';
import QuizCompletedView from '@/components/QuizCompletedView';
// import QuizCompletedView from './QuizCompletedView';

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
  const [timeLimit, setTimeLimit] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [timeExpired, setTimeExpired] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const storedQuestions = localStorage.getItem('interviewQuestions');
    const storedTimeLimit = localStorage.getItem('interviewTimeLimit');
    
    if (storedQuestions) {
      try {
        setQuestions(JSON.parse(storedQuestions));
        
        // Set time limit if it exists
        if (storedTimeLimit && storedTimeLimit !== '') {
          const limitInMinutes = parseInt(storedTimeLimit, 10);
          setTimeLimit(limitInMinutes);
          setTimeRemaining(limitInMinutes * 60); // Convert to seconds
        }
      } catch (e) {
        console.error("Error parsing questions:", e);
      } finally {
        setLoading(false);
      }
    } else {
      router.push(`/interview/${jobId}`);
    }
  }, [jobId, router]);

  // Timer for tracking time spent and time remaining
  useEffect(() => {
    if (!quizCompleted && !loading && questions.length > 0) {
      timerRef.current = setInterval(() => {
        setTimeSpent(prev => prev + 1);
        
        // Update time remaining if time limit exists
        if (timeRemaining !== null) {
          setTimeRemaining(prev => {
            if (prev <= 1) {
              // Time's up
              clearInterval(timerRef.current);
              setTimeExpired(true);
              setQuizCompleted(true);
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
      
      return () => clearInterval(timerRef.current);
    }
  }, [quizCompleted, loading, questions.length, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    // Check for either correct_choice (new API) or correct_chose (old API)
    const correctAnswer = currentQuestion.correct_choice || currentQuestion.correct_chose;
    
    // Show feedback before proceeding
    const isCorrect = selectedOption === correctAnswer;
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

  // Get time remaining styling (changes color when getting low)
  const getTimeRemainingStyle = () => {
    if (timeRemaining === null) return "text-gray-500";
    if (timeRemaining <= 60) return "text-red-600 font-bold animate-pulse";
    if (timeRemaining <= 180) return "text-orange-500 font-medium";
    return "text-blue-600";
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
            <ChevronLeft className="mr-2 h-4 w-4" />
            Restart Interview
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <QuizCompletedView
        score={score}
        questions={questions}
        timeSpent={timeSpent}
        timeLimit={timeLimit}
        timeExpired={timeExpired}
        currentQuestionIndex={currentQuestionIndex}
        router={router}
        jobId={jobId}
        onRestart={() => {
          setCurrentQuestionIndex(0);
          setSelectedOption(null);
          setScore(0);
          setQuizCompleted(false);
          setTimeSpent(0);
          setTimeExpired(false);
          if (timeLimit) {
            setTimeRemaining(timeLimit * 60);
          }
        }}
      />
    );
  }

  // Get the correct answer key - support both field names
  const correctAnswer = currentQuestion.correct_choice || currentQuestion.correct_chose;

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
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{formatTime(timeSpent)}</span>
              </div>
              
              {timeRemaining !== null && (
                <div className={`flex items-center ${getTimeRemainingStyle()}`}>
                  <Timer className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {timeRemaining <= 60 ? `${timeRemaining}s left!` : formatTime(timeRemaining)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress and Time Bars */}
      <div className="w-full bg-gray-200 h-2">
        <div 
          className="bg-blue-600 h-2 transition-all duration-300" 
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
      
      {timeRemaining !== null && (
        <div className="w-full bg-gray-200 h-1">
          <div 
            className={`h-1 transition-all duration-1000 ${
              timeRemaining <= 60 ? 'bg-red-600' : 
              timeRemaining <= 180 ? 'bg-orange-500' : 'bg-green-600'
            }`}
            style={{ width: `${(timeRemaining / (timeLimit * 60)) * 100}%` }}
          ></div>
        </div>
      )}

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
                    ${feedback.show && key === correctAnswer 
                      ? 'border-green-500 bg-green-50' 
                      : feedback.show && key === selectedOption && key !== correctAnswer 
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
                      ${feedback.show && key === correctAnswer 
                        ? 'border-green-600 bg-green-600 text-white' 
                        : feedback.show && key === selectedOption && key !== correctAnswer 
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
                  : `Incorrect. The correct answer is ${correctAnswer}.`
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
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Processing...
                </span>
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
        
        {timeLimit && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-center">
            <Timer className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm text-blue-800">
              {timeRemaining <= 60 
                ? <span className="font-bold text-red-600">Time is almost up!</span>
                : `Time limit: ${timeLimit} minutes`
              }
            </span>
          </div>
        )}
      </div>
    </div>
  );
}