'use client'
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function IntervueHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideRef = useRef(null);
  const autoplayRef = useRef(null);
  
  // Testimonials data
  const testimonials = [
    {
      quote: "Intervue is a true game changer in the hiring space. As a hiring manager it makes my team very productive if I am not having to worry about using my team's interviewing bandwidth",
      company: "Yubi",
      logo: "Yubi"
    },
    {
      quote: "Intervue transformed our hiring process and saved our engineering team countless hours of interviewing time",
      company: "TechCorp",
      logo: "TechCorp"
    },
    {
      quote: "The quality of candidates we receive through Intervue has consistently exceeded our expectations",
      company: "DevInc",
      logo: "DevInc"
    },
    {
      quote: "Our time-to-hire metrics improved dramatically after implementing Intervue's solution",
      company: "CodeWorks",
      logo: "CodeWorks"
    }
  ];

  // Reset autoplay timer when slide changes
  const resetTimeout = () => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
    }
  };

  // Handle slide navigation
  const goToSlide = (index) => {
    resetTimeout();
    setActiveSlide(index);
  };

  const nextSlide = () => {
    resetTimeout();
    setActiveSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    resetTimeout();
    setActiveSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Auto-advance slides with smooth transitions
  useEffect(() => {
    resetTimeout();
    autoplayRef.current = setTimeout(() => {
      nextSlide();
    }, 6000);
    
    return () => {
      resetTimeout();
    };
  }, [activeSlide]);

  // Apply smooth transition when slide changes
  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.opacity = 0;
      slideRef.current.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        if (slideRef.current) {
          slideRef.current.style.opacity = 1;
          slideRef.current.style.transform = 'translateY(0)';
        }
      }, 50);
    }
  }, [activeSlide]);

  return (
    <div className="w-full py-12 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between">
          
          {/* Left Column */}
          <div className="w-full lg:w-1/2 pr-0 lg:pr-16">
            <h3 className="text-blue-600 text-lg font-semibold mb-4">Why Intervue?</h3>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-12">
              We simplify hiring<br />
              top-tier engineers.
            </h2>
            
            {/* Testimonial Quote with Smooth Transition */}
            <div className="relative mb-8">
              <div className="text-gray-200 text-8xl font-serif absolute -left-4 -top-12">"</div>
              <div 
                ref={slideRef} 
                className="relative transition-all duration-500 ease-in-out"
                style={{ opacity: 1, transform: 'translateY(0)' }}
              >
                <p className="text-lg md:text-xl text-gray-600 italic pl-8">
                  {testimonials[activeSlide].quote}
                </p>
              </div>
            </div>
            
            {/* Company Logo */}
            <div className="ml-8">
              <div className="h-12 flex items-center">
                <div className="font-bold text-2xl text-gray-800">
                  {testimonials[activeSlide].logo}
                </div>
              </div>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex items-center justify-start mt-8 ml-8 space-x-2">
              {/* Pagination Dots */}
              <div className="flex items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full mx-1 transition-all duration-300 ${
                      activeSlide === index 
                        ? 'w-12 bg-blue-600' 
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Arrow Controls */}
              <div className="hidden md:flex items-center ml-4 space-x-2">
                <button 
                  onClick={prevSlide}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative">
              {/* Main Image - Code Editor & Chat Interface with shadow and better styling */}
              <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform hover:scale-[1.01] duration-300">
                {/* Header bar styled to look like a code editor */}
                <div className="bg-gray-100 border-b border-gray-200 py-2 px-4 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="mx-auto bg-white rounded-md py-1 px-4 text-xs text-gray-600 flex items-center">
                    <span className="text-red-500">Find</span>
                    <span className="mx-1">code</span>
                  </div>
                </div>
                
                {/* Code editor content */}
                <div className="bg-gray-50 p-6 grid grid-cols-12 gap-4">
                  {/* Left section - code editor */}
                  <div className="col-span-7 bg-white shadow-sm rounded-md overflow-hidden border border-gray-200">
                    <div className="bg-gray-100 px-4 py-1 border-b border-gray-200 flex justify-between items-center">
                      <div className="flex text-xs text-gray-600 space-x-4">
                        <span>main.js</span>
                        <span>Components</span>
                        <span>Packages</span>
                      </div>
                      <span className="text-xs text-gray-600">JavaScript</span>
                    </div>
                    <div className="p-4 text-sm font-mono">
                      <div className="flex">
                        <span className="text-gray-400 w-6">1</span>
                        <span className="text-blue-600">function</span>
                        <span className="text-green-600 ml-1">calculateScore</span>
                        <span>(data) {`{`}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-400 w-6">2</span>
                        <span className="ml-4">
                          <span className="text-purple-600">return</span>
                          <span className="ml-1">data.map((d) =&gt; d.value)</span>
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-400 w-6">3</span>
                        <span>{`}`}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right section - chat */}
                  <div className="col-span-5 flex flex-col">
                    <div className="bg-blue-50 p-3 rounded-lg mb-2 text-xs text-blue-800">
                      It's natural to feel nervous!
                      Think of this as a conversation—we
                      just want to learn more about your
                      skills.
                    </div>
                    <div className="flex justify-end mb-4">
                      <div className="bg-green-500 p-3 rounded-lg text-xs text-white">
                        Thank you, that's reassuring to
                        hear!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Text Section Below Image */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Expert-led Interviews
                </h3>
                <p className="text-lg text-gray-600">
                  Gain access to a marketplace of vetted
                  professionals from top tech companies
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}