'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, PlayCircle, Check, User, Calendar, Settings } from 'lucide-react';

const GradientHeroBanner = () => {
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-violet-800 to-purple-900 text-white -mt-2">
      {/* Abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 rounded-full bg-indigo-600 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 rounded-full bg-purple-600 opacity-10 blur-3xl"></div>
      </div>
      
      {/* Main content container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-sm font-medium text-indigo-200">New: Advanced AI Interview Analytics</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Interview <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">Smarter</span>, Land Your Dream Job
            </h1>
            
            <p className="text-lg text-indigo-100 max-w-xl mx-auto lg:mx-0">
              Our AI-powered coach provides personalized interview training with industry-specific questions and detailed feedback to help you succeed.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link 
                href="/interview"
                className="group px-6 py-3 text-base font-medium rounded-lg bg-white text-indigo-900 hover:bg-indigo-50 transition-all shadow-lg shadow-indigo-900/20 flex items-center"
              >
                Start Free Session
                <ChevronRight className="ml-2 h-5 w-5 group-hover:animate-pulse" />
              </Link>
              
              <Link 
                href="/demo"
                className="group px-6 py-3 text-base font-medium rounded-lg border border-indigo-400/30 hover:bg-white/10 transition-all flex items-center"
                onMouseEnter={() => setIsVideoHovered(true)}
                onMouseLeave={() => setIsVideoHovered(false)}
              >
                <PlayCircle className={`mr-2 h-5 w-5 transition-transform duration-300 ${isVideoHovered ? 'scale-125' : ''}`} />
                See How It Works
              </Link>
            </div>
            
            {/* Social proof */}
            <div className="pt-6">
              <p className="text-indigo-200 text-sm mb-3">Trusted by job seekers from leading companies</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                {['Google', 'Amazon', 'Microsoft', 'Apple'].map((company) => (
                  <div key={company} className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-white/20 mr-2 flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm font-medium">{company}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right content - Interactive UI */}
          <div className="relative">
            {/* Glass card effect */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden">
              {/* App header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Senior Developer Interview</h3>
                    <p className="text-xs text-indigo-200">Technical Assessment</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-md hover:bg-white/10">
                    <Calendar className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-md hover:bg-white/10">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Interview simulation */}
              <div className="p-6 space-y-4">
                <div className="bg-indigo-800/40 rounded-lg p-4">
                  <p className="text-sm font-medium mb-1">Interviewer Question:</p>
                  <p className="text-sm">Explain how you would design a scalable microservice architecture for a high-traffic e-commerce platform.</p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                  <p className="text-sm font-medium mb-1">Your Response:</p>
                  <div className="space-y-2">
                    <p className="text-sm">I would start by identifying core domains like product catalog, user accounts, and order processing...</p>
                    <div className="h-4 w-3/4 bg-white/20 rounded animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-white/20 rounded animate-pulse"></div>
                  </div>
                </div>
                
                {/* Feedback section */}
                <div className="bg-gradient-to-r from-emerald-800/30 to-cyan-800/30 rounded-lg p-4">
                  <p className="text-sm font-medium mb-2">Real-time Analysis:</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Technical Accuracy</span>
                      <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full w-4/5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Communication Clarity</span>
                      <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full w-3/5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">Problem Solving</span>
                      <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full w-4/5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom action bar */}
              <div className="px-6 py-4 border-t border-white/10 flex justify-between">
                <button className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-sm font-medium">
                  Skip Question
                </button>
                <button className="px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-indigo-500 text-sm font-medium">
                  Submit Answer
                </button>
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg py-2 px-4 shadow-lg shadow-orange-900/20">
              <p className="text-xs font-bold">AI Feedback Engine</p>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg py-2 px-4 shadow-lg shadow-blue-900/20">
              <p className="text-xs font-bold">4.9/5 Rating</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full text-white" viewBox="0 0 1440 140" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,128L40,117.3C80,107,160,85,240,90.7C320,96,400,128,480,128C560,128,640,96,720,80C800,64,880,64,960,80C1040,96,1120,128,1200,128C1280,128,1360,96,1400,80L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default GradientHeroBanner;