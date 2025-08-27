import React, { useState, useRef, useEffect } from "react";
import { Menu, X, User, LogOut, ChevronDown, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/userSlice";
import logoImg from "../../assets/lynksin Final Logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  // Get user data from Redux store
  const user = useSelector((state) => state.user.profile);
  const isLoggedIn = useSelector((state) => !!state.user.profile);

  // Get cart data from Redux store (assuming you have cart slice)
  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  // Helper function to get first name only
  const getDisplayName = (user) => {
    if (!user) return "User";
    if (user.firstName) return user.firstName;
    if (user.name) return user.name.split(" ")[0];
    return "User";
  };

  // Grouped navigation items
  const navItems = [
    { name: "Home", type: "single" },
    {
      name: "About",
      type: "dropdown",
      items: [
        { name: "About Us", path: "/about-us" },
        { name: "Company Profile", path: "/company-profile" },
      ],
    },
    { name: "Products", type: "single" },

    { name: "Contact Us", type: "single" },
    { name: "Careers", type: "single" },
  ];

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !isMobile() &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Helper to detect mobile
  const isMobile = () => window.innerWidth < 1024;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleItemClick = (item, path = null) => {
    const routePath = path || `/${item.toLowerCase().replace(/ /g, "-")}`;

    if (item.toLowerCase() === "home") {
      navigate("/");
    } else {
      navigate(routePath);
    }

    setActiveItem(item);
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleDropdownToggle = (dropdownName) => {
    // On mobile, toggle open/close; on desktop, open only
    if (isMobile()) {
      setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    } else {
      setOpenDropdown(dropdownName);
    }
  };

  // New function specifically for mobile dropdown item clicks
  const handleMobileDropdownItemClick = (subItem) => {
    handleItemClick(subItem.name, subItem.path);
    setOpenDropdown(null);
    setIsMenuOpen(false); // Also close the main mobile menu
  };

  const handleLogin = () => {
    navigate("/auth");
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
    setIsUserMenuOpen(false);
  };

  const handleCart = () => {
    navigate("/cart");
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-18 lg:h-20">
          {/* Logo/Brand - Enhanced responsiveness */}
          <div
            className="flex-shrink-0 group cursor-pointer"
            onClick={() => handleItemClick("Home")}
          >
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-orange-500 font-bold text-sm sm:text-base lg:text-lg">
                    L
                  </span>
                </div>
              </div> */}
              <div className="flex items-center space-x-2 bg-white rounded-lg  shadow-lg">
                <img
                  src={logoImg}
                  alt="Lynksin Pharma Logo"
                  className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-full object-cover"
                />
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-slate-100 font-[Poppins] truncate">
                  <span className="sm:hidden">Lynksin Pharma <br />Solutions</span>
                  <span className="hidden sm:inline md:hidden">
                    Lynksin Pharma Solutions
                  </span>
                  <span className="hidden md:inline">
                    Lynksin Pharma Solutions
                  </span>
                </span>
                <span className="text-xs sm:text-sm lg:text-base -mt-0.5 sm:-mt-1 lg:-mt-1.5 text-slate-300 hidden sm:block font-light truncate">
                  <span className="inline md:hidden">
                    Science to Innovation
                  </span>
                  <span className="hidden md:inline">
                    Linking Science to Life Saving Innovations
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - Enhanced spacing and sizing */}
          <div
            className="hidden lg:flex items-center space-x-1 xl:space-x-2"
            ref={dropdownRef}
          >
            <div className="flex items-center space-x-0.5 xl:space-x-1 mr-3 xl:mr-6">
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  {item.type === "single" ? (
                    <button
                      onClick={() => handleItemClick(item.name)}
                      className={`relative px-2 lg:px-3 xl:px-6 py-1.5 lg:py-2 xl:py-3 text-xs lg:text-sm xl:text-base font-medium rounded-md lg:rounded-lg transition-all duration-300 group whitespace-nowrap ${
                        activeItem === item.name
                          ? "text-blue-400 bg-slate-800/50 shadow-md"
                          : "text-gray-200 hover:text-white hover:bg-slate-800/30"
                      }`}
                    >
                      {item.name}
                      {activeItem === item.name && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-0.5 lg:w-2 lg:h-1 bg-blue-400 rounded-full"></div>
                      )}
                      <div className="absolute inset-0 rounded-md lg:rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  ) : (
                    <div className="relative">
                      <button
                        onClick={() => handleDropdownToggle(item.name)}
                        onMouseEnter={() => handleDropdownToggle(item.name)}
                        className={`relative px-2 lg:px-3 xl:px-6 py-1.5 lg:py-2 xl:py-3 text-xs lg:text-sm xl:text-base font-medium rounded-md lg:rounded-lg transition-all duration-300 group flex items-center space-x-1 lg:space-x-2 whitespace-nowrap ${
                          openDropdown === item.name
                            ? "text-blue-400 bg-slate-800/50 shadow-md"
                            : "text-gray-200 hover:text-white hover:bg-slate-800/30"
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`w-2.5 h-2.5 lg:w-3 lg:h-3 xl:w-4 xl:h-4 transition-transform duration-200 ${
                            openDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                        <div className="absolute inset-0 rounded-md lg:rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>

                      {/* Dropdown Menu */}
                      {openDropdown === item.name && (
                        <div
                          className="absolute top-full left-0 mt-1 lg:mt-2 w-48 lg:w-56 xl:w-64 bg-slate-800/95 backdrop-blur-md rounded-lg xl:rounded-xl shadow-xl border border-slate-700/50 py-1 lg:py-2 z-50"
                          onMouseLeave={() => setOpenDropdown(null)}
                        >
                          {item.items.map((subItem, subIndex) => (
                            <button
                              key={subIndex}
                              onClick={() =>
                                handleItemClick(subItem.name, subItem.path)
                              }
                              className="w-full text-left px-3 lg:px-4 py-2 lg:py-3 text-gray-200 hover:text-white hover:bg-slate-700/50 transition-colors duration-200 text-xs lg:text-sm xl:text-base font-medium"
                            >
                              {subItem.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Cart and User Authentication Section - Enhanced sizing */}
            <div className="flex items-center space-x-1 lg:space-x-2 xl:space-x-3">
              {/* Cart Button */}
              <button
                onClick={handleCart}
                className="relative flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 xl:w-11 xl:h-11 text-gray-200 hover:text-white bg-slate-800/30 hover:bg-slate-800/50 rounded-md lg:rounded-lg transition-all duration-300 border border-slate-700/50 group"
              >
                <ShoppingCart className="w-3 h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center shadow-lg animate-pulse">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
                <div className="absolute inset-0 rounded-md lg:rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* User Authentication */}
              <div className="relative">
                {isLoggedIn ? (
                  <div className="relative">
                    <button
                      onClick={toggleUserMenu}
                      className="flex items-center space-x-1 lg:space-x-2 xl:space-x-3 px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 text-gray-200 hover:text-white bg-slate-800/30 hover:bg-slate-800/50 rounded-md lg:rounded-lg transition-all duration-300 border border-slate-700/50"
                    >
                      <div className="w-5 h-5 lg:w-7 lg:h-7 xl:w-8 xl:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-2.5 h-2.5 lg:w-3 lg:h-3 xl:w-4 xl:h-4 text-white" />
                      </div>
                      <span className="text-xs lg:text-sm xl:text-base font-medium max-w-16 lg:max-w-20 xl:max-w-24 truncate hidden lg:block">
                        {getDisplayName(user)}
                      </span>
                      <ChevronDown
                        className={`w-2.5 h-2.5 lg:w-3 lg:h-3 xl:w-4 xl:h-4 transition-transform duration-200 ${
                          isUserMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* User Dropdown Menu */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-1 lg:mt-2 w-40 lg:w-48 bg-slate-800/95 backdrop-blur-md rounded-lg xl:rounded-xl shadow-xl border border-slate-700/50 py-1 lg:py-2 z-50">
                        <div className="px-3 lg:px-4 py-1 lg:py-2 text-gray-400 text-xs lg:text-sm font-medium border-b border-slate-700/50">
                          {user?.name ||
                            `${user?.firstName || ""} ${
                              user?.lastName || ""
                            }`.trim() ||
                            "User"}
                        </div>
                        <button
                          onClick={handleProfile}
                          className="w-full text-left px-3 lg:px-4 py-2 lg:py-3 text-gray-200 hover:text-white hover:bg-slate-700/50 transition-colors duration-200 flex items-center space-x-2 lg:space-x-3"
                        >
                          <User className="w-3 h-3 lg:w-4 lg:h-4" />
                          <span className="text-xs lg:text-sm">Profile</span>
                        </button>
                        <hr className="border-slate-700/50 my-0.5 lg:my-1" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3 lg:px-4 py-2 lg:py-3 text-red-400 hover:text-red-300 hover:bg-slate-700/50 transition-colors duration-200 flex items-center space-x-2 lg:space-x-3"
                        >
                          <LogOut className="w-3 h-3 lg:w-4 lg:h-4" />
                          <span className="text-xs lg:text-sm">Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 xl:px-6 py-1.5 lg:py-2 xl:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-md lg:rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <User className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span className="text-xs lg:text-sm xl:text-base">
                      Login
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu section - Enhanced for all screen sizes */}
          <div className="lg:hidden flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
            {/* Mobile Cart Button */}
            <button
              onClick={handleCart}
              className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-slate-800/30 hover:bg-slate-800/50 rounded-full text-gray-200 hover:text-white transition-all duration-300"
            >
              <ShoppingCart className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center shadow-lg text-xs">
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile User Button */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"
                >
                  <User className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                </button>

                {/* Mobile User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-slate-800/95 backdrop-blur-md rounded-lg sm:rounded-xl shadow-xl border border-slate-700/50 py-2 z-50">
                    <div className="px-3 sm:px-4 py-2 text-gray-400 text-sm font-medium border-b border-slate-700/50">
                      {getDisplayName(user)}
                    </div>
                    <button
                      onClick={handleProfile}
                      className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-gray-200 hover:text-white hover:bg-slate-700/50 transition-colors duration-200 flex items-center space-x-2 sm:space-x-3"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-red-400 hover:text-red-300 hover:bg-slate-700/50 transition-colors duration-200 flex items-center space-x-2 sm:space-x-3"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
              >
                <User className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="relative inline-flex items-center justify-center p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl text-gray-300 hover:text-white hover:bg-slate-800/30 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              {isMenuOpen ? (
                <X className="block h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 relative z-10" />
              ) : (
                <Menu className="block h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 relative z-10" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Enhanced responsiveness */}
      <div
        className={`lg:hidden fixed inset-x-0 top-14 sm:top-16 md:top-18 lg:top-20 z-40 transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible overflow-hidden"
        }`}
      >
        <div className="px-2 sm:px-3 md:px-4 pt-3 sm:pt-4 pb-4 sm:pb-6 space-y-1 sm:space-y-2 bg-slate-900/98 backdrop-blur-md border-t border-slate-700/50 max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-4.5rem)] lg:max-h-[calc(100vh-5rem)] overflow-y-auto">
          {/* Close Menu Button */}
          <div className="flex justify-end mb-2 sm:mb-3">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 hover:text-white transition-all duration-300 border border-slate-600/50"
              aria-label="Close menu"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          {navItems.map((item, index) => (
            <div key={index}>
              {item.type === "single" ? (
                <button
                  onClick={() => handleItemClick(item.name)}
                  className={`w-full text-left px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-medium rounded-lg sm:rounded-xl transition-all duration-300 group ${
                    activeItem === item.name
                      ? "text-blue-400 bg-slate-800/50 shadow-lg"
                      : "text-gray-200 hover:text-white hover:bg-slate-800/30"
                  }`}
                >
                  <div className="relative">
                    {item.name}
                    {activeItem === item.name && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0.5 sm:w-1 h-4 sm:h-6 bg-blue-400 rounded-full -ml-3 sm:-ml-4 md:-ml-5"></div>
                    )}
                  </div>
                </button>
              ) : (
                <div>
                  <button
                    onClick={() => handleDropdownToggle(item.name)}
                    className="w-full text-left px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-medium rounded-lg sm:rounded-xl transition-all duration-300 text-gray-200 hover:text-white hover:bg-slate-800/30 flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-transform duration-200 ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile Dropdown Items */}
                  {openDropdown === item.name && (
                    <div className="ml-2 sm:ml-3 md:ml-4 mt-1 sm:mt-2 space-y-0.5 sm:space-y-1">
                      {item.items.map((subItem, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMobileDropdownItemClick(subItem);
                          }}
                          className="w-full text-left px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-sm sm:text-sm md:text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/30 rounded-md sm:rounded-lg transition-all duration-300"
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Mobile Cart Section */}
          <button
            onClick={handleCart}
            className="w-full text-left px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-medium text-gray-200 hover:text-white hover:bg-slate-800/30 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center space-x-2 sm:space-x-3">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Cart</span>
            </div>
            {cartItemCount > 0 && (
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs sm:text-sm font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Mobile Login/Logout Section */}
          <div className="pt-3 sm:pt-4 border-t border-slate-700/50">
            {isLoggedIn ? (
              <div className="space-y-1 sm:space-y-2">
                <div className="px-3 sm:px-4 md:px-5 py-1 sm:py-2 text-gray-400 text-xs sm:text-sm font-medium">
                  Welcome, {getDisplayName(user)}
                </div>
                <button
                  onClick={handleProfile}
                  className="w-full text-left px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-medium text-gray-200 hover:text-white hover:bg-slate-800/30 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center space-x-2 sm:space-x-3"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-medium text-red-400 hover:text-red-300 hover:bg-slate-800/30 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center space-x-2 sm:space-x-3"
                >
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="w-full px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-sm sm:text-base md:text-lg rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 sm:space-x-3"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
