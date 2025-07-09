// // src/app/coding/page.js - Fixed Version
// 'use client'
// import { useState, useEffect, useCallback } from 'react'
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import ApiService from '@/lib/api'
// import CodeMirror from '@uiw/react-codemirror'
// import { javascript } from '@codemirror/lang-javascript'
// import { python } from '@codemirror/lang-python'
// import { java } from '@codemirror/lang-java'
// import { cpp } from '@codemirror/lang-cpp'
// import { oneDark } from '@codemirror/theme-one-dark'
// import { 
//   Play, 
//   Send, 
//   Home, 
//   Clock,
//   Code,
//   BookOpen,
//   Terminal,
//   RotateCcw,
//   Settings,
//   Zap,
//   CheckCircle,
//   XCircle
// } from 'lucide-react'
// import Link from 'next/link'

// export default function CodingPage() {
//   const { data: session, status } = useSession()
//   const router = useRouter()
  
//   // Basic state
//   const [problem, setProblem] = useState(null)
//   const [code, setCode] = useState('')
//   const [language, setLanguage] = useState('javascript')
//   const [difficulty, setDifficulty] = useState('easy')
//   const [category, setCategory] = useState('arrays')
//   const [testResults, setTestResults] = useState([])
//   const [showTestResults, setShowTestResults] = useState(false)
//   const [consoleOutput, setConsoleOutput] = useState([])
//   const [isGenerating, setIsGenerating] = useState(false)
//   const [isRunning, setIsRunning] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [time, setTime] = useState(0)
//   const [timerRunning, setTimerRunning] = useState(false)
//   const [fontSize, setFontSize] = useState(14)

//   // Authentication check
//   useEffect(() => {
//     if (status === 'loading') return
//     if (!session) router.push('/login')
//   }, [session, status, router])

//   // Timer effect
//   useEffect(() => {
//     let interval = null
//     if (timerRunning) {
//       interval = setInterval(() => {
//         setTime(time => time + 1)
//       }, 1000)
//     } else {
//       clearInterval(interval)
//     }
//     return () => clearInterval(interval)
//   }, [timerRunning])

//   // Helper functions
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
//   }

//   const addConsoleMessage = (message, type = 'info') => {
//     const timestamp = new Date().toLocaleTimeString()
//     setConsoleOutput(prev => [...prev, {
//       id: Date.now(),
//       timestamp,
//       message,
//       type
//     }])
//   }

//   const getLanguageExtension = () => {
//     switch (language) {
//       case 'python': return python()
//       case 'java': return java()
//       case 'cpp': return cpp()
//       default: return javascript()
//     }
//   }

//   const getStarterCode = (lang) => {
//     const templates = {
//       javascript: 'function solution() {\n    // Your code here\n    return null;\n}',
//       python: 'def solution():\n    # Your code here\n    return None',
//       java: 'public class Solution {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}',
//       cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}'
//     }
//     return templates[lang] || templates.javascript
//   }

//   // Define functions with useCallback to prevent recreation
//   const generateProblem = useCallback(async () => {
//     setIsGenerating(true)
//     setShowTestResults(false)
//     setTestResults([])
//     addConsoleMessage('🔄 Generating new problem...', 'info')
    
//     try {
//       const data = await ApiService.generateProblem({
//         difficulty,
//         category,
//         language
//       })
      
//       setProblem(data.problem)
//       setCode(data.starter_code || getStarterCode(language))
//       setTimerRunning(true)
      
//       addConsoleMessage(`✅ Problem "${data.problem.title}" loaded!`, 'success')
//     } catch (error) {
//       console.error('Error generating problem:', error)
//       addConsoleMessage(`❌ Error: ${error.message}`, 'error')
//     } finally {
//       setIsGenerating(false)
//     }
//   }, [difficulty, category, language])

//   const runCode = useCallback(async () => {
//     if (!problem) {
//       addConsoleMessage('❌ No problem selected. Generate a problem first.', 'error')
//       return
//     }
    
//     setIsRunning(true)
//     addConsoleMessage('▶️ Running code...', 'info')
    
//     try {
//       const data = await ApiService.runCode({
//         code,
//         language,
//         problem_id: problem.id,
//         test_cases: problem.test_cases?.filter(tc => !tc.hidden) || []
//       })
      
//       setTestResults(data.results)
//       setShowTestResults(true)
//       const passed = data.results.filter(r => r.passed).length
//       addConsoleMessage(`✅ ${passed}/${data.results.length} test cases passed!`, 'success')
//     } catch (error) {
//       console.error('Error running code:', error)
//       addConsoleMessage(`❌ Runtime error: ${error.message}`, 'error')
//     } finally {
//       setIsRunning(false)
//     }
//   }, [problem, code, language])

//   const submitCode = useCallback(async () => {
//     if (!problem) {
//       addConsoleMessage('❌ No problem selected. Generate a problem first.', 'error')
//       return
//     }
    
//     setIsSubmitting(true)
//     setTimerRunning(false)
//     addConsoleMessage('📤 Submitting solution...', 'info')
    
//     try {
//       const data = await ApiService.submitCode({
//         code,
//         language,
//         problem_id: problem.id,
//         time_taken: time
//       })
      
//       setTestResults(data.results)
//       setShowTestResults(true)
      
//       // Save session
//       await ApiService.saveSession({
//         problem_id: problem.id,
//         code,
//         language,
//         time_taken: time,
//         passed_tests: data.passed_count || data.results.filter(r => r.passed).length,
//         total_tests: data.total_count || data.results.length
//       })
      
//       addConsoleMessage('🎉 Solution submitted successfully!', 'success')
//     } catch (error) {
//       console.error('Error submitting code:', error)
//       addConsoleMessage(`❌ Submission error: ${error.message}`, 'error')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }, [problem, code, language, time])

//   const resetCode = useCallback(() => {
//     setCode(getStarterCode(language))
//     addConsoleMessage('🔄 Code reset to template', 'info')
//   }, [language])

//   const clearConsole = useCallback(() => {
//     setConsoleOutput([])
//   }, [])

//   // Keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.ctrlKey || event.metaKey) {
//         if (event.key === 'Enter') {
//           event.preventDefault()
//           if (event.shiftKey) {
//             submitCode()
//           } else {
//             runCode()
//           }
//         } else if (event.key === '/') {
//           event.preventDefault()
//           setShowTestResults(prev => !prev)
//         }
//       } else if (event.key === 'F5') {
//         event.preventDefault()
//         runCode()
//       }
//     }

//     document.addEventListener('keydown', handleKeyDown)
//     return () => document.removeEventListener('keydown', handleKeyDown)
//   }, [runCode, submitCode])

//   // Handle language change
//   const handleLanguageChange = (newLanguage) => {
//     setLanguage(newLanguage)
//     if (!problem) {
//       setCode(getStarterCode(newLanguage))
//     }
//   }

//   // Loading state
//   if (status === 'loading') {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-white text-lg">Loading Interview Environment...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!session) return null

//   return (
//     <div className="h-screen bg-gray-900 text-white flex flex-col overflow-hidden">
//       {/* Header */}
//       <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex-shrink-0">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Link href="/dashboard" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
//               <Home className="w-5 h-5" />
//               <span>Dashboard</span>
//             </Link>
//             <div className="h-6 w-px bg-gray-600"></div>
//             <div className="flex items-center space-x-2">
//               <Code className="w-6 h-6 text-blue-500" />
//               <h1 className="text-xl font-bold">Coding Practice</h1>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             {/* Timer */}
//             <div className="flex items-center space-x-2 bg-gray-700 rounded-lg px-4 py-2">
//               <Clock className="w-5 h-5 text-blue-500" />
//               <span className="text-xl font-mono font-bold">{formatTime(time)}</span>
//             </div>

//             {/* Timer Controls */}
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => setTimerRunning(!timerRunning)}
//                 className="p-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
//                 title={timerRunning ? "Pause Timer" : "Start Timer"}
//               >
//                 <Play className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={() => { setTime(0); setTimerRunning(false) }}
//                 className="p-2 bg-gray-600 hover:bg-gray-700 rounded transition-colors"
//                 title="Reset Timer"
//               >
//                 <RotateCcw className="w-4 h-4" />
//               </button>
//             </div>

//             {/* Problem Controls */}
//             <select
//               value={difficulty}
//               onChange={(e) => setDifficulty(e.target.value)}
//               className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
//             >
//               <option value="easy">Easy</option>
//               <option value="medium">Medium</option>
//               <option value="hard">Hard</option>
//             </select>

//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
//             >
//               <option value="arrays">Arrays</option>
//               <option value="strings">Strings</option>
//               <option value="linkedlist">Linked Lists</option>
//               <option value="trees">Trees</option>
//               <option value="graphs">Graphs</option>
//               <option value="dynamic-programming">Dynamic Programming</option>
//             </select>

//             <button
//               onClick={generateProblem}
//               disabled={isGenerating}
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded transition-colors flex items-center space-x-2"
//             >
//               <Zap className="w-4 h-4" />
//               <span>{isGenerating ? 'Generating...' : 'New Problem'}</span>
//             </button>

//             <span className="text-gray-400">
//               {session.user?.name || session.user?.email}
//             </span>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="flex-1 flex overflow-hidden">
//         {/* Problem Panel */}
//         <div className="w-1/3 bg-gray-800 border-r border-gray-700 overflow-y-auto">
//           <div className="p-4">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold">Problem</h2>
//               {problem && (
//                 <div className={`px-2 py-1 rounded text-xs font-medium ${
//                   problem.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
//                   problem.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
//                   'bg-red-500/20 text-red-400'
//                 }`}>
//                   {problem.difficulty?.charAt(0).toUpperCase() + problem.difficulty?.slice(1)}
//                 </div>
//               )}
//             </div>
            
//             {problem ? (
//               <div className="space-y-4">
//                 <h3 className="text-xl font-bold text-white">{problem.title}</h3>
//                 <div 
//                   className="prose prose-invert prose-sm max-w-none text-gray-300"
//                   dangerouslySetInnerHTML={{ __html: problem.description }}
//                 />
                
//                 {problem.examples && problem.examples.length > 0 && (
//                   <div>
//                     <h4 className="text-white font-semibold mb-2">Examples:</h4>
//                     <div className="space-y-2">
//                       {problem.examples.map((example, index) => (
//                         <div key={index} className="bg-gray-700 p-3 rounded">
//                           <div className="text-sm space-y-1">
//                             <div><span className="text-gray-400">Input:</span> <code className="text-blue-300">{example.input}</code></div>
//                             <div><span className="text-gray-400">Output:</span> <code className="text-green-300">{example.output}</code></div>
//                             {example.explanation && (
//                               <div><span className="text-gray-400">Explanation:</span> <span className="text-gray-300">{example.explanation}</span></div>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {problem.constraints && problem.constraints.length > 0 && (
//                   <div>
//                     <h4 className="text-white font-semibold mb-2">Constraints:</h4>
//                     <ul className="text-sm text-gray-300 space-y-1">
//                       {problem.constraints.map((constraint, index) => (
//                         <li key={index} className="flex items-start">
//                           <span className="text-blue-500 mr-2">•</span>
//                           <span>{constraint}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <BookOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
//                 <h3 className="text-lg font-semibold text-white mb-2">No Problem Selected</h3>
//                 <p className="text-gray-400 mb-6">Generate a coding problem to get started</p>
//                 <button
//                   onClick={generateProblem}
//                   disabled={isGenerating}
//                   className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center space-x-2 mx-auto"
//                 >
//                   <Zap className="w-5 h-5" />
//                   <span>{isGenerating ? 'Generating...' : 'Generate Problem'}</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Editor Panel */}
//         <div className="flex-1 flex flex-col">
//           {/* Editor Header */}
//           <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <select
//                 value={language}
//                 onChange={(e) => handleLanguageChange(e.target.value)}
//                 className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
//               >
//                 <option value="javascript">🟨 JavaScript</option>
//                 <option value="python">🐍 Python</option>
//                 <option value="java">☕ Java</option>
//                 <option value="cpp">⚡ C++</option>
//               </select>

//               <select
//                 value={fontSize}
//                 onChange={(e) => setFontSize(Number(e.target.value))}
//                 className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
//               >
//                 <option value={12}>12px</option>
//                 <option value={14}>14px</option>
//                 <option value={16}>16px</option>
//                 <option value={18}>18px</option>
//                 <option value={20}>20px</option>
//               </select>
//             </div>

//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={resetCode}
//                 className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
//                 title="Reset Code"
//               >
//                 <RotateCcw className="w-4 h-4 text-gray-300" />
//               </button>
//             </div>
//           </div>

//           {/* Code Editor */}
//           <div className="flex-1 overflow-hidden">
//             <CodeMirror
//               value={code}
//               onChange={setCode}
//               extensions={[getLanguageExtension()]}
//               theme={oneDark}
//               height="100%"
//               style={{
//                 fontSize: `${fontSize}px`,
//                 height: '100%'
//               }}
//               basicSetup={{
//                 lineNumbers: true,
//                 foldGutter: true,
//                 dropCursor: false,
//                 allowMultipleSelections: false,
//                 indentOnInput: true,
//                 bracketMatching: true,
//                 closeBrackets: true,
//                 autocompletion: true,
//                 highlightSelectionMatches: false,
//                 searchKeymap: true
//               }}
//             />
//           </div>

//           {/* Action Buttons */}
//           <div className="bg-gray-800 border-t border-gray-700 px-4 py-3 flex items-center justify-between">
//             <div className="text-sm text-gray-400">
//               Lines: {code.split('\n').length} | Characters: {code.length}
//             </div>

//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={runCode}
//                 disabled={isRunning || !problem}
//                 className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
//               >
//                 {isRunning ? (
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                 ) : (
//                   <Play className="w-4 h-4" />
//                 )}
//                 <span>{isRunning ? 'Running...' : 'Run Code'}</span>
//               </button>

//               <button
//                 onClick={submitCode}
//                 disabled={isSubmitting || !problem}
//                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
//               >
//                 {isSubmitting ? (
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                 ) : (
//                   <Send className="w-4 h-4" />
//                 )}
//                 <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
//               </button>
//             </div>
//           </div>

//           {/* Console and Test Results */}
//           <div className="h-64 flex border-t border-gray-700">
//             {/* Console */}
//             <div className="flex-1 bg-gray-900">
//               <div className="p-4 h-full flex flex-col">
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center space-x-2">
//                     <Terminal className="w-4 h-4 text-green-500" />
//                     <span className="font-medium">Console</span>
//                     <span className="text-gray-400 text-sm">({consoleOutput.length})</span>
//                   </div>
//                   <button
//                     onClick={clearConsole}
//                     className="text-gray-400 hover:text-white text-sm"
//                   >
//                     Clear
//                   </button>
//                 </div>
//                 <div className="flex-1 overflow-y-auto text-sm font-mono">
//                   {consoleOutput.length === 0 ? (
//                     <div className="text-gray-500 italic">Console output will appear here...</div>
//                   ) : (
//                     <div className="space-y-1">
//                       {consoleOutput.map(item => (
//                         <div key={item.id} className="flex items-start space-x-2">
//                           <span className="text-gray-500 text-xs">{item.timestamp}</span>
//                           <span className={
//                             item.type === 'success' ? 'text-green-400' :
//                             item.type === 'error' ? 'text-red-400' :
//                             item.type === 'warning' ? 'text-yellow-400' :
//                             'text-gray-300'
//                           }>
//                             {item.message}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Test Results */}
//             {showTestResults && testResults.length > 0 && (
//               <>
//                 <div className="w-1 bg-gray-600"></div>
//                 <div className="flex-1 bg-gray-900">
//                   <div className="p-4 h-full flex flex-col">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="font-medium">Test Results</span>
//                       <button
//                         onClick={() => setShowTestResults(false)}
//                         className="text-gray-400 hover:text-white text-sm"
//                       >
//                         Hide
//                       </button>
//                     </div>
//                     <div className="flex-1 overflow-y-auto space-y-2">
//                       {testResults.map((result, index) => (
//                         <div 
//                           key={index}
//                           className={`p-2 rounded text-sm ${
//                             result.passed ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
//                           }`}
//                         >
//                           <div className="flex items-center justify-between mb-1">
//                             <div className="flex items-center space-x-2">
//                               {result.passed ? (
//                                 <CheckCircle className="w-4 h-4 text-green-500" />
//                               ) : (
//                                 <XCircle className="w-4 h-4 text-red-500" />
//                               )}
//                               <span>Test {index + 1}</span>
//                             </div>
//                             <span className={`text-xs px-2 py-1 rounded ${
//                               result.passed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
//                             }`}>
//                               {result.passed ? 'Passed' : 'Failed'}
//                             </span>
//                           </div>
//                           {!result.hidden && !result.passed && (
//                             <div className="text-xs space-y-1">
//                               <div><span className="text-gray-400">Expected:</span> <code>{result.expected}</code></div>
//                               <div><span className="text-gray-400">Got:</span> <code>{result.actual}</code></div>
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Keyboard Shortcuts Help */}
//       <div className="fixed bottom-4 right-4 bg-gray-800 rounded-lg p-3 text-xs opacity-50 hover:opacity-100 transition-opacity">
//         <div className="space-y-1">
//           <div><kbd className="bg-gray-700 px-1 rounded">Ctrl+Enter</kbd> Run Code</div>
//           <div><kbd className="bg-gray-700 px-1 rounded">Ctrl+Shift+Enter</kbd> Submit</div>
//           <div><kbd className="bg-gray-700 px-1 rounded">Ctrl+/</kbd> Toggle Results</div>
//           <div><kbd className="bg-gray-700 px-1 rounded">F5</kbd> Run Code</div>
//         </div>
//       </div>
//     </div>
//   )
// }

//******************************************* */
// src/app/coding/page.js - Updated with better output handling
// 'use client'
// import { useState, useEffect, useCallback } from 'react'
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import ApiService from '@/lib/api'
// import CodeMirror from '@uiw/react-codemirror'
// import { javascript } from '@codemirror/lang-javascript'
// import { python } from '@codemirror/lang-python'
// import { java } from '@codemirror/lang-java'
// import { cpp } from '@codemirror/lang-cpp'
// import { oneDark } from '@codemirror/theme-one-dark'
// import { 
//   Play, 
//   Send, 
//   Home, 
//   Clock,
//   Code,
//   BookOpen,
//   Terminal,
//   RotateCcw,
//   Settings,
//   Zap,
//   CheckCircle,
//   XCircle,
//   Eye,
//   EyeOff
// } from 'lucide-react'
// import Link from 'next/link'

// export default function CodingPage() {
//   const { data: session, status } = useSession()
//   const router = useRouter()
  
//   // Basic state
//   const [problem, setProblem] = useState(null)
//   const [code, setCode] = useState('')
//   const [language, setLanguage] = useState('javascript')
//   const [difficulty, setDifficulty] = useState('easy')
//   const [category, setCategory] = useState('arrays')
//   const [testResults, setTestResults] = useState([])
//   const [showTestResults, setShowTestResults] = useState(false)
//   const [consoleOutput, setConsoleOutput] = useState([])
//   const [isGenerating, setIsGenerating] = useState(false)
//   const [isRunning, setIsRunning] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [time, setTime] = useState(0)
//   const [timerRunning, setTimerRunning] = useState(false)
//   const [fontSize, setFontSize] = useState(14)
//   const [activeTab, setActiveTab] = useState('console') // 'console' or 'results'

//   // Authentication check
//   useEffect(() => {
//     if (status === 'loading') return
//     if (!session) router.push('/login')
//   }, [session, status, router])

//   // Timer effect
//   useEffect(() => {
//     let interval = null
//     if (timerRunning) {
//       interval = setInterval(() => {
//         setTime(time => time + 1)
//       }, 1000)
//     } else {
//       clearInterval(interval)
//     }
//     return () => clearInterval(interval)
//   }, [timerRunning])

//   // Helper functions
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
//   }

//   const addConsoleMessage = (message, type = 'info') => {
//     const timestamp = new Date().toLocaleTimeString()
//     setConsoleOutput(prev => [...prev, {
//       id: Date.now(),
//       timestamp,
//       message,
//       type
//     }])
//   }

//   const getLanguageExtension = () => {
//     switch (language) {
//       case 'python': return python()
//       case 'java': return java()
//       case 'cpp': return cpp()
//       default: return javascript()
//     }
//   }

//   const getStarterCode = (lang) => {
//     const templates = {
//       javascript: 'function solution() {\n    // Your code here\n    return null;\n}',
//       python: 'def solution():\n    # Your code here\n    return None',
//       java: 'public class Solution {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}',
//       cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}'
//     }
//     return templates[lang] || templates.javascript
//   }

//   const generateProblem = useCallback(async () => {
//     setIsGenerating(true)
//     setShowTestResults(false)
//     setTestResults([])
//     setConsoleOutput([])
//     addConsoleMessage('🔄 Generating new problem...', 'info')
    
//     try {
//       const data = await ApiService.generateProblem({
//         difficulty,
//         category,
//         language
//       })
      
//       setProblem(data.problem)
//       setCode(data.starter_code || getStarterCode(language))
//       setTimerRunning(true)
      
//       addConsoleMessage(`✅ Problem "${data.problem.title}" loaded successfully!`, 'success')
//     } catch (error) {
//       console.error('Error generating problem:', error)
//       addConsoleMessage(`❌ Error generating problem: ${error.message}`, 'error')
//     } finally {
//       setIsGenerating(false)
//     }
//   }, [difficulty, category, language])

//   const runCode = useCallback(async () => {
//     if (!problem) {
//       addConsoleMessage('❌ No problem selected. Generate a problem first.', 'error')
//       return
//     }
    
//     setIsRunning(true)
//     setActiveTab('console') // Switch to console tab
//     addConsoleMessage('▶️ Running code...', 'info')
    
//     try {
//       const data = await ApiService.runCode({
//         code,
//         language,
//         problem_id: problem.id,
//         test_cases: problem.test_cases?.filter(tc => !tc.hidden) || []
//       })
      
//       // Log the API response for debugging
//       console.log('Run code response:', data)
      
//       if (data.results && Array.isArray(data.results)) {
//         setTestResults(data.results)
//         setShowTestResults(true)
//         setActiveTab('results') // Switch to results tab
        
//         const passed = data.results.filter(r => r.passed).length
//         const total = data.results.length
        
//         if (passed === total) {
//           addConsoleMessage(`✅ All ${total} test cases passed!`, 'success')
//         } else {
//           addConsoleMessage(`⚠️ ${passed}/${total} test cases passed`, 'warning')
//         }
        
//         // Log individual test results
//         data.results.forEach((result, index) => {
//           const status = result.passed ? '✅' : '❌'
//           addConsoleMessage(
//             `${status} Test ${index + 1}: ${result.passed ? 'PASSED' : 'FAILED'}`,
//             result.passed ? 'success' : 'error'
//           )
          
//           if (!result.passed && result.error) {
//             addConsoleMessage(`   Error: ${result.error}`, 'error')
//           }
//         })
//       } else {
//         addConsoleMessage('❌ Invalid response format from server', 'error')
//         console.error('Invalid response:', data)
//       }
      
//     } catch (error) {
//       console.error('Error running code:', error)
//       addConsoleMessage(`❌ Runtime error: ${error.message}`, 'error')
      
//       // Show more detailed error information
//       if (error.response?.data) {
//         addConsoleMessage(`   Details: ${JSON.stringify(error.response.data)}`, 'error')
//       }
//     } finally {
//       setIsRunning(false)
//     }
//   }, [problem, code, language])

//   const submitCode = useCallback(async () => {
//     if (!problem) {
//       addConsoleMessage('❌ No problem selected. Generate a problem first.', 'error')
//       return
//     }
    
//     setIsSubmitting(true)
//     setTimerRunning(false)
//     setActiveTab('console')
//     addConsoleMessage('📤 Submitting solution...', 'info')
    
//     try {
//       const data = await ApiService.submitCode({
//         code,
//         language,
//         problem_id: problem.id,
//         time_taken: time
//       })
      
//       console.log('Submit code response:', data)
      
//       if (data.results && Array.isArray(data.results)) {
//         setTestResults(data.results)
//         setShowTestResults(true)
//         setActiveTab('results')
        
//         const passedCount = data.passed_count || data.results.filter(r => r.passed).length
//         const totalCount = data.total_count || data.results.length
//         const successRate = (passedCount / totalCount * 100).toFixed(1)
        
//         // Save session
//         await ApiService.saveSession({
//           problem_id: problem.id,
//           code,
//           language,
//           time_taken: time,
//           passed_tests: passedCount,
//           total_tests: totalCount
//         })
        
//         if (passedCount === totalCount) {
//           addConsoleMessage(`🎉 Submission successful! ${passedCount}/${totalCount} tests passed (${successRate}%)`, 'success')
//         } else {
//           addConsoleMessage(`📊 Submission recorded: ${passedCount}/${totalCount} tests passed (${successRate}%)`, 'warning')
//         }
//       } else {
//         addConsoleMessage('❌ Invalid submission response', 'error')
//       }
      
//     } catch (error) {
//       console.error('Error submitting code:', error)
//       addConsoleMessage(`❌ Submission error: ${error.message}`, 'error')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }, [problem, code, language, time])

//   const resetCode = useCallback(() => {
//     setCode(getStarterCode(language))
//     addConsoleMessage('🔄 Code reset to template', 'info')
//   }, [language])

//   const clearConsole = useCallback(() => {
//     setConsoleOutput([])
//     addConsoleMessage('Console cleared', 'info')
//   }, [])

//   // Handle language change
//   const handleLanguageChange = (newLanguage) => {
//     setLanguage(newLanguage)
//     if (!problem) {
//       setCode(getStarterCode(newLanguage))
//     }
//   }

//   // Loading state
//   if (status === 'loading') {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-white text-lg">Loading Interview Environment...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!session) return null

//   return (
//     <div className="h-screen bg-gray-900 text-white flex flex-col overflow-hidden">
//       {/* Header */}
//       <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex-shrink-0">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Link href="/dashboard" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
//               <Home className="w-5 h-5" />
//               <span>Dashboard</span>
//             </Link>
//             <div className="h-6 w-px bg-gray-600"></div>
//             <div className="flex items-center space-x-2">
//               <Code className="w-6 h-6 text-blue-500" />
//               <h1 className="text-xl font-bold">Coding Practice</h1>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             {/* Timer */}
//             <div className="flex items-center space-x-2 bg-gray-700 rounded-lg px-4 py-2">
//               <Clock className="w-5 h-5 text-blue-500" />
//               <span className="text-xl font-mono font-bold">{formatTime(time)}</span>
//             </div>

//             {/* Timer Controls */}
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => setTimerRunning(!timerRunning)}
//                 className="p-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
//                 title={timerRunning ? "Pause Timer" : "Start Timer"}
//               >
//                 <Play className="w-4 h-4" />
//               </button>
//               <button
//                 onClick={() => { setTime(0); setTimerRunning(false) }}
//                 className="p-2 bg-gray-600 hover:bg-gray-700 rounded transition-colors"
//                 title="Reset Timer"
//               >
//                 <RotateCcw className="w-4 h-4" />
//               </button>
//             </div>

//             {/* Problem Controls */}
//             <select
//               value={difficulty}
//               onChange={(e) => setDifficulty(e.target.value)}
//               className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
//             >
//               <option value="easy">Easy</option>
//               <option value="medium">Medium</option>
//               <option value="hard">Hard</option>
//             </select>

//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
//             >
//               <option value="arrays">Arrays</option>
//               <option value="strings">Strings</option>
//               <option value="linkedlist">Linked Lists</option>
//               <option value="trees">Trees</option>
//               <option value="graphs">Graphs</option>
//               <option value="dynamic-programming">Dynamic Programming</option>
//             </select>

//             <button
//               onClick={generateProblem}
//               disabled={isGenerating}
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded transition-colors flex items-center space-x-2"
//             >
//               <Zap className="w-4 h-4" />
//               <span>{isGenerating ? 'Generating...' : 'New Problem'}</span>
//             </button>

//             <span className="text-gray-400">
//               {session.user?.name || session.user?.email}
//             </span>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="flex-1 flex overflow-hidden">
//         {/* Problem Panel */}
//         <div className="w-1/3 bg-gray-800 border-r border-gray-700 overflow-y-auto">
//           <div className="p-4">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold">Problem</h2>
//               {problem && (
//                 <div className={`px-2 py-1 rounded text-xs font-medium ${
//                   problem.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
//                   problem.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
//                   'bg-red-500/20 text-red-400'
//                 }`}>
//                   {problem.difficulty?.charAt(0).toUpperCase() + problem.difficulty?.slice(1)}
//                 </div>
//               )}
//             </div>
            
//             {problem ? (
//               <div className="space-y-4">
//                 <h3 className="text-xl font-bold text-white">{problem.title}</h3>
//                 <div 
//                   className="prose prose-invert prose-sm max-w-none text-gray-300"
//                   dangerouslySetInnerHTML={{ __html: problem.description }}
//                 />
                
//                 {problem.examples && problem.examples.length > 0 && (
//                   <div>
//                     <h4 className="text-white font-semibold mb-2">Examples:</h4>
//                     <div className="space-y-2">
//                       {problem.examples.map((example, index) => (
//                         <div key={index} className="bg-gray-700 p-3 rounded">
//                           <div className="text-sm space-y-1">
//                             <div><span className="text-gray-400">Input:</span> <code className="text-blue-300">{example.input}</code></div>
//                             <div><span className="text-gray-400">Output:</span> <code className="text-green-300">{example.output}</code></div>
//                             {example.explanation && (
//                               <div><span className="text-gray-400">Explanation:</span> <span className="text-gray-300">{example.explanation}</span></div>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {problem.constraints && problem.constraints.length > 0 && (
//                   <div>
//                     <h4 className="text-white font-semibold mb-2">Constraints:</h4>
//                     <ul className="text-sm text-gray-300 space-y-1">
//                       {problem.constraints.map((constraint, index) => (
//                         <li key={index} className="flex items-start">
//                           <span className="text-blue-500 mr-2">•</span>
//                           <span>{constraint}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <BookOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
//                 <h3 className="text-lg font-semibold text-white mb-2">No Problem Selected</h3>
//                 <p className="text-gray-400 mb-6">Generate a coding problem to get started</p>
//                 <button
//                   onClick={generateProblem}
//                   disabled={isGenerating}
//                   className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center space-x-2 mx-auto"
//                 >
//                   <Zap className="w-5 h-5" />
//                   <span>{isGenerating ? 'Generating...' : 'Generate Problem'}</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Editor and Output Panel */}
//         <div className="flex-1 flex flex-col">
//           {/* Editor Header */}
//           <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <select
//                 value={language}
//                 onChange={(e) => handleLanguageChange(e.target.value)}
//                 className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
//               >
//                 <option value="javascript">🟨 JavaScript</option>
//                 <option value="python">🐍 Python</option>
//                 <option value="java">☕ Java</option>
//                 <option value="cpp">⚡ C++</option>
//               </select>

//               <select
//                 value={fontSize}
//                 onChange={(e) => setFontSize(Number(e.target.value))}
//                 className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
//               >
//                 <option value={12}>12px</option>
//                 <option value={14}>14px</option>
//                 <option value={16}>16px</option>
//                 <option value={18}>18px</option>
//                 <option value={20}>20px</option>
//               </select>
//             </div>

//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={resetCode}
//                 className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
//                 title="Reset Code"
//               >
//                 <RotateCcw className="w-4 h-4 text-gray-300" />
//               </button>
//             </div>
//           </div>

//           {/* Code Editor */}
//           <div className="flex-1 overflow-hidden">
//             <CodeMirror
//               value={code}
//               onChange={setCode}
//               extensions={[getLanguageExtension()]}
//               theme={oneDark}
//               height="100%"
//               style={{
//                 fontSize: `${fontSize}px`,
//                 height: '100%'
//               }}
//               basicSetup={{
//                 lineNumbers: true,
//                 foldGutter: true,
//                 dropCursor: false,
//                 allowMultipleSelections: false,
//                 indentOnInput: true,
//                 bracketMatching: true,
//                 closeBrackets: true,
//                 autocompletion: true,
//                 highlightSelectionMatches: false,
//                 searchKeymap: true
//               }}
//             />
//           </div>

//           {/* Action Buttons */}
//           <div className="bg-gray-800 border-t border-gray-700 px-4 py-3 flex items-center justify-between">
//             <div className="text-sm text-gray-400">
//               Lines: {code.split('\n').length} | Characters: {code.length}
//             </div>

//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={runCode}
//                 disabled={isRunning || !problem}
//                 className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
//               >
//                 {isRunning ? (
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                 ) : (
//                   <Play className="w-4 h-4" />
//                 )}
//                 <span>{isRunning ? 'Running...' : 'Run Code'}</span>
//               </button>

//               <button
//                 onClick={submitCode}
//                 disabled={isSubmitting || !problem}
//                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
//               >
//                 {isSubmitting ? (
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                 ) : (
//                   <Send className="w-4 h-4" />
//                 )}
//                 <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
//               </button>
//             </div>
//           </div>

//           {/* Output Panel */}
//           <div className="h-80 border-t border-gray-700">
//             {/* Tab Navigation */}
//             <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center space-x-4">
//               <button
//                 onClick={() => setActiveTab('console')}
//                 className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors ${
//                   activeTab === 'console' 
//                     ? 'bg-gray-700 text-white' 
//                     : 'text-gray-400 hover:text-white'
//                 }`}
//               >
//                 <Terminal className="w-4 h-4" />
//                 <span>Console</span>
//                 <span className="bg-gray-600 text-xs px-2 py-0.5 rounded-full">
//                   {consoleOutput.length}
//                 </span>
//               </button>
              
//               <button
//                 onClick={() => setActiveTab('results')}
//                 className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors ${
//                   activeTab === 'results' 
//                     ? 'bg-gray-700 text-white' 
//                     : 'text-gray-400 hover:text-white'
//                 }`}
//               >
//                 {showTestResults ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
//                 <span>Test Results</span>
//                 {testResults.length > 0 && (
//                   <span className="bg-gray-600 text-xs px-2 py-0.5 rounded-full">
//                     {testResults.filter(r => r.passed).length}/{testResults.length}
//                   </span>
//                 )}
//               </button>
//             </div>

//             {/* Tab Content */}
//             <div className="h-full overflow-hidden">
//               {activeTab === 'console' && (
//                 <div className="h-full bg-gray-900 p-4 overflow-y-auto">
//                   <div className="flex items-center justify-between mb-3">
//                     <div className="flex items-center space-x-2">
//                       <Terminal className="w-4 h-4 text-green-500" />
//                       <span className="font-medium">Console Output</span>
//                     </div>
//                     <button
//                       onClick={clearConsole}
//                       className="text-gray-400 hover:text-white text-sm"
//                     >
//                       Clear
//                     </button>
//                   </div>
                  
//                   <div className="space-y-1 text-sm font-mono">
//                     {consoleOutput.length === 0 ? (
//                       <div className="text-gray-500 italic">Console output will appear here...</div>
//                     ) : (
//                       consoleOutput.map(item => (
//                         <div key={item.id} className="flex items-start space-x-2">
//                           <span className="text-gray-500 text-xs whitespace-nowrap">
//                             {item.timestamp}
//                           </span>
//                           <span className={
//                             item.type === 'success' ? 'text-green-400' :
//                             item.type === 'error' ? 'text-red-400' :
//                             item.type === 'warning' ? 'text-yellow-400' :
//                             'text-gray-300'
//                           }>
//                             {item.message}
//                           </span>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'results' && (
//                 <div className="h-full bg-gray-900 p-4 overflow-y-auto">
//                   {testResults.length === 0 ? (
//                     <div className="flex items-center justify-center h-full text-gray-500">
//                       <div className="text-center">
//                         <XCircle className="w-8 h-8 mx-auto mb-2" />
//                         <p>No test results yet</p>
//                         <p className="text-sm">Run your code to see results</p>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between mb-4">
//                         <span className="font-medium">Test Results</span>
//                         <div className="flex items-center space-x-4">
//                           <span className="text-sm text-gray-400">
//                             {testResults.filter(r => r.passed).length} / {testResults.length} passed
//                           </span>
//                           <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                             testResults.every(r => r.passed)
//                               ? 'bg-green-500/20 text-green-400'
//                               : testResults.some(r => r.passed)
//                               ? 'bg-yellow-500/20 text-yellow-400'
//                               : 'bg-red-500/20 text-red-400'
//                           }`}>
//                             {((testResults.filter(r => r.passed).length / testResults.length) * 100).toFixed(0)}% Success
//                           </span>
//                         </div>
//                       </div>

//                       {testResults.map((result, index) => (
//                         <div 
//                           key={index}
//                           className={`p-3 rounded border ${
//                             result.passed 
//                               ? 'bg-green-500/10 border-green-500/30' 
//                               : 'bg-red-500/10 border-red-500/30'
//                           }`}
//                         >
//                           <div className="flex items-center justify-between mb-2">
//                             <div className="flex items-center space-x-2">
//                               {result.passed ? (
//                                 <CheckCircle className="w-5 h-5 text-green-500" />
//                               ) : (
//                                 <XCircle className="w-5 h-5 text-red-500" />
//                               )}
//                               <span className="font-medium">Test Case {result.test_case || index + 1}</span>
//                               {result.hidden && (
//                                 <div className="flex items-center space-x-1 text-gray-400">
//                                   <EyeOff className="w-3 h-3" />
//                                   <span className="text-xs">Hidden</span>
//                                 </div>
//                               )}
//                             </div>
                            
//                             <div className="flex items-center space-x-4 text-sm">
//                               {result.execution_time && (
//                                 <span className="text-gray-400">
//                                   {result.execution_time.toFixed(2)}ms
//                                 </span>
//                               )}
//                               <span className={`px-2 py-1 rounded text-xs font-medium ${
//                                 result.passed 
//                                   ? 'bg-green-500/20 text-green-400'
//                                   : 'bg-red-500/20 text-red-400'
//                               }`}>
//                                 {result.passed ? 'PASSED' : 'FAILED'}
//                               </span>
//                             </div>
//                           </div>

//                           {!result.hidden && (
//                             <div className="space-y-2 text-sm">
//                               <div>
//                                 <span className="text-gray-400 font-medium">Input:</span>
//                                 <pre className="mt-1 p-2 bg-gray-800 rounded text-blue-300 text-xs overflow-x-auto">
//                                   {result.input}
//                                 </pre>
//                               </div>
//                               <div>
//                                 <span className="text-gray-400 font-medium">Expected:</span>
//                                 <pre className="mt-1 p-2 bg-gray-800 rounded text-green-300 text-xs overflow-x-auto">
//                                   {result.expected}
//                                 </pre>
//                               </div>
//                               <div>
//                                 <span className="text-gray-400 font-medium">Your Output:</span>
//                                 <pre className={`mt-1 p-2 rounded text-xs overflow-x-auto ${
//                                   result.passed ? 'bg-green-500/10 text-green-300' : 'bg-red-500/10 text-red-300'
//                                }`}>
//                                  {result.actual || 'No output'}
//                                </pre>
//                              </div>
//                            </div>
//                          )}

//                          {result.error && (
//                            <div className="mt-3">
//                              <span className="text-red-400 font-medium">Error:</span>
//                              <pre className="mt-1 p-2 bg-red-500/10 rounded text-red-300 text-xs overflow-x-auto whitespace-pre-wrap">
//                                {result.error}
//                              </pre>
//                            </div>
//                          )}
//                        </div>
//                      ))}
//                    </div>
//                  )}
//                </div>
//              )}
//            </div>
//          </div>
//        </div>
//      </div>
//    </div>
//  )
// }


// src/app/coding/page.js - Updated with resizable editor
'use client'
import { useState, useEffect, useCallback, useContext,useRef  } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ApiService from '@/lib/api'
import ResizableCodeEditor from '@/components/coding/ResizableCodeEditor'
import { 
  Home, 
  Clock,
  Code,
  BookOpen,
  Terminal,
  RotateCcw,
  Zap,
  CheckCircle,
  XCircle,
  EyeOff  
} from 'lucide-react'
import Link from 'next/link'
import { FooterContext } from '@/context/FooterContext'

export default function CodingPage() {
  const {setDisplayFooter} = useContext(FooterContext);
  const { data: session, status } = useSession()
  const router = useRouter()
  
  // Basic state
  const [problem, setProblem] = useState(null)
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [difficulty, setDifficulty] = useState('easy')
  const [category, setCategory] = useState('arrays')
  const [testResults, setTestResults] = useState([])
  const [showTestResults, setShowTestResults] = useState(false)
  const [consoleOutput, setConsoleOutput] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [time, setTime] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const [activeTab, setActiveTab] = useState('console')

  useEffect(()=>{
    setDisplayFooter(false)
  },[])


  // src/app/coding/page.js - Updated getStarterCode function
const getStarterCode = useCallback((lang) => {
  const templates = {
    javascript: `function solution(arr, target) {
    // Your code here
    // Example: return arr.indexOf(target);
    return null;
}`,
    python: `def solution(arr, target):
    # Your code here
    # Example: return arr.index(target) if target in arr else -1
    return None`,
    java: `class Solution {
    public int solution(int[] arr, int target) {
        // Your code here
        // Example: linear search implementation
        return -1;
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int solution(vector<int>& arr, int target) {
        // Your code here
        // Example: return find(arr.begin(), arr.end(), target) - arr.begin();
        return -1;
    }
};`
  }
  return templates[lang] || templates.javascript
}, [])

  // Authentication check
  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.push('/login')
  }, [session, status, router])

  // Timer effect
  useEffect(() => {
    let interval = null
    if (timerRunning) {
      interval = setInterval(() => {
        setTime(time => time + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [timerRunning])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const messageIdRef = useRef(0)

// Update your addConsoleMessage function:
const addConsoleMessage = (message, type = 'info') => {
  const timestamp = new Date().toLocaleTimeString()
  setConsoleOutput(prev => {
    const newId = `console-${prev.length}-${Date.now()}-${Math.random()}`
    return [...prev, {
      id: newId,
      timestamp,
      message,
      type
    }]
  })
}

  const generateProblem = useCallback(async () => {
    setIsGenerating(true)
    setShowTestResults(false)
    setTestResults([])
    setConsoleOutput([])
    addConsoleMessage('🔄 Generating AI-powered problem...', 'info')
    
    try {
      const data = await ApiService.generateProblem({
        difficulty,
        category,
        language
      })
      
      setProblem(data.problem)
      setCode(data.starter_code || '')
      setTimerRunning(true)
      
      addConsoleMessage(`✅ Problem "${data.problem.title}" generated successfully!`, 'success')
      addConsoleMessage(`📝 Problem type: ${difficulty} ${category}`, 'info')
      
      // Log problem details
      if (data.problem.examples && data.problem.examples.length > 0) {
        addConsoleMessage(`💡 Check examples for input/output format`, 'info')
      }
      
    } catch (error) {
      console.error('Error generating problem:', error)
      addConsoleMessage(`❌ Error generating problem: ${error.message}`, 'error')
    } finally {
      setIsGenerating(false)
    }
  }, [difficulty, category, language])

  const runCode = useCallback(async () => {
    if (!problem) {
      addConsoleMessage('❌ No problem selected. Generate a problem first.', 'error')
      return
    }
    
    if (!code.trim()) {
      addConsoleMessage('❌ Please write some code before running.', 'error')
      return
    }
    
    setIsRunning(true)
    setActiveTab('console')
    addConsoleMessage('▶️ Running your code...', 'info')
    addConsoleMessage(`🔧 Language: ${language}`, 'info')
    
    try {
      const data = await ApiService.runCode({
        code,
        language,
        problem_id: problem.id,
        test_cases: problem.test_cases?.filter(tc => !tc.hidden) || []
      })
      
      console.log('Run code response:', data)
      
      if (data.results && Array.isArray(data.results)) {
        setTestResults(data.results)
        setShowTestResults(true)
        setActiveTab('results')
        
        const passed = data.results.filter(r => r.passed).length
        const total = data.results.length
        
        if (passed === total) {
          addConsoleMessage(`🎉 Perfect! All ${total} test cases passed!`, 'success')
        } else {
          addConsoleMessage(`⚠️ ${passed}/${total} test cases passed`, 'warning')
        }
        
        // Log individual results
        data.results.forEach((result, index) => {
          const status = result.passed ? '✅' : '❌'
          addConsoleMessage(
            `${status} Test ${index + 1}: ${result.passed ? 'PASSED' : 'FAILED'}`,
            result.passed ? 'success' : 'error'
          )
          
          if (!result.passed) {
            if (result.error) {
              addConsoleMessage(`   💥 Error: ${result.error}`, 'error')
            } else {
              addConsoleMessage(`   📋 Expected: ${result.expected}, Got: ${result.actual}`, 'warning')
            }
          }
        })
      } else {
        addConsoleMessage('❌ Invalid response from server', 'error')
      }
      
    } catch (error) {
      console.error('Error running code:', error)
      addConsoleMessage(`❌ Runtime error: ${error.message}`, 'error')
    } finally {
      setIsRunning(false)
    }
  }, [problem, code, language])

  const submitCode = useCallback(async () => {
    if (!problem) {
      addConsoleMessage('❌ No problem selected. Generate a problem first.', 'error')
      return
    }
    
    setIsSubmitting(true)
    setTimerRunning(false)
    setActiveTab('console')
    addConsoleMessage('📤 Submitting your solution...', 'info')
    
    try {
      const data = await ApiService.submitCode({
        code,
        language,
        problem_id: problem.id,
        time_taken: time
      })
      
      if (data.results && Array.isArray(data.results)) {
        setTestResults(data.results)
        setShowTestResults(true)
        setActiveTab('results')
        
        const passedCount = data.passed_count || data.results.filter(r => r.passed).length
        const totalCount = data.total_count || data.results.length
        const successRate = (passedCount / totalCount * 100).toFixed(1)
        
        // Save session
        await ApiService.saveSession({
          problem_id: problem.id,
          code,
          language,
          time_taken: time,
          passed_tests: passedCount,
          total_tests: totalCount
        })
        
        if (passedCount === totalCount) {
          addConsoleMessage(`🏆 Submission successful! All tests passed (${successRate}%)`, 'success')
          addConsoleMessage(`⏱️ Time taken: ${formatTime(time)}`, 'info')
        } else {
          addConsoleMessage(`📊 Submission recorded: ${passedCount}/${totalCount} tests passed (${successRate}%)`, 'warning')
        }
      }
      
    } catch (error) {
      console.error('Error submitting code:', error)
      addConsoleMessage(`❌ Submission error: ${error.message}`, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }, [problem, code, language, time])

  // const handleLanguageChange = (newLanguage) => {
  //   setLanguage(newLanguage)
  //   addConsoleMessage(`🔄 Language changed to ${newLanguage}`, 'info')
  // }

  const handleLanguageChange = useCallback((newLanguage) => {
  setLanguage(newLanguage)
  
  // Get starter code for the new language
  if (problem && problem.starter_code) {
    // If we have a problem, get language-specific starter code
    const newStarterCode = getStarterCodeForLanguage(newLanguage, problem)
    setCode(newStarterCode)
  } else {
    // If no problem, use default template
    setCode(getStarterCode(newLanguage))
  }
  
  addConsoleMessage(`🔄 Language changed to ${newLanguage.toUpperCase()}`, 'info')
  addConsoleMessage(`📝 Code template updated`, 'info')
}, [problem])

// Helper function to get language-specific starter code
const getStarterCodeForLanguage = useCallback((lang, problemData) => {
  if (!problemData) return getStarterCode(lang)
  
  // Extract function signature from problem if available
  const functionName = problemData.function_name || 'solution'
  
  const templates = {
    javascript: `function ${functionName}(arr, target) {
    // Your code here
    // Example: Find target in array
    return null;
}`,
    python: `def ${functionName}(arr, target):
    # Your code here
    # Example: Find target in array
    return None`,
    java: `class Solution {
    public int ${functionName}(int[] arr, int target) {
        // Your code here
        // Example: Find target in array
        return -1;
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int ${functionName}(vector<int>& arr, int target) {
        // Your code here
        // Example: Find target in array
        return -1;
    }
};`
  }
  
  return templates[lang] || templates.javascript
}, [])


  const clearConsole = () => {
    setConsoleOutput([])
    addConsoleMessage('Console cleared', 'info')
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading AI Coding Environment...</p>
        </div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex-shrink-0 mt-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <Code className="w-6 h-6 text-blue-500" />
              <h1 className="text-xl font-bold">AI Coding Practice</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Timer */}
            <div className="flex items-center space-x-2 bg-gray-700 rounded-lg px-4 py-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-xl font-mono font-bold">{formatTime(time)}</span>
            </div>

            {/* Problem Controls */}
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
            >
              <option value="arrays">Arrays</option>
              <option value="strings">Strings</option>
              <option value="linkedlist">Linked Lists</option>
              <option value="trees">Trees</option>
              <option value="graphs">Graphs</option>
              <option value="dynamic-programming">Dynamic Programming</option>
            </select>

            <button
              onClick={generateProblem}
              disabled={isGenerating}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded transition-colors flex items-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              <span>{isGenerating ? 'Generating...' : 'AI Problem'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Problem Panel */}
        <div className="w-2/5 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Problem</h2>
              {problem && (
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  problem.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                  problem.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {problem.difficulty?.charAt(0).toUpperCase() + problem.difficulty?.slice(1)}
                </div>
              )}
            </div>
            
            {problem ? (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">{problem.title}</h3>
                <div 
                  className="prose prose-invert prose-sm max-w-none text-gray-300"
                  dangerouslySetInnerHTML={{ __html: problem.description }}
                />
                
                {/* {problem.examples && problem.examples.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold mb-2">Examples:</h4>
                    <div className="space-y-2">
                      {problem.examples.map((example, index) => (
                        <div key={index} className="bg-gray-700 p-3 rounded">
                          <div className="text-sm space-y-1">
                            <div><span className="text-gray-400">Input:</span> <code className="text-blue-300">{example.input}</code></div>
                            <div><span className="text-gray-400">Output:</span> <code className="text-green-300">{example.output}</code></div>
                            {example.explanation && (
                              <div><span className="text-gray-400">Explanation:</span> <span className="text-gray-300">{example.explanation}</span></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )} */}

                {/* // In your coding page component, update the examples section:
{problem.examples && problem.examples.length > 0 && (
  <div>
    <h4 className="text-white font-semibold mb-2">Examples:</h4>
    <div className="space-y-2">
      {problem.examples.map((example, index) => (
        <div key={index} className="bg-gray-700 p-3 rounded">
          <div className="text-sm space-y-1">
            <div>
              <span className="text-gray-400">Input:</span> 
              <code className="text-blue-300">{example.input}</code>
            </div>
            <div>
              <span className="text-gray-400">Output:</span> 
              <code className="text-green-300">{example.output}</code>
            </div>
            {example.explanation && (
              <div className="text-gray-400">
                <span>Explanation:</span>
                <div 
                  className="text-gray-300 mt-1"
                  dangerouslySetInnerHTML={{ __html: example.explanation }}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)} */}

{/* // In your coding page component, update the examples section: */}
{problem.examples && problem.examples.length > 0 && (
  <div>
    <h4 className="text-white font-semibold mb-2">Examples:</h4>
    <div className="space-y-2">
      {problem.examples.map((example, index) => (
        <div key={index} className="bg-gray-700 p-3 rounded">
          <div className="text-sm space-y-1">
            <div>
              <span className="text-gray-400">Input:</span> 
              <code className="text-blue-300">{example.input}</code>
            </div>
            <div>
              <span className="text-gray-400">Output:</span> 
              <code className="text-green-300">{example.output}</code>
            </div>
            {example.explanation && (
              <div className="text-gray-400">
                <span>Explanation:</span>
                <div 
                  className="text-gray-300 mt-1 prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: example.explanation }}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

                {problem.constraints && problem.constraints.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold mb-2">Constraints:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {problem.constraints.map((constraint, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>{constraint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {problem.hints && problem.hints.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold mb-2">Hints:</h4>
                    <ul className="text-sm text-yellow-300 space-y-1">
                      {problem.hints.map((hint, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-yellow-500 mr-2">💡</span>
                          <span>{hint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Ready for AI-Generated Problems?</h3>
                <p className="text-gray-400 mb-6">Click "AI Problem" to generate a unique coding challenge</p>
                <button
                  onClick={generateProblem}
                  disabled={isGenerating}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center space-x-2 mx-auto"
                >
                  <Zap className="w-5 h-5" />
                  <span>{isGenerating ? 'Generating...' : 'Generate AI Problem'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* // src/app/coding/page.js - Enhanced output display section  */}
{/* Test Results Display - Enhanced */}
{activeTab === 'results' && (
  <div className="h-full bg-gray-900 p-4 overflow-y-auto">
    {testResults.length === 0 ? (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <XCircle className="w-8 h-8 mx-auto mb-2" />
          <p>No test results yet</p>
          <p className="text-sm">Run your code to see results</p>
        </div>
      </div>
    ) : (
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium">Test Results</span>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">
              {testResults.filter(r => r.passed).length} / {testResults.length} passed
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              testResults.every(r => r.passed)
                ? 'bg-green-500/20 text-green-400'
                : testResults.some(r => r.passed)
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-red-500/20 text-red-400'
            }`}>
              {((testResults.filter(r => r.passed).length / testResults.length) * 100).toFixed(0)}% Success
            </span>
          </div>
        </div>

        {testResults.map((result, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border ${
              result.passed 
                ? 'bg-green-500/10 border-green-500/30' 
                : 'bg-red-500/10 border-red-500/30'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {result.passed ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span className="font-medium">Test Case {result.test_case || index + 1}</span>
                {result.hidden && (
                  <div className="flex items-center space-x-1 text-gray-400">
                    <EyeOff className="w-3 h-3" />
                    <span className="text-xs">Hidden</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                {result.execution_time > 0 && (
                  <span className="text-gray-400">
                    {result.execution_time.toFixed(2)}ms
                  </span>
                )}
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  result.passed 
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {result.passed ? 'PASSED' : 'FAILED'}
                </span>
              </div>
            </div>

            {/* Input/Output Display */}
            {!result.hidden && (
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div>
                  <span className="text-gray-400 font-medium">Input:</span>
                  <pre className="mt-1 p-3 bg-gray-800 rounded text-blue-300 text-xs overflow-x-auto border">
                    {result.input || 'No input'}
                  </pre>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-gray-400 font-medium">Expected Output:</span>
                    <pre className="mt-1 p-3 bg-gray-800 rounded text-green-300 text-xs overflow-x-auto border">
                      {result.expected || 'No expected output'}
                    </pre>
                  </div>
                  
                  <div>
                    <span className="text-gray-400 font-medium">Your Output:</span>
                    <pre className={`mt-1 p-3 rounded text-xs overflow-x-auto border ${
                      result.passed 
                        ? 'bg-green-500/10 text-green-300 border-green-500/30' 
                        : 'bg-red-500/10 text-red-300 border-red-500/30'
                    }`}>
                      {result.actual || 'No output produced'}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Error Display */}
            {(result.error || result.compilation_error || result.runtime_error) && (
              <div className="mt-3 space-y-2">
                {result.compilation_error && (
                  <div>
                    <span className="text-red-400 font-medium">Compilation Error:</span>
                    <pre className="mt-1 p-3 bg-red-500/10 rounded text-red-300 text-xs overflow-x-auto whitespace-pre-wrap border border-red-500/30">
                      {result.compilation_error}
                    </pre>
                  </div>
                )}
                
                {result.runtime_error && result.runtime_error !== result.compilation_error && (
                  <div>
                    <span className="text-orange-400 font-medium">Runtime Error:</span>
                    <pre className="mt-1 p-3 bg-orange-500/10 rounded text-orange-300 text-xs overflow-x-auto whitespace-pre-wrap border border-orange-500/30">
                      {result.runtime_error}
                    </pre>
                  </div>
                )}
                
                {result.error && result.error !== result.compilation_error && result.error !== result.runtime_error && (
                  <div>
                    <span className="text-red-400 font-medium">Error:</span>
                    <pre className="mt-1 p-3 bg-red-500/10 rounded text-red-300 text-xs overflow-x-auto whitespace-pre-wrap border border-red-500/30">
                      {result.error}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Success Message */}
            {result.passed && (
              <div className="mt-3 flex items-center space-x-2 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Test case passed successfully!</span>
              </div>
            )}
          </div>
        ))}

        {/* Overall Summary */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-white">Overall Results</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-white">
                {testResults.filter(r => r.passed).length} / {testResults.length}
              </div>
              <div className="text-sm text-gray-400">tests passed</div>
            </div>
          </div>
          
          {testResults.every(r => r.passed) && (
            <div className="mt-3 flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span>🎉 All test cases passed! Great job!</span>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
)}

        {/* Editor and Output Panel */}
        <div className="flex-1 flex flex-col">
          {/* Resizable Code Editor */}
          <ResizableCodeEditor
            code={code}
            onChange={setCode}
            language={language}
            onLanguageChange={handleLanguageChange}
            onRun={runCode}
            onSubmit={submitCode}
            isRunning={isRunning}
            isSubmitting={isSubmitting}
            problem={problem}
          />

          {/* Output Panel */}
          <div className="flex-1 border-t border-gray-700">
            {/* Tab Navigation */}
            <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('console')}
                className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors ${
                  activeTab === 'console' 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>Console</span>
                <span className="bg-gray-600 text-xs px-2 py-0.5 rounded-full">
                  {consoleOutput.length}
                </span>
              </button>
              
              <button
                onClick={() => setActiveTab('results')}
                className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors ${
                  activeTab === 'results' 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {showTestResults ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                <span>Test Results</span>
                {testResults.length > 0 && (
                  <span className="bg-gray-600 text-xs px-2 py-0.5 rounded-full">
                    {testResults.filter(r => r.passed).length}/{testResults.length}
                  </span>
                )}
              </button>

              <div className="flex-1"></div>
              
              {activeTab === 'console' && (
                <button
                  onClick={clearConsole}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Clear
                </button>
              )}
            </div>
            

            {/* Tab Content */}
            <div className="h-full ">
              {activeTab === 'console' && (
                <div className="h-full bg-gray-900 p-4 overflow-y-auto">
                  <div className="space-y-1 text-sm font-mono">
                    {consoleOutput.length === 0 ? (
                      <div className="text-gray-500 italic">
                        Console output will appear here...<br/>
                        💡 Try generating an AI problem and running your code!
                      </div>
                    ) : (
                      consoleOutput.map(item => (
                        <div key={item.id} className="flex items-start space-x-2">
                          <span className="text-gray-500 text-xs whitespace-nowrap">
                            {item.timestamp}
                          </span>
                          <span className={
                            item.type === 'success' ? 'text-green-400' :
                            item.type === 'error' ? 'text-red-400' :
                            item.type === 'warning' ? 'text-yellow-400' :
                            'text-gray-300'
                          }>
                            {item.message}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'results' && (
                <div className="h-full bg-gray-900 p-4 overflow-y-auto">
                  {testResults.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <XCircle className="w-8 h-8 mx-auto mb-2" />
                        <p>No test results yet</p>
                        <p className="text-sm">Run your code to see results</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-medium">Test Results</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          testResults.every(r => r.passed)
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {testResults.filter(r => r.passed).length}/{testResults.length} Passed
                        </span>
                      </div>

                      {testResults.map((result, index) => (
                        <div 
                          key={index}
                          className={`p-3 rounded border ${
                            result.passed 
                              ? 'bg-green-500/10 border-green-500/30' 
                              : 'bg-red-500/10 border-red-500/30'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {result.passed ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-500" />
                              )}
                              <span className="font-medium">Test Case {result.test_case || index + 1}</span>
                            </div>
                            
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              result.passed 
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {result.passed ? 'PASSED' : 'FAILED'}
                            </span>
                          </div>

                          {!result.hidden && (
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-gray-400 font-medium">Input:</span>
                                <pre className="mt-1 p-2 bg-gray-800 rounded text-blue-300 text-xs overflow-x-auto">
                                  {result.input}
                                </pre>
                              </div>
                              <div>
                                <span className="text-gray-400 font-medium">Expected:</span>
                                <pre className="mt-1 p-2 bg-gray-800 rounded text-green-300 text-xs overflow-x-auto">
                                  {result.expected}
                                </pre>
                              </div>
                              <div>
                                <span className="text-gray-400 font-medium">Your Output:</span>
                                <pre className={`mt-1 p-2 rounded text-xs overflow-x-auto ${
                                  result.passed ? 'bg-green-500/10 text-green-300' : 'bg-red-500/10 text-red-300'
                                }`}>
                                  {result.actual || 'No output'}
                                </pre>
                              </div>
                            </div>
                          )}

                          {result.error && (
                            <div className="mt-3">
                              <span className="text-red-400 font-medium">Error:</span>
                              <pre className="mt-1 p-2 bg-red-500/10 rounded text-red-300 text-xs overflow-x-auto whitespace-pre-wrap">
                                {result.error}
                              </pre>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}