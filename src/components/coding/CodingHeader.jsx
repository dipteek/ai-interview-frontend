// src/components/coding/CodingHeader.jsx
'use client'
import { useState } from 'react'
import { 
  Home, 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Maximize, 
  Settings,
  Clock,
  Code,
  Zap,
  Eye,
  EyeOff
} from 'lucide-react'
import Link from 'next/link'

export default function CodingHeader({
  session,
  time,
  isRunning,
  onStartTimer,
  onPauseTimer,
  onResetTimer,
  interviewMode,
  onStartInterview,
  onEndInterview,
  onFullScreen,
  difficulty,
  category,
  onDifficultyChange,
  onCategoryChange,
  onGenerateProblem,
  isGenerating
}) {
  const [showSettings, setShowSettings] = useState(false)
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          {/* Logo & Navigation */}
          <Link href="/dashboard" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
            <Home className="w-5 h-5" />
            <span className="hidden md:inline">Dashboard</span>
          </Link>

          <div className="h-6 w-px bg-gray-600"></div>

          <div className="flex items-center space-x-2">
            <Code className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-bold text-white">
              {interviewMode ? 'Interview Mode' : 'Coding Practice'}
            </h1>
            {interviewMode && (
              <div className="px-2 py-1 bg-red-500 text-white text-xs rounded-full animate-pulse">
                LIVE
              </div>
            )}
          </div>
        </div>

        {/* Center Section - Timer */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-700 rounded-lg px-4 py-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="text-2xl font-mono font-bold text-white">
              {formatTime(time)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {!isRunning ? (
              <button
                onClick={onStartTimer}
                className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                title="Start Timer"
              >
                <Play className="w-4 h-4 text-white" />
              </button>
            ) : (
              <button
                onClick={onPauseTimer}
                className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
                title="Pause Timer"
              >
                <Pause className="w-4 h-4 text-white" />
              </button>
            )}
            
            <button
              onClick={onResetTimer}
              className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Problem Controls */}
          <div className="flex items-center space-x-2">
            <select
              value={difficulty}
              onChange={(e) => onDifficultyChange(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
              disabled={interviewMode}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
              disabled={interviewMode}
            >
              <option value="arrays">Arrays</option>
              <option value="strings">Strings</option>
              <option value="linkedlist">Linked Lists</option>
              <option value="trees">Trees</option>
              <option value="graphs">Graphs</option>
              <option value="dynamic-programming">Dynamic Programming</option>
            </select>

            <button
              onClick={onGenerateProblem}
              disabled={isGenerating || interviewMode}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              <span className="hidden md:inline">
                {isGenerating ? 'Generating...' : 'New Problem'}
              </span>
            </button>
          </div>

          <div className="h-6 w-px bg-gray-600"></div>

          {/* Interview Mode Toggle */}
          {!interviewMode ? (
            <button
              onClick={onStartInterview}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden md:inline">Start Interview</span>
            </button>
          ) : (
            <button
              onClick={onEndInterview}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <EyeOff className="w-4 h-4" />
              <span className="hidden md:inline">End Interview</span>
            </button>
          )}

          {/* Settings */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4 text-white" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={onFullScreen}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            title="Toggle Fullscreen"
          >
            <Maximize className="w-4 h-4 text-white" />
          </button>

          {/* User Info */}
          <div className="text-sm text-gray-300">
            {session.user?.name || session.user?.email}
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-16 right-6 bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-xl z-50">
          <h3 className="text-white font-semibold mb-3">Editor Settings</h3>
          <div className="space-y-3 w-64">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Theme</label>
              <select className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 text-sm">
                <option>Dark</option>
                <option>Light</option>
                <option>Monokai</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">Font Size</label>
              <select className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 text-sm">
                <option>12px</option>
                <option>14px</option>
                <option>16px</option>
                <option>18px</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="vim-mode" className="rounded" />
              <label htmlFor="vim-mode" className="text-gray-300 text-sm">Vim Mode</label>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
