// import Link from 'next/link';
// import { ArrowRight } from 'lucide-react';

// export default function Home() {
//   const jobRoles = [
//     { id: 1, title: 'Frontend Developer', description: 'Specialize in user interfaces and client-side functionality' },
//     { id: 2, title: 'Backend Developer', description: 'Focus on server-side logic and database operations' },
//     { id: 3, title: 'Full Stack Developer', description: 'Work across both frontend and backend technologies' },
//     { id: 4, title: 'DevOps Engineer', description: 'Manage infrastructure and deployment processes' },
//     { id: 5, title: 'Data Scientist', description: 'Analyze and interpret complex data sets' },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto mt-16">
//         <div className="text-center mb-12">
//           <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">
//             Technical Interview Platform
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Select your desired role to begin a tailored interview experience
//           </p>
//         </div>
        
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {jobRoles.map((role) => (
//             <Link key={role.id} href={`/voice_interview/${role.id}`} passHref className="block">
//               <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
//                 <div className="p-6">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-2">{role.title}</h2>
//                   <p className="text-gray-600 mb-4">{role.description}</p>
//                   <div className="flex items-center text-blue-600 font-medium">
//                     Start Interview
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
        
//         {/* <div className="mt-12 text-center">
//           <p className="text-gray-500 text-sm">
//             © {new Date().getFullYear()} Your Company. All rights reserved.
//           </p>
//         </div> */}
//       </div>
//     </div>
//   );
// }






'use client'

import Link from 'next/link';
import { ArrowRight, Code, Database, Globe, Server, BarChart3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Icon mapping
const iconComponents = {
  Globe,
  Server,
  Code,
  Database,
  BarChart3,
  // Add more icons as needed
};

export default function Home() {
  const [jobRoles, setJobRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);

  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/careers/api/job-roles/');
        setJobRoles(response.data.job_roles);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobRoles();
  }, []);

  // Extract all unique domains for filtering
  const allDomains = [];
  jobRoles.forEach(role => {
    role.domains.forEach(domain => {
      if (!allDomains.some(d => d.id === domain.id)) {
        allDomains.push(domain);
      }
    });
  });

  // Filter job roles by selected domain
  const filteredJobRoles = selectedDomain 
    ? jobRoles.filter(role => role.domains.some(d => d.id === selectedDomain))
    : jobRoles;

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-8 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto mt-16">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Technical Interview Platform
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose your career path and embark on a personalized interview journey designed to test your skills and knowledge
            </p>
          </div>

          {/* Domain Filter */}
          {allDomains.length > 0 && (
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedDomain(null)}
                className={`px-4 py-2 rounded-full ${!selectedDomain ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} shadow-sm hover:shadow-md transition-all`}
              >
                All Domains
              </button>
              {allDomains.map(domain => (
                <button
                  key={domain.id}
                  onClick={() => setSelectedDomain(domain.id)}
                  className={`px-4 py-2 rounded-full ${selectedDomain === domain.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} shadow-sm hover:shadow-md transition-all`}
                >
                  {domain.name}
                </button>
              ))}
            </div>
          )}
          
          {/* Job Roles Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {filteredJobRoles.map((role) => {
              const IconComponent = iconComponents[role.icon] || Code;
              return (
                <Link key={role.id} href={`/voice_interview/${role.id}`} passHref className="block group">
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50 group-hover:scale-105 group-hover:-translate-y-2">
                    {/* Gradient background overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    <div className="relative p-8">
                      {/* Icon */}
                      <div className={`inline-flex items-center justify-center w-14 h-14 ${role.bgColor} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`w-7 h-7 ${role.iconColor}`} />
                      </div>
                      
                      {/* Content */}
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                        {role.title}
                      </h2>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {role.description}
                      </p>

                      {/* Domains */}
                      {role.domains.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {role.domains.map(domain => (
                            <span key={domain.id} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                              {domain.name}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* CTA */}
                      <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                        <span className="mr-2">Start Interview</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    {/* Bottom accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${role.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                  </div>
                </Link>
              );
            })}
          </div>
          
          {/* Features Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Why Choose Our Platform?</h3>
              <p className="text-gray-600">Experience the future of technical interviews</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Role-Specific Questions</h4>
                <p className="text-sm text-gray-600">Tailored questions based on your chosen career path</p>
              </div>
              
              <div className="text-center p-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl mb-4">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Real-time Feedback</h4>
                <p className="text-sm text-gray-600">Get instant insights on your performance</p>
              </div>
              
              <div className="text-center p-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Progress Tracking</h4>
                <p className="text-sm text-gray-600">Monitor your improvement over time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}












// import Link from 'next/link';
// import { ArrowRight, Code, Database, Globe, Server, BarChart3 } from 'lucide-react';

// export default function Home() {
//   const jobRoles = [
//     { 
//       id: 1, 
//       title: 'Frontend Developer', 
//       description: 'Specialize in user interfaces and client-side functionality',
//       icon: Globe,
//       color: 'from-blue-500 to-cyan-500',
//       bgColor: 'bg-blue-50',
//       iconColor: 'text-blue-600'
//     },
//     { 
//       id: 2, 
//       title: 'Backend Developer', 
//       description: 'Focus on server-side logic and database operations',
//       icon: Server,
//       color: 'from-green-500 to-emerald-500',
//       bgColor: 'bg-green-50',
//       iconColor: 'text-green-600'
//     },
//     { 
//       id: 3, 
//       title: 'Full Stack Developer', 
//       description: 'Work across both frontend and backend technologies',
//       icon: Code,
//       color: 'from-purple-500 to-violet-500',
//       bgColor: 'bg-purple-50',
//       iconColor: 'text-purple-600'
//     },
//     { 
//       id: 4, 
//       title: 'DevOps Engineer', 
//       description: 'Manage infrastructure and deployment processes',
//       icon: Database,
//       color: 'from-orange-500 to-red-500',
//       bgColor: 'bg-orange-50',
//       iconColor: 'text-orange-600'
//     },
//     { 
//       id: 5, 
//       title: 'Data Scientist', 
//       description: 'Analyze and interpret complex data sets',
//       icon: BarChart3,
//       color: 'from-pink-500 to-rose-500',
//       bgColor: 'bg-pink-50',
//       iconColor: 'text-pink-600'
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       {/* Background decorative elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-4 -right-8 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
//       </div>
      
//       <div className="relative py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto mt-16">
//           {/* Header Section */}
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
//               <Code className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//               Technical Interview Platform
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//               Choose your career path and embark on a personalized interview journey designed to test your skills and knowledge
//             </p>
//           </div>
          
//           {/* Job Roles Grid */}
//           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
//             {jobRoles.map((role) => {
//               const IconComponent = role.icon;
//               return (
//                 <Link key={role.id} href={`/voice_interview/${role.id}`} passHref className="block group">
//                   <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50 group-hover:scale-105 group-hover:-translate-y-2">
//                     {/* Gradient background overlay */}
//                     <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
//                     <div className="relative p-8">
//                       {/* Icon */}
//                       <div className={`inline-flex items-center justify-center w-14 h-14 ${role.bgColor} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
//                         <IconComponent className={`w-7 h-7 ${role.iconColor}`} />
//                       </div>
                      
//                       {/* Content */}
//                       <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
//                         {role.title}
//                       </h2>
//                       <p className="text-gray-600 mb-6 leading-relaxed">
//                         {role.description}
//                       </p>
                      
//                       {/* CTA */}
//                       <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
//                         <span className="mr-2">Start Interview</span>
//                         <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//                       </div>
//                     </div>
                    
//                     {/* Bottom accent line */}
//                     <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${role.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
          
//           {/* Features Section */}
//           <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg">
//             <div className="text-center mb-8">
//               <h3 className="text-2xl font-bold text-gray-900 mb-2">Why Choose Our Platform?</h3>
//               <p className="text-gray-600">Experience the future of technical interviews</p>
//             </div>
            
//             <div className="grid md:grid-cols-3 gap-6">
//               <div className="text-center p-4">
//                 <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-4">
//                   <Globe className="w-6 h-6 text-white" />
//                 </div>
//                 <h4 className="font-semibold text-gray-900 mb-2">Role-Specific Questions</h4>
//                 <p className="text-sm text-gray-600">Tailored questions based on your chosen career path</p>
//               </div>
              
//               <div className="text-center p-4">
//                 <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl mb-4">
//                   <Code className="w-6 h-6 text-white" />
//                 </div>
//                 <h4 className="font-semibold text-gray-900 mb-2">Real-time Feedback</h4>
//                 <p className="text-sm text-gray-600">Get instant insights on your performance</p>
//               </div>
              
//               <div className="text-center p-4">
//                 <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mb-4">
//                   <BarChart3 className="w-6 h-6 text-white" />
//                 </div>
//                 <h4 className="font-semibold text-gray-900 mb-2">Progress Tracking</h4>
//                 <p className="text-sm text-gray-600">Monitor your improvement over time</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }