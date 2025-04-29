// app/interview/[jobId]/page.js
"use client";
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const techStacks = [
  "React", "Next.js", "JavaScript", "TypeScript", 
  "Python", "Django", "Node.js", "Express",
  "MongoDB", "PostgreSQL", "AWS", "Docker",
  "Kubernetes", "CI/CD", "REST APIs", "GraphQL"
];

const jobDetails = {
  1: {
    title: "Frontend Developer",
    description: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces and implementing features using React and Next.js.",
    experience: "2+ years",
    techStack: ["React", "Next.js", "JavaScript", "TypeScript"]
  },
  2: {
    title: "Backend Developer",
    description: "Join our backend team to develop robust APIs and server-side logic using Python and Django.",
    experience: "3+ years",
    techStack: ["Python", "Django", "Node.js", "APIs"]
  },
  3: {
    title: "Full Stack Developer",
    description: "We need a Full Stack Developer proficient in both frontend and backend technologies to build complete web applications.",
    experience: "4+ years",
    techStack: ["React", "Node.js", "MongoDB", "Express"]
  },
  4: {
    title: "DevOps Engineer",
    description: "Looking for a DevOps Engineer to implement CI/CD pipelines and manage our cloud infrastructure.",
    experience: "3+ years",
    techStack: ["AWS", "Docker", "Kubernetes", "CI/CD"]
  }
};

export default function InterviewDetails() {
  const { jobId } = useParams();
  const router = useRouter();
  const [experience, setExperience] = useState('');
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const job = jobDetails[jobId] || jobDetails[1];

  const handleTechStackToggle = (tech) => {
    if (selectedTechStacks.includes(tech)) {
      setSelectedTechStacks(selectedTechStacks.filter(item => item !== tech));
    } else {
      setSelectedTechStacks([...selectedTechStacks, tech]);
    }
  };

  const handleStartInterview = async () => {
    setIsLoading(true);
    
    try {
      // Prepare data to send to backend
      const interviewData = {
        position: job.title,
        description: job.description,
        experience: experience,
        techStack: selectedTechStacks.length > 0 ? selectedTechStacks : job.techStack
      };

      // Call Django backend to generate questions
      const response = await fetch('http://127.0.0.1:8000/api/generate-questions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(interviewData)
      });

      const questions = await response.json();
      
      // Store questions and navigate to quiz page
      localStorage.setItem('interviewQuestions', JSON.stringify(questions.questions));
      router.push(`/interview/${jobId}/quiz`);
    } catch (error) {
      console.error('Error generating questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{job.title} Interview</h1>
          <p className="text-gray-600 mb-6">{job.description}</p>
          
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
              placeholder="Enter your years of experience"
            />
          </div>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Tech Stacks (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {techStacks.map((tech) => (
                <button
                  key={tech}
                  onClick={() => handleTechStackToggle(tech)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTechStacks.includes(tech) || job.techStack.includes(tech)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
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