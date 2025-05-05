'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Star, BarChart, Sparkles, MessageCircle } from 'lucide-react';

const SplitScreenBanner = () => {
  const [activeTab, setActiveTab] = useState('prepare');
  
  const features = [
    { id: 'prepare', title: 'Prepare', icon: <MessageCircle className="w-5 h-5" /> },
    { id: 'practice', title: 'Practice', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'analyze', title: 'Analyze', icon: <BarChart className="w-5 h-5" /> }
  ];
  
  return (
    <section className="min-h-[80vh] flex flex-col md:flex-row">
      {/* Left panel - content */}
      <div className="w-full md:w-1/2 bg-white px-6 py-16 md:py-24 md:px-12 lg:px-16 xl:px-24 flex items-center">
        <div className="max-w-lg mx-auto md:mx-0">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
            AI-Powered Interview Coach
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            Land Your Dream Job With <span className="text-blue-600">Confidence</span>
          </h1>
          
          <p className="mt-6 text-xl text-gray-600">
            Our interview preparation platform uses advanced AI to simulate real interviews, provide instant feedback, and help you improve your chances of success.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link 
              href="/get-started" 
              className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors group"
            >
              Try for Free
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/pricing" 
              className="inline-flex items-center justify-center bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              View Plans
            </Link>
          </div>
          
          <div className="mt-12">
            <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-current text-yellow-400" />
                ))}
              </div>
              <span className="ml-2 text-gray-700 font-medium">4.9 out of 5</span>
            </div>
            
            <div className="flex flex-wrap gap-y-4 gap-x-8">
              {[
                'Realistic interview scenarios',
                'Personalized feedback',
                'Industry-specific questions'
              ].map((benefit) => (
                <div key={benefit} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Right panel - interactive demo */}
      <div className="w-full md:w-1/2 bg-gray-50 px-6 py-16 md:py-24 md:px-12 lg:px-16 xl:px-24 flex items-center">
        <div className="w-full max-w-lg mx-auto">
          {/* Feature tabs */}
          <div className="flex bg-white rounded-lg p-1 shadow-sm mb-8">
            {features.map((feature) => (
              <button
                key={feature.id}
                className={`flex items-center justify-center flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === feature.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(feature.id)}
              >
                {feature.icon}
                <span className="ml-2">{feature.title}</span>
              </button>
            ))}
          </div>
          
          {/* Interactive mockup */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* App header */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">AI</span>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">Interview Session</h3>
                  <p className="text-xs text-gray-500">Product Manager Role</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded">Live</span>
                <span className="text-sm text-gray-500">25:12</span>
              </div>
            </div>
            
            {/* Content based on active tab */}
            <div className="p-6">
              {activeTab === 'prepare' && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Interview Preparation</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-bold">1</span>
                      </div>
                      <p className="text-gray-700">Review common PM interview questions</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-bold">2</span>
                      </div>
                      <p className="text-gray-700">Practice the STAR method responses</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-bold">3</span>
                      </div>
                      <p className="text-gray-700">Research company values and products</p>
                    </div>
                  </div>
                  <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Start Preparation
                  </button>
                </div>
              )}
              
              {activeTab === 'practice' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Interviewer:</p>
                    <p className="text-sm text-gray-600">Tell me about a time when you had to prioritize features for a product with tight deadlines.</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-blue-700 mb-1">Your Response:</p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">At my previous company, we were launching a new mobile app with a tight 6-week timeline...</p>
                      <div className="h-2 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-2 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700">
                      Skip
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                      Submit Answer
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'analyze' && (
                <div className="space-y-5">
                  <h4 className="font-medium text-gray-900">Performance Analysis</h4>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Confidence</span>
                      <span className="text-xs font-medium text-gray-900">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Structure</span>
                      <span className="text-xs font-medium text-gray-900">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Technical Knowledge</span>
                      <span className="text-xs font-medium text-gray-900">65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm font-medium text-gray-800 mb-2">Key Recommendations:</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Include more specific metrics in your examples</li>
                      <li>• Improve technical terminology usage</li>
                      <li>• Great job using the STAR method consistently</li>
                    </ul>
                  </div>
                  
                  <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    View Full Analysis
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Testimonial */}
          <div className="mt-8 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">JD</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Jane Doe</p>
                <p className="text-xs text-gray-500">Product Manager at Tech Co.</p>
              </div>
              <div className="ml-auto flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-current text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              "This AI interview coach was instrumental in helping me land my dream job. The feedback was spot-on and helped me improve rapidly."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitScreenBanner;