import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import booking1 from "@assets/images/booking/booking-1.jpg";
import booking2 from "@assets/images/booking/booking-2.jpg";
import booking3 from "@assets/images/booking/booking-3.jpg";
import booking4 from "@assets/images/booking/booking-4.jpg";
import booking5 from "@assets/images/booking/booking-5.jpg";
import booking6 from "@assets/images/booking/booking-6.jpg";

const VilaBooking = () => {
  const images = [booking1, booking2, booking3, booking4, booking5, booking6];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [roomSelection, setRoomSelection] = useState({
    rooms: 0,
    villa: 0,
    huts: 0,
  });
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

  // Constants
  const maxGuestsPerRoom = 3;
  const maxRooms = 2;
  const maxVillaCapacity = 8;
  const maxHutCapacity = 6;
  const today = new Date().toISOString().split("T")[0];

  const navigate = useNavigate();

  // Calculate nights between start and end date
  const calculateNights = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
  };

  // Calculate total cost based on room selection and nights
  const calculateTotalCost = (nights) => {
    const roomCost = 1000; // Cost per room per night
    const villaCost = 5000; // Cost per villa per night
    const hutCost = 3000; // Cost per hut per night

    const totalRoomCost = roomSelection.rooms * roomCost * nights;
    const totalVillaCost = roomSelection.villa * villaCost * nights;
    const totalHutCost = roomSelection.huts * hutCost * nights;

    return totalRoomCost + totalVillaCost + totalHutCost;
  };

  // Handle date change
  useEffect(() => {
    const nights = calculateNights(startDate, endDate);
    setTotalNights(nights);
    const cost = calculateTotalCost(nights);
    setTotalCost(cost);
  }, [startDate, endDate, roomSelection]);

  // Handle Razorpay payment
  const handlePayment = async () => {
    setIsLoading(true);

    try {
      // Simulate Razorpay payment flow here

      // After successful payment
      setMessage("Payment Successful!");

      // Save booking logic (removed API calls)
      navigate("/"); // Navigate to home page after payment

    } catch (error) {
      console.error("Error during payment:", error);
      setMessage("An error occurred during payment.");
      setIsLoading(false);
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
    console.log('Booking Info on Page 1:', {
      startDate,
      endDate,
      roomSelection,
      adults,
      children,
      totalNights,
      totalCost,
    });
    setPage(2);
  };

  const handlePrevPage = () => {
    setPage(1);
  };

  
  // Logic for changing room selection and displaying the message
const handleRoomChange = (e) => {
  const value = Number(e.target.value);

  // If more than 1 room is selected, automatically set villa to 1 and hide the message
  if (value > 1) {
    setRoomSelection((prevState) => ({
      ...prevState,
      rooms: 0, // Reset rooms to 0 when switching to villa
      villa: 1, // Automatically set villa to 1
    }));
    setMessage(""); // Hide the message
  } else {
    setRoomSelection((prevState) => ({
      ...prevState,
      rooms: value,
    }));
    setMessage(""); // Hide the message when changing the number of rooms to 1
  }
};

// Handle adults change logic
const handleAdultsChange = (e) => {
  const value = Number(e.target.value);
  const totalGuests = value + children;

  if (roomSelection.villa > 0) {
    // Limit guests to 8 when villa is selected
    if (totalGuests <= maxVillaCapacity) {
      setAdults(value);
    }
  } else {
    // Limit guests to 3 per room when room is selected
    if (totalGuests <= roomSelection.rooms * maxGuestsPerRoom) {
      setAdults(value);
    } else {
      // Show message if guests exceed capacity per room
      setMessage("You have exceeded the maximum guests per room. Please select an additional room.");
    }
  }
};

// Handle children change logic
const handleChildrenChange = (e) => {
  const value = Number(e.target.value);
  const totalGuests = adults + value;

  if (roomSelection.villa > 0) {
    // Limit children to max villa capacity
    if (totalGuests <= maxVillaCapacity) {
      setChildren(value);
    }
  } else {
    // Limit children to max room capacity
    if (totalGuests <= roomSelection.rooms * maxGuestsPerRoom) {
      setChildren(value);
    } else {
      // Show message if children exceed capacity per room
      setMessage("You have exceeded the maximum guests per room. Please select an additional room.");
    }
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
      <div className="lg:w-1/3 bg-white p-6 min-h-[500px] shadow-lg">
        {page === 1 && (
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Check-in & Check-out */}
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Check In</label>
              <input
                type="date"
                min={today}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Check Out</label>
              <input
                type="date"
                min={today}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-black"
                required
              />
            </div>

            {/* Rooms Selection */}
            {roomSelection.villa === 0 && (
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Rooms</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max={maxRooms}
                    value={roomSelection.rooms}
                    onChange={handleRoomChange}
                    className="w-40 border border-gray-300 rounded-lg p-2 text-black"
                  />
                  <span className="text-sm text-black">₹1000 / night</span>
                  <span className="text-sm font-bold text-green-700">Total: ₹{roomSelection.rooms * 1000 * totalNights}</span>
                </div>
                <p className="text-xs text-red-900 mt-1">Each room can accommodate up to 3 guests.</p>
                {roomSelection.rooms > 1 && (
                  <p className="text-xs text-red-900 mt-1">
                    You have selected more than 1 room. Please book a villa instead.
                  </p>
                )}
              </div>
            )}

            {/* Villa Selection */}
            {roomSelection.villa > 0 && (
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Villa</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max={maxVillaCapacity}
                    value={roomSelection.villa}
                    onChange={(e) => setRoomSelection({ ...roomSelection, villa: Number(e.target.value) })}
                    className="w-40 border border-gray-300 rounded-lg p-2 text-black"
                  />
                  <span className="text-sm text-black">₹5000 / night</span>
                  <span className="text-sm font-bold text-green-700">Total: ₹{roomSelection.villa * 5000 * totalNights}</span>
                </div>
                <p className="text-xs text-red-900 mt-1">Each villa can accommodate up to 8 guests.</p>
              </div>
            )}

            {/* Guests Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Adults</label>
                <input
                  type="number"
                  min="1"
                  max=""
                  value={adults}
                  onChange={handleAdultsChange}
                  className="w-full border border-gray-300 rounded-lg p-2 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Children</label>
                <input
                  type="number"
                  min="0"
                  max=""
                  value={children}
                  onChange={handleChildrenChange}
                  className="w-full border border-gray-300 rounded-lg p-2 text-black"
                />
              </div>
              {message && (
                <p className="text-xs text-red-900 mt-1">{message}</p>
              )}
            </div>

            {/* Huts Selection */}
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Huts</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max={maxHutCapacity}
                  value={roomSelection.huts}
                  onChange={(e) => setRoomSelection({ ...roomSelection, huts: Number(e.target.value) })}
                  className="w-40 border border-gray-300 rounded-lg p-2 text-black"
                />
                <span className="text-sm text-black">₹3000 / night</span>
                <span className="text-sm font-bold text-green-700">Total: ₹{roomSelection.huts * 3000 * totalNights}</span>
              </div>
              <p className="text-xs text-red-900 mt-1">Each hut can accommodate up to 6 guests.</p>
            </div>

            {/* Cost & Submit */}
            <p className="text-lg font-bold text-black">Total Cost: INR {totalCost}</p>
            <p className="text-lg font-bold text-black">Total Night: {totalNights}</p>
            <button
              onClick={handleNextPage}
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Next
            </button>
          </form>
        )}

        {page === 2 && (
          <div className="space-y-4">
            {/* Form for Page 2 */}
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-black">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-black">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-black">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-black"
              />
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Make Payment"}
            </button>
            <button onClick={handlePrevPage} className="w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500">
              Previous
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VilaBooking;