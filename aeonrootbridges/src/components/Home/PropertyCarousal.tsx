import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import banner1 from '@assets/images/Banner1.jpg';
import banner2 from '@assets/images/Banner3.jpg';

const PropertyCarousal: React.FC = () => {
  const images = [
    { src: banner1, title: "Luxury Room 1", description: "Relax in a spacious and luxurious room with modern amenities." },
    { src: banner2, title: "Luxury Room 2", description: "Experience the best views and comfort in our premium rooms." },
    { src: banner1, title: "Luxury Room 3", description: "A perfect place to unwind with elegant decor and comfort." },
    { src: banner2, title: "Luxury Room 4", description: "Indulge in world-class amenities and breathtaking views." },
    { src: banner1, title: "Luxury Room 5", description: "A serene escape with beautiful interiors and views." },
    { src: banner2, title: "Luxury Room 6", description: "Stay in a contemporary room designed for relaxation and luxury." },
    { src: banner1, title: "Luxury Room 7", description: "Unwind in style with spacious rooms and top-notch amenities." },
    { src: banner2, title: "Luxury Room 8", description: "Enjoy a luxurious experience with exceptional service and comfort." },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [];
  for (let i = 0; i < images.length; i += 4) {
    slides.push(images.slice(i, i + 4));
  }

  const slideCount = slides.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="relative max-w-full mx-auto">
      <div className="absolute top-[-70px] pr-10 right-0 z-20" data-aos="fade-up" data-aos-delay="100">
        <button
          onClick={prevSlide}
          className="bg-white text-black w-10 h-10 rounded-full z-10 hover:bg-gray-700 transition"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="bg-white text-black w-10 h-10 rounded-full z-10 hover:bg-gray-700 transition ml-4"
        >
          &#10095;
        </button>
      </div>

      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide, slideIndex) => (
            <div key={slideIndex} className="flex min-w-full flex-shrink-0">
              {slide.map((image, index) => (
                <div
                  key={index}
                  className="relative group min-w-[25%] overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                >
                  <img
                    src={image.src}
                    alt={`carousel-image-${slideIndex * 4 + index}`}
                    className="w-[400px] h-[350px] object-cover shadow-xl transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white text-black py-2 px-4 rounded hover:bg-blue-600 hover:text-white ">
                      Book Now
                    </button>
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-semibold text-white">{image.title}</h3>
                    <p className="text-sm text-white opacity-80 mt-2">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center pt-16">
        <button className="bg-white text-black py-4 px-4 rounded hover:bg-black hover:text-white">
          Explore Our Properties
        </button>
      </div>
    </div>
  );
};

export default PropertyCarousal;
