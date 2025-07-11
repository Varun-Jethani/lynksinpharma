import React from "react";
import {
  Menu,
  X,
  ChevronRight,
  Beaker,
  Users,
  Award,
  Zap,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Hero = ({ heroSlides, setCurrentSlide, currentSlide }) => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-gray-100 ">
      {/* Scientific Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="hexagon"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="10,1 18,5 18,15 10,19 2,15 2,5"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#hexagon)" />
        </svg>
      </div>

      {/* Molecular Structure Animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Molecule Structure - Top Right */}
        <div className="absolute top-20 right-20 opacity-10 animate-pulse">
          <svg width="300" height="200" viewBox="0 0 300 200">
            <circle cx="50" cy="50" r="8" fill="#1e40af" />
            <circle cx="100" cy="30" r="6" fill="#6b7280" />
            <circle cx="150" cy="60" r="8" fill="#dc2626" />
            <circle cx="200" cy="40" r="6" fill="#6b7280" />
            <circle cx="250" cy="80" r="8" fill="#059669" />
            <circle cx="80" cy="120" r="6" fill="#6b7280" />
            <circle cx="130" cy="140" r="8" fill="#1e40af" />
            <circle cx="180" cy="120" r="6" fill="#6b7280" />
            <line
              x1="50"
              y1="50"
              x2="100"
              y2="30"
              stroke="#6b7280"
              strokeWidth="2"
            />
            <line
              x1="100"
              y1="30"
              x2="150"
              y2="60"
              stroke="#6b7280"
              strokeWidth="2"
            />
            <line
              x1="150"
              y1="60"
              x2="200"
              y2="40"
              stroke="#6b7280"
              strokeWidth="2"
            />
            <line
              x1="200"
              y1="40"
              x2="250"
              y2="80"
              stroke="#6b7280"
              strokeWidth="2"
            />
            <line
              x1="50"
              y1="50"
              x2="80"
              y2="120"
              stroke="#6b7280"
              strokeWidth="2"
            />
            <line
              x1="80"
              y1="120"
              x2="130"
              y2="140"
              stroke="#6b7280"
              strokeWidth="2"
            />
            <line
              x1="130"
              y1="140"
              x2="180"
              y2="120"
              stroke="#6b7280"
              strokeWidth="2"
            />
            <line
              x1="150"
              y1="60"
              x2="130"
              y2="140"
              stroke="#6b7280"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Small Molecule - Bottom Left */}
        <div className="absolute bottom-32 left-20 opacity-15 animate-pulse delay-1000">
          <svg width="150" height="100" viewBox="0 0 150 100">
            <circle cx="30" cy="30" r="6" fill="#1e40af" />
            <circle cx="70" cy="20" r="5" fill="#6b7280" />
            <circle cx="110" cy="40" r="6" fill="#dc2626" />
            <circle cx="50" cy="70" r="5" fill="#6b7280" />
            <circle cx="90" cy="80" r="6" fill="#059669" />
            <line
              x1="30"
              y1="30"
              x2="70"
              y2="20"
              stroke="#6b7280"
              strokeWidth="1.5"
            />
            <line
              x1="70"
              y1="20"
              x2="110"
              y2="40"
              stroke="#6b7280"
              strokeWidth="1.5"
            />
            <line
              x1="30"
              y1="30"
              x2="50"
              y2="70"
              stroke="#6b7280"
              strokeWidth="1.5"
            />
            <line
              x1="50"
              y1="70"
              x2="90"
              y2="80"
              stroke="#6b7280"
              strokeWidth="1.5"
            />
            <line
              x1="70"
              y1="20"
              x2="90"
              y2="80"
              stroke="#6b7280"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* DNA Helix - Center Right */}
        <div className="absolute top-1/2 right-10 opacity-8 transform -translate-y-1/2">
          <svg width="80" height="300" viewBox="0 0 80 300">
            <path
              d="M20 0 Q40 50 20 100 Q0 150 20 200 Q40 250 20 300"
              fill="none"
              stroke="#1e40af"
              strokeWidth="3"
              opacity="0.3"
            />
            <path
              d="M60 0 Q40 50 60 100 Q80 150 60 200 Q40 250 60 300"
              fill="none"
              stroke="#dc2626"
              strokeWidth="3"
              opacity="0.3"
            />
            {Array.from({ length: 15 }).map((_, i) => (
              <line
                key={i}
                x1="20"
                y1={i * 20}
                x2="60"
                y2={i * 20}
                stroke="#6b7280"
                strokeWidth="1"
                opacity="0.2"
              />
            ))}
          </svg>
        </div>

        {/* Floating Lab Equipment Icons */}
        <div className="absolute top-40 left-32 opacity-10 animate-bounce">
          <Beaker className="h-16 w-16 text-blue-600" />
        </div>

        <div className="absolute bottom-40 right-32 opacity-10 animate-bounce delay-500">
          <svg
            className="h-12 w-12 text-gray-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 2v4c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V2h2c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h2zm4 14c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="text-left">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <Beaker className="h-4 w-4 mr-2" />
              Pharmaceutical Innovation
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Leading ADC Linker Solutions
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
              Innovative drug-linker conjugates for next-generation therapeutics
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300 flex items-center justify-center group">
                Explore Our Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300">
                View Product Catalog
              </button>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative">
            {/* Main Illustration Container */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              {/* Large Central Molecule */}
              <div className="flex justify-center mb-6">
                <svg
                  width="280"
                  height="200"
                  viewBox="0 0 280 200"
                  className="drop-shadow-sm"
                >
                  {/* DBCO-acid structure representation */}
                  <g className="animate-pulse">
                    {/* Ring structures */}
                    <circle
                      cx="60"
                      cy="100"
                      r="12"
                      fill="#1e40af"
                      stroke="#1e40af"
                      strokeWidth="2"
                    />
                    <circle
                      cx="120"
                      cy="80"
                      r="10"
                      fill="#6b7280"
                      stroke="#374151"
                      strokeWidth="1"
                    />
                    <circle
                      cx="120"
                      cy="120"
                      r="10"
                      fill="#6b7280"
                      stroke="#374151"
                      strokeWidth="1"
                    />
                    <circle
                      cx="180"
                      cy="100"
                      r="12"
                      fill="#dc2626"
                      stroke="#dc2626"
                      strokeWidth="2"
                    />
                    <circle
                      cx="240"
                      cy="80"
                      r="8"
                      fill="#059669"
                      stroke="#059669"
                      strokeWidth="1"
                    />
                    <circle
                      cx="240"
                      cy="120"
                      r="8"
                      fill="#059669"
                      stroke="#059669"
                      strokeWidth="1"
                    />

                    {/* Bonds */}
                    <line
                      x1="72"
                      y1="100"
                      x2="108"
                      y2="80"
                      stroke="#374151"
                      strokeWidth="3"
                    />
                    <line
                      x1="72"
                      y1="100"
                      x2="108"
                      y2="120"
                      stroke="#374151"
                      strokeWidth="3"
                    />
                    <line
                      x1="132"
                      y1="80"
                      x2="168"
                      y2="100"
                      stroke="#374151"
                      strokeWidth="3"
                    />
                    <line
                      x1="132"
                      y1="120"
                      x2="168"
                      y2="100"
                      stroke="#374151"
                      strokeWidth="3"
                    />
                    <line
                      x1="192"
                      y1="100"
                      x2="228"
                      y2="80"
                      stroke="#374151"
                      strokeWidth="3"
                    />
                    <line
                      x1="192"
                      y1="100"
                      x2="228"
                      y2="120"
                      stroke="#374151"
                      strokeWidth="3"
                    />
                    <line
                      x1="120"
                      y1="90"
                      x2="120"
                      y2="110"
                      stroke="#374151"
                      strokeWidth="3"
                    />

                    {/* Labels */}
                    <text
                      x="60"
                      y="135"
                      textAnchor="middle"
                      className="text-xs font-medium fill-gray-700"
                    >
                      N
                    </text>
                    <text
                      x="120"
                      y="75"
                      textAnchor="middle"
                      className="text-xs font-medium fill-gray-700"
                    >
                      C
                    </text>
                    <text
                      x="180"
                      y="135"
                      textAnchor="middle"
                      className="text-xs font-medium fill-gray-700"
                    >
                      O
                    </text>
                    <text
                      x="240"
                      y="75"
                      textAnchor="middle"
                      className="text-xs font-medium fill-gray-700"
                    >
                      H
                    </text>
                  </g>
                </svg>
              </div>

              {/* Chemical Properties */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">99.5%</div>
                  <div className="text-xs text-gray-600">Purity</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-lg font-bold text-gray-700">305.33</div>
                  <div className="text-xs text-gray-600">Mol. Weight</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-lg font-bold text-green-600">ADC</div>
                  <div className="text-xs text-gray-600">Linker</div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200 opacity-90">
              <div className="text-xs text-gray-500">CAS No.</div>
              <div className="font-bold text-gray-800">1353016-70-2</div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200 opacity-90">
              <div className="text-xs text-gray-500">Catalog</div>
              <div className="font-bold text-gray-800">LPS-0010</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[1, 2, 3].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide && setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === (currentSlide || 0) ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
