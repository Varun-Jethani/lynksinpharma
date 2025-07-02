import React, { useState, useRef, useEffect } from "react";
import { Menu, X, User, LogOut, ChevronDown, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/userSlice";
import logoImg from "../../assets/lynksinlogo.png";

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
    { name: "Products", type: "single" },
    {
      name: "About",
      type: "dropdown",
      items: [
        { name: "About Us", path: "/about-us" },
        { name: "Company Profile", path: "/company-profile" },
      ],
    },
    {
      name: "Compliance ",
      type: "dropdown",
      items: [
        { name: "Quality & Compliance", path: "/quality-compliance" },
        { name: "IP Protection", path: "/ip-protection" },
      ],
    },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <div
            className="flex-shrink-0 group cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center space-x-3">
              <div className="w-18 h-18  rounded-xl flex items-center justify-center  group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                <img
                  src={logoImg}
                  alt="Lynksin Logo"
                  className="w-18 h-18 object-contain"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Lynskin Pharma
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div
            className="hidden lg:flex items-center space-x-2"
            ref={dropdownRef}
          >
            <div className="flex items-center space-x-1 mr-6">
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  {item.type === "single" ? (
                    <button
                      onClick={() => handleItemClick(item.name)}
                      className={`relative px-6 py-3 text-base font-medium rounded-lg transition-all duration-300 group ${
                        activeItem === item.name
                          ? "text-blue-400 bg-slate-800/50 shadow-md"
                          : "text-gray-200 hover:text-white hover:bg-slate-800/30"
                      }`}
                    >
                      {item.name}
                      {activeItem === item.name && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-blue-400 rounded-full"></div>
                      )}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  ) : (
                    <div className="relative">
                      <button
                        onClick={() => handleDropdownToggle(item.name)}
                        onMouseEnter={() => handleDropdownToggle(item.name)}
                        className={`relative px-6 py-3 text-base font-medium rounded-lg transition-all duration-300 group flex items-center space-x-2 ${
                          openDropdown === item.name
                            ? "text-blue-400 bg-slate-800/50 shadow-md"
                            : "text-gray-200 hover:text-white hover:bg-slate-800/30"
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            openDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>

                      {/* Dropdown Menu */}
                      {openDropdown === item.name && (
                        <div
                          className="absolute top-full left-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-700/50 py-2 z-50"
                          onMouseLeave={() => setOpenDropdown(null)}
                        >
                          {item.items.map((subItem, subIndex) => (
                            <button
                              key={subIndex}
                              onClick={() =>
                                handleItemClick(subItem.name, subItem.path)
                              }
                              className="w-full text-left px-4 py-3 text-gray-200 hover:text-white hover:bg-slate-700/50 transition-colors duration-200 text-base font-medium"
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

            {/* Cart and User Authentication Section */}
            <div className="flex items-center space-x-3">
              {/* Cart Button */}
              <button
                onClick={handleCart}
                className="relative flex items-center justify-center w-11 h-11 text-gray-200 hover:text-white bg-slate-800/30 hover:bg-slate-800/50 rounded-lg transition-all duration-300 border border-slate-700/50 group"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* User Authentication */}
              <div className="relative">
                {isLoggedIn ? (
                  <div className="relative">
                    <button
                      onClick={toggleUserMenu}
                      className="flex items-center space-x-3 px-4 py-2 text-gray-200 hover:text-white bg-slate-800/30 hover:bg-slate-800/50 rounded-lg transition-all duration-300 border border-slate-700/50"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-base font-medium max-w-24 truncate">
                        {getDisplayName(user)}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isUserMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* User Dropdown Menu */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-700/50 py-2">
                        <div className="px-4 py-2 text-gray-400 text-sm font-medium border-b border-slate-700/50">
                          {user?.name ||
                            `${user?.firstName || ""} ${
                              user?.lastName || ""
                            }`.trim() ||
                            "User"}
                        </div>
                        <button
                          onClick={handleProfile}
                          className="w-full text-left px-4 py-3 text-gray-200 hover:text-white hover:bg-slate-700/50 transition-colors duration-200 flex items-center space-x-3"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </button>
                        <hr className="border-slate-700/50 my-1" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-red-400 hover:text-red-300 hover:bg-slate-700/50 transition-colors duration-200 flex items-center space-x-3"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <User className="w-4 h-4" />
                    <span>Login</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu section */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Mobile Cart Button */}
            <button
              onClick={handleCart}
              className="relative flex items-center justify-center w-10 h-10 bg-slate-800/30 hover:bg-slate-800/50 rounded-full text-gray-200 hover:text-white transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-lg">
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile User Button */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"
                >
                  <User className="w-5 h-5 text-white" />
                </button>

                {/* Mobile User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-700/50 py-2">
                    <div className="px-4 py-2 text-gray-400 text-sm font-medium border-b border-slate-700/50">
                      {getDisplayName(user)}
                    </div>
                    <button
                      onClick={handleProfile}
                      className="w-full text-left px-4 py-3 text-gray-200 hover:text-white hover:bg-slate-700/50 transition-colors duration-200 flex items-center space-x-3"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-400 hover:text-red-300 hover:bg-slate-700/50 transition-colors duration-200 flex items-center space-x-3"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
              >
                <User className="w-5 h-5 text-white" />
              </button>
            )}

            {/* Mobile Menu Toggle */}
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
            <div key={index}>
              {item.type === "single" ? (
                <button
                  onClick={() => handleItemClick(item.name)}
                  className={`w-full text-left px-5 py-4 text-lg font-medium rounded-xl transition-all duration-300 group ${
                    activeItem === item.name
                      ? "text-blue-400 bg-slate-800/50 shadow-lg"
                      : "text-gray-200 hover:text-white hover:bg-slate-800/30"
                  }`}
                >
                  <div className="relative">
                    {item.name}
                    {activeItem === item.name && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-400 rounded-full -ml-5"></div>
                    )}
                  </div>
                </button>
              ) : (
                <div>
                  <button
                    onClick={() => handleDropdownToggle(item.name)}
                    className="w-full text-left px-5 py-4 text-lg font-medium rounded-xl transition-all duration-300 text-gray-200 hover:text-white hover:bg-slate-800/30 flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile Dropdown Items - FIXED VERSION */}
                  {openDropdown === item.name && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.items.map((subItem, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            handleMobileDropdownItemClick(subItem);
                          }}
                          className="w-full text-left px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/30 rounded-lg transition-all duration-300"
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
            className="w-full text-left px-5 py-4 text-lg font-medium text-gray-200 hover:text-white hover:bg-slate-800/30 rounded-xl transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
            </div>
            {cartItemCount > 0 && (
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold px-2 py-1 rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Mobile Login/Logout Section */}
          <div className="pt-4 border-t border-slate-700/50">
            {isLoggedIn ? (
              <div className="space-y-2">
                <div className="px-5 py-2 text-gray-400 text-sm font-medium">
                  Welcome, {getDisplayName(user)}
                </div>
                <button
                  onClick={handleProfile}
                  className="w-full text-left px-5 py-4 text-lg font-medium text-gray-200 hover:text-white hover:bg-slate-800/30 rounded-xl transition-all duration-300 flex items-center space-x-3"
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-5 py-4 text-lg font-medium text-red-400 hover:text-red-300 hover:bg-slate-800/30 rounded-xl transition-all duration-300 flex items-center space-x-3"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="w-full px-5 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-lg rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center space-x-3"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
