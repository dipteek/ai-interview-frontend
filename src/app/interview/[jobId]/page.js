"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Briefcase, Clock, AlertCircle, ChevronLeft, Check, X, Code, Loader2 } from 'lucide-react';

export default function InterviewDetails() {
  const { jobId } = useParams();
  const router = useRouter();
  const [experience, setExperience] = useState('');
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [error, setError] = useState(null);
  const [availableTechStacks, setAvailableTechStacks] = useState([]);
  
  // Experience options for dropdown
  const experienceOptions = [
    { value: '', label: 'Select your experience level' },
    { value: 'Entry Level (0-1 years)', label: 'Entry Level (0-1 years)' },
    { value: 'Junior (1-3 years)', label: 'Junior (1-3 years)' },
    { value: 'Mid-Level (3-5 years)', label: 'Mid-Level (3-5 years)' },
    { value: 'Senior (5-8 years)', label: 'Senior (5-8 years)' },
    { value: 'Lead/Expert (8+ years)', label: 'Lead/Expert (8+ years)' }
  ];

  // Extract tech stacks from description
  const extractTechStacks = (description) => {
    if (!description) return [];
    // Split by commas and trim whitespace
    return description.split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
  };

  // Fetch job details from Django backend
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/job-roles/${jobId}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        const data = await response.json();
        
        // Extract tech stacks from description
        const techStacksFromDescription = extractTechStacks(data.description);
        
        setJob({
          ...data,
          tech_stack: techStacksFromDescription
        });
        
        // Set available and selected tech stacks
        setAvailableTechStacks(techStacksFromDescription);
        setSelectedTechStacks(techStacksFromDescription);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingJob(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleTechStackToggle = (tech) => {
    setSelectedTechStacks(prev => 
      prev.includes(tech) 
        ? prev.filter(item => item !== tech) 
        : [...prev, tech]
    );
  };

  const handleStartInterview = async () => {
    setIsLoading(true);
    
    try {
      const interviewData = {
        position: job.title,
        description: job.description,
        experience: experience,
        techStack: selectedTechStacks
      };

      const response = await fetch('http://127.0.0.1:8000/api/generate-questions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(interviewData)
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      localStorage.setItem('interviewQuestions', JSON.stringify(data.questions));
      router.push(`/interview/${jobId}/quiz`);
    } catch (error) {
      console.error('Error generating questions:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    router.push('/');
  };

  if (loadingJob) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-700 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="flex items-center justify-center text-red-500 mb-4">
            <AlertCircle className="h-12 w-12" />
          </div>
          <h2 className="text-xl font-bold text-center mb-2">Error Loading Job</h2>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <button 
            onClick={goBack}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Return to Job Listings
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold text-center mb-4">Job Not Found</h2>
          <p className="text-gray-600 text-center mb-6">The requested job role could not be found.</p>
          <button 
            onClick={goBack}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Return to Job Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
      {/* Header */}
      <div className="bg-blue-700 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="flex items-center">
            <button 
              onClick={goBack}
              className="mr-4 p-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold">{job.title}</h1>
              <p className="text-blue-100 mt-1">Interview Preparation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Job Information */}
          <div className="border-b border-gray-200 bg-blue-50 p-6">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Briefcase className="h-8 w-8 text-blue-700" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{job.experience || "Experience level required"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {/* Job Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Required Skills & Description</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
              </div>
            </div>
            
            {/* Experience Dropdown */}
            <div className="mb-8">
              <label htmlFor="experience" className="block text-lg font-semibold text-gray-800 mb-3">
                Your Years of Experience
              </label>
              <div className="relative">
                <select
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 appearance-none bg-white"
                  required
                >
                  {experienceOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              {!experience && (
                <p className="mt-2 text-sm text-gray-500">
                  Please select your experience level to continue
                </p>
              )}
            </div>
            
            {/* Tech Stack Selection */}
            <div className="mb-8">
              <div className="flex items-center mb-3">
                <Code className="h-5 w-5 text-blue-600 mr-2" />
                <label className="text-lg font-semibold text-gray-800">
                  Select Tech Stacks to Focus On
                </label>
              </div>
              <div className="flex flex-wrap gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                {availableTechStacks.length > 0 ? (
                  availableTechStacks.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => handleTechStackToggle(tech)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
                        selectedTechStacks.includes(tech)
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {selectedTechStacks.includes(tech) ? (
                        <Check className="h-4 w-4 mr-1" />
                      ) : (
                        <span className="w-4 mr-1"></span>
                      )}
                      {tech}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No tech stacks identified</p>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {selectedTechStacks.length} of {availableTechStacks.length} technologies selected
              </p>
            </div>
            
            {/* Start Button */}
            <button
              onClick={handleStartInterview}
              disabled={isLoading || !experience}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-md ${
                isLoading || !experience ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Generating Questions...
                </span>
              ) : (
                'Start Interview Preparation'
              )}
            </button>
          </div>
        </div>
        
        {/* Instructions Panel */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">About Your Interview Preparation</h3>
          <p className="text-blue-700 mb-4">
            We'll generate personalized interview questions based on your selected job role, 
            experience level, and tech stack preferences. The interview will help you prepare 
            for real-world scenarios.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Questions tailored to your experience level</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Focus on your selected technologies</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Practice with real industry-standard questions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}