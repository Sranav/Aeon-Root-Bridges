import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import booking1 from "@assets/images/booking/booking-1.jpg";
import booking2 from "@assets/images/booking/booking-2.jpg";
import booking3 from "@assets/images/booking/booking-3.jpg";
import booking4 from "@assets/images/booking/booking-4.jpg";
import booking5 from "@assets/images/booking/booking-5.jpg";
import booking6 from "@assets/images/booking/booking-6.jpg";
import BookingForm from "./BookingForm";

const VilaBooking = () => {
  const roomImages = [booking1, booking2, booking3,booking4,booking5,booking6]; // Room images 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const images = roomImages; 

  // Handle next/prev image
  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  

  return (
    <div className="pt-8 flex flex-col lg:flex-row gap-6">
      {/* Left Section - Image Slider */}
      <div className="relative lg:w-11/12">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        <button onClick={handlePrevImage} className="absolute lg:top-1/2 xs:top-1/3 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#000" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={handleNextImage} className="absolute lg:top-1/2 xs:top-1/3 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#000" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {/* Thumbnails */}
        <div className="flex mt-4 gap-2 justify-center">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={`w-16 h-16 object-cover cursor-pointer border-2 ${currentIndex === index ? "border-white" : "border-transparent"}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Right Section - Booking Form */}
      <div className="lg:w-1/3 bg-white p-6 shadow-lg" style={{ height: 'auto', transition: 'height 0.3s ease' }}>

        <BookingForm/>
      </div>
    </div>
  );
};

export default VilaBooking;