
const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Choose your interview type",
      description: "Select from technical, behavioral, or industry-specific interviews tailored to your needs."
    },
    {
      number: "02",
      title: "Practice with AI",
      description: "Answer realistic interview questions and receive instant AI feedback on your responses."
    },
    {
      number: "03",
      title: "Review & Improve",
      description: "Analyze your performance, learn from feedback, and track your progress over time."
    },
    {
      number: "04",
      title: "Ace your interview",
      description: "Enter your real interview with confidence, prepared for any question that comes your way."
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-indigo-100 text-indigo-800">
            Simple Process
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Our proven four-step process to help you land your dream job.
          </p>
        </div>

        <div className="mt-16">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-200 hidden md:block"></div>
            
            <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step number circle */}
                  <div className="flex justify-center">
                    <div className="flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-md border border-indigo-100 z-10">
                      <span className="text-3xl font-bold text-indigo-600">{step.number}</span>
                    </div>
                  </div>
                  {/* Step content */}
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection