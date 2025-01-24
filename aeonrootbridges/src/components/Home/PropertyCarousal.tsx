import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import Slider from "react-slick";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import banner1 from "@assets/images/Banner1.jpg";
import banner2 from "@assets/images/Banner3.jpg";

const PropertyCarousal: React.FC = () => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const sliderModalRef = useRef<HTMLDivElement | null>(null);

  const images = [
    {
      src: banner1,
      title: "The Lake House",
      price: "INR 16000 / Night",
      // location: "Disle-Sur-Mer, Southwest, France",
      discount: null,
      gallery: [banner1, banner2, banner1],
    },
    {
      src: banner2,
      title: "Restore the Chateau",
      price: "INR 20000 / Night",
      // location: "Disle-Sur-Mer, Southwest, France",
      discount: null,
      gallery: [banner2, banner1, banner2],
    },
    {
      src: banner1,
      title: "Maison Terranova",
      price: "INR 14000 / Night",
      // location: "Disle-Sur-Mer, Southwest, France",
      discount: null,
      gallery: [banner1, banner2, banner1],
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const mainSliderSettings = {
    dots: false,
    arrows:false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true, // Enables automatic sliding
  autoplaySpeed: 3000, // Sets the duration for each slide in milliseconds (3 seconds in this case)
  responsive: [
    {
      breakpoint: 1024, // For small screens
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Enables automatic sliding
  autoplaySpeed: 3000, // Sets the duration for each slide in milliseconds (3 seconds in this case)
      },
    },
  ],
  };

  const modalSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: "ondemand",
  };

  const openSlider = (gallery: string[]) => {
    setCurrentImages(gallery);
    setIsSliderOpen(true);
  };

  const closeSlider = () => {
    setIsSliderOpen(false);
    setCurrentImages([]);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sliderModalRef.current &&
      !sliderModalRef.current.contains(event.target as Node)
    ) {
      closeSlider();
    }
  };

  useEffect(() => {
    if (isSliderOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSliderOpen]);

  return (
    <div className="relative py-10">
      {/* Main Section Carousel */}
      <Slider {...mainSliderSettings} className="w-full h-[500px]">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative bg-black text-white rounded-lg overflow-hidden shadow-lg mx-2"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="relative group overflow-hidden px-4">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-[550px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {image.discount && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold py-1 px-3 rounded">
                  {image.discount}
                </span>
              )}
              <button
                className="absolute lg:bottom-[70%%] xs:bottom-[90%]  right-5 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
                onClick={() => openSlider(image.gallery)}
              >
                📷
              </button>

              <div className=" absolute bottom-0 left-0 right-0 bg-black lg:p-6 xs:p-4 lg:mx-20 xs:mx-6 mb-5 rounded">
                <div className="flex flex-row justify-between">
              <div className="text-[18px] font-bold mb-2 text-white">{image.title}</div>
              {/* <p className="text-sm opacity-75 mb-4 text-white">{image.location}</p> */}
              <div className="text-lg font-semibold text-white">{image.price}</div>
              </div>
              <div className="flex items-center justify-between ">
                <div className="flex lg:gap-4 xs:gap-1 text-xs">
                  <span className="flex items-center gap-1  text-white">
                    🛏️ 3 Beds
                  </span>
                  <span className="flex items-center gap-1 text-white">
                    🛁 2 Baths
                  </span>
                  <span className="flex items-center gap-1 text-white">
                    👥 12 Guests
                  </span>
                </div>
                <button className="bg-white text-black text-sm py-2 px-4 rounded hover:bg-black hover:text-white">
                  Book Now
                </button>
              </div>
            </div>
            </div>
            
          </div>
        ))}
      </Slider>

      {/* Slider Modal */}
      {isSliderOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
          <div
            ref={sliderModalRef}
            className="relative w-11/12 md:w-3/4 lg:w-1/2 bg-black p-4 rounded"
          >
            <button
              className="absolute top-5 right-5 text-white bg-black w-10 h-10 rounded-full z-50"
              onClick={closeSlider}
            >
              ✖
            </button>
            <Slider {...modalSliderSettings} className="relative z-10">
              {currentImages.map((image, idx) => (
                <div key={idx}>
                  <img
                    src={image}
                    alt={`Slide ${idx + 1}`}
                    className="w-full h-[600px] object-cover rounded"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyCarousal;
