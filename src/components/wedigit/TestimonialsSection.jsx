'use client';

import { useState } from 'react';
import { FaQuoteLeft} from 'react-icons/fa';

const TestimonialsSection = () => {
    const testimonials = [
      {
        content: "This AI interview coach helped me land my dream job at a top tech company. The feedback was incredibly accurate and helped me improve my responses.",
        author: "Sarah Johnson",
        title: "Software Engineer",
        avatar: "/path/to/avatar1.jpg" // Replace with actual path
      },
      {
        content: "After practicing with this platform for just two weeks, I felt so much more confident in my actual interview. The AI caught weaknesses in my answers that I hadn't noticed.",
        author: "Michael Chen",
        title: "Marketing Manager",
        avatar: "/path/to/avatar2.jpg" // Replace with actual path
      },
      {
        content: "The industry-specific questions were spot on. I was asked almost the exact same questions in my real investment banking interview!",
        author: "Jessica Miller",
        title: "Financial Analyst",
        avatar: "/path/to/avatar3.jpg" // Replace with actual path
      }
    ];
  
    const [activeIndex, setActiveIndex] = useState(0);
  
    return (
      <div className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What our users are saying
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Join thousands of job seekers who have found success with our platform.
            </p>
          </div>
  
          <div className="mt-16">
            {/* Main testimonial */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
              {/* Decorative quote icon */}
              <div className="absolute top-6 left-6 text-indigo-400 opacity-20">
                <FaQuoteLeft className="h-16 w-16" />
              </div>
              
              {/* Testimonial content */}
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <blockquote>
                  <p className="text-xl md:text-2xl font-medium text-white">
                    "{testimonials[activeIndex].content}"
                  </p>
                  <footer className="mt-8">
                    <div className="flex items-center justify-center">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-indigo-300 flex items-center justify-center text-indigo-700 font-bold">
                          {testimonials[activeIndex].author.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4 text-left">
                        <div className="text-base font-medium text-white">{testimonials[activeIndex].author}</div>
                        <div className="text-sm text-indigo-200">{testimonials[activeIndex].title}</div>
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
  
            {/* Testimonial navigation */}
            <div className="mt-8 flex justify-center space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex ? "bg-indigo-600" : "bg-indigo-200"
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default TestimonialsSection