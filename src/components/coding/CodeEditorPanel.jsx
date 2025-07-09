
// src/components/coding/CodeEditorPanel.jsx
'use client'
import { useState, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { oneDark } from '@codemirror/theme-one-dark'
import { 
  Play, 
  Send, 
  RotateCcw, 
  Copy, 
  Download,
  Settings,
  Code,
  Zap
} from 'lucide-react'

export default function CodeEditorPanel({
  code,
  onChange,
  language,
  onLanguageChange,
  onRun,
  onSubmit,
  onReset,
  isRunning,
  isSubmitting,
  problem,
  interviewMode,
  onAddConsoleMessage
}) {
  const [fontSize, setFontSize] = useState(14)
  const [theme, setTheme] = useState('dark')
  const [showSettings, setShowSettings] = useState(false)
  const [lineNumbers, setLineNumbers] = useState(true)
  const [wordWrap, setWordWrap] = useState(false)

  const getLanguageExtension = () => {
    switch (language) {
      case 'python': return python()
      case 'java': return java()
      case 'cpp': return cpp()
      default: return javascript()
    }
  }

  const languageOptions = [
    { value: 'javascript', label: 'JavaScript', icon: '🟨' },
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'cpp', label: 'C++', icon: '⚡' }
  ]

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
    onAddConsoleMessage('📋 Code copied to clipboard', 'success')
  }

  const handleDownloadCode = () => {
    const extension = language === 'javascript' ? 'js' : language === 'python' ? 'py' : language === 'cpp' ? 'cpp' : 'java'
    const fileName = `solution.${extension}`
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
    URL.revokeObjectURL(url)
    onAddConsoleMessage(`💾 Code downloaded as ${fileName}`, 'success')
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Editor Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-gray-400" />
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
              >
                {languageOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size */}
            <select
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
            >
              <option value={12}>12px</option>
              <option value={14}>14px</option>
              <option value={16}>16px</option>
              <option value={18}>18px</option>
              <option value={20}>20px</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            {/* Editor Settings */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              title="Editor Settings"
            >
              <Settings className="w-4 h-4 text-gray-300" />
            </button>

            {/* Copy Code */}
            <button
              onClick={handleCopyCode}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              title="Copy Code"
            >
              <Copy className="w-4 h-4 text-gray-300" />
            </button>

            {/* Download Code */}
            <button
              onClick={handleDownloadCode}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              title="Download Code"
            >
              <Download className="w-4 h-4 text-gray-300" />
            </button>

            {/* Reset Code */}
            <button
              onClick={onReset}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              title="Reset Code"
            >
              <RotateCcw className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-3 p-3 bg-gray-700 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="line-numbers"
                  checked={lineNumbers}
                  onChange={(e) => setLineNumbers(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="line-numbers" className="text-white text-sm">Line Numbers</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="word-wrap"
                  checked={wordWrap}
                  onChange={(e) => setWordWrap(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="word-wrap" className="text-white text-sm">Word Wrap</label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Code Editor */}
      <div className="flex-1 relative">
        <CodeMirror
          value={code}
          onChange={onChange}
          extensions={[getLanguageExtension()]}
          theme={oneDark}
          height="100%"
          style={{
            fontSize: `${fontSize}px`,
            height: '100%'
          }}
          basicSetup={{
            lineNumbers,
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

      {/* Action Buttons */}
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Lines: {code.split('\n').length} | 
            Characters: {code.length} | 
            Language: {languageOptions.find(l => l.value === language)?.label}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onRun}
              disabled={isRunning || !problem}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              {isRunning ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span>{isRunning ? 'Running...' : 'Run Code'}</span>
            </button>

            <button
              onClick={onSubmit}
              disabled={isSubmitting || !problem}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
