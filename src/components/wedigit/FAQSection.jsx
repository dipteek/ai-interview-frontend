'use client';

import { ArrowRight } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

// const FAQSection = () => {
//     const faqs = [
//       {
//         question: "How does the AI interview coach work?",
//         answer: "Our AI interview coach analyzes your responses to common interview questions, evaluating factors like clarity, relevance, confidence, and technical accuracy. It then provides personalized feedback to help you improve your answers."
//       },
//       {
//         question: "Is this better than practicing with a friend?",
//         answer: "While practicing with friends is valuable, our AI coach offers unbiased feedback, is available 24/7, and can simulate a wide range of interview styles and questions that your friends might not be familiar with."
//       },
//       {
//         question: "Which industries and roles do you support?",
//         answer: "We support interviews for tech, finance, healthcare, marketing, sales, and many other industries. Our question bank covers entry-level to executive positions across these fields."
//       },
//       {
//         question: "Can I practice technical interviews?",
//         answer: "Yes! We offer specialized technical interview practice for software engineering, data science, product management, and other technical roles."
//       },
//       {
//         question: "How many practice interviews can I do?",
//         answer: "Our free plan includes 5 practice interviews. The Professional plan offers unlimited interviews so you can practice as much as you need."
//       },
//       {
//         question: "How do I cancel my subscription?",
//         answer: "You can cancel your subscription anytime from your account settings. If you cancel, you'll continue to have access until the end of your billing period."
//       }
//     ];
  
//     const [openIndex, setOpenIndex] = useState(null);
  
//     const toggleFaq = (index) => {
//       setOpenIndex(openIndex === index ? null : index);
//     };
  
//     return (
//       <div className="bg-white py-16 lg:py-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
//               Frequently asked questions
//             </h2>
//             <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
//               Everything you need to know about our interview preparation platform.
//             </p>
//           </div>
  
//           <div className="mt-12 max-w-3xl mx-auto divide-y-2 divide-gray-100">
//             {faqs.map((faq, index) => (
//               <div key={index} className="py-6">
//                 <button
//                   onClick={() => toggleFaq(index)}
//                   className="flex justify-between items-center w-full text-left focus:outline-none"
//                 >
//                   <span className="text-lg font-medium text-gray-900">{faq.question}</span>
//                   <span className={`ml-6 flex-shrink-0 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
//                     <svg className="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </span>
//                 </button>
//                 {openIndex === index && (
//                   <div className="mt-4 pr-12">
//                     <p className="text-base text-gray-500">{faq.answer}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How does the AI interview coach work?",
      answer:
        "Our AI interview coach uses natural language processing and machine learning to create realistic interview scenarios. It analyzes your responses in real-time, evaluating factors like clarity, relevance, and confidence. After each practice session, you'll receive detailed feedback and actionable tips to improve your performance.",
    },
    {
      question: "Is this suitable for all career levels and industries?",
      answer:
        "Yes! Our platform is designed to accommodate professionals at all career stages, from entry-level to executive positions. We offer industry-specific question libraries for over 40 sectors including technology, finance, healthcare, marketing, and more. The AI adapts to your experience level and target role for personalized preparation.",
    },
    {
      question: "How does the subscription work?",
      answer:
        "Our subscription plans are flexible and designed to meet your needs. You can choose between monthly or annual billing, with the latter offering significant savings. All plans include a free trial period, and you can cancel anytime. Your subscription grants you immediate access to all features included in your chosen plan.",
    },
    {
      question: "Can I practice with video interviews?",
      answer:
        "Absolutely! Our Professional and Enterprise plans include video interview capability, allowing you to practice both verbal responses and non-verbal communication. The AI will analyze your body language, eye contact, and facial expressions, providing comprehensive feedback to help you make a strong impression.",
    },
    {
      question: "How accurate is the AI feedback?",
      answer:
        "Our AI has been trained on thousands of successful interviews and calibrated by professional recruiters and hiring managers. It evaluates your responses based on clarity, relevance, structure, and impact—the same criteria used by human interviewers. While no AI is perfect, our users report that the feedback closely matches what they later experience in real interviews.",
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(224,231,255,0.6),transparent_30%)]"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 tracking-wide uppercase mb-2">
            Have Questions?
          </p>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">
            Everything you need to know about our AI interview coach
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "shadow-md border-indigo-200"
                  : "border-gray-200"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3
                  className={`text-lg font-medium ${
                    openIndex === index ? "text-indigo-600" : "text-gray-900"
                  }`}
                >
                  {faq.question}
                </h3>
                <ChevronRight
                  className={`h-5 w-5 transform transition-transform ${
                    openIndex === index
                      ? "rotate-90 text-indigo-600"
                      : "text-gray-400"
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 text-gray-600">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Contact our support team
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

  export default FAQSection