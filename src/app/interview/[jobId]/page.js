// app/interview/[jobId]/page.js
"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

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

  if (loadingJob) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  if (!job) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Job not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{job.title} Interview</h1>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Skills
            </label>
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-gray-600">{job.description}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
              Your Years of Experience
            </label>
            <input
              type="text"
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. 3+ years"
              required
            />
          </div>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Tech Stacks to Focus On
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTechStacks.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => handleTechStackToggle(tech)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTechStacks.includes(tech)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleStartInterview}
            disabled={isLoading || !experience}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors ${
              isLoading || !experience ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Generating Questions...' : 'Start Interview'}
          </button>
        </div>
      </div>
    </div>
  );
}