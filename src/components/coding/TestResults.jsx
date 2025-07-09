// src/components/coding/TestResults.jsx
import { CheckCircle, XCircle, Clock, Trophy } from 'lucide-react'
import Card, { CardContent, CardHeader } from '@/components/ui/Card'

export default function TestResults({ results, isVisible }) {
  if (!isVisible || !results || results.length === 0) {
    return null
  }

  const passedCount = results.filter(result => result.passed).length
  const totalCount = results.length
  const successRate = (passedCount / totalCount) * 100

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Test Results</h3>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {passedCount} / {totalCount} passed
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              successRate === 100 
                ? 'bg-green-100 text-green-800'
                : successRate >= 50
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {successRate.toFixed(0)}% Success
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                result.passed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {result.passed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="font-medium">
                    Test Case {result.test_case}
                    {result.hidden && <span className="text-xs text-gray-500 ml-2">(Hidden)</span>}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  {result.execution_time && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{result.execution_time.toFixed(2)}ms</span>
                    </div>
                  )}
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    result.passed 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {result.passed ? 'Passed' : 'Failed'}
                  </span>
                </div>
              </div>

              {!result.hidden && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Input:</span>
                    <code className="block mt-1 p-2 bg-gray-100 rounded text-xs">
                      {result.input}
                    </code>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Expected:</span>
                    <code className="block mt-1 p-2 bg-gray-100 rounded text-xs">
                      {result.expected}
                    </code>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Your Output:</span>
                    <code className={`block mt-1 p-2 rounded text-xs ${
                      result.passed ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {result.actual}
                    </code>
                  </div>
                </div>
              )}

              {result.error && (
                <div className="mt-3">
                  <span className="font-medium text-red-700">Error:</span>
                  <pre className="mt-1 p-2 bg-red-100 rounded text-xs text-red-700 whitespace-pre-wrap">
                    {result.error}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Overall Results Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-medium text-gray-900">Overall Results</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                {passedCount} / {totalCount}
              </div>
              <div className="text-sm text-gray-600">tests passed</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
