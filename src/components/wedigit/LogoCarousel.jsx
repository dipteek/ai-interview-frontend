'use client'

import React from "react";

export default function LogoCarousel() {
  // Company logos
  const logos = [
    {
      id: 1,
      name: "NSE",
      logo: (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-orange-500 relative overflow-hidden flex items-center justify-center">
            <div className="absolute w-6 h-2 bg-white rotate-45 translate-x-1"></div>
          </div>
          <span className="ml-2 text-indigo-800 font-bold text-2xl">NSE</span>
        </div>
      )
    },
    {
      id: 2,
      name: "Barq",
      logo: (
        <div className="font-bold text-2xl tracking-tight">
          barq
        </div>
      )
    },
    {
      id: 3,
      name: "KreditBee",
      logo: (
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
            <span className="text-xs">🐝</span>
          </div>
          <span className="ml-1 font-semibold">KreditBee</span>
        </div>
      )
    },
    {
      id: 4,
      name: "NYKAA",
      logo: (
        <div className="font-bold text-pink-500 text-2xl italic">
          NYKAA
        </div>
      )
    },
    {
      id: 5,
      name: "RandomTrees",
      logo: (
        <div className="flex items-center">
          <span className="text-yellow-500 font-bold">RANDOM</span>
          <span className="text-black font-bold">TREES</span>
        </div>
      )
    },
    {
      id: 6,
      name: "RECRO",
      logo: (
        <div className="border-2 border-pink-500 px-2 py-1">
          <span className="text-pink-500 font-bold">RECRO</span>
        </div>
      )
    }
  ];

  return (
    <div className="w-full bg-white py-16 border-gray-200">
      <div className="max-w-6xl mx-auto px-4 mb-10">
        {/* Heading */}
        <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Parteners with Interview
        </h2>
      </div>

      {/* Logo slider container */}
      <div className="relative w-full overflow-hidden">
        <div className="logo-track flex">
          {/* First set of logos */}
          {logos.map(item => (
            <div key={item.id} className="logo-slide flex items-center justify-center mx-12 min-w-max">
              {item.logo}
            </div>
          ))}
          
          {/* Second set of logos (duplicate for seamless loop) */}
          {logos.map(item => (
            <div key={`duplicate-${item.id}`} className="logo-slide flex items-center justify-center mx-12 min-w-max">
              {item.logo}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .logo-track {
          animation: scroll 20s linear infinite;
          width: calc(240px * ${logos.length * 2});
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-240px * ${logos.length}));
          }
        }
        
        /* Pause on hover effect */
        .logo-track:hover {
          animation-play-state: paused;
        }
        
        .logo-slide {
          width: 240px;
        }
      `}</style>
    </div>
  );
}