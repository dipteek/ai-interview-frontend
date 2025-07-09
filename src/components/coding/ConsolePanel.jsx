// src/components/coding/ConsolePanel.jsx
'use client'
import { useEffect, useRef } from 'react'
import { Terminal, Trash2, Copy } from 'lucide-react'

export default function ConsolePanel({ output, onClear }) {
  const consoleRef = useRef(null)

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight
    }
  }, [output])

  const getMessageColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-400'
      case 'error': return 'text-red-400'
      case 'warning': return 'text-yellow-400'
      default: return 'text-gray-300'
    }
  }

  const copyAllOutput = () => {
    const text = output.map(item => `[${item.timestamp}] ${item.message}`).join('\n')
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-green-500" />
          <span className="text-white font-medium">Console</span>
          <span className="text-gray-400 text-sm">({output.length})</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={copyAllOutput}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            title="Copy All Output"
          >
            <Copy className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={onClear}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            title="Clear Console"
          >
            <Trash2 className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Console Output */}
      <div 
        ref={consoleRef}
        className="flex-1 overflow-y-auto p-3 font-mono text-sm"
      >
        {output.length === 0 ? (
          <div className="text-gray-500 italic">Console output will appear here...</div>
        ) : (
          <div className="space-y-1">
            {output.map(item => (
              <div key={item.id} className="flex items-start space-x-3">
                <span className="text-gray-500 text-xs whitespace-nowrap">
                  {item.timestamp}
                </span>
                <span className={`${getMessageColor(item.type)} flex-1`}>
                  {item.message}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
