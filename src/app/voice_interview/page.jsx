import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const jobRoles = [
    { id: 1, title: 'Frontend Developer', description: 'Specialize in user interfaces and client-side functionality' },
    { id: 2, title: 'Backend Developer', description: 'Focus on server-side logic and database operations' },
    { id: 3, title: 'Full Stack Developer', description: 'Work across both frontend and backend technologies' },
    { id: 4, title: 'DevOps Engineer', description: 'Manage infrastructure and deployment processes' },
    { id: 5, title: 'Data Scientist', description: 'Analyze and interpret complex data sets' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">
            Technical Interview Platform
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select your desired role to begin a tailored interview experience
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobRoles.map((role) => (
            <Link key={role.id} href={`/voice_interview/${role.id}`} passHref className="block">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{role.title}</h2>
                  <p className="text-gray-600 mb-4">{role.description}</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    Start Interview
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}