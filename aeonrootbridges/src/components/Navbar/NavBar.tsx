import React, { useState, useEffect } from 'react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Track scroll position to toggle navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-20 transition-colors duration-300 ${
        isScrolled ? 'bg-gray-900 shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo Section */}
        <a
          href="#"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Aeo Root Bridges
          </span>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
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

        {/* Fullscreen Menu (Visible on small screens) */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center transition-all md:hidden`}
        >
          <ul className="font-medium flex flex-col space-y-6 text-white text-2xl">
            <li>
              <a href="#" className="block py-2 px-3 hover:text-gray-400">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 hover:text-gray-400">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 hover:text-gray-400">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 hover:text-gray-400">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 hover:text-gray-400">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Horizontal Menu (Visible on larger screens) */}
        <div className="hidden md:flex w-full md:w-auto">
          <ul className="font-medium flex flex-row space-x-8 text-white">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white hover:text-gray-400"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white hover:text-gray-400"
              >
                About
              </a>
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
                Pricing
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
