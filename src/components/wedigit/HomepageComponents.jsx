"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  ChevronLeft,
  Monitor,
  Sparkles,
  MessageCircle,
  ChevronRight,
  Star,
  Users,
  BookOpen,
  ArrowRight,
  PlayCircle,
  Trophy,
  ThumbsUp,
  Clock,
  AlertCircle,
  Check,
  ArrowUpRight,
  Shield,
  Zap,
  PieChart,
  BarChart4,
  Settings,
  Briefcase,
} from "lucide-react";

// 1. Enhanced Features Section with Animation & Interaction
const FeaturesSection = () => {
  // Track which feature is being hovered for animation effects
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      icon: <Monitor className="h-6 w-6 text-indigo-600" />,
      title: "Real-time Feedback",
      description:
        "Get immediate insights on your responses, body language, and tone to improve on the spot.",
      color: "from-blue-50 to-indigo-50",
    },
    {
      icon: <PieChart className="h-6 w-6 text-violet-600" />,
      title: "Performance Analytics",
      description:
        "Track your progress with detailed metrics and visualize your improvement over time.",
      color: "from-violet-50 to-purple-50",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-amber-600" />,
      title: "AI-Powered Analysis",
      description:
        "Our AI analyzes your responses for clarity, relevance, and impact, helping you refine your answers.",
      color: "from-amber-50 to-yellow-50",
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-emerald-600" />,
      title: "Communication Coaching",
      description:
        "Improve your articulation, pacing, and non-verbal cues with targeted exercises.",
      color: "from-emerald-50 to-green-50",
    },
    {
      icon: <Users className="h-6 w-6 text-sky-600" />,
      title: "Mock Panel Interviews",
      description:
        "Practice with simulated panel interviews to prepare for complex interview scenarios.",
      color: "from-sky-50 to-blue-50",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-rose-600" />,
      title: "Industry-Specific Questions",
      description:
        "Practice with questions tailored to your industry, role level, and target companies.",
      color: "from-rose-50 to-pink-50",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-indigo-600 tracking-wide uppercase mb-2">
            Powerful Features
          </p>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Everything You Need to Succeed
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">
            Our comprehensive suite of tools is designed to transform your
            interview preparation experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 ${
                hoveredFeature === index
                  ? "transform -translate-y-2 shadow-xl"
                  : ""
              }`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <div className="p-8">
                <div
                  className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>

                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 2. Premium Testimonials Section with Video Testimonials
const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote:
        "After using this AI coach for just two weeks, I received three job offers – including one from my dream company that had rejected me twice before.",
      author: "Sarah Johnson",
      position: "Senior Software Engineer",
      company: "Hired at Google",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      videoThumbnail: "/api/placeholder/640/360",
    },
    {
      quote:
        "The industry-specific questions and personalized feedback completely transformed my interview performance. Worth every penny and more.",
      author: "Michael Torres",
      position: "Product Marketing Manager",
      company: "Hired at Microsoft",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      videoThumbnail: "/api/placeholder/640/360",
    },
    {
      quote:
        "As someone who struggled with interview anxiety, this platform gave me the confidence I needed. The practice scenarios felt so real that the actual interview was a breeze.",
      author: "Priya Kapoor",
      position: "UX Design Director",
      company: "Hired at Adobe",
      avatar: "/api/placeholder/80/80",
      rating: 5,
      videoThumbnail: "/api/placeholder/640/360",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-indigo-600 tracking-wide uppercase mb-2">
            Success Stories
          </p>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Hear From Our Users
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">
            Join thousands of professionals who have transformed their careers
            with our interview coaching
          </p>
        </div>

        <div className="lg:flex items-stretch gap-12">
          {/* Video thumbnail side */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-gray-900">
              <img
                src={testimonials[activeTestimonial].videoThumbnail}
                alt="Video testimonial"
                className="w-full h-full object-cover opacity-80"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all group">
                  <PlayCircle className="h-12 w-12 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
                <div className="flex items-center">
                  <img
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].author}
                    className="w-12 h-12 rounded-full border-2 border-white mr-4"
                  />
                  <div>
                    <p className="font-medium text-white">
                      {testimonials[activeTestimonial].author}
                    </p>
                    <p className="text-sm text-gray-300">
                      {testimonials[activeTestimonial].company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial text side */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100 relative">
              <div className="absolute top-8 right-8">
                <svg
                  width="64"
                  height="48"
                  viewBox="0 0 64 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6 48C10.2 48 6.53333 46.4 3.6 43.2C1.2 40 0 36.2667 0 32C0 23.4667 3.06667 16.2667 9.2 10.4C15.3333 4.53333 23.0667 1.06667 32.4 0H33.2C34.1333 0.266667 34.6 1.06667 34.6 2.4C34.6 3.73333 34.4 4.66667 34 5.2C28.4 6.93333 23.7333 9.73333 20 13.6C16.2667 17.4667 14.4 21.3333 14.4 25.2H15.2C17.8667 25.2 20.1333 26.1333 22 28C23.8667 29.8667 24.8 32.2667 24.8 35.2C24.8 38.1333 23.8667 40.5333 22 42.4C20.1333 46.1333 17.6 48 14.6 48ZM48.6 48C44.2 48 40.5333 46.4 37.6 43.2C35.2 40 34 36.2667 34 32C34 23.4667 37.0667 16.2667 43.2 10.4C49.3333 4.53333 57.0667 1.06667 66.4 0H67.2C68.1333 0.266667 68.6 1.06667 68.6 2.4C68.6 3.73333 68.4 4.66667 68 5.2C62.4 6.93333 57.7333 9.73333 54 13.6C50.2667 17.4667 48.4 21.3333 48.4 25.2H49.2C51.8667 25.2 54.1333 26.1333 56 28C57.8667 29.8667 58.8 32.2667 58.8 35.2C58.8 38.1333 57.8667 40.5333 56 42.4C54.1333 46.1333 51.6 48 48.6 48Z"
                    fill="#EBF4FF"
                  />
                </svg>
              </div>

              <div className="flex mb-6">
                {[...Array(testimonials[activeTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-amber-400 fill-current"
                    />
                  )
                )}
              </div>

              <p className="text-2xl font-medium text-gray-800 mb-8 relative z-10">
                "{testimonials[activeTestimonial].quote}"
              </p>

              <div className="border-t border-gray-100 pt-6 mt-4">
                <p className="font-semibold text-gray-900">
                  {testimonials[activeTestimonial].author}
                </p>
                <p className="text-gray-600">
                  {testimonials[activeTestimonial].position}
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeTestimonial === index
                      ? "bg-indigo-600 w-8"
                      : "bg-indigo-200 hover:bg-indigo-300"
                  }`}
                  aria-label={`Testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="/success-stories"
            className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Read more success stories
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const steps = [
    {
      step: "1",
      title: "Create Your Profile",
      description:
        "Tell us about your target roles, industries, and experience level. We'll tailor your practice sessions accordingly.",
      icon: <Settings className="h-6 w-6" />,
      color: "bg-indigo-600",
    },
    {
      step: "2",
      title: "Practice With AI",
      description:
        "Engage in realistic interview simulations with our adaptive AI coach that responds to your unique answers.",
      icon: <MessageCircle className="h-6 w-6" />,
      color: "bg-blue-600",
    },
    {
      step: "3",
      title: "Receive Detailed Feedback",
      description:
        "Get instant, actionable insights on your responses, body language, and communication style.",
      icon: <BarChart4 className="h-6 w-6" />,
      color: "bg-purple-600",
    },
    {
      step: "4",
      title: "Improve & Perfect",
      description:
        "Track your progress, focus on improvement areas, and practice until you feel confident and prepared.",
      icon: <ThumbsUp className="h-6 w-6" />,
      color: "bg-green-600",
    },
  ];

  // Handle navigation
  const goToNext = () =>
    setActiveStep((prev) => Math.min(steps.length - 1, prev + 1));
  const goToPrev = () => setActiveStep((prev) => Math.max(0, prev - 1));

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-white to-indigo-50">
      {/* Modern background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-100 rounded-full opacity-70 blur-3xl"></div>
        <div className="absolute top-1/2 -left-32 w-96 h-96 bg-blue-100 rounded-full opacity-70 blur-3xl"></div>
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-purple-100 rounded-full opacity-50 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How It <span className="text-indigo-600">Works</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Our streamlined approach prepares you for interviews with
            personalized practice and feedback.
          </p>
        </div>

        {/* Timeline process - Mobile */}
        {isMobile && (
          <div className="md:hidden">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <button
                    onClick={goToPrev}
                    disabled={activeStep === 0}
                    className={`p-2 rounded-full ${
                      activeStep === 0
                        ? "text-gray-300"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  <div className="flex space-x-2">
                    {steps.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          activeStep === idx
                            ? "bg-indigo-600 w-6"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={goToNext}
                    disabled={activeStep === steps.length - 1}
                    className={`p-2 rounded-full ${
                      activeStep === steps.length - 1
                        ? "text-gray-300"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>

                <div className="text-center mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${steps[activeStep].color} mb-4`}
                  >
                    <div className="text-white">{steps[activeStep].icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {steps[activeStep].title}
                  </h3>
                </div>

                <p className="text-gray-600 text-center mb-6">
                  {steps[activeStep].description}
                </p>

                <div className="flex justify-center">
                  <div className="inline-flex items-center text-sm font-medium text-gray-500">
                    Step {activeStep + 1} of {steps.length}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4">
                <a
                  href="/get-started"
                  className="flex items-center justify-center w-full rounded-lg bg-indigo-600 px-4 py-3 text-base font-medium text-white transition hover:bg-indigo-700 shadow-md"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Timeline process - Desktop */}
        {!isMobile && (
          <div className="hidden md:flex md:flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left side - Timeline visualization */}
            <div className="lg:w-1/2">
              <div className="relative">
                {/* Timeline connector lines */}
                <div className="absolute top-1/2 left-1/2 w-3/4 h-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-indigo-200"></div>

                {/* Timeline points */}
                <div className="relative w-full aspect-square max-w-lg mx-auto">
                  {steps.map((step, index) => {
                    // Calculate position on circle
                    const angle = ((index * 90 - 45) * Math.PI) / 180; // Starting from top-right
                    const radius = 42; // % of container
                    const x = 50 + radius * Math.cos(angle);
                    const y = 50 + radius * Math.sin(angle);

                    return (
                      <div
                        key={index}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${x}%`, top: `${y}%` }}
                      >
                        <button
                          onClick={() => setActiveStep(index)}
                          className={`group relative transition-all duration-500 ${
                            activeStep === index ? "scale-110" : "scale-100"
                          }`}
                        >
                          <div
                            className={`absolute inset-0 rounded-full ${step.color} opacity-20 group-hover:opacity-30 scale-150 blur-md transition-opacity`}
                          ></div>
                          <div
                            className={`
                            w-16 h-16 rounded-full flex items-center justify-center shadow-lg 
                            ${
                              activeStep === index
                                ? `${step.color} text-white ring-4 ring-white`
                                : "bg-white text-gray-600 border border-gray-100 hover:border-indigo-200"
                            } transition-all duration-300`}
                          >
                            {step.icon}
                          </div>

                          <div
                            className={`
                            absolute top-full mt-2 left-1/2 transform -translate-x-1/2 
                            whitespace-nowrap font-medium text-sm transition-all duration-300
                            ${
                              activeStep === index
                                ? "text-indigo-700"
                                : "text-gray-500"
                            }
                          `}
                          >
                            Step {index + 1}
                          </div>
                        </button>
                      </div>
                    );
                  })}

                  {/* Center element */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 aspect-square">
                    <div className="w-full h-full bg-white rounded-full shadow-xl p-4 border-4 border-white flex items-center justify-center overflow-hidden">
                      <img
                        src="/api/placeholder/200/200"
                        alt="Interview Preparation"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Step details */}
            <div className="lg:w-1/2 w-full max-w-lg">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transition-all duration-500 hover:shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full ${steps[activeStep].color} flex items-center justify-center text-white`}
                  >
                    {steps[activeStep].icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {steps[activeStep].title}
                  </h3>
                </div>

                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {steps[activeStep].description}
                </p>

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-1">
                    {steps.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={`w-8 h-2 rounded-full transition-all duration-300 ${
                          activeStep === idx ? steps[idx].color : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="text-sm font-medium text-gray-500">
                    Step {activeStep + 1} of {steps.length}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={goToPrev}
                    disabled={activeStep === 0}
                    className={`
                      flex items-center px-4 py-2 rounded-lg border transition-all
                      ${
                        activeStep === 0
                          ? "text-gray-300 border-gray-200 cursor-not-allowed"
                          : "text-gray-700 border-gray-300 hover:border-indigo-300 hover:text-indigo-600"
                      }
                    `}
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Previous
                  </button>

                  <button
                    onClick={goToNext}
                    disabled={activeStep === steps.length - 1}
                    className={`
                      flex items-center px-4 py-2 rounded-lg border transition-all
                      ${
                        activeStep === steps.length - 1
                          ? "text-gray-300 border-gray-200 cursor-not-allowed"
                          : "text-gray-700 border-gray-300 hover:border-indigo-300 hover:text-indigo-600"
                      }
                    `}
                  >
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>

                <div className="mt-8">
                  <a
                    href="/get-started"
                    className="inline-flex items-center justify-center w-full rounded-lg bg-indigo-600 px-6 py-4 text-lg font-medium text-white transition-all hover:bg-indigo-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// 4. Enhanced Statistics Section with Animated Counters
const StatisticsSection = () => {
  const [isCounting, setIsCounting] = useState(false);
  const [counts, setCounts] = useState({
    successRate: 0,
    interviews: 0,
    offerRates: 0,
    preparation: 0,
  });

  const targetCounts = {
    successRate: 94,
    interviews: 50,
    offerRates: 35,
    preparation: 3,
  };

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isCounting) {
          setIsCounting(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("stats-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [isCounting]);

  // Animation effect
  useEffect(() => {
    if (!isCounting) return;

    const duration = 2000; // 2 seconds for animation
    const frameRate = 30; // Frames per second
    const totalFrames = duration / (1000 / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      if (frame <= totalFrames) {
        setCounts({
          successRate: Math.floor(targetCounts.successRate * progress),
          interviews: Math.floor(targetCounts.interviews * progress),
          offerRates: Math.floor(targetCounts.offerRates * progress),
          preparation: Math.floor(
            1 + (targetCounts.preparation - 1) * progress
          ),
        });
      } else {
        setCounts(targetCounts);
        clearInterval(timer);
      }
    }, 1000 / frameRate);

    return () => clearInterval(timer);
  }, [isCounting]);

  return (
    <section id="stats-section" className="py-20 relative overflow-hidden">
      {/* Visual elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-indigo-800 to-blue-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_30%)]"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-indigo-200 tracking-wide uppercase mb-2">
            Proven Results
          </p>
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
            Our Impact in Numbers
          </h2>
          <div className="w-20 h-1 bg-indigo-400 mx-auto mb-6"></div>
          <p className="text-xl text-indigo-100">
            Join thousands of professionals who've transformed their careers
            with our platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {[
            {
              value: counts.successRate,
              suffix: "%",
              label: "Success Rate",
              icon: <Trophy className="h-8 w-8" />,
              description: "of our users land their target job",
            },
            {
              value: counts.interviews,
              suffix: "K+",
              label: "Interviews Practiced",
              icon: <MessageCircle className="h-8 w-8" />,
              description: "across 40+ industries worldwide",
            },
            {
              value: counts.offerRates,
              suffix: "%",
              label: "Higher Offer Rates",
              icon: <ThumbsUp className="h-8 w-8" />,
              description: "compared to traditional methods",
            },
            {
              value: counts.preparation,
              suffix: "X",
              label: "Faster Preparation",
              icon: <Clock className="h-8 w-8" />,
              description: "save weeks of interview prep time",
            },
          ].map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-2xl transform group-hover:scale-[1.03] transition-all duration-300 ease-out"></div>
              <div className="relative bg-indigo-800 rounded-2xl p-8 h-full border border-indigo-700 transform group-hover:translate-y-1 group-hover:translate-x-1 transition-all duration-300 ease-out">
                <div className="bg-indigo-700 bg-opacity-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white">
                  {stat.icon}
                </div>

                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-2xl font-medium text-indigo-200 ml-1">
                    {stat.suffix}
                  </span>
                </div>

                <p className="text-xl font-semibold text-white mt-2 mb-2">
                  {stat.label}
                </p>
                <p className="text-indigo-200">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="/case-studies"
            className="inline-flex items-center justify-center rounded-lg border-2 border-indigo-300 bg-transparent px-6 py-3 text-base font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-indigo-800"
          >
            View Detailed Case Studies
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

// 5. Pricing Section
const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      monthlyPrice: "$29",
      annualPrice: "$19",
      description: "Essential preparation for job seekers",
      features: [
        "10 AI interview sessions per month",
        "Basic performance analytics",
        "Standard question library",
        "Email support (24-hour response)",
        "Interview recording & playback",
      ],
      buttonText: "Start Free Trial",
      highlighted: false,
    },
    {
      name: "Professional",
      monthlyPrice: "$59",
      annualPrice: "$39",
      description: "Complete preparation for serious candidates",
      features: [
        "Unlimited AI interview sessions",
        "Advanced performance analytics",
        "Industry-specific question library",
        "Video interview capability",
        "Priority support (2-hour response)",
        "Expert-reviewed answer templates",
        "Company-specific preparation",
      ],
      buttonText: "Start 7-Day Free Trial",
      highlighted: true,
      badge: "Most Popular",
    },
    {
      name: "Enterprise",
      monthlyPrice: "$149",
      annualPrice: "$99",
      description: "For teams and recruitment agencies",
      features: [
        "All Professional features",
        "Up to 10 team members",
        "Custom question creation",
        "Candidate assessment tools",
        "Dedicated account manager",
        "White-label option",
        "API access for integrations",
      ],
      buttonText: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-indigo-600 tracking-wide uppercase mb-2">
            Simple Pricing
          </p>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Choose Your Plan
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 mb-10">
            Flexible options to suit your interview preparation needs
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center mb-10">
            <span
              className={`mr-4 text-base font-medium ${
                isAnnual ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Annual Billing
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Save 40%
              </span>
            </span>

            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isAnnual ? "bg-indigo-200" : "bg-indigo-600"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
                  isAnnual ? "translate-x-1" : "translate-x-9"
                }`}
              />
            </button>

            <span
              className={`ml-4 text-base font-medium ${
                !isAnnual ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Monthly Billing
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl shadow-lg border ${
                plan.highlighted
                  ? "border-indigo-600 shadow-indigo-100"
                  : "border-gray-100"
              } bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 mt-3 -mr-3">
                  <div className="inline-flex items-center bg-indigo-600 rounded-full px-4 py-1 shadow-lg">
                    <Star className="h-4 w-4 mr-1 text-yellow-300 fill-current" />
                    <p className="text-xs font-bold text-white">{plan.badge}</p>
                  </div>
                </div>
              )}

              <div
                className={`px-6 py-8 ${
                  plan.highlighted ? "bg-indigo-50" : ""
                }`}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="ml-2 text-base text-gray-500">/ month</span>
                </div>

                {isAnnual && (
                  <p className="text-sm text-indigo-600 font-medium mt-1">
                    Billed annually (
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice} × 12)
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 p-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-3 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-100 p-6">
                <a
                  href={`/signup?plan=${plan.name.toLowerCase()}`}
                  className={`w-full flex items-center justify-center rounded-lg px-5 py-3 text-base font-medium transition-colors ${
                    plan.highlighted
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      : "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  }`}
                >
                  {plan.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-indigo-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">
              100% Money-Back Guarantee
            </h3>
          </div>
          <p className="text-lg text-gray-600">
            If you're not completely satisfied with our platform within the
            first 30 days, we'll refund your payment in full — no questions
            asked.
          </p>
        </div>
      </div>
    </section>
  );
};

// 6. Call-to-Action Section with Animation
const CTASection = () => {
  return (
    <section className="py-20 bg-indigo-900 relative overflow-hidden">
      {/* Visual elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.2),transparent_30%)]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Ready to Transform Your Interview Success?
          </h2>
          <p className="text-xl text-indigo-100 mb-10">
            Join thousands of professionals who have boosted their confidence
            and landed their dream jobs with our AI interview coach.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-indigo-600 font-medium text-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700 transition-all"
            >
              Start Free Trial
              <Zap className="ml-2 h-5 w-5" />
            </a>

            <a
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-white text-white font-medium text-lg hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700 transition-all"
            >
              Watch Demo
              <PlayCircle className="ml-2 h-5 w-5" />
            </a>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-400 mr-2" />
              <p className="text-indigo-100">No credit card required</p>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-400 mr-2" />
              <p className="text-indigo-100">Cancel anytime</p>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-400 mr-2" />
              <p className="text-indigo-100">24/7 support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 7. FAQ Section with Accordion
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How does the AI interview coach work?",
      answer:
        "Our AI interview coach uses natural language processing and machine learning to create realistic interview scenarios. It analyzes your responses in real-time, evaluating factors like clarity, relevance, and confidence. After each practice session, you'll receive detailed feedback and actionable tips to improve your performance.",
    },
    {
      question: "Is this suitable for all career levels and industries?",
      answer:
        "Yes! Our platform is designed to accommodate professionals at all career stages, from entry-level to executive positions. We offer industry-specific question libraries for over 40 sectors including technology, finance, healthcare, marketing, and more. The AI adapts to your experience level and target role for personalized preparation.",
    },
    {
      question: "How does the subscription work?",
      answer:
        "Our subscription plans are flexible and designed to meet your needs. You can choose between monthly or annual billing, with the latter offering significant savings. All plans include a free trial period, and you can cancel anytime. Your subscription grants you immediate access to all features included in your chosen plan.",
    },
    {
      question: "Can I practice with video interviews?",
      answer:
        "Absolutely! Our Professional and Enterprise plans include video interview capability, allowing you to practice both verbal responses and non-verbal communication. The AI will analyze your body language, eye contact, and facial expressions, providing comprehensive feedback to help you make a strong impression.",
    },
    {
      question: "How accurate is the AI feedback?",
      answer:
        "Our AI has been trained on thousands of successful interviews and calibrated by professional recruiters and hiring managers. It evaluates your responses based on clarity, relevance, structure, and impact—the same criteria used by human interviewers. While no AI is perfect, our users report that the feedback closely matches what they later experience in real interviews.",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(224,231,255,0.6),transparent_30%)]"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 tracking-wide uppercase mb-2">
            Have Questions?
          </p>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">
            Everything you need to know about our AI interview coach
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "shadow-md border-indigo-200"
                  : "border-gray-200"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3
                  className={`text-lg font-medium ${
                    openIndex === index ? "text-indigo-600" : "text-gray-900"
                  }`}
                >
                  {faq.question}
                </h3>
                <ChevronRight
                  className={`h-5 w-5 transform transition-transform ${
                    openIndex === index
                      ? "rotate-90 text-indigo-600"
                      : "text-gray-400"
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 text-gray-600">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Contact our support team
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

// Main Component - You can import any of these sections into your homepage
const HomepageComponents = () => {
  return (
    <div>
      <FeaturesSection />
      <HowItWorksSection />
      <StatisticsSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default HomepageComponents;
