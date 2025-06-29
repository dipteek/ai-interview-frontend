'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, MicOff, Volume2, ArrowLeft, ArrowRight, Send, Home, CheckCircle2, Clock, User, Code, Zap, AlertCircle, Timer } from 'lucide-react';

export default function InterviewPage({ params }) {
  const [experience, setExperience] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [availableTechStacks, setAvailableTechStacks] = useState([]);
  const [isLoadingTechStacks, setIsLoadingTechStacks] = useState(true);
  const [jobRoles, setJobRoles] = useState({});
  const [currentJobRole, setCurrentJobRole] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [interviewId, setInterviewId] = useState(null);
  const [jobRoleId, setJobRoleId] = useState(null); // Add state for job role ID
  
  // Interview limit states
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [limitReached, setLimitReached] = useState(false);
  const [timeUntilReset, setTimeUntilReset] = useState(null);
  const [isCheckingLimit, setIsCheckingLimit] = useState(true);
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const router = useRouter();

  // Get params.id asynchronously
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setJobRoleId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  // Check interview limit on component mount
  useEffect(() => {
    checkInterviewLimit();
  }, []);

  const checkInterviewLimit = async () => {
    setIsCheckingLimit(true);
    try {
      const response = await fetch('http://localhost:8000/api/voice/check-limit/');
      if (response.ok) {
        const data = await response.json();
        setRemainingAttempts(data.remaining_attempts);
        setLimitReached(!data.can_take_interview);
        setTimeUntilReset(data.time_until_reset);
      }
    } catch (error) {
      console.error('Error checking interview limit:', error);
    } finally {
      setIsCheckingLimit(false);
    }
  };

  // Fetch job roles from Django backend
  useEffect(() => {
    if (!jobRoleId) {
      console.log(jobRoleId)
      return;
    } // Wait until jobRoleId is available


    const fetchJobRoles = async () => {
      try {
        const response = await fetch('http://localhost:8000/careers/api/job-roles/');
        if (!response.ok) throw new Error('Failed to fetch job roles');
        const data = await response.json();

        // Convert array to object with ID as key
        const rolesObj = {};
        data.job_roles.forEach(role => {
          rolesObj[role.id] = role.title;
        });

        setJobRoles(rolesObj);

        // Set current job role if jobRoleId exists
        if (jobRoleId && data.job_roles.some(role => role.id == jobRoleId)) {
          setCurrentJobRole(data.job_roles.find(role => role.id == jobRoleId));
        }
      } catch (error) {
        console.error('Error fetching job roles:', error);
      }
    };

    fetchJobRoles();
  }, [jobRoleId]);

  // Fetch tech stacks for current job role
  useEffect(() => {
    if (!jobRoleId) return; // Wait until jobRoleId is available

    const fetchTechStacks = async () => {
      setIsLoadingTechStacks(true);
      try {
        const response = await fetch(`http://localhost:8000/careers/api/job-roles/${jobRoleId}/tech-stacks/`);
        if (!response.ok) throw new Error('Failed to fetch tech stacks');
        const data = await response.json();
        setAvailableTechStacks(data.tech_stacks || []);
      } catch (error) {
        console.error('Error fetching tech stacks:', error);
        setAvailableTechStacks([]);
      } finally {
        setIsLoadingTechStacks(false);
      }
    };

    fetchTechStacks();
  }, [jobRoleId]);

  const TypeText = ({ text, delay = 20 }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
      setDisplayedText('');
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(prev => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, delay);

      return () => clearInterval(typingInterval);
    }, [text, delay]);

    return <>{displayedText}</>;
  };

  const generateQuestions = async () => {
    if (!experience || techStack.length === 0) {
      alert('Please enter your experience and select at least one tech stack');
      return;
    }

    if (limitReached) {
      alert('You have reached your daily interview limit. Please try again later.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/voice/generate-questions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          position: currentJobRole?.title || jobRoles[jobRoleId],
          experience: experience,
          techStack: techStack,
        }),
      });

      const data = await response.json();

      if (response.status === 429) {
        // Limit reached
        setLimitReached(true);
        setTimeUntilReset(data.time_until_reset);
        alert(`Daily interview limit reached. Try again in ${data.time_until_reset.hours}h ${data.time_until_reset.minutes}m`);
        return;
      }

      if (!response.ok) throw new Error(data.error || 'Failed to generate questions');
      
      setQuestions(data.questions);
      setInterviewId(data.interview_id);
      setRemainingAttempts(data.remaining_attempts);
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

      recognitionRef.current.onstart = () => setIsRecording(true);

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = updatedAnswers[currentQuestionIndex]
          ? `${updatedAnswers[currentQuestionIndex]} ${transcript}`
          : transcript;
        setUserAnswers(updatedAnswers);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => setIsRecording(false);

      recognitionRef.current.start();
    } else {
      alert('Speech recognition not supported in your browser');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
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
      const response = await fetch('http://localhost:8000/api/voice/analyze-answers/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questions: questions,
          userAnswers: userAnswers,
          interview_id: interviewId,
        }),
      });

      if (!response.ok) throw new Error('Failed to analyze answers');
      const data = await response.json();
      setAnalysis(data);
      setRemainingAttempts(data.remaining_attempts);
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

  const getScoreBgColor = (score) => {
    if (score >= 8) return 'bg-green-100 border-green-300';
    if (score >= 6) return 'bg-yellow-100 border-yellow-300';
    return 'bg-red-100 border-red-300';
  };

  // Format time remaining
  const formatTimeRemaining = (timeData) => {
    if (!timeData) return '';
    return `${timeData.hours}h ${timeData.minutes}m`;
  };

  if (isCheckingLimit || !jobRoleId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Checking interview availability...</p>
        </div>
      </div>
    );
  }

  if (!currentJobRole) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading job role information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {questions.length === 0 ? (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto mt-20">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              {/* Interview Limit Status */}
              <div className="mb-6">
                <div className={`flex items-center justify-between p-4 rounded-xl border-2 ${
                  limitReached ? 'bg-red-50 border-red-200' : remainingAttempts <= 1 ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'
                }`}>
                  <div className="flex items-center">
                    {limitReached ? (
                      <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                    ) : (
                      <Timer className="w-5 h-5 text-blue-600 mr-2" />
                    )}
                    <div>
                      <p className={`font-semibold ${limitReached ? 'text-red-800' : 'text-gray-800'}`}>
                        {limitReached ? 'Daily Limit Reached' : `${remainingAttempts} Interview${remainingAttempts !== 1 ? 's' : ''} Remaining`}
                      </p>
                      {limitReached && timeUntilReset && (
                        <p className="text-red-600 text-sm">
                          Reset in: {formatTimeRemaining(timeUntilReset)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                    limitReached ? 'bg-red-200 text-red-800' : 'bg-blue-200 text-blue-800'
                  }`}>
                    {remainingAttempts}/3
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {currentJobRole.title} Interview
                </h1>
                <p className="text-gray-600">Prepare for your technical interview with AI-powered questions</p>
              </div>

              {limitReached ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Daily Interview Limit Reached</h3>
                  <p className="text-gray-600 mb-4">
                    You've completed your 3 interviews for today. Come back tomorrow for more practice!
                  </p>
                  {timeUntilReset && (
                    <p className="text-red-600 font-semibold mb-6">
                      Reset in: {formatTimeRemaining(timeUntilReset)}
                    </p>
                  )}
                  <button
                    onClick={() => router.push('/')}
                    className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-8 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-200 flex items-center mx-auto"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Back to Home
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      min="0"
                      max="30"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                      placeholder="Enter your years of experience"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                      <Code className="w-5 h-5 mr-2 text-blue-600" />
                      Tech Stack
                    </label>
                    {isLoadingTechStacks ? (
                      <div className="grid grid-cols-2 gap-3">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
                        ))}
                      </div>
                    ) : availableTechStacks.length > 0 ? (
                      <div className="grid grid-cols-2 gap-3">
                        {availableTechStacks.map((tech) => (
                          <label
                            key={tech}
                            className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${techStack.includes(tech)
                              ? 'bg-blue-100 border-2 border-blue-300'
                              : 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100'
                              }`}
                          >
                            <input
                              type="checkbox"
                              checked={techStack.includes(tech)}
                              onChange={() => {
                                if (techStack.includes(tech)) {
                                  setTechStack(techStack.filter(t => t !== tech));
                                } else {
                                  setTechStack([...techStack, tech]);
                                }
                              }}
                              className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded mr-3 flex items-center justify-center ${techStack.includes(tech) ? 'bg-blue-600' : 'bg-white border-2 border-gray-300'
                              }`}>
                              {techStack.includes(tech) && <CheckCircle2 className="w-3 h-3 text-white" />}
                            </div>
                            <span className="font-medium text-gray-700">{tech}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="text-red-500">No tech stacks available for this role</div>
                    )}
                  </div>

                  <button
                    onClick={generateQuestions}
                    disabled={isLoading || limitReached}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Generating Questions...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Generate Interview Questions
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : analysis ? (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mt-20">
              {/* Show remaining attempts */}
              <div className="mb-6">
                <div className="flex items-center justify-center">
                  <div className={`px-4 py-2 rounded-full border-2 ${
                    remainingAttempts > 1 ? 'bg-green-50 border-green-200' : 
                    remainingAttempts === 1 ? 'bg-yellow-50 border-yellow-200' : 
                    'bg-red-50 border-red-200'
                  }`}>
                    <span className={`text-sm font-semibold ${
                      remainingAttempts > 1 ? 'text-green-800' : 
                      remainingAttempts === 1 ? 'text-yellow-800' : 
                      'text-red-800'
                    }`}>
                      {remainingAttempts} interview{remainingAttempts !== 1 ? 's' : ''} remaining today
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Interview Analysis</h1>
                <div className={`inline-block px-8 py-4 rounded-2xl border-2 ${getScoreBgColor(analysis.overallScore)}`}>
                  <h2 className={`text-4xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                    {analysis.overallScore}/10
                  </h2>
                  <p className="text-gray-600 font-medium">Overall Score</p>
                </div>
              </div>

              <div className="space-y-6">
                {analysis.detailedAnalysis.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">Question {index + 1}</h3>
                      <div className={`px-3 py-1 rounded-full border ${getScoreBgColor(item.score)}`}>
                        <span className={`text-sm font-bold ${getScoreColor(item.score)}`}>
                          {item.score}/10
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-700 mb-1">Question:</p>
                        <p className="text-gray-600 bg-white p-3 rounded-lg border">{item.question}</p>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-700 mb-1">Your Answer:</p>
                        <p className="text-gray-600 bg-white p-3 rounded-lg border">{item.userAnswer}</p>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-700 mb-1">Expected Answer:</p>
                        <p className="text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">{item.expectedAnswer}</p>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-700 mb-1">Feedback:</p>
                        <p className="text-gray-600 bg-green-50 p-3 rounded-lg border border-green-200">{item.feedback}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8 space-y-4">
                {remainingAttempts > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                    <p className="text-blue-800 font-medium">
                      You have {remainingAttempts} more interview{remainingAttempts !== 1 ? 's' : ''} available today!
                    </p>
                  </div>
                )}
                
                <div className="flex gap-4 justify-center">
                  {remainingAttempts > 0 && (
                    <button
                      onClick={() => window.location.reload()}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Take Another Interview
                    </button>
                  )}
                  
                  <button
                    onClick={() => router.push('/')}
                    className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-8 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-200 flex items-center"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mt-15">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-800">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 px-4 py-2 rounded-full">
                    <span className="text-blue-800 font-semibold">
                      {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    remainingAttempts > 1 ? 'bg-green-100 text-green-800' : 
                    remainingAttempts === 1 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {remainingAttempts} left today
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-200">
                <div className="text-lg text-gray-800 leading-relaxed min-h-16">
                  <TypeText text={questions[currentQuestionIndex].question} delay={20} />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Your Answer:</h3>
                  <textarea
                    value={userAnswers[currentQuestionIndex] || ''}
                    onChange={(e) => {
                      const updatedAnswers = [...userAnswers];
                      updatedAnswers[currentQuestionIndex] = e.target.value;
                      setUserAnswers(updatedAnswers);
                    }}
                    placeholder="Speak or type your answer here..."
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  {isRecording ? (
                    <button
                      onClick={stopRecording}
                      className="bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-all duration-200 flex items-center"
                    >
                      <MicOff className="w-5 h-5 mr-2" />
                      Stop Recording
                    </button>
                  ) : (
                    <button
                      onClick={startRecording}
                      className="bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-all duration-200 flex items-center"
                    >
                      <Mic className="w-5 h-5 mr-2" />
                      Record Answer
                    </button>
                  )}

                  <button
                    onClick={() => speakQuestion(questions[currentQuestionIndex].question)}
                    className="bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center"
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    Repeat Question
                  </button>
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Previous
                  </button>

                  {currentQuestionIndex < questions.length - 1 ? (
                    <button
                      onClick={nextQuestion}
                      className="bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center"
                    >
                      Next
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  ) : (
                    <button
                      onClick={analyzeAnswers}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Submit Answers
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}