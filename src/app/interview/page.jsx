"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, ChevronRight, Clock, Search, AlertCircle, ArrowRight, ArrowLeft, Building } from 'lucide-react';

export default function Interview() {
  const router = useRouter();
  const [itJobRoles, setITJobRoles] = useState([]);
  const [bankJobRoles, setBankJobRoles] = useState([]);
  const [loadingIT, setLoadingIT] = useState(true);
  const [loadingBank, setLoadingBank] = useState(true);
  const [errorIT, setErrorIT] = useState(null);
  const [errorBank, setErrorBank] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllITJobs, setShowAllITJobs] = useState(false);
  const [showAllBankJobs, setShowAllBankJobs] = useState(false);
  const itScrollContainerRef = useRef(null);
  const bankScrollContainerRef = useRef(null);
  
  useEffect(() => {
    const fetchITJobRoles = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/job-roles-category-it/', {
          // Add proper headers and credentials
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          // Add with credentials if you need authentication
          // credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch IT job roles: ${response.status}`);
        }
        
        const data = await response.json();
        setITJobRoles(data);
      } catch (err) {
        console.error("Error fetching IT roles:", err);
        setErrorIT(err.message);
      } finally {
        setLoadingIT(false);
      }
    };

    const fetchBankJobRoles = async () => {
      try {
        // Fix: Add trailing slash to maintain consistency with IT endpoint
        const response = await fetch('http://127.0.0.1:8000/api/job-roles-category-bank/', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          // Add with credentials if you need authentication
          // credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch banking job roles: ${response.status}`);
        }
        
        const data = await response.json();
        setBankJobRoles(data);
      } catch (err) {
        console.error("Error fetching banking roles:", err);
        setErrorBank(err.message);
        
        // Fallback data for demonstration if API fails
        if (process.env.NODE_ENV === 'development') {
          console.log("Using fallback banking job data for development");
          setBankJobRoles([
            {
              id: 'b1',
              title: 'Financial Analyst',
              description: 'Analyze financial data and provide insights to improve business decisions.',
              experience: '2-4 years'
            },
            {
              id: 'b2',
              title: 'Investment Banker',
              description: 'Help clients raise capital and provide financial advisory services.',
              experience: '3-5 years'
            },
            {
              id: 'b3',
              title: 'Credit Analyst',
              description: 'Evaluate credit applications and determine creditworthiness of applicants.',
              experience: '1-3 years'
            }
          ]);
        }
      } finally {
        setLoadingBank(false);
      }
    };

    fetchITJobRoles();
    fetchBankJobRoles();
  }, []);

  const handleCardClick = (jobId, category) => {
    // ${category}/
    router.push(`/interview/${jobId}`);
  };

  const filteredITJobs = itJobRoles.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredBankJobs = bankJobRoles.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Limit horizontal scroll to maximum 6 cards
  const limitedITJobs = filteredITJobs.slice(0, 6);
  const limitedBankJobs = filteredBankJobs.slice(0, 6);

  const scroll = (direction, containerRef) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const renderJobCards = (jobs, isHorizontal = true) => {
    return jobs.map((job) => (
      <div 
        key={job.id}
        onClick={() => handleCardClick(job.id, jobs === filteredITJobs || jobs === limitedITJobs ? 'it' : 'bank')}
        className={`${isHorizontal ? 'flex-shrink-0 w-72 snap-start' : ''} bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg border border-gray-100 hover:border-blue-200`}
      >
        <div className="p-1">
          <div className="bg-blue-50 p-4 rounded-t-lg">
            <div className="flex items-center">
              <div className={`${jobs === filteredITJobs || jobs === limitedITJobs ? 'bg-blue-100' : 'bg-green-100'} p-2 rounded-lg`}>
                {jobs === filteredITJobs || jobs === limitedITJobs ? 
                  <Briefcase className="h-6 w-6 text-blue-700" /> : 
                  <Building className="h-6 w-6 text-green-700" />
                }
              </div>
              <h3 className="ml-3 text-xl font-bold text-gray-900 truncate">{job.title}</h3>
            </div>
          </div>
        
          <div className="p-5">
            <p className="text-gray-600 mb-4 line-clamp-3">{job.description || 'No description available'}</p>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Clock className="h-4 w-4 mr-1" />
              <span>{job.experience || 'Experience not specified'}</span>
            </div>
            
            <div className="flex justify-end">
              <button
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${jobs === filteredITJobs || jobs === limitedITJobs ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 ${jobs === filteredITJobs || jobs === limitedITJobs ? 'focus:ring-blue-500' : 'focus:ring-green-500'}`}
              >
                Start Interview
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const renderErrorWithRetry = (error, category, retryFunction) => (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
      <div className="flex flex-col">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Error loading {category} positions: {error}
            </p>
          </div>
        </div>
        <div className="mt-3 ml-8">
          <button 
            onClick={retryFunction}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
      {/* Hero Section */}
      <div className="text-gray-700 py-12">
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

        {/* IT Jobs Section */}
        <div className="mb-12">
          {loadingIT ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-blue-400 border-t-blue-700 rounded-full animate-spin"></div>
              <p className="mt-4 text-lg font-medium text-gray-700">Loading IT positions...</p>
            </div>
          ) : errorIT ? (
            renderErrorWithRetry(errorIT, "IT", () => {
              setLoadingIT(true);
              setErrorIT(null);
              fetchITJobRoles();
            })
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">IT Positions</h2>
                {filteredITJobs.length > 6 && !showAllITJobs && (
                  <button 
                    onClick={() => setShowAllITJobs(true)}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    View All ({filteredITJobs.length}) <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                )}
                {showAllITJobs && (
                  <button 
                    onClick={() => setShowAllITJobs(false)}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Show Less <ArrowRight className="h-4 w-4 ml-1 transform rotate-180" />
                  </button>
                )}
              </div>
              
              {filteredITJobs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-lg text-gray-600">No IT job roles match your search criteria.</p>
                </div>
              ) : !showAllITJobs ? (
                <div className="relative">
                  {limitedITJobs.length > 3 && (
                    <button 
                      onClick={() => scroll('left', itScrollContainerRef)} 
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
                    >
                      <ArrowLeft className="h-5 w-5 text-gray-700" />
                    </button>
                  )}
                  
                  <div 
                    ref={itScrollContainerRef}
                    className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {renderJobCards(limitedITJobs)}
                  </div>
                  
                  {limitedITJobs.length > 3 && (
                    <button 
                      onClick={() => scroll('right', itScrollContainerRef)} 
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
                    >
                      <ArrowRight className="h-5 w-5 text-gray-700" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {renderJobCards(filteredITJobs, false)}
                </div>
              )}
            </>
          )}
        </div>

        {/* Banking Jobs Section */}
        <div>
          {loadingBank ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-green-400 border-t-green-700 rounded-full animate-spin"></div>
              <p className="mt-4 text-lg font-medium text-gray-700">Loading banking positions...</p>
            </div>
          ) : errorBank ? (
            renderErrorWithRetry(errorBank, "banking", () => {
              setLoadingBank(true);
              setErrorBank(null);
              fetchBankJobRoles();
            })
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Banking Positions</h2>
                {filteredBankJobs.length > 6 && !showAllBankJobs && (
                  <button 
                    onClick={() => setShowAllBankJobs(true)}
                    className="flex items-center text-green-600 hover:text-green-800 transition-colors"
                  >
                    View All ({filteredBankJobs.length}) <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                )}
                {showAllBankJobs && (
                  <button 
                    onClick={() => setShowAllBankJobs(false)}
                    className="flex items-center text-green-600 hover:text-green-800 transition-colors"
                  >
                    Show Less <ArrowRight className="h-4 w-4 ml-1 transform rotate-180" />
                  </button>
                )}
              </div>
              
              {filteredBankJobs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-lg text-gray-600">No banking job roles match your search criteria.</p>
                </div>
              ) : !showAllBankJobs ? (
                <div className="relative">
                  {limitedBankJobs.length > 3 && (
                    <button 
                      onClick={() => scroll('left', bankScrollContainerRef)} 
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
                    >
                      <ArrowLeft className="h-5 w-5 text-gray-700" />
                    </button>
                  )}
                  
                  <div 
                    ref={bankScrollContainerRef}
                    className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {renderJobCards(limitedBankJobs)}
                  </div>
                  
                  {limitedBankJobs.length > 3 && (
                    <button 
                      onClick={() => scroll('right', bankScrollContainerRef)} 
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
                    >
                      <ArrowRight className="h-5 w-5 text-gray-700" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {renderJobCards(filteredBankJobs, false)}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Missing fetchITJobRoles function declaration for the retry button
function fetchITJobRoles() {
  // Implementation will be handled within the component's useEffect
  window.location.reload();
}

// Missing fetchBankJobRoles function declaration for the retry button
function fetchBankJobRoles() {
  // Implementation will be handled within the component's useEffect
  window.location.reload();
}