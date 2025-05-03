'use client';

import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const ProductsSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-blue-600 font-medium mb-4">Our products</h2>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <h3 className="text-4xl font-bold text-gray-900 max-w-lg mb-6 md:mb-0">
              Comprehensive support for your entire hiring process
            </h3>
            <p className="text-lg text-gray-700 max-w-lg">
              Intervue combines human expertise with technology to 
              seamlessly integrate into your process, adding value at every 
              stage of the hiring funnel.
            </p>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI Screen Card */}
          <div className="bg-gray-900 rounded-3xl p-6 relative overflow-hidden">
            {/* Dotted line decoration */}
            <div className="absolute -left-16 top-1/2 w-32 h-1">
              <svg width="100%" height="100%" viewBox="0 0 100 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 1H100" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4"/>
              </svg>
            </div>
            
            {/* Content */}
            <div className="space-y-4 mb-28">
              {/* Profile 1 */}
              <div className="flex items-center bg-gray-800 rounded-xl p-3">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <div className="w-full h-full bg-gray-700 rounded-full flex items-center justify-center">
                    <img 
                      src="/api/placeholder/48/48" 
                      alt="Alenzo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium">Alenzo</h4>
                  <p className="text-gray-400 text-sm">Senior Software Developer</p>
                </div>
              </div>
              
              {/* Profile 2 */}
              <div className="flex items-center bg-gray-800 rounded-xl p-3">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <div className="w-full h-full bg-gray-700 rounded-full flex items-center justify-center">
                    <img 
                      src="/api/placeholder/48/48" 
                      alt="Xian" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium">Xian</h4>
                  <p className="text-gray-400 text-sm">Senior Software Developer</p>
                </div>
              </div>
              
              {/* Profile 3 */}
              <div className="flex items-center bg-gray-800 rounded-xl p-3">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <div className="w-full h-full bg-gray-700 rounded-full flex items-center justify-center">
                    <img 
                      src="/api/placeholder/48/48" 
                      alt="Mia" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium">Mia</h4>
                  <p className="text-gray-400 text-sm">Senior Software Developer</p>
                </div>
              </div>
            </div>
            
            {/* Card Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white text-2xl font-bold mb-2">AI screen</h3>
              <p className="text-gray-300 mb-4">AI-Based Candidate Screening: Hygiene and Technical Checks</p>
              <div className="flex justify-end">
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <FiArrowRight className="text-gray-900" />
                </button>
              </div>
            </div>
          </div>

          {/* Interview as a service Card */}
          <div className="bg-blue-100 rounded-3xl p-6 relative overflow-hidden">
            {/* Dotted line decorations */}
            <div className="absolute -left-16 top-1/2 w-32 h-1">
              <svg width="100%" height="100%" viewBox="0 0 100 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 1H100" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4"/>
              </svg>
            </div>
            <div className="absolute -right-16 top-1/2 w-32 h-1">
              <svg width="100%" height="100%" viewBox="0 0 100 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 1H100" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4"/>
              </svg>
            </div>
            
            {/* Dots pattern */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
              <div className="w-32 h-32 absolute top-0 right-0">
                <div className="w-full h-full relative">
                  {[...Array(36)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-blue-300"
                      style={{
                        top: `${Math.floor(i / 6) * 20}%`,
                        left: `${(i % 6) * 20}%`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-4 mb-28">
              {/* Video call window 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-6 bg-gray-200 flex items-center">
                  <div className="ml-2 flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="h-32 bg-gray-100 flex items-center justify-center">
                  <img 
                    src="/api/placeholder/120/100" 
                    alt="Woman in interview" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              
              {/* Video call window 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md ml-12">
                <div className="h-6 bg-gray-200 flex items-center">
                  <div className="ml-2 flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="h-32 bg-gray-100 flex items-center justify-center">
                  <img 
                    src="/api/placeholder/120/100" 
                    alt="Man in interview" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Card Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-gray-900 text-2xl font-bold mb-2">Interview as a service</h3>
              <p className="text-gray-700 mb-4">Save 80% time on initial rounds and speed up hiring.</p>
              <div className="flex justify-end">
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                  <FiArrowRight className="text-gray-900" />
                </button>
              </div>
            </div>
          </div>

          {/* Insights Card */}
          <div className="bg-white rounded-3xl p-6 relative overflow-hidden shadow-md">
            {/* Dotted line decoration */}
            <div className="absolute -right-16 top-1/2 w-32 h-1">
              <svg width="100%" height="100%" viewBox="0 0 100 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 1H100" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4"/>
              </svg>
            </div>
            
            {/* Content */}
            <div className="space-y-4 mb-28">
              {/* Profile with text */}
              <div className="flex space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src="/api/placeholder/48/48" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
              
              {/* Progress bars */}
              <div className="space-y-4">
                <div className="h-4 bg-blue-600 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
              </div>
              
              {/* Chart */}
              <div className="h-32 mt-8">
                <svg viewBox="0 0 300 100" width="100%" height="100%">
                  {/* First line (blue) */}
                  <polyline
                    points="0,70 50,80 100,30 150,60 200,20 250,50 300,10"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                  />
                  {/* Blue dots */}
                  <circle cx="0" cy="70" r="4" fill="#3B82F6" />
                  <circle cx="50" cy="80" r="4" fill="#3B82F6" />
                  <circle cx="100" cy="30" r="4" fill="#3B82F6" />
                  <circle cx="150" cy="60" r="4" fill="#3B82F6" />
                  <circle cx="200" cy="20" r="4" fill="#3B82F6" />
                  <circle cx="250" cy="50" r="4" fill="#3B82F6" />
                  <circle cx="300" cy="10" r="4" fill="#3B82F6" />
                  
                  {/* Second line (light blue) */}
                  <polyline
                    points="0,50 50,40 100,60 150,50 200,70 250,30 300,20"
                    fill="none"
                    stroke="#93C5FD"
                    strokeWidth="2"
                  />
                  {/* Light blue dots */}
                  <circle cx="0" cy="50" r="3" fill="#93C5FD" />
                  <circle cx="50" cy="40" r="3" fill="#93C5FD" />
                  <circle cx="100" cy="60" r="3" fill="#93C5FD" />
                  <circle cx="150" cy="50" r="3" fill="#93C5FD" />
                  <circle cx="200" cy="70" r="3" fill="#93C5FD" />
                  <circle cx="250" cy="30" r="3" fill="#93C5FD" />
                  <circle cx="300" cy="20" r="3" fill="#93C5FD" />
                </svg>
              </div>
            </div>
            
            {/* Card Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-gray-900 text-2xl font-bold mb-2">Insights</h3>
              <p className="text-gray-700 mb-4">Get Insights to Improve and optimise sourcing</p>
              <div className="flex justify-end">
                <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <FiArrowRight className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;