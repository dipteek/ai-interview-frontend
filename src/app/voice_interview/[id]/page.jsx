
// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import Typewriter from 'typewriter-effect';

// import styles from "@/styles/interview.module.css";

// export default function InterviewPage({ params }) {
//   const [experience, setExperience] = useState('');
//   const [techStack, setTechStack] = useState([]);
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [isRecording, setIsRecording] = useState(false);
//   const [userAnswers, setUserAnswers] = useState([]);
//   const [analysis, setAnalysis] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const recognitionRef = useRef(null);
//   const synthRef = useRef(null);
//   const router = useRouter();

//   const jobRoles = {
//     1: 'Frontend Developer',
//     2: 'Backend Developer',
//     3: 'Full Stack Developer',
//     4: 'DevOps Engineer',
//     5: 'Data Scientist',
//   };

//   const availableTechStacks = {
//     1: ['React', 'Angular', 'Vue', 'JavaScript', 'TypeScript', 'HTML/CSS'],
//     2: ['Node.js', 'Python', 'Java', 'C#', 'Ruby', 'PHP'],
//     3: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker'],
//     4: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
//     5: ['Python', 'R', 'TensorFlow', 'PyTorch', 'Pandas', 'SQL'],
//   };



//   const TypeText = ({ text, delay = 20 }) => {
//     const [displayedText, setDisplayedText] = useState('');

//     useEffect(() => {
//       setDisplayedText(''); // Reset when text changes
//       let i = 0;
//       const typingInterval = setInterval(() => {
//         if (i < text.length) {
//           setDisplayedText((prev) => prev + text.charAt(i));
//           i++;
//         } else {
//           clearInterval(typingInterval);
//         }
//       }, delay);

//       return () => clearInterval(typingInterval);
//     }, [text, delay]);

//     return <>{displayedText}</>;
//   };

//   const generateQuestions = async () => {
//     if (!experience || techStack.length === 0) {
//       alert('Please enter your experience and select at least one tech stack');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/voice/generate-questions/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           position: jobRoles[params.id],
//           experience: experience,
//           techStack: techStack,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to generate questions');
//       }

//       const data = await response.json();
//       setQuestions(data.questions);
//       speakQuestion(data.questions[0].question);
//     } catch (error) {
//       console.error('Error generating questions:', error);
//       alert('Failed to generate questions. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const speakQuestion = (text) => {
//     if (typeof window !== 'undefined' && window.speechSynthesis) {
//       synthRef.current = window.speechSynthesis;
//       const utterance = new SpeechSynthesisUtterance(text);
//       synthRef.current.speak(utterance);
//     }
//   };

//   const startRecording = () => {
//     if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
//       recognitionRef.current = new window.webkitSpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = false;

//       recognitionRef.current.onstart = () => {
//         setIsRecording(true);
//       };

//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         const updatedAnswers = [...userAnswers];
//         updatedAnswers[currentQuestionIndex] = transcript;
//         setUserAnswers(updatedAnswers);
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error', event.error);
//         setIsRecording(false);
//       };

//       recognitionRef.current.onend = () => {
//         setIsRecording(false);
//       };

//       recognitionRef.current.start();
//     } else {
//       alert('Speech recognition not supported in your browser');
//     }
//   };

//   const stopRecording = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//   };

//   const nextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       speakQuestion(questions[currentQuestionIndex + 1].question);
//     }
//   };

//   const prevQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const analyzeAnswers = async () => {
//     if (userAnswers.length !== questions.length) {
//       alert('Please answer all questions before submitting');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/voice/analyze-answers/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           questions: questions,
//           userAnswers: userAnswers,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to analyze answers');
//       }

//       const data = await response.json();
//       setAnalysis(data);
//     } catch (error) {
//       console.error('Error analyzing answers:', error);
//       alert('Failed to analyze answers. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       {questions.length === 0 ? (
//         <div className={styles.setupContainer}>
//           <h1>{jobRoles[params.id]} Interview</h1>
//           <div className={styles.formGroup}>
//             <label>Years of Experience:</label>
//             <input
//               type="number"
//               value={experience}
//               onChange={(e) => setExperience(e.target.value)}
//               min="0"
//               max="30"
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Tech Stack:</label>
//             <div className={styles.techStackContainer}>
//               {availableTechStacks[params.id].map((tech) => (
//                 <div key={tech} className={styles.techStackItem}>
//                   <input
//                     type="checkbox"
//                     id={tech}
//                     checked={techStack.includes(tech)}
//                     onChange={() => {
//                       if (techStack.includes(tech)) {
//                         setTechStack(techStack.filter((t) => t !== tech));
//                       } else {
//                         setTechStack([...techStack, tech]);
//                       }
//                     }}
//                   />
//                   <label htmlFor={tech}>{tech}</label>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <button
//             onClick={generateQuestions}
//             disabled={isLoading}
//             className={styles.generateButton}
//           >
//             {isLoading ? 'Generating...' : 'Generate Interview Questions'}
//           </button>
//         </div>
//       ) : analysis ? (
//         <div className={styles.analysisContainer}>
//           <h1>Interview Analysis</h1>
//           <div className={styles.score}>
//             <h2>Overall Score: {analysis.overallScore}/10</h2>
//           </div>
//           <div className={styles.detailedAnalysis}>
//             {analysis.detailedAnalysis.map((item, index) => (
//               <div key={index} className={styles.analysisItem}>
//                 <h3>Question {index + 1}</h3>
//                 <p><strong>Question:</strong> {item.question}</p>
//                 <p><strong>Your Answer:</strong> {item.userAnswer}</p>
//                 <p><strong>Expected Answer:</strong> {item.expectedAnswer}</p>
//                 <p><strong>Score:</strong> {item.score}/10</p>
//                 <p><strong>Feedback:</strong> {item.feedback}</p>
//               </div>
//             ))}
//           </div>
//           <button
//             onClick={() => router.push('/')}
//             className={styles.homeButton}
//           >
//             Back to Home
//           </button>
//         </div>
//       ) : (
//         <div className={styles.questionContainer}>
//           <div className={styles.questionHeader}>
//             <h1>Question {currentQuestionIndex + 1} of {questions.length}</h1>
//           </div>
//           <div className={styles.questionText}>
//             {/* <Typewriter
//               options={{
//                 strings: [questions[currentQuestionIndex].question],
//                 autoStart: true,
//                 delay: 20,
//                 deleteSpeed:0,
//                 loop: false,
//               }}
//             /> */}
//              <TypeText text={questions[currentQuestionIndex].question} delay={20} />
//           </div>
//           <div className={styles.answerContainer}>
//             <h3>Your Answer:</h3>
//             <textarea
//               value={userAnswers[currentQuestionIndex] || ''}
//               onChange={(e) => {
//                 const updatedAnswers = [...userAnswers];
//                 updatedAnswers[currentQuestionIndex] = e.target.value;
//                 setUserAnswers(updatedAnswers);
//               }}
//               placeholder="Speak or type your answer here..."
//             />
//             <div className={styles.recordingControls}>
//               {isRecording ? (
//                 <button onClick={stopRecording} className={styles.stopButton}>
//                   Stop Recording
//                 </button>
//               ) : (
//                 <button onClick={startRecording} className={styles.recordButton}>
//                   Record Answer
//                 </button>
//               )}
//               <button
//                 onClick={() => speakQuestion(questions[currentQuestionIndex].question)}
//                 className={styles.speakButton}
//               >
//                 Repeat Question
//               </button>
//             </div>
//           </div>
//           <div className={styles.navigationButtons}>
//             <button
//               onClick={prevQuestion}
//               disabled={currentQuestionIndex === 0}
//               className={styles.prevButton}
//             >
//               Previous
//             </button>
//             {currentQuestionIndex < questions.length - 1 ? (
//               <button onClick={nextQuestion} className={styles.nextButton}>
//                 Next
//               </button>
//             ) : (
//               <button
//                 onClick={analyzeAnswers}
//                 disabled={isLoading}
//                 className={styles.submitButton}
//               >
//                 {isLoading ? 'Analyzing...' : 'Submit Answers'}
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




























// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { Mic, MicOff, Volume2, ArrowLeft, ArrowRight, Send, Home, CheckCircle2, Clock, User, Code, Zap } from 'lucide-react';

// export default function InterviewPage({ params }) {
//   const [experience, setExperience] = useState('');
//   const [techStack, setTechStack] = useState([]);
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [isRecording, setIsRecording] = useState(false);
//   const [userAnswers, setUserAnswers] = useState([]);
//   const [analysis, setAnalysis] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const recognitionRef = useRef(null);
//   const synthRef = useRef(null);
//   const router = useRouter();

//   const jobRoles = {
//     1: 'Frontend Developer',
//     2: 'Backend Developer',
//     3: 'Full Stack Developer',
//     4: 'DevOps Engineer',
//     5: 'Data Scientist',
//   };

//   const availableTechStacks = {
//     1: ['React', 'Angular', 'Vue', 'JavaScript', 'TypeScript', 'HTML/CSS'],
//     2: ['Node.js', 'Python', 'Java', 'C#', 'Ruby', 'PHP'],
//     3: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker'],
//     4: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
//     5: ['Python', 'R', 'TensorFlow', 'PyTorch', 'Pandas', 'SQL'],
//   };

//   const TypeText = ({ text, delay = 20 }) => {
//     const [displayedText, setDisplayedText] = useState('');

//     useEffect(() => {
//       setDisplayedText('');
//       let i = 0;
//       const typingInterval = setInterval(() => {
//         if (i < text.length) {
//           setDisplayedText((prev) => prev + text.charAt(i));
//           i++;
//         } else {
//           clearInterval(typingInterval);
//         }
//       }, delay);

//       return () => clearInterval(typingInterval);
//     }, [text, delay]);

//     return <>{displayedText}</>;
//   };

//   const generateQuestions = async () => {
//     if (!experience || techStack.length === 0) {
//       alert('Please enter your experience and select at least one tech stack');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/voice/generate-questions/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           position: jobRoles[params.id],
//           experience: experience,
//           techStack: techStack,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to generate questions');
//       }

//       const data = await response.json();
//       setQuestions(data.questions);
//       speakQuestion(data.questions[0].question);
//     } catch (error) {
//       console.error('Error generating questions:', error);
//       alert('Failed to generate questions. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const speakQuestion = (text) => {
//     if (typeof window !== 'undefined' && window.speechSynthesis) {
//       synthRef.current = window.speechSynthesis;
//       const utterance = new SpeechSynthesisUtterance(text);
//       synthRef.current.speak(utterance);
//     }
//   };

//   const startRecording = () => {
//     if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
//       recognitionRef.current = new window.webkitSpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = false;

//       recognitionRef.current.onstart = () => {
//         setIsRecording(true);
//       };

//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         const updatedAnswers = [...userAnswers];
//         updatedAnswers[currentQuestionIndex] = transcript;
//         setUserAnswers(updatedAnswers);
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error', event.error);
//         setIsRecording(false);
//       };

//       recognitionRef.current.onend = () => {
//         setIsRecording(false);
//       };

//       recognitionRef.current.start();
//     } else {
//       alert('Speech recognition not supported in your browser');
//     }
//   };

//   const stopRecording = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//   };

//   const nextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       speakQuestion(questions[currentQuestionIndex + 1].question);
//     }
//   };

//   const prevQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const analyzeAnswers = async () => {
//     if (userAnswers.length !== questions.length) {
//       alert('Please answer all questions before submitting');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/voice/analyze-answers/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           questions: questions,
//           userAnswers: userAnswers,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to analyze answers');
//       }

//       const data = await response.json();
//       setAnalysis(data);
//     } catch (error) {
//       console.error('Error analyzing answers:', error);
//       alert('Failed to analyze answers. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getScoreColor = (score) => {
//     if (score >= 8) return 'text-green-600';
//     if (score >= 6) return 'text-yellow-600';
//     return 'text-red-600';
//   };

//   const getScoreBgColor = (score) => {
//     if (score >= 8) return 'bg-green-100 border-green-300';
//     if (score >= 6) return 'bg-yellow-100 border-yellow-300';
//     return 'bg-red-100 border-red-300';
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {questions.length === 0 ? (
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-2xl mx-auto mt-20">
//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <div className="text-center mb-8">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
//                   <User className="w-8 h-8 text-blue-600" />
//                 </div>
//                 <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                   {jobRoles[params.id]} Interview
//                 </h1>
//                 <p className="text-gray-600">Prepare for your technical interview with AI-powered questions</p>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
//                     <Clock className="w-5 h-5 mr-2 text-blue-600" />
//                     Years of Experience
//                   </label>
//                   <input
//                     type="number"
//                     value={experience}
//                     onChange={(e) => setExperience(e.target.value)}
//                     min="0"
//                     max="30"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
//                     placeholder="Enter your years of experience"
//                   />
//                 </div>

//                 <div>
//                   <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
//                     <Code className="w-5 h-5 mr-2 text-blue-600" />
//                     Tech Stack
//                   </label>
//                   <div className="grid grid-cols-2 gap-3">
//                     {availableTechStacks[params.id].map((tech) => (
//                       <label
//                         key={tech}
//                         className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
//                           techStack.includes(tech)
//                             ? 'bg-blue-100 border-2 border-blue-300'
//                             : 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100'
//                         }`}
//                       >
//                         <input
//                           type="checkbox"
//                           checked={techStack.includes(tech)}
//                           onChange={() => {
//                             if (techStack.includes(tech)) {
//                               setTechStack(techStack.filter((t) => t !== tech));
//                             } else {
//                               setTechStack([...techStack, tech]);
//                             }
//                           }}
//                           className="sr-only"
//                         />
//                         <div className={`w-5 h-5 rounded mr-3 flex items-center justify-center ${
//                           techStack.includes(tech) ? 'bg-blue-600' : 'bg-white border-2 border-gray-300'
//                         }`}>
//                           {techStack.includes(tech) && (
//                             <CheckCircle2 className="w-3 h-3 text-white" />
//                           )}
//                         </div>
//                         <span className="font-medium text-gray-700">{tech}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <button
//                   onClick={generateQuestions}
//                   disabled={isLoading}
//                   className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                 >
//                   {isLoading ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                       Generating Questions...
//                     </>
//                   ) : (
//                     <>
//                       <Zap className="w-5 h-5 mr-2" />
//                       Generate Interview Questions
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : analysis ? (
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-4xl mx-auto">
//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <div className="text-center mb-8">
//                 <h1 className="text-3xl font-bold text-gray-800 mb-4">Interview Analysis</h1>
//                 <div className={`inline-block px-8 py-4 rounded-2xl border-2 ${getScoreBgColor(analysis.overallScore)}`}>
//                   <h2 className={`text-4xl font-bold ${getScoreColor(analysis.overallScore)}`}>
//                     {analysis.overallScore}/10
//                   </h2>
//                   <p className="text-gray-600 font-medium">Overall Score</p>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 {analysis.detailedAnalysis.map((item, index) => (
//                   <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-xl font-bold text-gray-800">Question {index + 1}</h3>
//                       <div className={`px-3 py-1 rounded-full border ${getScoreBgColor(item.score)}`}>
//                         <span className={`text-sm font-bold ${getScoreColor(item.score)}`}>
//                           {item.score}/10
//                         </span>
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <div>
//                         <p className="font-semibold text-gray-700 mb-1">Question:</p>
//                         <p className="text-gray-600 bg-white p-3 rounded-lg border">{item.question}</p>
//                       </div>

//                       <div>
//                         <p className="font-semibold text-gray-700 mb-1">Your Answer:</p>
//                         <p className="text-gray-600 bg-white p-3 rounded-lg border">{item.userAnswer}</p>
//                       </div>

//                       <div>
//                         <p className="font-semibold text-gray-700 mb-1">Expected Answer:</p>
//                         <p className="text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">{item.expectedAnswer}</p>
//                       </div>

//                       <div>
//                         <p className="font-semibold text-gray-700 mb-1">Feedback:</p>
//                         <p className="text-gray-600 bg-green-50 p-3 rounded-lg border border-green-200">{item.feedback}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="text-center mt-8">
//                 <button
//                   onClick={() => router.push('/')}
//                   className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-8 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-200 flex items-center mx-auto"
//                 >
//                   <Home className="w-5 h-5 mr-2" />
//                   Back to Home
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-4xl mx-auto">
//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <div className="flex items-center justify-between mb-8">
//                 <h1 className="text-2xl font-bold text-gray-800">
//                   Question {currentQuestionIndex + 1} of {questions.length}
//                 </h1>
//                 <div className="bg-blue-100 px-4 py-2 rounded-full">
//                   <span className="text-blue-800 font-semibold">
//                     {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
//                   </span>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-200">
//                 <div className="text-lg text-gray-800 leading-relaxed min-h-16">
//                   <TypeText text={questions[currentQuestionIndex].question} delay={20} />
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-700 mb-3">Your Answer:</h3>
//                   <textarea
//                     value={userAnswers[currentQuestionIndex] || ''}
//                     onChange={(e) => {
//                       const updatedAnswers = [...userAnswers];
//                       updatedAnswers[currentQuestionIndex] = e.target.value;
//                       setUserAnswers(updatedAnswers);
//                     }}
//                     placeholder="Speak or type your answer here..."
//                     className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
//                   />
//                 </div>

//                 <div className="flex flex-wrap gap-3">
//                   {isRecording ? (
//                     <button
//                       onClick={stopRecording}
//                       className="bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-all duration-200 flex items-center"
//                     >
//                       <MicOff className="w-5 h-5 mr-2" />
//                       Stop Recording
//                     </button>
//                   ) : (
//                     <button
//                       onClick={startRecording}
//                       className="bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-all duration-200 flex items-center"
//                     >
//                       <Mic className="w-5 h-5 mr-2" />
//                       Record Answer
//                     </button>
//                   )}

//                   <button
//                     onClick={() => speakQuestion(questions[currentQuestionIndex].question)}
//                     className="bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center"
//                   >
//                     <Volume2 className="w-5 h-5 mr-2" />
//                     Repeat Question
//                   </button>
//                 </div>

//                 <div className="flex justify-between pt-6">
//                   <button
//                     onClick={prevQuestion}
//                     disabled={currentQuestionIndex === 0}
//                     className="bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                   >
//                     <ArrowLeft className="w-5 h-5 mr-2" />
//                     Previous
//                   </button>

//                   {currentQuestionIndex < questions.length - 1 ? (
//                     <button
//                       onClick={nextQuestion}
//                       className="bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center"
//                     >
//                       Next
//                       <ArrowRight className="w-5 h-5 ml-2" />
//                     </button>
//                   ) : (
//                     <button
//                       onClick={analyzeAnswers}
//                       disabled={isLoading}
//                       className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                     >
//                       {isLoading ? (
//                         <>
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                           Analyzing...
//                         </>
//                       ) : (
//                         <>
//                           <Send className="w-5 h-5 mr-2" />
//                           Submit Answers
//                         </>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }










'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, MicOff, Volume2, ArrowLeft, ArrowRight, Send, Home, CheckCircle2, Clock, User, Code, Zap } from 'lucide-react';

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
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const router = useRouter();
  var tempAns;

  // Fetch job roles from Django backend
  useEffect(() => {
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

        // Set current job role if params.id exists
        if (params.id && data.job_roles.some(role => role.id == params.id)) {
          setCurrentJobRole(data.job_roles.find(role => role.id == params.id));
        }
      } catch (error) {
        console.error('Error fetching job roles:', error);
      }
    };

    fetchJobRoles();
  }, [params.id]);

  // Fetch tech stacks for current job role
  useEffect(() => {
    if (!params.id) return;

    const fetchTechStacks = async () => {
      setIsLoadingTechStacks(true);
      try {
        const response = await fetch(`http://localhost:8000/careers/api/job-roles/${params.id}/tech-stacks/`);
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
  }, [params.id]);

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

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/voice/generate-questions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          position: currentJobRole?.title || jobRoles[params.id],
          experience: experience,
          techStack: techStack,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate questions');
      const data = await response.json();
      setQuestions(data.questions);
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
        // Append new transcript to existing answer (if any) with a space
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
        }),
      });

      if (!response.ok) throw new Error('Failed to analyze answers');
      const data = await response.json();
      setAnalysis(data);
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
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {currentJobRole.title} Interview
                </h1>
                <p className="text-gray-600">Prepare for your technical interview with AI-powered questions</p>
              </div>

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
                  disabled={isLoading}
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
            </div>
          </div>
        </div>
      ) : analysis ? (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mt-20">
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

              <div className="text-center mt-8">
                <button
                  onClick={() => router.push('/')}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-8 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-200 flex items-center mx-auto"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </button>
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
                <div className="bg-blue-100 px-4 py-2 rounded-full">
                  <span className="text-blue-800 font-semibold">
                    {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
                  </span>
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