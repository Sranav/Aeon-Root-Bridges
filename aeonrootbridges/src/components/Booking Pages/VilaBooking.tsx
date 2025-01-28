import React, { useState } from "react";
import booking1 from "@assets/images/booking/booking-1.jpg";
import booking2 from "@assets/images/booking/booking-2.jpg";
import booking3 from "@assets/images/booking/booking-3.jpg";
import booking4 from "@assets/images/booking/booking-4.jpg";
import booking5 from "@assets/images/booking/booking-5.jpg";
import booking6 from "@assets/images/booking/booking-6.jpg";
import AeonLogo from "@assets/images/aeonlogo1.png";

const VilaBooking = () => {
  const images = [booking1, booking2, booking3,booking4,booking5,booking6];
  const [currentIndex, setCurrentIndex] = useState(0);

  // State for booking
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [bookFullVilla, setBookFullVilla] = useState(false);

  // Constants
  const maxGuestsPerRoom = 3;
  const maxGuestsForRooms = rooms * maxGuestsPerRoom; // Total allowed guests for selected rooms
  const totalGuests = adults + children;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!bookFullVilla && totalGuests > maxGuestsForRooms) {
      alert(
        `The total number of guests exceeds the limit of ${maxGuestsForRooms} for ${rooms} room(s). Please reduce the number of guests or select "Book Full Villa".`
      );
      return;
    }

    alert(bookFullVilla ? "Booking Full Villa!" : "Booking Successful!");
    // Add logic to submit the booking details
  };

  return (
    <div className="pt-8 flex flex-col lg:flex-row gap-6">
      {/* Left Section - Image Slider */}
      <div className="relative lg:w-11/12">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-[500px] object-cover "
        />
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="#000"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="#000"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {/* Thumbnail Images */}
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setCurrentIndex(index)}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                currentIndex === index ? "border-black" : "border-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Section - Booking Form */}
      <div className="lg:w-1/3 bg-white p-6 h-[500px]  shadow-lg">
        {/* <div className="text-center mb-6">
          <div className="flex justify-center">
            <img src={AeonLogo} alt="Logo" className="w-20 h-20 object-contain" />
          </div>
          <p className="text-3xl font-bold text-black">
            INR 1330 <span className="text-lg font-normal">/days</span>
          </p>
        </div> */}
        <form className="space-y-4" onSubmit={handleSearch}>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Check In</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-2 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Check Out</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-2 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Rooms</label>
            <input
              type="number"
              min="1"
              value={rooms}
              onChange={(e) => setRooms(parseInt(e.target.value) || 1)}
              className="w-full border border-gray-300 rounded-lg p-2 text-black"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Adults</label>
              <input
                type="number"
                min="1"
                value={adults}
                onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                className="w-full border border-gray-300 rounded-lg p-2 text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Children</label>
              <input
                type="number"
                min="0"
                value={children}
                onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-lg p-2 text-black"
              />
            </div>
          </div>
          {totalGuests > maxGuestsForRooms && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="bookFullVilla"
                checked={bookFullVilla}
                onChange={() => setBookFullVilla(!bookFullVilla)}
              />
              <label htmlFor="bookFullVilla" className="text-sm text-black">
                Book Full Villa (Unlimited Guests)
              </label>
            </div>
          )}
          
          <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-red-500 w-full leading-[50px]">
          {bookFullVilla ? "Book Full Villa" : "Search"}
                        </button>
        </form>
      </div>
    </div>
  );
};

export default VilaBooking;
