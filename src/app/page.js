// app/page.js
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [jobRoles, setJobRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading job roles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Job Role Based Interview
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobRoles.map((job) => (
            <div 
              key={job.id}
              onClick={() => handleCardClick(job.id)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {job.experience} experience
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}