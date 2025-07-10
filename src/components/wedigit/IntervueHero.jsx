'use client'
import { useState, useEffect, useRef } from 'react';
//import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
    Code2,
    Brain,
    Zap,
    BarChart3,
    Trophy,
    Smartphone,
    ChevronRight,
    Play,
    CheckCircle,
    TrendingUp,
    Users,
    Sparkles,
    Monitor,
    Database,
    Cloud,
    Github,
    ArrowRight,
    Star,
    Clock,
    Target,
    Award,
    Flame,
    Calendar,
    PieChart,
    Activity,
    MessageCircle
} from 'lucide-react';
import Link from 'next/link';


export default function IntervueHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideRef = useRef(null);
  const autoplayRef = useRef(null);
  
  // Testimonials data
  const testimonials = [
    {
      quote: "AI Interview is a true game changer in the hiring space. As a hiring manager it makes my team very productive if I am not having to worry about using my team's interviewing bandwidth",
      company: "Yubi",
      logo: "Yubi"
    },
    {
      quote: "AI Interview transformed our hiring process and saved our engineering team countless hours of interviewing time",
      company: "TechCorp",
      logo: "TechCorp"
    },
    {
      quote: "The quality of candidates we receive through AI Interview has consistently exceeded our expectations",
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


  const CodeEditor = () => (
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
            <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>main.py</span>
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Python</span>
                </div>
            </div>
            <div className="p-4 font-mono text-sm">
                <div className="flex items-center space-x-4 mb-2">
                    <span className="text-gray-500 w-6">1</span>
                    <span className="text-purple-400">def</span>
                    <span className="text-blue-400">temperature_swing</span>
                    <span className="text-white">(temps):</span>
                </div>
                <div className="flex items-center space-x-4 mb-2">
                    <span className="text-gray-500 w-6">2</span>
                    <span className="text-white ml-8">max_swing = 0</span>
                </div>
                <div className="flex items-center space-x-4 mb-2">
                    <span className="text-gray-500 w-6">3</span>
                    <span className="text-purple-400 ml-8">for</span>
                    <span className="text-white">i in range(len(temps) - 1):</span>
                </div>
                <div className="flex items-center space-x-4 mb-2">
                    <span className="text-gray-500 w-6">4</span>
                    <span className="text-white ml-16">swing = abs(temps[i+1] - temps[i])</span>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-500 w-6">5</span>
                    <span className="text-white ml-16">max_swing = max(max_swing, swing)</span>
                </div>
            </div>
        </div>
    );

    const AnalyticsChart = () => (
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <h4 className="text-white font-semibold mb-4">Progress Analytics</h4>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Easy Problems</span>
                    <div className="w-32 bg-gray-800 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Medium Problems</span>
                    <div className="w-32 bg-gray-800 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Hard Problems</span>
                    <div className="w-32 bg-gray-800 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                    <span className="text-white font-semibold">7-Day Streak</span>
                    <div className="flex items-center space-x-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="text-orange-500 font-bold">7</span>
                    </div>
                </div>
            </div>
        </div>
    );


  return (
    <div className="w-full py-12 md:py-24  overflow-hidden">
      <div className="py-20 inset-0 bg-gradient-to-tr from-indigo-900 via-indigo-800 to-blue-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl text-white font-bold mb-6">Coding Platform</h2>
                            <p className="text-xl text-gray-400 mb-8">
                                See how our AI-powered platform transforms coding interview preparation with
                                real-time feedback and comprehensive analytics.
                            </p>
                            <div className="space-y-4 text-white">
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <span>AI-generated unique problems</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <span>Real-time code execution</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <span>Detailed performance analytics</span>
                                </div>
                            </div>
                            <br />
                            <Link href='/coding' >
                                <button className="bg-gradient-to-r text-white from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                                    <Play className="w-5 h-5" />
                                    <span>Start Coding</span>
                                </button>
                            </Link>
                        </div>
                        <div className="space-y-6">
                            <CodeEditor />
                            <AnalyticsChart />
                        </div>
                    </div>
                </div>
            </div>
    </div>
  );
}