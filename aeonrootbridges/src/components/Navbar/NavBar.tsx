import React, { useState, useEffect } from 'react';
import AeonLogo from "@assets/images/aeonlogo1.png";
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Track scroll position to toggle navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-20 transition-colors duration-300 ${isScrolled ? "bg-black shadow-md" : "bg-transparent"
        }`}
    >
      <div className="lg:mx-20 flex flex-wrap items-center justify-between p-4">
        {/* Logo Section */}
        <a
          href="#"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={AeonLogo} className="h-16" alt="Aeon Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Aeon Root Bridges
          </span>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Fullscreen Menu (Overlay for small screens) */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col justify-center items-center transition-all duration-700 ${isMenuOpen ? "opacity-100 visible translate-x-0" : "opacity-0 invisible translate-x-full"
            }`}
        >
          <button
            onClick={closeMenu}
            className="absolute top-5 right-5 text-white text-3xl focus:outline-none"
            aria-label="Close menu"
          >
            &#10005; {/* Close (X) Icon */}
          </button>
          <ul className="font-medium flex flex-col space-y-6 text-white text-2xl">
            <li>
            <Link
                to="/"
                className="block py-2 px-3 text-white hover:text-gray-400"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 hover:text-gray-400"
                onClick={closeMenu}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 hover:text-gray-400"
                onClick={closeMenu}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 hover:text-gray-400"
                onClick={closeMenu}
              >
                Gallary
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 hover:text-gray-400"
                onClick={closeMenu}
              >
                Contact
              </a>
            </li>
            <li>
            <li className='text-center'>
               <button className="bg-white text-black text-sm py-2 px-4 rounded hover:bg-black hover:text-white" onClick={closeMenu}>
                               <Link to="/villabooking">Book Now</Link> 
                              </button>
            </li>
            </li>
          </ul>
        </div>

        {/* Horizontal Menu (Visible on larger screens) */}
        <div className="hidden md:flex w-full md:w-auto">
          <ul className="font-medium flex flex-row space-x-8 text-white">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white hover:text-gray-400"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/villabooking"
                className="block py-2 px-3 text-white hover:text-gray-400"
              >
                About
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white hover:text-gray-400"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white hover:text-gray-400"
              >
                Gallary
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white hover:text-gray-400"
              >
                Contact
              </a>
            </li>
            <li>
              <button className="bg-white text-black text-sm py-2 px-4 rounded hover:bg-black hover:text-white">
                <Link to="/villabooking">Book Now</Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
