import React, { useState, useEffect } from "react";
import booking1 from "@assets/images/booking/booking-1.jpg";
import booking2 from "@assets/images/booking/booking-2.jpg";
import booking3 from "@assets/images/booking/booking-3.jpg";
import booking4 from "@assets/images/booking/booking-4.jpg";
import booking5 from "@assets/images/booking/booking-5.jpg";
import booking6 from "@assets/images/booking/booking-6.jpg";

const VilaBooking = () => {
  const images = [booking1, booking2, booking3, booking4, booking5, booking6];
  const [currentIndex, setCurrentIndex] = useState(0);

  // State for booking
  const [villaRooms, setVillaRooms] = useState(1);
  const [hutRooms, setHutRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [bookFullVilla, setBookFullVilla] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [accommodationType, setAccommodationType] = useState("villa");
  const [isGuestInputDisabled, setIsGuestInputDisabled] = useState(false);
  const [page, setPage] = useState(1); // Pagination state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Constants
  const maxGuestsPerRoom = 3;
  const maxRoomsInVilla = 2;
  const maxVillaCapacity = 8;
  const maxGuestsForRooms = (villaRooms + hutRooms) * maxGuestsPerRoom;
  const totalGuests = adults + children;
  const today = new Date().toISOString().split("T")[0];

  // Update guest input disabled status and room count when guest count changes
  useEffect(() => {
    if (totalGuests > maxVillaCapacity) {
      setBookFullVilla(true);
      setIsGuestInputDisabled(true);
    } else {
      setIsGuestInputDisabled(false);
      const requiredVillaRooms = Math.ceil(totalGuests / maxGuestsPerRoom);
      setVillaRooms(Math.min(requiredVillaRooms, maxRoomsInVilla));
    }
  }, [totalGuests]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    if (page === 1) {
      setPage(2); // Move to the second page
    } else {
      alert("Booking Submitted!");
    }
  };

  const handlePrevPage = () => {
    if (page === 2) {
      setPage(1); // Go back to the first page
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(bookFullVilla ? "Booking Full Villa!" : "Booking Successful!");
  };

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const calculateTotalCost = () => {
    const nights = calculateNights();
    if (accommodationType === "villa") {
      return bookFullVilla ? nights * 5000 : nights * 2000 * villaRooms;
    } else if (accommodationType === "hut") {
      return nights * 1500 * hutRooms;
    } else if (accommodationType === "both") {
      return (
        (bookFullVilla ? nights * 5000 : nights * 2000 * villaRooms) + nights * 1500 * hutRooms
      );
    }
    return 0;
  };

  const handleRoomChange = (e, type) => {
    const newRooms = parseInt(e.target.value) || 1;
    if (type === "villa") {
      setVillaRooms(newRooms);
    } else {
      setHutRooms(newRooms);
    }
  };

  const handleGuestInput = (e, type) => {
    const value = parseInt(e.target.value) || 0;
    if (type === "adults") {
      setAdults(value);
    } else {
      setChildren(value);
    }
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
        <button onClick={handlePrev} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#000" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={handleNext} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#000" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Right Section - Booking Form */}
      <div className="lg:w-1/3 bg-white p-6 min-h-[500px] shadow-lg">
        {page === 1 && (
          <form className="space-y-4" onSubmit={handleSearch}>
            {/* Accommodation Type */}
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Accommodation Type</label>
              <select
                value={accommodationType}
                onChange={(e) => setAccommodationType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-black"
              >
                <option value="villa">Villa</option>
                <option value="hut">Hut</option>
                <option value="both">Both Villa and Hut</option>
              </select>
            </div>

            {/* Check-in & Check-out */}
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Check In</label>
              <input
                type="date"
                min={today}
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Check Out</label>
              <input
                type="date"
                min={today}
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-black"
                required
              />
            </div>

            {/* Room Selection */}
            {accommodationType !== "hut" && (
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Villa Rooms</label>
                <input
                  type="number"
                  min="1"
                  max={maxRoomsInVilla}
                  value={villaRooms}
                  onChange={(e) => handleRoomChange(e, "villa")}
                  className="w-full border border-gray-300 rounded-lg p-2 text-black"
                />
              </div>
            )}

            {accommodationType !== "villa" && (
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Hut Rooms</label>
                <input
                  type="number"
                  min="1"
                  value={hutRooms}
                  onChange={(e) => handleRoomChange(e, "hut")}
                  className="w-full border border-gray-300 rounded-lg p-2 text-black"
                />
              </div>
            )}

            {/* Guests Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Adults</label>
                <input
                  type="number"
                  min="1"
                  value={adults}
                  onChange={(e) => handleGuestInput(e, "adults")}
                  disabled={isGuestInputDisabled}
                  className="w-full border border-gray-300 rounded-lg p-2 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Children</label>
                <input
                  type="number"
                  min="0"
                  value={children}
                  onChange={(e) => handleGuestInput(e, "children")}
                  disabled={isGuestInputDisabled}
                  className="w-full border border-gray-300 rounded-lg p-2 text-black"
                />
              </div>
            </div>

            {/* Cost & Submit */}
            <p className="text-lg font-bold text-black">Total Cost: INR {calculateTotalCost()}</p>
            <p className="text-lg font-bold text-black">Total Nights: {calculateNights()}</p>

            <div className="bg-black">
              <button
                type="button"
                className="bg-black text-white px-6 py-2 rounded-lg w-full"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </form>
        )}

        {page === 2 && (
          <form className="space-y-4" onSubmit={handleSearch}>
            {/* Basic Details */}
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-black">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-black"
                required
              />
            </div>

            {/* Previous & Submit */}
            <div className="flex gap-4">
              <button
                type="button"
                className="bg-gray-500 text-white px-6 py-2 rounded-lg w-full"
                onClick={handlePrevPage}
              >
                Previous
              </button>

              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-lg w-full"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default VilaBooking;
