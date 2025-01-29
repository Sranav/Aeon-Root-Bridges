import React, { useState, useEffect } from 'react';
import banner1 from '@assets/images/Banner1.jpg';
import banner2 from '@assets/images/Banner3.jpg';
import BestExpBanner from '@assets/images/BestExpBanner.jpg';
import HotelSearching from './HotelSearching';
import NavBar from '../Navbar/NavBar';

const BannerSlider = () => {
  const slides = [
    { image: BestExpBanner },
    { image: banner1 },
    { image: banner2 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);

  const goToPrevious = () => {
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 4000);
    return () => clearInterval(interval);
  }, []);

  // Reset animation state after transition duration
  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [isAnimating]);

  // Track scroll position to toggle navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsTransparent(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[800px]">
      {/* NavBar with transparency control */}
      <NavBar transparent={isTransparent} />

      {/* Slider */}
      <div className="relative h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              className="block w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />

            {/* Overlay */}
            <div
  className={`absolute inset-0 bg-black transition-transform duration-700 ease-in-out opacity-30 ${
    isAnimating ? 'transform scale-x-100' : 'transform scale-x-0'
  } `}
/>
          </div>
        ))}
      </div>

      {/* Heading and Subheading */}
      <div
        className={`absolute top-2/4 w-full text-center text-white px-4 transition-transform duration-700 ease-in-out ${
          isAnimating ? 'opacity-0 -translate-y-10' : 'opacity-100 translate-y-0'
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 ">
          Welcome to Your Dream Vacation
        </h1>
        <p className="text-lg md:text-xl font-light font-playfair">
          Discover the best hotels and experiences curated just for you
        </p>
      </div>

      {/* HotelSearching Component */}
      {/* <div className="absolute inset-x-0 ">
        <HotelSearching />
      </div> */}

      {/* Controls */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 p-2 rounded-full"
      >
        &#8249;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 p-2 rounded-full"
      >
        &#8250;
      </button>
    </div>
  );
};

export default BannerSlider;
