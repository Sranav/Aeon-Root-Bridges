import React from 'react';
import banner from "@assets/images/aeon.webp";
import NavBar from '../components/Navbar/NavBar';
import BannerSlider from '../components/Navbar/Home/BannerSlider';
import PropertyCarousal from '../components/Navbar/Home/PropertyCarousal';
import AboutSection from '../components/About/AboutSection';
import ServiceSection from '../components/Services/ServiceSection';

const Home = () => {
  return (
    <>
      <NavBar />
      <div>
        <BannerSlider banner={banner} />
      </div>
      <AboutSection/>
      <div className='lg:mx-20 xs:mx-4 pb-10'>
      <div className='pt-[50px]  text-[40px] pb-6'>Checkout Our  Properties
        <div className='text-[20px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, iste sunt! Nihil, natus. Fugit, optio rerum. Tenetur deleniti, </div>
      </div>
      <PropertyCarousal />
      </div>
      <div className='mx-20 pb-10 pt-14'>
        <ServiceSection/>
      </div>
    </>
  );
};

export default Home;
