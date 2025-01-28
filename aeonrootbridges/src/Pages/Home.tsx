import React from 'react';
import banner from "@assets/images/aeon.webp";
import NavBar from '../components/Navbar/NavBar';
import BannerSlider from '../components/Home/BannerSlider';
import PropertyCarousal from '../components/Home/PropertyCarousal';
import AboutSection from '../components/About/AboutSection';
import ServiceSection from '../components/Services/ServiceSection';
import BestExperiance from '../components/Home/BestExperiance';
import Testimonial from '../components/Home/Testimonial';
import Gallery from '../components/Home/Gallery';
import HomeContactFrom from '../components/Home/HomeContactFrom';
import HomeFooter from '../components/Home/HomeFooter';

const Home = () => {
  return (
    <>
      <NavBar />
      <div>
        <BannerSlider banner={banner} />
      </div>
      <div className='lg:pt-10 xs:pt-48'>
        <AboutSection />
      </div>
      <div className='lg:mx-20 xs:mx-4 pb-10'>
        <div className='pt-[50px]  text-[40px] pb-6'>Checkout Our  Properties
          <div className='text-[20px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, iste sunt! Nihil, natus. Fugit, optio rerum. Tenetur deleniti, </div>
        </div>
        <PropertyCarousal />
      </div>
      <div className='lg:mx-20 pb-24 pt-14 xs:px-6 lg:px-0'>
        <ServiceSection />
      </div>
      <div className=' pb-10 pt-14'>

        <BestExperiance />
      </div>
      <div className='lg:mx-20 pb-10 pt-14'>

        <Testimonial />
      </div>
      <div className='lg:mx-20 pb-10 pt-14 xs:px-6 lg:px-0'>
        <div className=' text-[40px] pb-6'>Our Property Gallery
          <div className='text-[20px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, iste sunt! Nihil, natus. Fugit, optio rerum. Tenetur deleniti, </div>
        </div>
        <Gallery />
      </div>
      <div className='lg:mx-20 pb-10 pt-14 xs:px-6 lg:px-0'>
        {/* <div className=' text-[40px] pb-6'>Our Property Gallery
          <div className='text-[20px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, iste sunt! Nihil, natus. Fugit, optio rerum. Tenetur deleniti, </div>
        </div> */}
        <HomeContactFrom/>
      </div>
      <div className='lg:mx-20 pb-10 pt-14 xs:px-6 lg:px-0'>
      <HomeFooter/>
      </div>
    </>
  );
};

export default Home;
