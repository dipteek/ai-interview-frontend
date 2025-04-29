'use client';
import { useState } from 'react';
import styles from '@/styles/Home.module.css';

export default function TechStackSelector({ onTechStackChange }) {
  const availableTechStacks = [
    'React', 'Next.js', 'JavaScript', 'TypeScript', 'Node.js',
    'Django', 'Python', 'Flask', 'MongoDB', 'PostgreSQL',
    'AWS', 'Docker', 'Kubernetes', 'TensorFlow', 'PyTorch'
  ];

  const [selectedTech, setSelectedTech] = useState([]);

  const toggleTech = (tech) => {
    const newTech = selectedTech.includes(tech)
      ? selectedTech.filter(t => t !== tech)
      : [...selectedTech, tech];
    
    setSelectedTech(newTech);
    onTechStackChange(newTech);
  };

  return (
    <div className={styles.techStackContainer}>
      {availableTechStacks.map(tech => (
        <button
          key={tech}
          className={`${styles.techButton} ${selectedTech.includes(tech) ? styles.selected : ''}`}
          onClick={() => toggleTech(tech)}
        >
          {tech}
        </button>
      ))}
    </div>
  );
}