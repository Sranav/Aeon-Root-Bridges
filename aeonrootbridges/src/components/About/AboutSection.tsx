import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import banner1 from '@assets/images/Banner1.jpg';
import banner2 from '@assets/images/Banner3.jpg';

const AboutSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="bg-gradient-to-r to-black py-20">
      <div className="lg:mx-20 px-6 lg:px-16 grid gap-16 lg:grid-cols-2 items-center">
        {/* Text Section */}
        <div className="text-white space-y-6" data-aos="fade-up">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6" data-aos="fade-up" data-aos-delay="300">
            Experience Luxury at Aeon Resort
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed opacity-90" data-aos="fade-up" data-aos-delay="400">
            Escape to paradise with breathtaking views, world-class amenities, and unparalleled comfort. At Aeon Resort, we offer an experience that combines the serenity of nature with the luxury of modern living.
          </p>
          <p className="text-lg sm:text-xl leading-relaxed opacity-90" data-aos="fade-up" data-aos-delay="500">
            Whether you're here for a romantic getaway, family vacation, or a peaceful retreat, our rooms are designed for relaxation and your ultimate comfort. Book your stay now and immerse yourself in tranquility.
          </p>
          {/* Call-to-Action Button */}
          <div className="mt-8" data-aos="fade-up" data-aos-delay="600">
            <a href="#booking" className="inline-block bg-white text-black py-3 px-6 rounded-lg text-lg font-semibold hover:bg-black hover:text-white transition duration-300">
              Book Your Stay
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex flex-col gap-6 lg:gap-12" data-aos="fade-up" data-aos-delay="700">
          <div 
            className="relative rounded-lg overflow-hidden shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl transform" 
            data-aos="zoom-in" 
            data-aos-delay="800"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40"></div>
            <img className="w-full h-[600px] object-cover" src={banner1} alt="resort view 1" data-aos="fade-right" data-aos-delay="900" />
          </div>

          {/* Optionally, add the second image */}
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
