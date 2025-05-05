'use client';

import { 
  FaArrowRight, 
  FaPlayCircle, 
  FaCheckCircle, 
  FaLaptop, 
  FaBrain, 
  FaChartLine,
  FaQuoteLeft,
  FaLinkedin,
  FaTwitter
} from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaLaptop className="h-8 w-8 text-indigo-500" />,
      title: "Practice Anywhere",
      description: "Practice from any device, anytime. Our platform works seamlessly across desktop, tablet, and mobile."
    },
    {
      icon: <FaBrain className="h-8 w-8 text-indigo-500" />,
      title: "AI-Powered Feedback",
      description: "Receive instant, personalized feedback on your answers from our advanced AI that learns your style."
    },
    {
      icon: <FaChartLine className="h-8 w-8 text-indigo-500" />,
      title: "Track Progress",
      description: "Monitor your improvement over time with detailed analytics and performance insights."
    }
  ];

  return (
    <div className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Features designed for interview success
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Everything you need to prepare, practice, and perform in your next job interview.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="relative p-8 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-xl">
                    {feature.icon}
                  </div>
                </div>
                <div className="pt-4 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mt-4">{feature.title}</h3>
                  <p className="mt-4 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection