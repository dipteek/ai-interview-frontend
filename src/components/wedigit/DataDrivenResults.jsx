'use client'

import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function DataDrivenResults() {
  // For controlling which result card is in focus (could be expanded for interactivity)
  const [focusedCard, setFocusedCard] = useState(null);

  const resultCards = [
    {
      id: 1,
      logo: "XpressBees",
      headline: "3x",
      description: "reduction in time to hire 6 weeks to 3 weeks",
    },
    {
      id: 2,
      logo: "Yubi",
      headline: "5% increase",
      subheadline: "in applicant-to-hire ratio",
      description: "50% of applicants moving forward in interview rounds",
    },
    {
      id: 3,
      logo: "TEKION",
      headline: "80% reduction",
      subheadline: "in interview scheduling time",
      description: "30% increase in applicant engagement",
    },
  ];

  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Data-driven results</h2>
          <p className="text-xl text-gray-700">Top brands using Intervue have experienced unmatched results</p>
        </div>

        {/* Results Cards Container */}
        <div className="flex flex-wrap justify-center gap-6">
          {resultCards.map((card) => (
            <div
              key={card.id}
              className="bg-white border border-gray-100 rounded-xl p-8 w-full sm:w-80 flex flex-col justify-between relative"
              style={{ backgroundImage: "linear-gradient(rgba(240, 240, 240, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(240, 240, 240, 0.3) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
            >
              {/* Logo Section */}
              <div className="mb-8">
                {card.logo === "XpressBees" && (
                  <div className="font-bold text-lg">
                    <span style={{ color: "#000" }}>XPRESS</span>
                    <span style={{ color: "#FF6B00" }}>BEES</span>
                  </div>
                )}
                {card.logo === "Yubi" && (
                  <div className="flex items-center">
                    <div className="w-8 h-8 relative">
                      <div className="absolute w-4 h-4 bg-black rounded-full bottom-0 left-0"></div>
                      <div className="absolute w-4 h-4 bg-black rounded-full bottom-0 right-0"></div>
                      <div className="absolute w-4 h-4 bg-yellow-400 rounded-full top-0 left-1/2 transform -translate-x-1/2"></div>
                    </div>
                    <span className="ml-2 font-bold text-2xl">Yubi</span>
                  </div>
                )}
                {card.logo === "TEKION" && (
                  <div className="font-bold text-xl" style={{ color: "#00b3a7" }}>
                    TEKION
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div>
                <h3 className="text-5xl font-bold mb-2">{card.headline}</h3>
                {card.subheadline && <p className="text-lg mb-4">{card.subheadline}</p>}
                <p className="text-lg font-medium mb-8">{card.description}</p>
              </div>

              {/* Arrow Button */}
              <div className="absolute bottom-6 right-6">
                <button 
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors"
                  aria-label="See more details"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}