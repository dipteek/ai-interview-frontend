'use client';
import { useState } from 'react';
import styles from '@/styles/Interview.module.css';

export default function InterviewQuestion({ question, onAnswer, current, total }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = () => {
    onAnswer(selectedOption === question.correct_chose);
    setSelectedOption(null);
  };

  return (
    <div className={styles.questionCard}>
      <div className={styles.progress}>Question {current} of {total}</div>
      <h2>{question.question}</h2>
      
      <div className={styles.options}>
        {Object.entries(question.multiple_choice).map(([key, value]) => (
          <div 
            key={key}
            className={`${styles.option} ${selectedOption === key ? styles.selected : ''}`}
            onClick={() => setSelectedOption(key)}
          >
            <span className={styles.optionKey}>{key}:</span> {value}
          </div>
        ))}
      </div>
      
      <button 
        className={styles.nextButton}
        onClick={handleSubmit}
        disabled={!selectedOption}
      >
        {current === total ? 'Finish' : 'Next'}
      </button>
    </div>
  );
}