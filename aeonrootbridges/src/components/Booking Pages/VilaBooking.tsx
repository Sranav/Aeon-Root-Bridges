import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import booking1 from "@assets/images/booking/booking-1.jpg";
import booking2 from "@assets/images/booking/booking-2.jpg";
import booking3 from "@assets/images/booking/booking-3.jpg";
import booking4 from "@assets/images/booking/booking-4.jpg";
import booking5 from "@assets/images/booking/booking-5.jpg";
import booking6 from "@assets/images/booking/booking-6.jpg";


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <button onClick={onClose} className="absolute top-4 right-4 text-black">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const VilaBooking = () => {
  const images = [booking1, booking2, booking3, booking4, booking5, booking6];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for booking
  const [villaRooms, setVillaRooms] = useState(0);
  const [hutRooms, setHutRooms] = useState(0);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [bookFullVilla, setBookFullVilla] = useState(false);
  const [bookFullHut, setBookFullHut] = useState(false);
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [accommodationType, setAccommodationType] = useState("villa");
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guestWarning, setGuestWarning] = useState("");
  const [message, setMessage] = useState("");
  const [totalNights, setTotalNights] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  // Constants
  const maxGuestsPerRoom = 3;
  const maxRoomsInVilla = 2;
  const maxRoomsInHut = 2;
  const maxVillaCapacity = 8;
  const maxHutCapacity = 6;
  const maxGuestsForRooms = (villaRooms + hutRooms) * maxGuestsPerRoom;
  const totalGuests = adults + children;
  const today = new Date().toISOString().split("T")[0];

  const navigate = useNavigate();

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => console.log("Razorpay script loaded.");
    script.onerror = (e) => console.error("Error loading Razorpay script:", e);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch total cost and nights from the backend
  const fetchTotalCostAndNights = async () => {
    if (!startDate || !endDate) return;

    try {
      const response = await axios.post("https://express-backend-latest.onrender.com/book", {
        accommodationType,
        startDate,
        endDate,
        villaRooms,
        hutRooms,
        adults,
        children,
      });

      if (response.status === 200) {
        const { totalCost, totalNights } = response.data;
        setTotalCost(totalCost); // Update total cost
        setTotalNights(totalNights); // Update total nights
      }
    } catch (error) {
      console.error("Error fetching total cost and nights:", error);
      setMessage("Error calculating cost and nights.");
    }
  };

  useEffect(() => {
    fetchTotalCostAndNights();
  }, [startDate, endDate, villaRooms, hutRooms, adults, children, accommodationType]);

  // Handle search (submit)
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Open the modal
  };

  // Handle Razorpay payment
  const handlePayment = async () => {
    if (typeof window.Razorpay === "undefined") {
      console.error("Razorpay is not loaded properly.");
      setMessage("Error loading Razorpay.");
      return;
    }

    try {
      const response = await axios.post("https://express-backend-latest.onrender.com/book", {
        accommodationType,
        startDate,
        endDate,
        villaRooms,
        hutRooms,
        adults,
        children,
      });

      if (response.status === 200) {
        const { totalNights: nights, totalCost: cost } = response.data;
        setTotalNights(nights);
        setTotalCost(cost);

        // Create Razorpay order for payment
        const orderResponse = await axios.post("https://express-backend-latest.onrender.com/create-order", {
          amount: cost,
          currency: "INR",
        });

        const razorpayOrder = orderResponse.data;

        const options = {
          key: "rzp_test_c91Uj3VDXtW4Nc", // Your Razorpay test key
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: "Booking Payment",
          description: "Villa Booking Payment",
          image: "https://example.com/logo.png",
          order_id: razorpayOrder.id,
          handler: async function (response) {
            const paymentData = {
              razorpay_order_id: razorpayOrder.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              accommodationType,
              startDate,
              endDate,
              userDetails: {
                name,
                email,
                phone,
              },
              totalAmount: cost,
              rooms: accommodationType === "villa" ? villaRooms : hutRooms,
              adults,
              children,
              villaRooms,
              hutRooms,
            };

            try {
              const verifyPaymentResponse = await axios.post(
                "https://express-backend-latest.onrender.com/verify-payment",
                paymentData
              );
              setMessage(verifyPaymentResponse.data.message);

              if (verifyPaymentResponse.data.success) {
                const saveBookingResponse = await axios.post("https://express-backend-latest.onrender.com/save-booking", {
                  accommodationType,
                  startDate,
                  endDate,
                  rooms: accommodationType === "villa" ? villaRooms : hutRooms,
                  adults,
                  children,
                  totalCost: cost,
                  userDetails: paymentData.userDetails,
                  totalNights: nights,
                });

                if (saveBookingResponse.status === 200) {
                  navigate("/"); // Redirect to home page after successful booking
                }
              }
            } catch (error) {
              console.error("Error verifying payment:", error);
              setMessage("Payment verification failed!");
            }
          },
          prefill: {
            name,
            email,
            phone,
          },
          theme: {
            color: "#F37254", // Set theme color
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    } catch (error) {
      console.error("Error during booking:", error);
      setMessage(error.response?.data?.message || "An error occurred.");
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
    setPage(2);
  };

  const handlePrevPage = () => {
    setPage(1);
  };

  // Handle Full Villa/Hut checkbox change
  const handleFullVillaChange = (e) => {
    setBookFullVilla(e.target.checked);
    setVillaRooms(e.target.checked ? 0 : 1);
  };

  const handleFullHutChange = (e) => {
    setBookFullHut(e.target.checked);
    setHutRooms(e.target.checked ? 0 : 1);
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
        className={`w-16 h-16 object-cover cursor-pointer border-2 ${
          currentIndex === index ? "border-white" : "border-transparent"
        }`}
        onClick={() => setCurrentIndex(index)}
      />
    ))}
  </div>
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
                value={startDate}
                onChange={(e) => setstartDate(e.target.value)}
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
                onChange={(e) => setendDate(e.target.value)}
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
                  min="0"
                  max={maxRoomsInVilla}
                  value={villaRooms}
                  onChange={(e) => setVillaRooms(Number(e.target.value))}
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
                  min="0"
                  value={hutRooms}
                  onChange={(e) => setHutRooms(Number(e.target.value))}
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
                  onChange={(e) => setAdults(Number(e.target.value))}
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
                  onChange={(e) => setChildren(Number(e.target.value))}
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
                  onChange={handleFullVillaChange} // Use the new handler
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
                  onChange={handleFullHutChange}
                  className="h-5 w-5"
                />
                <label className="text-sm text-black">Book Full Hut (2 Rooms)</label>
              </div>
            )}

            {/* Cost & Submit */}
            <p className="text-lg font-bold text-black">Total Cost: INR {totalCost}</p>
            <p className="text-lg font-bold text-black">Total Nights: {totalNights}</p>

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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                  Pay now
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
        <div className="flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-4 text-black text-center">Complete Your Payment</h2>
          <div className="text-black">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quia beatae explicabo voluptate dicta laudantium odit, consectetur id velit eveniet magnam obcaecati nemo culpa architecto, vel distinctio at quis. Voluptatem!</div>
          <button
            onClick={handlePayment}
            className="bg-green-500 text-white px-6 py-2 rounded-lg mt-6"
          >
            Proceed to Pay
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default VilaBooking;