'use client';

import Link from 'next/link';
import { FaArrowRight, FaPlayCircle } from 'react-icons/fa';

const HomeBanner = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-20">
          {/* Banner Content Container */}
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Side Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
                <span className="block">Ace Your Next</span>
                <span className="block text-indigo-600">Interview</span>
                <span className="block">With AI</span>
              </h1>
              
              <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
                Prepare for your job interviews with our AI-powered interview coach. Get real-time feedback and improve your chances of landing your dream job.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link 
                  href="/interview" 
                  className="px-8 py-4 bg-indigo-600 text-white text-base font-medium rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center transition-all"
                >
                  Get Started
                  <FaArrowRight className="ml-2 h-4 w-4" />
                </Link>
                
                <Link 
                  href="/demo" 
                  className="px-8 py-4 bg-white text-indigo-600 text-base font-medium rounded-md shadow-md hover:bg-gray-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center transition-all"
                >
                  <FaPlayCircle className="mr-2 h-4 w-4" />
                  Watch Demo
                </Link>
              </div>
              
              <div className="mt-8 flex items-center justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 border-white ${
                        ['bg-indigo-500', 'bg-pink-500', 'bg-yellow-500', 'bg-green-500'][i-1]
                      } flex items-center justify-center`}
                    >
                      <span className="text-xs font-bold text-white">{i}</span>
                    </div>
                  ))}
                </div>
                <p className="ml-4 text-sm text-gray-700">
                  <span className="font-medium text-indigo-600">4.9/5</span> from over 2,000 reviews
                </p>
              </div>
            </div>
            
            {/* Right Side Banner Image */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute -top-6 -right-6 w-64 h-64 bg-indigo-100 rounded-full opacity-50 blur-xl"></div>
                <div className="absolute bottom-10 -left-10 w-40 h-40 bg-pink-100 rounded-full opacity-50 blur-xl"></div>
                
                {/* Main image container with border and shadow */}
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="aspect-w-16 aspect-h-9 sm:aspect-w-4 sm:aspect-h-3">
                    {/* Image placeholder - replace with your actual image */}
                    <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center p-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 w-full max-w-md">
                        <div className="space-y-4">
                          <div className="h-8 bg-white/20 rounded-md"></div>
                          <div className="h-24 bg-white/20 rounded-md"></div>
                          <div className="flex space-x-2">
                            <div className="h-10 w-20 bg-indigo-500 rounded-md"></div>
                            <div className="h-10 w-20 bg-white/20 rounded-md"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Optional: Caption or annotation */}
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 font-bold">AI</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Real-time feedback</p>
                        <p className="text-xs text-gray-500">Powered by advanced AI</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decoration elements */}
                <div className="absolute top-1/4 -right-10 w-20 h-20 bg-yellow-100 rounded-full transform -rotate-12 hidden sm:block"></div>
                <div className="absolute bottom-1/3 -left-12 w-24 h-24 bg-indigo-50 rounded-lg transform rotate-12 hidden sm:block"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider - fixed to prevent overflow */}
      <div className="absolute bottom-0 left-0 right-0 w-full line-height-0">
        <svg 
          className="w-full h-auto text-white"
          height="54"
          preserveAspectRatio="none"
          viewBox="0 0 1440 54"
          fill="currentColor" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0 27L48 24.3C96 21.7 192 16.3 288 13.5C384 10.7 480 10.3 576 16.2C672 22 768 34 864 37.8C960 41.7 1056 37.3 1152 29.7C1248 22 1344 11 1392 5.5L1440 0V54H1392C1344 54 1248 54 1152 54C1056 54 960 54 864 54C768 54 672 54 576 54C480 54 384 54 288 54C192 54 96 54 48 54H0V27Z" 
          />
        </svg>
      </div>
    </div>
  );
};

export default HomeBanner;