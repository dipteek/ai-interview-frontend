"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function QuizPage() {
  const { jobId } = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const storedQuestions = localStorage.getItem('interviewQuestions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    } else {
      router.push(`/interview/${jobId}`);
    }
  }, [jobId, router]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestionIndex].correct_chose) {
      setScore(score + 1);
    }
    
    // Move to next question or complete quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  if (questions.length === 0) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  // Ensure the currentQuestionIndex is within bounds
  const currentQuestion = questions[currentQuestionIndex] || {};

  // If currentQuestion is still undefined, show a fallback message
  if (!currentQuestion.question) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">No valid question available</div>;
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Interview Completed!</h1>
          <p className="text-lg mb-6">
            Your score: {score} out of {questions.length}
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="mb-6">
            <span className="text-sm font-medium text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <h2 className="text-xl font-semibold text-gray-800 mt-1">
              {currentQuestion.question}
            </h2>
          </div>
          
          <div className="space-y-3 mb-8">
            {Object.entries(currentQuestion.multiple_choice).map(([key, value]) => (
              <div
                key={key}
                onClick={() => handleOptionSelect(key)}
                className={`p-4 border rounded-md cursor-pointer transition-colors ${
                  selectedOption === key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="font-medium mr-2">{key}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleNextQuestion}
            disabled={!selectedOption}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors ${
              !selectedOption ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish Interview' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
}
