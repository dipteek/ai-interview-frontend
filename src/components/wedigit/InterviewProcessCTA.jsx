import { ArrowRight } from "lucide-react";

export default function InterviewProcessCTA() {
  return (
    <div className="w-full bg-white py-24">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Ready to streamline <span className="text-gray-800">your interview process?</span>
        </h2>
        
        {/* Subheading */}
        <p className="text-xl text-gray-600 mb-12">
          Discover how our interview-as-a-service can transform your recruitment strategy
        </p>
        
        {/* CTA Button */}
        <div className="flex justify-center">
          <a 
            href="/interview" 
            className="px-8 py-4 bg-indigo-600 text-white text-base font-medium rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center transition-all"
          >
            Get Started
            
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}