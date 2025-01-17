import React from 'react';
import banner from "@assets/images/aeon.webp";
import NavBar from '../components/Navbar/NavBar';
import BannerSlider from '../components/Navbar/Home/BannerSlider';
import PropertyCarousal from '../components/Navbar/Home/PropertyCarousal';

const Home = () => {
  return (
    <>
      <NavBar />
      <div>
        <BannerSlider banner={banner} />
      </div>
      <div className='pt-[50px] mx-10 text-[40px]'>Checkout Our New Properties</div>
      <PropertyCarousal />
    </>
  );
};

export default Home;
