
'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Typewriter from 'typewriter-effect';

import styles from "@/styles/interview.module.css";

export default function InterviewPage({ params }) {
  const [experience, setExperience] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const router = useRouter();

  const jobRoles = {
    1: 'Frontend Developer',
    2: 'Backend Developer',
    3: 'Full Stack Developer',
    4: 'DevOps Engineer',
    5: 'Data Scientist',
  };

  const availableTechStacks = {
    1: ['React', 'Angular', 'Vue', 'JavaScript', 'TypeScript', 'HTML/CSS'],
    2: ['Node.js', 'Python', 'Java', 'C#', 'Ruby', 'PHP'],
    3: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker'],
    4: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    5: ['Python', 'R', 'TensorFlow', 'PyTorch', 'Pandas', 'SQL'],
  };

  const generateQuestions = async () => {
    if (!experience || techStack.length === 0) {
      alert('Please enter your experience and select at least one tech stack');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/voice/generate-questions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          position: jobRoles[params.id],
          experience: experience,
          techStack: techStack,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      setQuestions(data.questions);
      speakQuestion(data.questions[0].question);
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Failed to generate questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const speakQuestion = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      synthRef.current.speak(utterance);
    }
  };

  const startRecording = () => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = transcript;
        setUserAnswers(updatedAnswers);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current.start();
    } else {
      alert('Speech recognition not supported in your browser');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      speakQuestion(questions[currentQuestionIndex + 1].question);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const analyzeAnswers = async () => {
    if (userAnswers.length !== questions.length) {
      alert('Please answer all questions before submitting');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/voice/analyze-answers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questions: questions,
          userAnswers: userAnswers,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze answers');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error('Error analyzing answers:', error);
      alert('Failed to analyze answers. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {questions.length === 0 ? (
        <div className={styles.setupContainer}>
          <h1>{jobRoles[params.id]} Interview</h1>
          <div className={styles.formGroup}>
            <label>Years of Experience:</label>
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              min="0"
              max="30"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Tech Stack:</label>
            <div className={styles.techStackContainer}>
              {availableTechStacks[params.id].map((tech) => (
                <div key={tech} className={styles.techStackItem}>
                  <input
                    type="checkbox"
                    id={tech}
                    checked={techStack.includes(tech)}
                    onChange={() => {
                      if (techStack.includes(tech)) {
                        setTechStack(techStack.filter((t) => t !== tech));
                      } else {
                        setTechStack([...techStack, tech]);
                      }
                    }}
                  />
                  <label htmlFor={tech}>{tech}</label>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={generateQuestions}
            disabled={isLoading}
            className={styles.generateButton}
          >
            {isLoading ? 'Generating...' : 'Generate Interview Questions'}
          </button>
        </div>
      ) : analysis ? (
        <div className={styles.analysisContainer}>
          <h1>Interview Analysis</h1>
          <div className={styles.score}>
            <h2>Overall Score: {analysis.overallScore}/10</h2>
          </div>
          <div className={styles.detailedAnalysis}>
            {analysis.detailedAnalysis.map((item, index) => (
              <div key={index} className={styles.analysisItem}>
                <h3>Question {index + 1}</h3>
                <p><strong>Question:</strong> {item.question}</p>
                <p><strong>Your Answer:</strong> {item.userAnswer}</p>
                <p><strong>Expected Answer:</strong> {item.expectedAnswer}</p>
                <p><strong>Score:</strong> {item.score}/10</p>
                <p><strong>Feedback:</strong> {item.feedback}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => router.push('/')}
            className={styles.homeButton}
          >
            Back to Home
          </button>
        </div>
      ) : (
        <div className={styles.questionContainer}>
          <div className={styles.questionHeader}>
            <h1>Question {currentQuestionIndex + 1} of {questions.length}</h1>
          </div>
          <div className={styles.questionText}>
            <Typewriter
              options={{
                strings: [questions[currentQuestionIndex].question],
                autoStart: true,
                delay: 20,
              }}
            />
          </div>
          <div className={styles.answerContainer}>
            <h3>Your Answer:</h3>
            <textarea
              value={userAnswers[currentQuestionIndex] || ''}
              onChange={(e) => {
                const updatedAnswers = [...userAnswers];
                updatedAnswers[currentQuestionIndex] = e.target.value;
                setUserAnswers(updatedAnswers);
              }}
              placeholder="Speak or type your answer here..."
            />
            <div className={styles.recordingControls}>
              {isRecording ? (
                <button onClick={stopRecording} className={styles.stopButton}>
                  Stop Recording
                </button>
              ) : (
                <button onClick={startRecording} className={styles.recordButton}>
                  Record Answer
                </button>
              )}
              <button
                onClick={() => speakQuestion(questions[currentQuestionIndex].question)}
                className={styles.speakButton}
              >
                Repeat Question
              </button>
            </div>
          </div>
          <div className={styles.navigationButtons}>
            <button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className={styles.prevButton}
            >
              Previous
            </button>
            {currentQuestionIndex < questions.length - 1 ? (
              <button onClick={nextQuestion} className={styles.nextButton}>
                Next
              </button>
            ) : (
              <button
                onClick={analyzeAnswers}
                disabled={isLoading}
                className={styles.submitButton}
              >
                {isLoading ? 'Analyzing...' : 'Submit Answers'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}