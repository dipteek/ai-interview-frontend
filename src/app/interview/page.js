'use client';
import { useState, useEffect } from 'react';
import InterviewQuestion from '@/components/InterviewQuestion';
import styles from '@/styles/Interview.module.css';

export default function InterviewPage() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const storedQuestions = localStorage.getItem('interviewQuestions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  if (!questions.length) return <div>Loading questions...</div>;

  return (
    <div className={styles.container}>
      {showResult ? (
        <div className={styles.result}>
          <h1>Interview Completed!</h1>
          <p>Your score: {score}/{questions.length}</p>
        </div>
      ) : (
        <InterviewQuestion 
          question={questions[currentIndex]} 
          onAnswer={handleAnswer}
          current={currentIndex + 1}
          total={questions.length}
        />
      )}
    </div>
  );
}