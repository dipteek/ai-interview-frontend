'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Play, ShieldCheck, Trophy, Zap, Users, CheckCircle } from 'lucide-react';

const ModernCTABanner = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const companies = ['Adobe', 'Salesforce', 'Slack', 'Spotify', 'Netflix'];
  
  const features = [
    { 
      id: 1, 
      title: 'AI-Powered Insights', 
      description: 'Get real-time feedback on your answers with advanced language analysis',
      icon: <Zap className="h-5 w-5 text-amber-500" />
    },
    { 
      id: 2, 
      title: 'Industry Specific', 
      description: 'Practice with questions tailored to your target role and industry',
      icon: <Trophy className="h-5 w-5 text-emerald-500" /> 
    },
    { 
      id: 3, 
      title: 'Proven Results', 
      description: '83% of users report improved interview confidence after just 3 sessions',
      icon: <ShieldCheck className="h-5 w-5 text-blue-500" /> 
    }
  ];
  
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 bottom-0 opacity-10">
          <svg width="400" height="400" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M61.6-17.4c18.7 4.3 31.3 21.1 41.4 36.8 10.4 16.2 19 32.5 20.8 51.4 1.9 19.2-3.4 39.5-15.1 54.8-12.3 16-31.3 27.4-52.8 28.6-21.4 1.3-44.3-7.6-58.9-24.4-14.7-17.1-22.1-41.1-15.7-62.7 6.2-21.3 25.8-39.3 45.7-49.2C46.2 7.9 66 10.4 75.7 4.1 85-1.7 84-17.2 78.7-20.7c-5.5-3.7-17 4.8-35.6 9.1-18.3 4.1-43.4 4.2-52.7-4.3-9-8.5-2.1-25.5 10.6-42.2 13-16.9 31.9-33.5 48.8-39.6 17.1-6.4 32.3-2.6 49.7 8.7 17.4 11.3 37 30.1 41.2 48.1 4.1 18.3-7 35.8-26.5 42.6-19.1 6.5-46.6 2.3-63.6-11.5-16.7-13.5-22.9-36.5-15.7-52.7 7-15.8 27.5-24.8 47-25.8 19.9-1.2 39 5.7 51.2 18.5 12.2 12.9 17.5 31.5 9.9 43.9-7.5 12.1-28 18-43.8 13.4-15.7-4.4-27-19.3-25.5-35.7 1.2-16.4 15.3-34.3 31.2-39.5 15.6-5 33 3 41.1 16.6 7.9 13.6 6.4 32.7-1.4 45.8-8.2 13.4-22.8 20.9-38.2 21.6-15.5 0.7-31.7-5.4-41.5-17.3-10-12.1-13.6-29.9-7.8-42.6 5.7-12.3 20.8-19.5 35.5-19 14.8 0.4 29.1 8.7 36 22.3 7 13.9 6.5 33 0.6 41.8-5.8 8.5-17 6.8-25.7-0.2-8.7-7-15-19.2-11.9-27.6 3-8.1 15.3-12.4 25.7-7.9 10.2 4.3 18.4 17.5 17.1 28.7-1.3 11-12.1 20-24.6 21.5-12.4 1.6-26.5-4.5-34.2-13.7-8-9.3-9.7-21.8-3.4-31.8 6.2-9.8 20.3-17.1 33.4-16.1 13.3 1 25.5 10.2 32 22.2 6.4 12.2 7 27.2 1.7 36.7-5.5 9.5-17.1 13.6-28.8 12.5-11.5-1-23.1-7.1-27.8-17.7-4.8-10.8-2.8-26 5.6-34.6 8.4-8.5 23.2-10.5 34.5-5.5 11.4 5 19.2 17 20.3 29.3 1.1 12.5-4.5 25.3-15.4 31.6-11 6.4-27.1 6.4-38 0.3-10.9-6.1-16.6-18.4-16.7-31.7-0.2-13.3 6-27.5 16.8-34 10.8-6.3 26.2-5 36.7 2.7 10.5 7.7 16.1 21.7 15.7 34.4-0.5 12.8-7 24.2-17.3 29.9-10.4 5.8-24.5 5.8-33.6 0.1-9-5.7-13-17.2-13.3-27.7-0.3-10.5 3.2-20 11.2-25.3 8.3-5.4 21-6.7 29.8-1.4 8.7 5.1 13.5 16.7 12.6 25.9-0.9 9-8.5 15.6-17.1 18.3-8.6 2.6-18.3 1.3-25-4.6-6.7-6-10.5-16.6-8.4-25.4 2-8.6 9.8-15.3 17.8-16.9" 
              stroke="#4F46E5" strokeWidth="2"
            />
          </svg>
        </div>
        <div className="absolute left-0 top-0 opacity-10">
          <svg width="400" height="400" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M42.5-27.5c13.1 8.4 21.1 23.5 24.7 38.6 3.5 15 2.5 30.1-5.1 41.8-7.9 12-22.5 20.7-38.5 22.8-16.2 2.1-33.7-2.4-47.2-12.3-13.5-9.9-23-25.3-24.6-41.5-1.7-16.6 5.3-34 16.3-46.8 10.8-12.5 25.6-20.4 40.8-21.8 15.6-1.4 31.6 3.8 33.6 12.2" 
              stroke="#6366F1" strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side content */}
            <div>
              <div className="inline-flex items-center py-1 px-3 rounded-full bg-indigo-50 mb-6">
                <Users className="h-4 w-4 text-indigo-600 mr-2" />
                <span className="text-sm font-medium text-indigo-700">Trusted by 50,000+ job seekers</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                <span className="block">Master the Art of</span>
                <span className="relative inline-block">
                  <span className="relative z-10 text-indigo-600">Interview Success</span>
                  <span className="absolute bottom-2 inset-x-0 h-3 bg-indigo-100 z-0"></span>
                </span>
              </h1>
              
              <p className="mt-6 text-xl text-gray-600 max-w-lg">
                Our AI interview coach provides personalized prep, real-time feedback, and industry-specific questions to help you land your dream job.
              </p>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <Link 
                  href="/start" 
                  className="group px-8 py-4 bg-indigo-600 text-white rounded-lg font-medium shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all inline-flex items-center"
                >
                  Start Free Practice
                  <ArrowUpRight className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
                
                <Link 
                  href="/how-it-works" 
                  className="group px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-all inline-flex items-center"
                >
                  <Play className="mr-2 h-5 w-5 text-indigo-600" />
                  How It Works
                </Link>
              </div>
              
              {/* Trusted by logos */}
              <div className="mt-12">
                <p className="text-sm text-gray-500 mb-4">Trusted by candidates from top companies</p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  {companies.map((company, index) => (
                    <div 
                      key={company}
                      className="text-gray-400 font-medium"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <span className={`transition-colors ${hoveredIndex === index ? 'text-gray-800' : ''}`}>
                        {company}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right side - App demo */}
            <div className="relative">
              {/* Decorative circles */}
              <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full opacity-80"></div>
              <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full opacity-80"></div>
              
              {/* App container */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* App header */}
                <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Interview AI Coach</h3>
                      <p className="text-xs text-gray-500">Marketing Manager Interview</p>
                    </div>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Pro Session
                    </span>
                  </div>
                </div>
                
                {/* App content */}
                <div className="p-6">
                  {/* Chat interface */}
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-900 mb-1">Interviewer:</p>
                      <p className="text-sm text-gray-700">Describe a marketing campaign you led that didn't meet expectations. What did you learn?</p>
                    </div>
                    
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-indigo-700 mb-1">Your Answer:</p>
                      <p className="text-sm text-gray-700">
                        In my previous role, I led a social media campaign for our new product line that didn't reach our engagement targets. Despite creating what we thought was compelling content...
                      </p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-gray-900">AI Analysis</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          In Progress
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-500">Clarity</span>
                            <span className="text-gray-700">Good</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-200 rounded-full">
                            <div className="h-1.5 bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-500">Structure</span>
                            <span className="text-gray-700">Needs work</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-200 rounded-full">
                            <div className="h-1.5 bg-amber-500 rounded-full" style={{ width: '40%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-500">Relevance</span>
                            <span className="text-gray-700">Excellent</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-200 rounded-full">
                            <div className="h-1.5 bg-green-500 rounded-full" style={{ width: '90%' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <p className="text-xs font-medium text-gray-700 mb-2">Suggestions:</p>
                        <ul className="space-y-1.5">
                          {[
                            'Follow STAR method more closely',
                            'Quantify results more clearly',
                            'Great job highlighting lessons learned'
                          ].map((suggestion, index) => (
                            <li key={index} className="flex items-center text-xs text-gray-600">
                              <CheckCircle className="h-3 w-3 text-indigo-500 mr-1.5 flex-shrink-0" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="mt-5 flex justify-end space-x-3">
                    <button className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                      Try Again
                    </button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                      Next Question
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Feature cards */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {features.map((feature) => (
                  <div 
                    key={feature.id} 
                    className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="mb-3">{feature.icon}</div>
                    <h4 className="font-medium text-gray-900 text-sm">{feature.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCTABanner;