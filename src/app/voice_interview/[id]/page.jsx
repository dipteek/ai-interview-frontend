'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Typewriter from 'typewriter-effect';
import { Mic, MicOff, ChevronLeft, ChevronRight, Volume2, ArrowLeft, Send } from 'lucide-react';

export default function InterviewPage({ params }) {
  const [experience, setExperience] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [interviewStep, setInterviewStep] = useState('setup'); // setup, interview, analysis
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const router = useRouter();

  const jobRoles = {
    1: 'Frontend Developer',
    2: 'Backend Developer',
    3: 'Full Stack Developer',
    4: 'DevOps Engineer',
    5: 'Data Scientist',
  };

  const availableTechStacks = {
    1: ['React', 'Angular', 'Vue', 'JavaScript', 'TypeScript', 'HTML/CSS'],
    2: ['Node.js', 'Python', 'Java', 'C#', 'Ruby', 'PHP'],
    3: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker'],
    4: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    5: ['Python', 'R', 'TensorFlow', 'PyTorch', 'Pandas', 'SQL'],
  };

  const generateQuestions = async () => {
    if (!experience || techStack.length === 0) {
      alert('Please enter your experience and select at least one technology');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/voice/generate-questions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          position: jobRoles[params.id],
          experience: experience,
          techStack: techStack,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      setQuestions(data.questions);
      setInterviewStep('interview');
      speakQuestion(data.questions[0].question);
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Failed to generate questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const speakQuestion = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      synthRef.current.speak(utterance);
    }
  };

  const startRecording = () => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = transcript;
        setUserAnswers(updatedAnswers);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current.start();
    } else {
      alert('Speech recognition not supported in your browser');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      speakQuestion(questions[currentQuestionIndex + 1].question);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const analyzeAnswers = async () => {
    if (userAnswers.length !== questions.length) {
      alert('Please answer all questions before submitting');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/voice/analyze-answers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questions: questions,
          userAnswers: userAnswers,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze answers');
      }

      const data = await response.json();
      setAnalysis(data);
      setInterviewStep('analysis');
    } catch (error) {
      console.error('Error analyzing answers:', error);
      alert('Failed to analyze answers. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderSetupScreen = () => (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="mr-2">{jobRoles[params.id]} Interview</span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Preparation</span>
      </h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
        <input
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          min="0"
          max="30"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Technologies</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availableTechStacks[params.id].map((tech) => (
            <div key={tech} className="flex items-center">
              <input
                type="checkbox"
                id={tech}
                checked={techStack.includes(tech)}
                onChange={() => {
                  if (techStack.includes(tech)) {
                    setTechStack(techStack.filter((t) => t !== tech));
                  } else {
                    setTechStack([...techStack, tech]);
                  }
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={tech} className="ml-2 block text-sm text-gray-700">
                {tech}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Roles
        </button>
        
        <button
          onClick={generateQuestions}
          disabled={isLoading}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Questions...
            </>
          ) : (
            <>
              Start Interview
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderInterviewScreen = () => (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <div className="flex items-center space-x-1">
          {Array.from({ length: questions.length }).map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2 w-8 rounded-full ${currentQuestionIndex === idx ? 'bg-blue-600' : userAnswers[idx] ? 'bg-green-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-6 shadow-inner min-h-32">
        <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">Question:</h3>
        <div className="text-xl text-gray-800 min-h-16">
          {questions.length > 0 && (
            <Typewriter
              options={{
                strings: [questions[currentQuestionIndex].question],
                autoStart: true,
                
                delay: 45,
                cursor: '',
              }}
            />
          )}
        </div>
        <button
          onClick={() => speakQuestion(questions[currentQuestionIndex].question)}
          className="mt-3 inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <Volume2 className="h-3 w-3 mr-1" />
          Listen
        </button>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm uppercase tracking-wide text-gray-500">Your Answer:</h3>
          <div className="flex items-center">
            {isRecording ? (
              <button 
                onClick={stopRecording} 
                className="inline-flex items-center px-3 py-1 border border-red-300 text-xs font-medium rounded text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-red-500"
              >
                <MicOff className="h-3 w-3 mr-1" />
                Stop Recording
              </button>
            ) : (
              <button 
                onClick={startRecording} 
                className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <Mic className="h-3 w-3 mr-1" />
                Record Answer
              </button>
            )}
          </div>
        </div>
        
        <textarea
          value={userAnswers[currentQuestionIndex] || ''}
          onChange={(e) => {
            const updatedAnswers = [...userAnswers];
            updatedAnswers[currentQuestionIndex] = e.target.value;
            setUserAnswers(updatedAnswers);
          }}
          placeholder="Type or speak your answer here..."
          className={`w-full px-3 py-2 border ${isRecording ? 'border-red-300 ring-1 ring-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 min-h-32`}
        />
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
          className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 ${currentQuestionIndex === 0 ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </button>
        
        {currentQuestionIndex < questions.length - 1 ? (
          <button 
            onClick={nextQuestion} 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        ) : (
          <button
            onClick={analyzeAnswers}
            disabled={isLoading}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              'Submit All Answers'
            )}
          </button>
        )}
      </div>
    </div>
  );

  const renderAnalysisScreen = () => (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Interview Assessment</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8 text-center">
        <h2 className="text-lg text-gray-600 mb-2">Overall Performance</h2>
        <div className="text-4xl font-bold mb-2 flex items-center justify-center">
          <span className={getScoreColor(analysis.overallScore)}>
            {analysis.overallScore}/10
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className={`h-2.5 rounded-full ${
              analysis.overallScore >= 8 ? 'bg-green-600' : 
              analysis.overallScore >= 6 ? 'bg-yellow-500' : 'bg-red-600'
            }`}
            style={{ width: `${analysis.overallScore * 10}%` }}
          />
        </div>
      </div>
      
      <div className="space-y-6">
        {analysis.detailedAnalysis.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-700">Question {index + 1}</h3>
              <span className={`font-medium ${getScoreColor(item.score)}`}>
                {item.score}/10
              </span>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Question</p>
                <p className="text-sm text-gray-800">{item.question}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Your Answer</p>
                <p className="text-sm text-gray-800 bg-gray-50 p-2 rounded">{item.userAnswer}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Expected Content</p>
                <p className="text-sm text-gray-800 bg-blue-50 p-2 rounded">{item.expectedAnswer}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Feedback</p>
                <p className="text-sm text-gray-700">{item.feedback}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Return to Home
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      {interviewStep === 'setup' && renderSetupScreen()}
      {interviewStep === 'interview' && renderInterviewScreen()}
      {interviewStep === 'analysis' && renderAnalysisScreen()}
    </div>
  );
}