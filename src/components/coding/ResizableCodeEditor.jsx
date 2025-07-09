// src/components/coding/ResizableCodeEditor.jsx
'use client'
import { useState, useRef, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { oneDark } from '@codemirror/theme-one-dark'

export default function ResizableCodeEditor({
  code,
  onChange,
  language,
  onLanguageChange,
  onRun,
  onSubmit,
  isRunning,
  isSubmitting,
  problem
}) {
  const [editorHeight, setEditorHeight] = useState(400)
  const [isResizing, setIsResizing] = useState(false)
  const resizerRef = useRef(null)
  const editorRef = useRef(null)

  const getLanguageExtension = () => {
    switch (language) {
      case 'python': return python()
      case 'java': return java()
      case 'cpp': return cpp()
      default: return javascript()
    }
  }

  // Handle resizing
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing) {
        const newHeight = Math.max(200, Math.min(800, e.clientY - editorRef.current.offsetTop))
        setEditorHeight(newHeight)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.body.style.cursor = 'default'
      document.body.style.userSelect = 'auto'
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'ns-resize'
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsResizing(true)
  }

  return (
    <div className="flex flex-col bg-gray-900">
      {/* Editor Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
          >
            <option value="javascript">🟨 JavaScript</option>
            <option value="python">🐍 Python</option>
            <option value="java">☕ Java</option>
            <option value="cpp">⚡ C++</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onRun}
            disabled={isRunning || !problem}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded transition-colors flex items-center space-x-2"
          >
            {isRunning ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <span>▶</span>
            )}
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>

          <button
            onClick={onSubmit}
            disabled={isSubmitting || !problem}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded transition-colors flex items-center space-x-2"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <span>📤</span>
            )}
            <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div 
        ref={editorRef}
        className="relative"
        style={{ height: `${editorHeight}px` }}
      >
        <CodeMirror
          value={code}
          onChange={onChange}
          extensions={[getLanguageExtension()]}
          theme={oneDark}
          height={`${editorHeight}px`}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            highlightSelectionMatches: false,
            searchKeymap: true
          }}
        />
      </div>

      {/* Resize Handle */}
      <div
        ref={resizerRef}
        onMouseDown={handleMouseDown}
        className="h-2 bg-gray-700 hover:bg-gray-600 cursor-ns-resize border-t border-gray-600 flex items-center justify-center transition-colors"
      >
        <div className="w-8 h-1 bg-gray-500 rounded"></div>
      </div>
    </div>
  )
}