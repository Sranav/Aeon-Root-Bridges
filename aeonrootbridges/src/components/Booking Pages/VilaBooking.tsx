import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import booking1 from "@assets/images/booking/booking-1.jpg";
import booking2 from "@assets/images/booking/booking-2.jpg";
import booking3 from "@assets/images/booking/booking-3.jpg";
import booking4 from "@assets/images/booking/booking-4.jpg";
import booking5 from "@assets/images/booking/booking-5.jpg";
import booking6 from "@assets/images/booking/booking-6.jpg";

const VilaBooking = () => {
  const roomImages = [booking1, booking2, booking3]; // Room images
  const villaImages = [booking4, booking5, booking6]; // Villa images
  const hutImages = [booking3, booking4]; // Hut images (if different)
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
  const [showVillaModal, setShowVillaModal] = useState(false); // New state for the modal
  const [isVillaConfirmed, setIsVillaConfirmed] = useState(false); // For confirming villa selection

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

  const [divHeight, setDivHeight] = useState('600px');

  useEffect(() => {
    // Adjust the height based on whether dates are selected
    if (startDate && endDate) {
      setDivHeight('auto'); // Increase height when dates are selected
    } else {
      setDivHeight('600px'); // Default height
    }
  }, [startDate, endDate]); // Run the effect whenever startDate or endDate change

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

  // Handle room change logic
  const handleRoomChange = (e) => {
    const value = Number(e.target.value);

    if (value > 1) {
      setShowVillaModal(true); // Show the modal when trying to select more than one room
    } else {
      setRoomSelection((prevState) => ({
        ...prevState,
        rooms: value,
      }));
      setMessage("");
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
        setMessage("");
      }
    } else {
      // Limit guests to 3 per room when room is selected
      if (totalGuests <= roomSelection.rooms * maxGuestsPerRoom) {
        setAdults(value);
        setMessage("");
      } else {
        // Show message if guests exceed capacity per room
        setMessage("You have exceeded the maximum 3 guests per room. Please select Villa.");
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
        setMessage("");

      }
    } else {
      // Limit children to max room capacity
      if (totalGuests <= roomSelection.rooms * maxGuestsPerRoom) {
        setChildren(value);
        setMessage("");

      } else {
        // Show message if children exceed capacity per room
        setMessage("You have exceeded the maximum guests 3 per room. Please select Villa.");
      }
    }
  };


  const [accommodationType, setAccommodationType] = useState("rooms"); // To track the selected accommodation type

  // Handle accommodation change logic
  const handleAccommodationChange = (type) => {
    setAccommodationType(type); // Update the selected accommodation type
    if (type === "villa") {
      setRoomSelection({ rooms: 0, villa: 1, huts: 0 }); // Reset rooms and huts, select 1 villa
    } else if (type === "rooms") {
      setRoomSelection({ rooms: 1, villa: 0, huts: 0 }); // Reset villa and huts, select 1 room
    } else if (type === "huts") {
      setRoomSelection({ rooms: 0, villa: 0, huts: 1 }); // Reset rooms and villa, select 1 hut
    }
  };

  const images = accommodationType === "villa" ? villaImages : accommodationType === "huts" ? hutImages : roomImages;

  const confirmVillaChange = () => {
    setRoomSelection({ rooms: 0, villa: 1, huts: 0 });
    setShowVillaModal(false); // Close the modal
  };

  const cancelVillaChange = () => {
    setRoomSelection({ rooms: 1, villa: 0, huts: 0 });
    setShowVillaModal(false); // Close the modal
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
      <div className="lg:w-1/3 bg-white p-6  shadow-lg" style={{ height: divHeight, transition: 'height 0.3s ease' }}>

        {page === 1 && (
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* <label className="block text-sm font-medium mb-1 text-black">Accommodation Type</label> */}
            {/* Accommodation Type */}
            <div className="flex gap-4 justify-between bg-black p-2 rounded px-2">
              <div>
                <label htmlFor="rooms" className="cursor-pointer text-white">
                  <input
                    type="radio"
                    id="rooms"
                    name="accommodation"
                    checked={roomSelection.villa === 0 && roomSelection.huts === 0}
                    onChange={() => handleAccommodationChange("rooms")}
                    className="mr-2"
                  />
                  Room
                </label>
              </div>
              <div>
                <label htmlFor="villa" className="cursor-pointer text-white">
                  <input
                    type="radio"
                    id="villa"
                    name="accommodation"
                    checked={roomSelection.villa > 0}
                    onChange={() => handleAccommodationChange("villa")}
                    className="mr-2"
                  />
                  Villa
                </label>
              </div>
              <div>
                <label htmlFor="huts" className="cursor-pointer text-white">
                  <input
                    type="radio"
                    id="huts"
                    name="accommodation"
                    checked={roomSelection.huts > 0}
                    onChange={() => handleAccommodationChange("huts")}
                    className="mr-2"
                  />
                  Hut
                </label>
              </div>
            </div>

            {/* Check-in & Check-out */}
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Check In</label>
              <input
                type="date"
                min={today}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-black cursor-pointer"
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
                className="w-full border border-gray-300 rounded-lg p-2 text-black cursor-pointer"
                required
              />
            </div>

            {/* Conditional Rendering for Rooms, Villa, Huts, and Costs */}
            {startDate && endDate && (
              <>
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
                        className="w-full border border-gray-300 rounded-lg p-2 text-black"
                      />
                      {/* <span className="text-sm text-black">₹1000 / night</span>
                      <span className="text-sm font-bold text-green-700">Total: ₹{roomSelection.rooms * 1000 * totalNights}</span> */}
                    </div>
                    <p className="text-xs font-bold text-green-900 mt-1">Each room can accommodate up to 3 guests.</p>
                    {roomSelection.rooms > 1 && (
                      <p className="text-xs text-green-900 mt-1">
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
                        className="w-full border border-gray-300 rounded-lg p-2 text-black"
                      />
                      {/* <span className="text-sm text-black">₹5000 / night</span>
                      <span className="text-sm font-bold text-green-700">Total: ₹{roomSelection.villa * 5000 * totalNights}</span> */}
                    </div>
                    <p className="text-xs text-green-900 mt-1">Each villa can accommodate up to 8 guests.</p>
                  </div>
                )}

                {/* Guests Selection */}
                <div className="flex flex-row gap-4">
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

                </div>
                {message && (
                  <p className="text-xs text-green-900 mt-1">{message}</p>
                )}

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
                      className="w-full border border-gray-300 rounded-lg p-2 text-black"
                    />
                    {/* <span className="text-sm text-white bg-black">₹3000 / night</span>
                    <span className="text-sm font-bold bg-black text-green-700">Total: ₹{roomSelection.huts * 3000 * totalNights}</span> */}
                  </div>
                  {/* <p className="text-xs text-green-900 mt-1">Each hut can accommodate up to 6 guests.</p> */}
                </div>

                {/* Cost & Submit */}
                <div className="flex flex-row justify-between">
                  <div className="text-black text-[18px] font-bold">Total Amount:</div>
                  <div className="text-black text-[18px] font-bold">{totalCost}</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="text-black text-[18px] font-bold">Total Nights:</div>
                  <div className="text-black text-[18px] font-bold">{totalNights}</div>
                </div>
                
              </>
            )}

            <button
              onClick={handleNextPage}
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-blue-600"
              disabled={!startDate || !endDate}
            >
              Next
            </button>
          </form>
        )}
        {/* Confirmation Modal */}
        {showVillaModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-black p-6 rounded-lg w-96">
              <h3 className="text-lg font-bold mb-4 ">Confirmation</h3>
              <p className="mb-4">You have selected more than 1 room. Would you like to switch to a full villa instead?</p>
              <div className="flex justify-end gap-4">
                <button onClick={confirmVillaChange} className="bg-green-500 text-white py-2 px-4 rounded-lg">Yes</button>
                <button onClick={cancelVillaChange} className="bg-gray-500 text-white py-2 px-4 rounded-lg">No</button>
              </div>
            </div>
          </div>
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

            {/* <div>
              <label className="block text-sm font-medium mb-1 text-black">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-black"
              />
            </div> */}

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