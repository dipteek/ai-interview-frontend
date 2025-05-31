'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function InterviewQuestionsPage() {
  const { resumeId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/resume/${resumeId}/questions`);
        if (!response.ok) throw new Error('Failed to fetch questions');
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [resumeId]);

  const filteredQuestions = questions.filter(q => {
    const matchesFilter = filter === 'all' || q.question_type.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch = q.question_text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (isLoading) return <div className="text-center py-8">Loading questions...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Personalized Interview Questions</h1>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="all">All Types</option>
          <option value="technical">Technical</option>
          <option value="behavioral">Behavioral</option>
          <option value="situational">Situational</option>
          <option value="industry">Industry-specific</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <div key={question.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full 
                  ${question.question_type === 'technical' ? 'bg-purple-100 text-purple-800' : 
                    question.question_type === 'behavioral' ? 'bg-blue-100 text-blue-800' :
                    question.question_type === 'situational' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'}`}>
                  {question.question_type}
                </span>
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full 
                  ${question.difficulty === 'easy' ? 'bg-green-100 text-green-800' : 
                    question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}>
                  {question.difficulty}
                </span>
              </div>
              <p className="text-lg">{question.question_text}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No questions match your filters
          </div>
        )}
      </div>
    </div>
  );
}