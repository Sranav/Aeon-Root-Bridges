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
  const [bookFullHut, setBookFullHut] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [accommodationType, setAccommodationType] = useState("villa");
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guestWarning, setGuestWarning] = useState("");

  // Constants
  const maxGuestsPerRoom = 3;
  const maxRoomsInVilla = 2;
  const maxRoomsInHut = 2;
  const maxVillaCapacity = 8;
  const maxHutCapacity = 6;
  const maxGuestsForRooms = (villaRooms + hutRooms) * maxGuestsPerRoom;
  const totalGuests = adults + children;
  const today = new Date().toISOString().split("T")[0];

  // Update room count when guest count changes
  useEffect(() => {
    if (totalGuests > maxVillaCapacity) {
      setBookFullVilla(true);
    } else {
      setBookFullVilla(false);
      const requiredVillaRooms = Math.ceil(totalGuests / maxGuestsPerRoom);
      setVillaRooms(Math.min(requiredVillaRooms, maxRoomsInVilla));
    }

    if (totalGuests > maxHutCapacity) {
      setBookFullHut(true);
    } else {
      setBookFullHut(false);
      const requiredHutRooms = Math.ceil(totalGuests / maxGuestsPerRoom);
      setHutRooms(Math.min(requiredHutRooms, maxRoomsInHut));
    }
  }, [totalGuests]);

  // Handle guest input with validation
  const handleGuestInput = (e, type) => {
    const value = parseInt(e.target.value) || 0;
    const newTotalGuests = type === "adults" ? value + children : adults + value;

    const maxAllowedGuests = (villaRooms + hutRooms) * maxGuestsPerRoom;

    if (newTotalGuests > maxAllowedGuests) {
      setGuestWarning(`Maximum guests for selected rooms is ${maxAllowedGuests}. Adding more rooms...`);
      const requiredRooms = Math.ceil(newTotalGuests / maxGuestsPerRoom);
      if (accommodationType === "villa") {
        setVillaRooms(Math.min(requiredRooms, maxRoomsInVilla));
      } else if (accommodationType === "hut") {
        setHutRooms(Math.min(requiredRooms, maxRoomsInHut));
      } else if (accommodationType === "both") {
        const requiredVillaRooms = Math.ceil(newTotalGuests / maxGuestsPerRoom);
        const requiredHutRooms = Math.ceil(newTotalGuests / maxGuestsPerRoom);
        setVillaRooms(Math.min(requiredVillaRooms, maxRoomsInVilla));
        setHutRooms(Math.min(requiredHutRooms, maxRoomsInHut));
      }
    } else {
      setGuestWarning("");
    }

    if (type === "adults") {
      setAdults(value);
    } else {
      setChildren(value);
    }
  };

  // Handle room change
  const handleRoomChange = (e, type) => {
    const newRooms = parseInt(e.target.value) || 1;
    if (type === "villa") {
      setVillaRooms(newRooms);
    } else {
      setHutRooms(newRooms);
    }
  };

  // Handle next/prev image
  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Handle next/prev page
  const handleNextPage = () => {
    console.log("Accommodation Type:", accommodationType);
    console.log("Check-in Date:", checkInDate);
    console.log("Check-out Date:", checkOutDate);
    console.log("Villa Rooms:", villaRooms);
    console.log("Hut Rooms:", hutRooms);
    console.log("Adults:", adults);
    console.log("Children:", children);
    console.log("Total Nights:", calculateNights());
    console.log("Total Cost:", calculateTotalCost());
    setPage(2);
  };

  const handlePrevPage = () => {
    setPage(1);
  };

  // Handle search (submit)
  const handleSearch = (e) => {
    e.preventDefault();
    alert(bookFullVilla ? "Booking Full Villa!" : bookFullHut ? "Booking Full Hut!" : "Booking Successful!");
    console.log("Full Name:", name);
    console.log("Email:", email);
    console.log("Accommodation Type:", accommodationType);
    console.log("Check-in Date:", checkInDate);
    console.log("Check-out Date:", checkOutDate);
    console.log("Villa Rooms:", villaRooms);
    console.log("Hut Rooms:", hutRooms);
    console.log("Adults:", adults);
    console.log("Children:", children);
    console.log("Total Nights:", calculateNights());
    console.log("Total Cost:", calculateTotalCost());
  };

  // Calculate total nights
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  // Calculate total cost
  const calculateTotalCost = () => {
    const nights = calculateNights();
    if (accommodationType === "villa") {
      return bookFullVilla ? nights * 5000 : nights * 2000 * villaRooms;
    } else if (accommodationType === "hut") {
      return bookFullHut ? nights * 3000 : nights * 1500 * hutRooms;
    } else if (accommodationType === "both") {
      return (
        (bookFullVilla ? nights * 5000 : nights * 2000 * villaRooms) +
        (bookFullHut ? nights * 3000 : nights * 1500 * hutRooms)
      );
    }
    return 0;
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
                <p className="text-xs text-red-900 mt-1">Each room can accommodate up to 3 guests.</p>
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
                <p className="text-xs text-red-900 mt-1">Each room can accommodate up to 3 guests.</p>
              </div>
            )}

            {/* Guests Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Adults</label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={adults}
                  onChange={(e) => handleGuestInput(e, "adults")}
                  className="w-full border border-gray-300 rounded-lg p-2 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Children</label>
                <input
                  type="number"
                  min="0"
                  max="8"
                  value={children}
                  onChange={(e) => handleGuestInput(e, "children")}
                  className="w-full border border-gray-300 rounded-lg p-2 text-black"
                />
              </div>
            </div>

            {/* Guest Warning */}
            {guestWarning && <p className="text-xs text-red-900 mt-1">{guestWarning}</p>}

            {/* Full Villa/Hut Checkbox */}
            {accommodationType === "villa" && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bookFullVilla}
                  onChange={(e) => setBookFullVilla(e.target.checked)}
                  className="h-5 w-5"
                />
                <label className="text-sm text-black">Book Full Villa (2 Rooms)</label>
              </div>
            )}
            {accommodationType === "hut" && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bookFullHut}
                  onChange={(e) => setBookFullHut(e.target.checked)}
                  className="h-5 w-5"
                />
                <label className="text-sm text-black">Book Full Hut (2 Rooms)</label>
              </div>
            )}

            {/* Cost & Submit */}
            <p className="text-lg font-bold text-black">Total Cost: INR {calculateTotalCost()}</p>
            <p className="text-lg font-bold text-black">Total Nights: {calculateNights()}</p>

            <div className="bg-black">
              <button
                type="button"
                className="bg-black text-white px-6 py-2 rounded-lg w-full"
                onClick={handleNextPage}
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
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Phone Number</label>
              <input
                type="number"
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
              <div className="bg-black w-full">
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-lg w-full"
              >
                Submit
              </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default VilaBooking;