'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, MessageSquare, Zap, Award } from 'lucide-react';

const MinimalModernBanner = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-50 to-transparent opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-blue-50 to-transparent opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side content */}
          <div className="space-y-8">
            <div>
              <p className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 mb-4">
                <Zap size={14} className="mr-1" /> AI-Powered Interview Prep
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                Master Your <span className="text-indigo-600">Interview Skills</span> With AI Coaching
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Get personalized feedback, practice with industry-specific questions, and build your confidence with our intelligent interview assistant.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/interview"
                className="group inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Start Practicing
                <ArrowRight className={`ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? 'transform translate-x-1' : ''}`} />
              </Link>
              
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Play className="mr-2 h-4 w-4 text-indigo-600" />
                Watch Demo
              </Link>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-amber-500" />
                  <span className="ml-2 text-sm text-gray-600">98% Success Rate</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-indigo-600" />
                  <span className="ml-2 text-sm text-gray-600">2,400+ Reviews</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Interactive UI mockup */}
          <div className="relative">
            <div className="absolute -z-10 top-1/4 right-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply blur-3xl opacity-30"></div>
            <div className="absolute -z-10 bottom-1/4 left-1/4 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply blur-3xl opacity-40"></div>
            
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
                <div className="bg-gray-100 rounded-md px-3 py-1 text-xs text-gray-500">Interview Session</div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">AI Coach</p>
                  <p className="text-sm text-gray-600">Tell me about a time you solved a complex problem at work.</p>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-indigo-700 mb-1">Your Answer</p>
                  <p className="text-sm text-gray-600">When I was at ABC Corp, I faced a major system outage...</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-green-700 mb-1">Feedback</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-xs text-gray-600">Strong problem identification</p>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                      <p className="text-xs text-gray-600">Consider adding measurable results</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between">
                <button className="inline-flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700">Reset</button>
                <button className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white">Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MinimalModernBanner;