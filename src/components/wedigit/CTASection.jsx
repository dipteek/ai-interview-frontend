'use client';

import { PlayCircle } from "lucide-react";
import { Zap } from "lucide-react";

// import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-20 bg-indigo-900 relative overflow-hidden">
      {/* Visual elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.2),transparent_30%)]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Ready to Transform Your Interview Success?
          </h2>
          <p className="text-xl text-indigo-100 mb-10">
            Join thousands of professionals who have boosted their confidence
            and landed their dream jobs with our AI interview coach.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-indigo-600 font-medium text-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700 transition-all"
            >
              Start Free Trial
              <Zap className="ml-2 h-5 w-5" />
            </a>

            <a
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-white text-white font-medium text-lg hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700 transition-all"
            >
              Watch Demo
              <PlayCircle className="ml-2 h-5 w-5" />
            </a>
          </div>

          {/* <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-400 mr-2" />
              <p className="text-indigo-100">No credit card required</p>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-400 mr-2" />
              <p className="text-indigo-100">Cancel anytime</p>
            </div>
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-400 mr-2" />
              <p className="text-indigo-100">24/7 support</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

// const CTASection = () => {
//     return (
//       <div className="bg-indigo-700">
//         <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
//           <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
//             <span className="block">Ready to ace your next interview?</span>
//             <span className="block text-indigo-200">Start practicing with our AI coach today.</span>
//           </h2>
//           <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
//             <div className="inline-flex rounded-md shadow">
//               <Link
//                 href="/signup"
//                 className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
//               >
//                 Get started
//               </Link>
//             </div>
//             <div className="ml-3 inline-flex rounded-md shadow">
//               <Link
//                 href="/demo"
//                 className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//               >
//                 Watch Demo
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

  export default CTASection