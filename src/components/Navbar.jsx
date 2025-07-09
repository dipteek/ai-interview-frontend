"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaUser,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
  FaCheckCircle,
  FaBolt,
  FaUsers,
  FaBuilding,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";




const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  
const isAuthenticated = !!session;

  // Update scroll state for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (!target.closest(".dropdown-container")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-white py-4"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative h-10 w-10 mr-2 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-indigo-600">
                  AI Interview
                </span>
                <span className="text-xs text-gray-500 -mt-1 hidden sm:block">
                  Professional Solutions
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation (only visible on large screens) */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Main navigation links */}
            <div className="flex">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-indigo-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all"
              >
                Home
              </Link>

              {/* <Link
                href="/interview"
                className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-indigo-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all"
              >
                Interview
              </Link> */}

              {/* Products Dropdown */}
              {/* <div className="relative dropdown-container">
                <button 
                  onClick={() => toggleDropdown('products')}
                  className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-indigo-600 transition-colors flex items-center gap-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all"
                >
                  Products
                  <FaChevronDown 
                    className={`h-3 w-3 transition-transform ${activeDropdown === 'products' ? 'rotate-180' : ''}`} 
                  />
                </button>
                {activeDropdown === 'products' && (
                  <div className="absolute mt-2 w-56 bg-white rounded-md shadow-lg p-2 z-50 animate-fadeIn">
                    <div className="grid grid-cols-1 gap-1">
                      <Link href="/product-1" className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md flex items-center gap-2 group">
                        <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                          <FaCheckCircle className="h-3 w-3" />
                        </div>
                        <div>
                          <p className="font-medium">Product One</p>
                          <p className="text-xs text-gray-500">Description goes here</p>
                        </div>
                      </Link>
                      <Link href="/product-2" className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md flex items-center gap-2 group">
                        <div className="w-6 h-6 rounded bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                          <FaBolt className="h-3 w-3" />
                        </div>
                        <div>
                          <p className="font-medium">Product Two</p>
                          <p className="text-xs text-gray-500">Description goes here</p>
                        </div>
                      </Link>
                      <Link href="/all-products" className="mt-1 px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md flex items-center justify-between group border-t border-gray-100 pt-2">
                        <span>View all products</span>
                        <FaChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                )}
              </div> */}

              {/* Solutions Dropdown */}
              <div className="relative dropdown-container">
                <button
                  onClick={() => toggleDropdown("solutions")}
                  className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-indigo-600 transition-colors flex items-center gap-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all"
                >
                  Interview
                  <FaChevronDown
                    className={`h-3 w-3 transition-transform ${
                      activeDropdown === "solutions" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "solutions" && (
                  <div className="absolute mt-2 w-56 bg-white rounded-md shadow-lg p-2 z-50 animate-fadeIn">
                    <Link
                      href="/interview"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md"
                    >
                      MCQS
                    </Link>
                    <Link
                      href="/voice_interview"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md"
                    >
                      Voice/Type
                    </Link>
                    <Link
                      href="/coding"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md"
                    >
                      Coding
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-indigo-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all"
              >
                Resume
              </Link>

              {/* Resources Dropdown */}
              {isAuthenticated?<div className="relative dropdown-container">
                <button
                  onClick={() => toggleDropdown("resources")}
                  className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-indigo-600 transition-colors flex items-center gap-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all"
                >
                  Dashboard
                  <FaChevronDown
                    className={`h-3 w-3 transition-transform ${
                      activeDropdown === "resources" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "resources" && (
                  <div className="absolute mt-2 w-56 bg-white rounded-md shadow-lg p-2 z-50 animate-fadeIn">
                    <Link
                      href="/analytics"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md"
                    >
                      Analytics Code
                    </Link>
                    <Link
                      href="/dashboard-code"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md"
                    >
                      Code Report
                    </Link>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-md"
                    >
                      Interview
                    </Link>
                  </div>
                )}
              </div>:"" }

              {/* <Link href="/pricing" className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-indigo-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all">
                Pricing
              </Link> */}

              {/* {
                isAuthenticated?<Link
                href="/dashboard"
                className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-indigo-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all"
              >
                Dashboard
              </Link>:
             <Link
                href="/contact"
                className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-indigo-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all"
              >
                Contact
              </Link>
              } */}
              
            </div>

            {/* Right side elements (login, CTA) */}
            <div className="flex items-center pl-6 space-x-4 border-l border-gray-200">
              {/* Conditional rendering based on authentication status */}
              {!session ? (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium border border-black text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Login
                  </Link>

                  <Link
                    href="/interview"
                    className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-700">
                      Hi, {session.user?.name || session.user?.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm font-medium border border-red-500 text-red-600 bg-white hover:bg-red-50 transition-all flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button (visible on medium and small screens) */}
          <div className="lg:hidden flex items-center space-x-4">
            {/* Hamburger button */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <FaBars className="block h-6 w-6" />
              ) : (
                <FaTimes className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state (visible on medium and small screens) */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100 pt-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pt-3 pb-4 bg-white rounded-lg mx-2">
          {/* Navigation links */}
          <div className="space-y-1">
            <Link
              href="/"
              className="flex items-center px-4 py-3 text-base font-medium text-gray-800 hover:text-indigo-600 border-b border-gray-100"
            >
              <div className="flex items-center">
                <div className="bg-indigo-100 p-2 rounded-md mr-3">
                  <FaHome className="h-4 w-4 text-indigo-600" />
                </div>
                <span>Home</span>
              </div>
            </Link>

            {/* Mobile dropdown for Products */}
            {/* <div className="border-b border-gray-100">
              <button 
                onClick={() => toggleDropdown('mobileProducts')}
                className="flex justify-between items-center w-full px-4 py-3 text-base font-medium text-gray-800 hover:text-indigo-600"
              >
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-2 rounded-md mr-3">
                    <FaBolt className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span>Products</span>
                </div>
                <FaChevronDown 
                  className={`h-4 w-4 transition-transform duration-300 text-gray-500 ${activeDropdown === 'mobileProducts' ? 'rotate-180' : ''}`} 
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === 'mobileProducts' ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-gray-50 rounded-md m-2 p-2 space-y-1">
                  <Link href="/product-1" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-md">
                    <div className="w-1 h-1 bg-indigo-600 rounded-full mr-2"></div>
                    Product One
                  </Link>
                  <Link href="/product-2" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-md">
                    <div className="w-1 h-1 bg-indigo-600 rounded-full mr-2"></div>
                    Product Two
                  </Link>
                  <Link href="/all-products" className="flex items-center justify-between px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-gray-100 rounded-md border-t border-gray-200 mt-1 pt-1">
                    <span>View all products</span>
                    <FaChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div> */}

            <Link
              href="/interview"
              className="flex items-center px-4 py-3 text-base font-medium text-gray-800 hover:text-indigo-600 border-b border-gray-100"
            >
              <div className="flex items-center">
                <div className="bg-indigo-100 p-2 rounded-md mr-3">
                  <FaUser className="h-4 w-4 text-indigo-600" />
                </div>
                <span>Interview</span>
              </div>
            </Link>

            {/* Mobile dropdown for Solutions */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleDropdown("mobileSolutions")}
                className="flex justify-between items-center w-full px-4 py-3 text-base font-medium text-gray-800 hover:text-indigo-600"
              >
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-2 rounded-md mr-3">
                    <FaUsers className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span>Solutions</span>
                </div>
                <FaChevronDown
                  className={`h-4 w-4 transition-transform duration-300 text-gray-500 ${
                    activeDropdown === "mobileSolutions" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeDropdown === "mobileSolutions"
                    ? "max-h-48 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="bg-gray-50 rounded-md m-2 p-2 space-y-1">
                  <Link
                    href="/enterprise"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-md"
                  >
                    <div className="w-1 h-1 bg-indigo-600 rounded-full mr-2"></div>
                    Enterprise
                  </Link>
                  <Link
                    href="/small-business"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-md"
                  >
                    <div className="w-1 h-1 bg-indigo-600 rounded-full mr-2"></div>
                    Small Business
                  </Link>
                  <Link
                    href="/personal"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-md"
                  >
                    <div className="w-1 h-1 bg-indigo-600 rounded-full mr-2"></div>
                    Personal
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile dropdown for Resources */}
            {isAuthenticated?<div className="border-b border-gray-100">
              <button
                onClick={() => toggleDropdown("mobileResources")}
                className="flex justify-between items-center w-full px-4 py-3 text-base font-medium text-gray-800 hover:text-indigo-600"
              >
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-2 rounded-md mr-3">
                    <FaCheckCircle className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span>Dashboard</span>
                </div>
                <FaChevronDown
                  className={`h-4 w-4 transition-transform duration-300 text-gray-500 ${
                    activeDropdown === "mobileResources" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeDropdown === "mobileResources"
                    ? "max-h-48 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="bg-gray-50 rounded-md m-2 p-2 space-y-1">
                  <Link
                    href="/analytics"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-md"
                  >
                    <div className="w-1 h-1 bg-indigo-600 rounded-full mr-2"></div>
                    Analytics Code
                  </Link>
                  <Link
                    href="/dashboard-code"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-md"
                  >
                    <div className="w-1 h-1 bg-indigo-600 rounded-full mr-2"></div>
                    Code Report
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-md"
                  >
                    <div className="w-1 h-1 bg-indigo-600 rounded-full mr-2"></div>
                    Interview Report
                  </Link>
                </div>
              </div>
            </div>:""}

            {/* <Link href="/pricing" className="flex items-center px-4 py-3 text-base font-medium text-gray-800 hover:text-indigo-600 border-b border-gray-100">
              <div className="flex items-center">
                <div className="bg-indigo-100 p-2 rounded-md mr-3">
                  <FaBuilding className="h-4 w-4 text-indigo-600" />
                </div>
                <span>Pricing</span>
              </div>
            </Link> */}

            <Link
              href="/contact"
              className="flex items-center px-4 py-3 text-base font-medium text-gray-800 hover:text-indigo-600 border-b border-gray-100"
            >
              <div className="flex items-center">
                <div className="bg-indigo-100 p-2 rounded-md mr-3">
                  <FaUsers className="h-4 w-4 text-indigo-600" />
                </div>
                <span>Contact</span>
              </div>
            </Link>
          </div>

          {/* Mobile buttons section */}
            <div className="px-4 py-4 space-y-3 mt-2">
              {!session ? (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/login"
                      className="flex items-center justify-center px-3 py-2 text-sm font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-md shadow-sm"
                    >
                      <FaUser className="h-4 w-4 mr-2" />
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="flex items-center justify-center px-3 py-2 text-sm font-medium border border-indigo-300 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md shadow-sm"
                    >
                      <FaBuilding className="h-4 w-4 mr-2" />
                      Sign Up
                    </Link>
                  </div>
                  <Link
                    href="/get-started"
                    className="block w-full px-4 py-3 text-base font-medium text-center bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow-md transition-all duration-300 transform hover:translate-y-px"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="text-center text-sm text-gray-700 mb-2">
                    Welcome, {session.user?.name || session.user?.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-3 text-base font-medium text-center bg-red-600 text-white rounded-md hover:bg-red-700 shadow-md transition-all duration-300 transform hover:translate-y-px flex items-center justify-center"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
    </nav>
  );
};

export default Navbar;
