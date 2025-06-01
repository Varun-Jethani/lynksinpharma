import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const navigate = useNavigate();

  const navItems = [
    "Home",
    "Our Products",
    "About Us",
    "Company Profile",

    "Quality & Compliance",
    "IP Protection",
    "ESG",
    "Contact Us",
    "Careers",
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleItemClick = (item) => {
    if (item.toLowerCase().replace(/ /g, "-") == "home") {
      navigate("/");
    } else {
      navigate(`/${item.toLowerCase().replace(/ /g, "-")}`);
    }

    setActiveItem(item);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 group cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Your Logo
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                    activeItem === item
                      ? "text-blue-400 bg-slate-800/50"
                      : "text-gray-300 hover:text-white hover:bg-slate-800/30"
                  }`}
                >
                  {item}
                  {activeItem === item && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></div>
                  )}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="relative inline-flex items-center justify-center p-3 rounded-xl text-gray-300 hover:text-white hover:bg-slate-800/30 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              {isMenuOpen ? (
                <X className="block h-6 w-6 relative z-10" />
              ) : (
                <Menu className="block h-6 w-6 relative z-10" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2 bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item)}
              className={`w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 group ${
                activeItem === item
                  ? "text-blue-400 bg-slate-800/50 shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-slate-800/30"
              }`}
            >
              <div className="relative">
                {item}
                {activeItem === item && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-4 bg-blue-400 rounded-full -ml-4"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
