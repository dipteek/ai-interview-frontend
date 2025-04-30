"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, ChevronRight, Clock, Search, AlertCircle } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [jobRoles, setJobRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/job-roles/');
        if (!response.ok) {
          throw new Error('Failed to fetch job roles');
        }
        const data = await response.json();
        setJobRoles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobRoles();
  }, []);

  const handleCardClick = (jobId) => {
    router.push(`/interview/${jobId}`);
  };

  const filteredJobs = jobRoles.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
      {/* Hero Section */}
      <div className=" text-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Interview Preparation Portal
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl text-gray-500 sm:text-2xl md:mt-5 md:max-w-3xl">
              Select a job role to start your personalized interview practice
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="relative mb-8 max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search job roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-700 rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-medium text-gray-700">Loading available positions...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Error: {error}. Please refresh the page or try again later.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Positions</h2>
            
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No job roles match your search criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredJobs.map((job) => (
                  <div 
                    key={job.id}
                    onClick={() => handleCardClick(job.id)}
                    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg border border-gray-100 hover:border-blue-200"
                  >
                    <div className="p-1">
                      <div className="bg-blue-50 p-4 rounded-t-lg">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Briefcase className="h-6 w-6 text-blue-700" />
                          </div>
                          <h3 className="ml-3 text-xl font-bold text-gray-900">{job.title}</h3>
                        </div>
                      </div>
                    
                      <div className="p-5">
                        <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{job.experience} experience</span>
                        </div>
                        
                        <div className="flex justify-end">
                          <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Start Interview
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
    </div>
  );
}