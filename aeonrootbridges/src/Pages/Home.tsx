import React from 'react';
import banner from "@assets/images/aeon.webp";
import NavBar from '../components/Navbar/NavBar';

const Home = () => {
  return (
    <><NavBar /><div className="relative w-full  overflow-hidden">
          <img
              src={banner}
              alt="Banner"
              className="w-full h-auto object-cover" />
          <div className="absolute z-10 top-0 left-0 w-full h-full bg-[linear-gradient(270deg,_rgba(5,_16,_54,_0.5)_0%,_#051036_72.43%)] opacity-85"></div>
      </div></>
  );
};

export default Home;
