// src/components/coding/InterviewModeModal.jsx
'use client'
import { useState } from 'react'
import { Eye, Users, Clock, Zap, ArrowRight, X } from 'lucide-react'

export default function InterviewModeModal({ 
  isOpen, 
  onStartInterview, 
  onStartPractice,
  difficulty,
  category 
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 max-w-2xl mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Choose Your Mode</h2>
          <p className="text-gray-400">Select how you'd like to practice coding today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Interview Mode */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 hover:bg-red-500/20 transition-colors">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Interview Mode</h3>
              <p className="text-gray-400 text-sm mb-4">
                Simulates a real coding interview with time pressure and monitoring
              </p>
              
              <div className="space-y-2 text-left text-sm text-gray-300 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-red-400" />
                  <span>Time tracked and recorded</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-red-400" />
                  <span>Tab switching detected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <X className="w-4 h-4 text-red-400" />
                  <span>No hints or solutions</span>
                </div>
              </div>

              <button
                onClick={onStartInterview}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Start Interview</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Practice Mode */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 hover:bg-blue-500/20 transition-colors">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Practice Mode</h3>
              <p className="text-gray-400 text-sm mb-4">
                Relaxed practice with hints, solutions, and unlimited time
              </p>
              
              <div className="space-y-2 text-left text-sm text-gray-300 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>No time pressure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span>Hints available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span>View solutions</span>
                </div>
              </div>

              <button
                onClick={onStartPractice}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Start Practice</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-400 text-sm">
          <p>Current settings: <span className="text-white">{difficulty}</span> difficulty, <span className="text-white">{category}</span> problems</p>
        </div>
      </div>
    </div>
  )
}
