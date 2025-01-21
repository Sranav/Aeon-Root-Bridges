import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import BestExpBanner from '@assets/images/BestExpBanner.jpg';
import villaIcon from '@assets/images/villaIcon.png';
import TrustedIcon from '@assets/images/trusted.png';
import UnparalledIcon from '@assets/images/unparalled.png';
import SecureIcon from '@assets/images/secure.png';
import VillaCenterIcon from '@assets/images/villacenter.png';

const BestExperiance = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of the animation
      easing: 'ease-out', // Easing for the animation
      once: true, // Animation triggers once when the element comes into view
    });
  }, []);

  return (
    <div className='relative pb-10'>
      <div
        className='absolute inset-0 bg-black opacity-50 z-0 bg-cover bg-center h-[700px] bg-fixed '
        style={{
          backgroundImage: `url(${BestExpBanner})`,
        }}
      ></div>
      <div className='relative pt-[70px] z-10 flex flex-col justify-center items-center h-full'>
        <div className='text-[20px] text-center'>Get best experience </div>
        <div className='text-[40px] text-center'>The Only Place you’ll find Outside the Home</div>
        <div className='flex flex-row gap-4 justify-center pt-6'>
          <div
            data-aos="fade-up" // Add AOS data attribute for animation
            className='bg-white py-6 px-6 flex items-center'
          >
            <div className='mr-4'>
              <img src={villaIcon} alt="" className='w-[100px]' />
            </div>
            <div>
              <div className='text-black text-[26px] font-semibold'>Luxury Villas</div>
              <div className='text-black text-[18px]'>There are many variations of passages of Lorem Ipsum available.</div>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="200" // Delay animation for the second box
            className='bg-white py-6 px-6 flex items-center'
          >
            <div className='mr-4'>
              <img src={TrustedIcon} alt="" className='w-[100px]' />
            </div>
            <div>
              <div className='text-black text-[26px] font-semibold'>Trusted Experience</div>
              <div className='text-black text-[18px]'>There are many variations of passages of Lorem Ipsum available.</div>
            </div>
          </div>
        </div>
        <div className='flex flex-row gap-4 justify-center pt-6'>
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className='bg-white py-6 px-6 flex items-center'
          >
            <div className='mr-4'>
              <img src={UnparalledIcon} alt="" className='w-[100px]' />
            </div>
            <div>
              <div className='text-black text-[26px] font-semibold'>Unparalleled Service</div>
              <div className='text-black text-[18px]'>There are many variations of passages of Lorem Ipsum available.</div>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className='bg-white py-6 px-6 flex items-center'
          >
            <div className='mr-4'>
              <img src={SecureIcon} alt="" className='w-[100px]' />
            </div>
            <div>
              <div className='text-black text-[26px] font-semibold'>Secure Payments</div>
              <div className='text-black text-[18px]'>There are many variations of passages of Lorem Ipsum available.</div>
            </div>
          </div>
        </div>
      </div>
      <div data-aos="fade-up"
            data-aos-delay="600" className='flex justify-center relative pt-10'>
        <button className="bg-white text-black py-4 px-10 rounded hover:bg-black hover:text-white">
          Book Now
        </button>
      </div>
    </div>
  );
}

export default BestExperiance;
