// src/components/coding/ProblemPanel.jsx
'use client'
import { useState } from 'react'
import { 
  BookOpen, 
  Lightbulb, 
  Trophy, 
  Clock, 
  Tag,
  ChevronDown,
  ChevronRight,
  Zap
} from 'lucide-react'

export default function ProblemPanel({ 
  problem, 
  difficulty, 
  category, 
  onGenerateProblem, 
  isGenerating,
  interviewMode 
}) {
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [expandedExample, setExpandedExample] = useState(0)

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'easy': return 'text-green-500 bg-green-500/20'
      case 'medium': return 'text-yellow-500 bg-yellow-500/20'
      case 'hard': return 'text-red-500 bg-red-500/20'
      default: return 'text-gray-500 bg-gray-500/20'
    }
  }

  if (!problem) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Problem</h2>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Problem Selected</h3>
            <p className="text-gray-400 mb-6">Generate a coding problem to get started</p>
            <button
              onClick={onGenerateProblem}
              disabled={isGenerating}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2 mx-auto"
            >
              <Zap className="w-5 h-5" />
              <span>{isGenerating ? 'Generating...' : 'Generate Problem'}</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Problem</h2>
          {!interviewMode && (
            <button
              onClick={onGenerateProblem}
              disabled={isGenerating}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded text-sm transition-colors"
            >
              {isGenerating ? 'Generating...' : 'New'}
            </button>
          )}
        </div>
        
        {/* Problem Title and Meta */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">{problem.title}</h3>
          <div className="flex items-center space-x-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
              {problem.difficulty?.charAt(0).toUpperCase() + problem.difficulty?.slice(1)}
            </span>
            <div className="flex items-center space-x-1 text-gray-400">
              <Tag className="w-4 h-4" />
              <span className="text-sm">{problem.category}</span>
            </div>
            {problem.estimatedTime && (
              <div className="flex items-center space-x-1 text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{problem.estimatedTime}min</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Description */}
        <div>
          <div 
            className="prose prose-invert prose-sm max-w-none text-gray-300"
            dangerouslySetInnerHTML={{ __html: problem.description }}
          />
        </div>

        {/* Examples */}
        {problem.examples && problem.examples.length > 0 && (
          <div>
            <h4 className="text-white font-semibold mb-3">Examples</h4>
            <div className="space-y-3">
              {problem.examples.map((example, index) => (
                <div key={index} className="bg-gray-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedExample(expandedExample === index ? -1 : index)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-600 transition-colors"
                  >
                    <span className="text-white font-medium">Example {index + 1}</span>
                    {expandedExample === index ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  
                  {expandedExample === index && (
                    <div className="px-4 pb-4 space-y-3">
                      <div>
                        <span className="text-gray-400 text-sm font-medium">Input:</span>
                        <pre className="mt-1 p-3 bg-gray-800 rounded text-blue-300 text-sm overflow-x-auto">
                          {example.input}
                        </pre>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm font-medium">Output:</span>
                        <pre className="mt-1 p-3 bg-gray-800 rounded text-green-300 text-sm overflow-x-auto">
                          {example.output}
                        </pre>
                      </div>
                      {example.explanation && (
                        <div>
                          <span className="text-gray-400 text-sm font-medium">Explanation:</span>
                          <p className="mt-1 text-gray-300 text-sm">{example.explanation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Constraints */}
        {problem.constraints && problem.constraints.length > 0 && (
          <div>
            <h4 className="text-white font-semibold mb-3">Constraints</h4>
            <ul className="space-y-1">
              {problem.constraints.map((constraint, index) => (
                <li key={index} className="text-gray-300 text-sm flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>{constraint}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Hints */}
        {problem.hints && problem.hints.length > 0 && !interviewMode && (
          <div>
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center space-x-2 text-yellow-500 hover:text-yellow-400 transition-colors mb-3"
            >
              <Lightbulb className="w-4 h-4" />
              <span className="font-medium">{showHints ? 'Hide Hints' : 'Show Hints'}</span>
            </button>
            
            {showHints && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <ul className="space-y-2">
                  {problem.hints.map((hint, index) => (
                    <li key={index} className="text-yellow-300 text-sm flex items-start">
                      <span className="text-yellow-500 mr-2">💡</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Solution */}
        {problem.solution && !interviewMode && (
          <div>
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex items-center space-x-2 text-green-500 hover:text-green-400 transition-colors mb-3"
            >
              <Trophy className="w-4 h-4" />
              <span className="font-medium">{showSolution ? 'Hide Solution' : 'Show Solution'}</span>
            </button>
            
            {showSolution && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <pre className="text-green-300 text-sm whitespace-pre-wrap overflow-x-auto">
                  {problem.solution}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
