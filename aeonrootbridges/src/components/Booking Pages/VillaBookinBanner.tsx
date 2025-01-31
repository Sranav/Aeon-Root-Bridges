import React from 'react';
import villabookingBanner from "@assets/images/villabookingBanner.jpg";
import { FiSearch, FiStar, FiMapPin, FiHome } from 'react-icons/fi';

const VillaBookinBanner = () => {
  return (
    <div className="relative w-full h-[500px] bg-cover bg-center group overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: `url(${villabookingBanner})`, 
          backgroundSize: 'cover', // Ensures the image covers the container
          backgroundPosition: 'center', // Centers the image
        }}
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Animated Text */}
        <div className="max-w-4xl space-y-8 animate-fadeInUp">
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-xl">
            Discover Your Perfect Luxury Retreat
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light">
            Experience unparalleled comfort in our exclusive villas
          </p>

          {/* Search Bar */}
          

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-white">
            <div className="flex items-center justify-center gap-2">
              <FiHome className="text-2xl text-primary-400" />
              <span className="font-medium">200+ Villas</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FiStar className="text-2xl text-primary-400" />
              <span className="font-medium">5-Star Ratings</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FiMapPin className="text-2xl text-primary-400" />
              <span className="font-medium">Prime Locations</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 bg-primary-400 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">24/7</span>
              </div>
              <span className="font-medium">Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-14 rounded-3xl border-4 border-white/50 flex items-start justify-center p-1">
          <div className="w-3 h-3 bg-white/80 rounded-full animate-scrollIndicator"></div>
        </div>
      </div> */}
    </div>
  );
};

export default VillaBookinBanner;