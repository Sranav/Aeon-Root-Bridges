import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import banner1 from '@assets/images/Banner1.jpg';
import Aeonabout from '@assets/images/Aeonabout.jpeg';

const AboutSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="bg-black py-16 lg:py-20">
      <div className="container mx-auto px-6 lg:px-16 grid gap-12 lg:grid-cols-2 items-center">
        {/* Left Section (Image Collage) */}
        <div className="space-y-6" data-aos="fade-right">
          {/* Top Image */}
          {/* <div className="relative overflow-hidden rounded-lg shadow-md">
            <img
              src={banner1}
              alt="Luxury Villa Exterior"
              className="w-full h-[350px] object-cover transition-transform transform hover:scale-105"
            />
          </div> */}
          {/* Bottom Image */}
          <div className="relative overflow-hidden rounded-lg shadow-md">
            <img
              src={Aeonabout}
              alt="Luxury Villa Interior"
              className="w-full h-[750px] object-cover transition-transform transform hover:scale-105"
            />
          </div>
        </div>

        {/* Right Section (Text and Details) */}
        <div className="space-y-8" data-aos="fade-up">
          <div className="text-[40px]  text-white leading-tight">
            Get to Know About Luxury & Comfortable Villas
          </div>
          <p className="text-[20px] text-white">
            We’re providing a great opportunity for staying in top luxury villas.
            Lorem ipsum dolor sit amet, con adipiscing elit tiam convallis elit id
            impedie. Quisq commodo simply free ornare tortor. If you are going to
            use a passage.
          </p>
          <ul className="space-y-3 text-lg text-white">
            <li className="flex items-center">
              <span className="w-6 h-6 mr-3 bg-white rounded-full flex justify-center items-center text-black font-bold">
                ✓
              </span>
              Guarantee happiness
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 mr-3 bg-white rounded-full flex justify-center items-center text-black font-bold">
                ✓
              </span>
              Search & book the best
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 mr-3 bg-white rounded-full flex justify-center items-center text-black font-bold">
                ✓
              </span>
              Most luxury villas available
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 mr-3 bg-white rounded-full flex justify-center items-center text-black font-bold">
                ✓
              </span>
              Premier choice for vacation rentals
            </li>
          </ul>
          <div className="mt-6">
            <a
              href="#"
              className="bg-white text-black py-3 px-8 rounded-lg text-lg font-semibold shadow-md transition duration-300"
            >
              Discover More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
