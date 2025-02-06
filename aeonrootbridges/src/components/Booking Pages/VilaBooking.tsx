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
  const roomImages = [booking1, booking2, booking3]; // Room images
  const villaImages = [booking4, booking5, booking6]; // Villa images
  const hutImages = [booking3, booking4]; // Hut images (if different)
  const [currentIndex, setCurrentIndex] = useState(0);
 
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [totalNights, setTotalNights] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showVillaModal, setShowVillaModal] = useState(false); // New state for the modal
  const [isVillaConfirmed, setIsVillaConfirmed] = useState(false); // For confirming villa selection
  const [isDateAvailable, setIsDateAvailable] = useState(true);
  const [availabilityMessage, setAvailabilityMessage] = useState("");

  // Constants
  const maxGuestsPerRoom = 3;
  const maxRooms = 2;
  const maxVillaCapacity = 8;
  const maxHutCapacity = 6;
  const today = new Date().toISOString().split("T")[0];

  const navigate = useNavigate();

  // Load Razorpay script
  

 
  // Fetch total cost and nights from the backend
  

  // Handle search (submit)
  

  // Handle next/prev image
  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Handle next/prev page
 

  

  const [accommodationType, setAccommodationType] = useState("rooms"); // To track the selected accommodation type

 

  const images = accommodationType === "villa" ? villaImages : accommodationType === "huts" ? hutImages : roomImages;

 

  

  

  return (
    <div className="pt-8 flex flex-col lg:flex-row gap-6">
      {/* Left Section - Image Slider */}
      <div className="relative lg:w-11/12">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        <button onClick={handlePrevImage} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#000" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={handleNextImage} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
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