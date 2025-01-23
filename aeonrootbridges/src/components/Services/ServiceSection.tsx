import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

import trekking from '@assets/images/trekking.webp';
import Farm from '@assets/images/farm.webp';
import CampFire from '@assets/images/campfire.jpg';
import banner1 from '@assets/images/Banner1.jpg';

const ServiceSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className="">
      <h2 className="text-4xl font-bold mb-12 text-white">Offer the Best Services
      to Your Stay</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16">
        {/* Service 1 */}
        <div className="relative group" data-aos="fade-up">
          <img
            src={trekking}
            alt="Spa"
            className="w-full h-[400px] object-cover"
          />

          {/* Header Section */}
          <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-white text-black mx-4 mb-4 transition-all transform duration-700 ease-in-out group-hover:translate-y-[-150px] border-t-4 border-black">
            <h3 className="text-2xl font-semibold mb-4">Trekking</h3>
          </div>

          {/* Sub-content Section */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-black bg-white mx-4 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out ">
            <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus perspiciatis</p>
            <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">Learn More</a>
          </div>
        </div>


        {/* Service 2 */}
        <div className="relative group" data-aos="fade-up">
          <img
            src={CampFire}
            alt="Spa"
            className="w-full h-[400px] object-cover"
          />

          {/* Header Section */}
          <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-white text-black mx-4 mb-4 transition-all transform duration-700 ease-in-out group-hover:translate-y-[-150px] border-t-4 border-black">
            <h3 className="text-2xl font-semibold mb-4">Camp Fire</h3>
          </div>

          {/* Sub-content Section */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white text-black mx-4 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
            <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus perspiciatis</p>
            <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">Learn More</a>
          </div>
        </div>

        {/* Service 3 */}
        <div className="relative group" data-aos="fade-up">
          <img
            src={Farm}
            alt="Spa"
            className="w-full h-[400px] object-cover"
          />

          {/* Header Section */}
          <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-white text-black mx-4 mb-4 transition-all transform duration-700 ease-in-out group-hover:translate-y-[-150px] border-t-4 border-black">
            <h3 className="text-2xl font-semibold mb-4">Farm</h3>
          </div>

          {/* Sub-content Section */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white text-black mx-4 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
            <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus perspiciatis</p>
            <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">Learn More</a>
          </div>
        </div>

        {/* Service 4 */}
        <div className="relative group" data-aos="fade-up">
          <img
            src={banner1}
            alt="Spa"
            className="w-full h-[400px] object-cover"
          />

          {/* Header Section */}
          <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-white text-black mx-4 mb-4 transition-all transform duration-700 ease-in-out group-hover:translate-y-[-150px] border-t-4 border-black">
            <h3 className="text-2xl font-semibold mb-4">Lorem</h3>
          </div>

          {/* Sub-content Section */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white text-black mx-4 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
            <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus perspiciatis</p>
            <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
