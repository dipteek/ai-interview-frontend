'use client';

import { useState } from 'react';

const FAQSection = () => {
    const faqs = [
      {
        question: "How does the AI interview coach work?",
        answer: "Our AI interview coach analyzes your responses to common interview questions, evaluating factors like clarity, relevance, confidence, and technical accuracy. It then provides personalized feedback to help you improve your answers."
      },
      {
        question: "Is this better than practicing with a friend?",
        answer: "While practicing with friends is valuable, our AI coach offers unbiased feedback, is available 24/7, and can simulate a wide range of interview styles and questions that your friends might not be familiar with."
      },
      {
        question: "Which industries and roles do you support?",
        answer: "We support interviews for tech, finance, healthcare, marketing, sales, and many other industries. Our question bank covers entry-level to executive positions across these fields."
      },
      {
        question: "Can I practice technical interviews?",
        answer: "Yes! We offer specialized technical interview practice for software engineering, data science, product management, and other technical roles."
      },
      {
        question: "How many practice interviews can I do?",
        answer: "Our free plan includes 5 practice interviews. The Professional plan offers unlimited interviews so you can practice as much as you need."
      },
      {
        question: "How do I cancel my subscription?",
        answer: "You can cancel your subscription anytime from your account settings. If you cancel, you'll continue to have access until the end of your billing period."
      }
    ];
  
    const [openIndex, setOpenIndex] = useState(null);
  
    const toggleFaq = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
      <div className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Everything you need to know about our interview preparation platform.
            </p>
          </div>
  
          <div className="mt-12 max-w-3xl mx-auto divide-y-2 divide-gray-100">
            {faqs.map((faq, index) => (
              <div key={index} className="py-6">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full text-left focus:outline-none"
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  <span className={`ml-6 flex-shrink-0 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                    <svg className="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {openIndex === index && (
                  <div className="mt-4 pr-12">
                    <p className="text-base text-gray-500">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default FAQSection