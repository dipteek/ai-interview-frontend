// src/components/debug/CodeDebug.jsx
'use client'
import { useState } from 'react'
import ApiService from '@/lib/api'

export default function CodeDebug() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const testAPI = async () => {
    setLoading(true)
    try {
      // Test problem generation
      const problemResult = await ApiService.generateProblem({
        difficulty: 'easy',
        category: 'arrays',
        language: 'javascript'
      })
      
      console.log('Problem generated:', problemResult)
      
      // Test code execution
      const codeResult = await ApiService.runCode({
        code: 'function solution() { return "Hello World"; }',
        language: 'javascript',
        problem_id: problemResult.problem.id,
        test_cases: [
          { input: '', expected_output: 'Hello World', hidden: false }
        ]
      })
      
      console.log('Code executed:', codeResult)
      setResult({ problemResult, codeResult })
      
    } catch (error) {
      console.error('API Test Error:', error)
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-lg max-w-md">
      <h3 className="font-bold mb-2">API Debug</h3>
      <button 
        onClick={testAPI}
        disabled={loading}
        className="bg-blue-500 px-3 py-1 rounded mb-2"
      >
        {loading ? 'Testing...' : 'Test API'}
      </button>
      {result && (
        <pre className="text-xs bg-gray-900 p-2 rounded overflow-auto max-h-40">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}