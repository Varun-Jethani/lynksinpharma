import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Star,
  ChevronDown,
  ChevronRight,
  Beaker,
  ArrowRight,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../../store/productsSlice";
import { useNavigate } from "react-router-dom";

const Hero = ({ heroSlides, setCurrentSlide, currentSlide }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Redux: fetch products from store
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);
  // console.log("Products:", products);
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        const matchesSearch =
          product.ChemicalName?.toLowerCase().includes(
            searchQuery.toLowerCase()
          ) ||
          product.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
    : [];

  // Slide content logic
  const slide =
    Array.isArray(heroSlides) &&
    heroSlides.length > 0 &&
    typeof currentSlide === "number"
      ? heroSlides[currentSlide]
      : null;

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
              {slide?.badge || "Pharmaceutical Innovation"}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {slide?.title || "Leading ADC Linker Solutions"}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
              {slide?.subtitle ||
                "Innovative drug-linker conjugates for next-generation therapeutics"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300 flex items-center justify-center group">
                {slide?.primaryButton || "Explore Our Products"}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 cursor-pointer"
                onClick={() => navigate("/products")}
              >
                {slide?.secondaryButton || "View Product Catalog"}
              </button>
            </div>
          </div>

          {/* Visual Side - Compact Product Search */}
          <div className="relative">
            {/* Compact Search Container */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 max-w-lg">
              {/* Search Input */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Single Product Result */}
              {loading ? (
                <div className="text-center py-4 text-gray-500">Loading...</div>
              ) : error ? (
                <div className="text-center py-4 text-red-500">
                  {error.toString()}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div
                  className="p-3 border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer group"
                  onClick={() => {
                    // Navigate to products page and pass the ChemicalName as a query param for modal open
                    navigate(
                      `/products?chemicalName=${encodeURIComponent(
                        filteredProducts[0].ChemicalName ||
                          filteredProducts[0].name ||
                          ""
                      )}`
                    );
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">
                        {filteredProducts[0].ChemicalName ||
                          filteredProducts[0].name}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {filteredProducts[0].description}
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="flex items-center mr-3">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600 ml-1">
                            {filteredProducts[0].rating || "-"}
                          </span>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            filteredProducts[0].availability === "In Stock"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {filteredProducts[0].availability || "Available"}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors ml-2" />
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <Search className="h-6 w-6 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No products found</p>
                </div>
              )}

              {/* Show count if multiple results */}
              {filteredProducts.length > 1 && (
                <div className="mt-3 text-center">
                  <span className="text-xs text-gray-500">
                    +{filteredProducts.length - 1} more results
                  </span>
                </div>
              )}

              {/* Compact Action */}
              <div className="mt-4">
                <button
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  onClick={() => navigate("/products")}
                >
                  View All Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.isArray(heroSlides) && heroSlides.length > 0
          ? heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide && setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  index === (currentSlide || 0) ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))
          : [1, 2, 3].map((_, index) => (
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
