// src/components/coding/TestCasePanel.jsx
'use client'
import { CheckCircle, XCircle, Clock, X, Eye, EyeOff } from 'lucide-react'

export default function TestCasePanel({ results, onClose }) {
  const passedCount = results.filter(r => r.passed).length
  const totalCount = results.length
  const successRate = totalCount > 0 ? (passedCount / totalCount * 100).toFixed(1) : 0

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-white font-medium">Test Results</span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            successRate === '100.0' 
              ? 'bg-green-500/20 text-green-400'
              : successRate >= '50.0'
              ? 'bg-yellow-500/20 text-yellow-400'
              : 'bg-red-500/20 text-red-400'
          }`}>
            {passedCount}/{totalCount} ({successRate}%)
          </span>
        </div>
        
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-700 rounded transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Test Cases */}
      <div className="flex-1 overflow-y-auto">
        {results.map((result, index) => (
          <div 
            key={index}
            className={`border-b border-gray-700 p-4 ${
              result.passed ? 'bg-green-500/5' : 'bg-red-500/5'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {result.passed ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span className="text-white font-medium">
                  Test Case {index + 1}
                </span>
                {result.hidden && (
                  <div className="flex items-center space-x-1 text-gray-400">
                    <EyeOff className="w-3 h-3" />
                    <span className="text-xs">Hidden</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                {result.execution_time && (
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{result.execution_time.toFixed(2)}ms</span>
                  </div>
                )}
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  result.passed 
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {result.passed ? 'Passed' : 'Failed'}
                </span>
              </div>
            </div>

            {!result.hidden && (
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-1 gap-2">
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
                      {result.actual}
                    </pre>
                  </div>
                </div>

                {result.error && (
                  <div>
                    <span className="text-red-400 font-medium">Error:</span>
                    <pre className="mt-1 p-2 bg-red-500/10 rounded text-red-300 text-xs overflow-x-auto whitespace-pre-wrap">
                      {result.error}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
