'use client'
import React, { useState, useEffect } from 'react';
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

// import { getSession } from 'next-auth/react';

// const session = await getSession();
// const token = session?.djangoToken || session?.accessToken;  // <-- this is your Bearer token

// console.log("Bearer Token:", token);


export default function AICodingPlatform() {
    const [activeTab, setActiveTab] = useState('overview');
    const [animatedElements, setAnimatedElements] = useState({});
    const [currentFeature, setCurrentFeature] = useState(0);

    const features = [
        {
            icon: <Brain className="w-12 h-12 text-blue-400" />,
            title: "AI-Powered Problem Generation",
            description: "Gemini AI creates unlimited unique coding problems tailored to your skill level and preferences.",
            highlight: "Unlimited Problems"
        },
        {
            icon: <Code2 className="w-12 h-12 text-green-400" />,
            title: "Advanced Code Editor",
            description: "Multi-language support with syntax highlighting, auto-completion, and customizable themes.",
            highlight: "Multi-Language"
        },
        {
            icon: <Zap className="w-12 h-12 text-yellow-400" />,
            title: "Real-time Execution",
            description: "Secure sandboxed environment with instant feedback and performance metrics.",
            highlight: "Instant Feedback"
        },
        {
            icon: <BarChart3 className="w-12 h-12 text-purple-400" />,
            title: "Comprehensive Analytics",
            description: "Deep insights into your coding patterns with beautiful visualizations and progress tracking.",
            highlight: "Data-Driven"
        }
    ];

    const techStack = {
        backend: [
            { name: "Django 4.x", desc: "Web Framework" },
            { name: "PostgreSQL", desc: "Database" },
            { name: "Redis", desc: "Caching" },
            { name: "Celery", desc: "Background Tasks" },
            { name: "Docker", desc: "Containerization" },
            { name: "Gemini AI", desc: "Problem Generation" }
        ],
        frontend: [
            { name: "Next.js 14", desc: "React Framework" },
            { name: "Tailwind CSS", desc: "Styling" },
            { name: "CodeMirror", desc: "Code Editor" },
            { name: "Recharts", desc: "Data Visualization" },
            { name: "NextAuth.js", desc: "Authentication" },
            { name: "Axios", desc: "HTTP Client" }
        ]
    };

    const stats = [
        { value: "50+", label: "Billion Market", icon: <Target className="w-6 h-6" /> },
        { value: "1000+", label: "Problems Generated", icon: <Brain className="w-6 h-6" /> },
        { value: "99.9%", label: "Uptime", icon: <Activity className="w-6 h-6" /> },
        { value: "< 100ms", label: "Response Time", icon: <Zap className="w-6 h-6" /> }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeature(prev => (prev + 1) % features.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const UserJourney = () => (
        <div className="space-y-6">
            {[
                { step: "01", title: "Registration/Login", desc: "Secure authentication with session management" },
                { step: "02", title: "Dashboard", desc: "Overview of progress, streaks, and quick actions" },
                { step: "03", title: "Problem Generation", desc: "AI creates custom problems based on preferences" },
                { step: "04", title: "Code Writing", desc: "Multi-language editor with syntax highlighting" },
                { step: "05", title: "Testing", desc: "Real-time code execution with detailed feedback" },
                { step: "06", title: "Submission", desc: "Save solution and update progress tracking" },
                { step: "07", title: "Analytics", desc: "Review performance trends and improvement areas" }
            ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {item.step}
                    </div>
                    <div className="flex-1 pb-4">
                        <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                            {item.title}
                        </h4>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );

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
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-teal-600/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Brain className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                AI Interview Platform
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            Master Coding
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                                {" "}Interviews
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                            AI-powered coding interview platform with unlimited problems, real-time feedback,
                            and comprehensive analytics to help you land your dream job.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link href='/coding' >
                                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                                    <Play className="w-5 h-5" />
                                    <span>Start Coding</span>
                                </button>
                            </Link>


                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-16 bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Core Features</h2>
                        <p className="text-xl text-gray-400">Everything you need to ace your coding interviews</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-blue-500 transition-all duration-300 group">
                                <div className="mb-4 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold inline-block">
                                    {feature.highlight}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Demo Section */}
            <div className="py-20 bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Experience the Platform</h2>
                            <p className="text-xl text-gray-400 mb-8">
                                See how our AI-powered platform transforms coding interview preparation with
                                real-time feedback and comprehensive analytics.
                            </p>
                            <div className="space-y-4">
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
                        </div>
                        <div className="space-y-6">
                            <CodeEditor />
                            <AnalyticsChart />
                        </div>
                    </div>
                </div>
            </div>







            {/* User Journey Section */}
            {/* Interactive Demo Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl p-8 border border-blue-500/20">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
                            <p className="text-gray-400 text-lg">Join thousands of developers who've mastered coding interviews with our AI platform</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                                <Play className="w-5 h-5" />
                                <span>Start Free Trial</span>
                            </button>
                            <button className="border border-gray-600 hover:border-gray-500 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center space-x-2">
                                <MessageCircle className="w-5 h-5" />
                                <span>Schedule Demo</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <div className="py-12 bg-gray-900 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Brain className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xl font-bold">AI Interview Platform</span>
                        </div>
                        <div className="flex items-center space-x-6 text-gray-400">
                            <span>© 2024 AI Interview Platform</span>
                            <div className="flex items-center space-x-4">
                                <Github className="w-5 h-5 hover:text-white cursor-pointer" />
                                <Cloud className="w-5 h-5 hover:text-white cursor-pointer" />
                                <Star className="w-5 h-5 hover:text-white cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}