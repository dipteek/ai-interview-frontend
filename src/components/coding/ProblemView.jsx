// src/components/coding/ProblemView.jsx
import { useState } from 'react'
import { Clock, Trophy, BookOpen, Lightbulb } from 'lucide-react'
import { DIFFICULTY_LEVELS } from '@/lib/constants'
import Card, { CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function ProblemView({ problem, onNewProblem, isGenerating }) {
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  if (!problem) {
    return (
      <Card className="h-full">
        <CardContent className="flex flex-col items-center justify-center h-full text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Problem Selected</h3>
          <p className="text-gray-600 mb-6">Generate a new coding problem to get started</p>
          <Button onClick={onNewProblem} loading={isGenerating}>
            Generate Problem
          </Button>
        </CardContent>
      </Card>
    )
  }

  const difficulty = DIFFICULTY_LEVELS[problem.difficulty]

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">{problem.title}</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={onNewProblem}
            loading={isGenerating}
          >
            New Problem
          </Button>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficulty.bgColor} ${difficulty.textColor}`}>
            {difficulty.name}
          </span>
          <span className="text-sm text-gray-600">{problem.category}</span>
          {problem.estimatedTime && (
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              {problem.estimatedTime} min
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="overflow-y-auto">
        {/* Problem Description */}
        <div className="prose prose-sm max-w-none mb-6">
          <div dangerouslySetInnerHTML={{ __html: problem.description }} />
        </div>

        {/* Examples */}
        {problem.examples && problem.examples.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Examples:</h4>
            <div className="space-y-4">
              {problem.examples.map((example, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-gray-700">Input:</span>
                      <code className="ml-2 text-sm bg-gray-200 px-2 py-1 rounded">
                        {example.input}
                      </code>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Output:</span>
                      <code className="ml-2 text-sm bg-gray-200 px-2 py-1 rounded">
                        {example.output}
                      </code>
                    </div>
                    {example.explanation && (
                      <div>
                        <span className="font-medium text-gray-700">Explanation:</span>
                        <span className="ml-2 text-sm text-gray-600">{example.explanation}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Constraints */}
        {problem.constraints && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Constraints:</h4>
            <ul className="list-disc list-inside space-y-1">
              {problem.constraints.map((constraint, index) => (
                <li key={index} className="text-sm text-gray-600">{constraint}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Hints */}
        {problem.hints && problem.hints.length > 0 && (
          <div className="mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHints(!showHints)}
              className="flex items-center space-x-2 mb-3"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{showHints ? 'Hide' : 'Show'} Hints</span>
            </Button>
            
            {showHints && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <ul className="space-y-2">
                  {problem.hints.map((hint, index) => (
                    <li key={index} className="text-sm text-yellow-800">
                      💡 {hint}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Solution (if available) */}
        {problem.solution && (
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSolution(!showSolution)}
              className="flex items-center space-x-2 mb-3"
            >
              <Trophy className="w-4 h-4" />
              <span>{showSolution ? 'Hide' : 'Show'} Solution</span>
            </Button>
            
            {showSolution && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <pre className="text-sm text-green-800 whitespace-pre-wrap">
                  {problem.solution}
                </pre>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
