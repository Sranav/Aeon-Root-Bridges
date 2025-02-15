import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
enum ROOM_TYPE {
    ROOM = 'rooms',
    VILLA = 'villa',
    HUT = 'hut'
}
const BookingForm = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [roomSelection, setRoomSelection] = useState({
        type: ROOM_TYPE.ROOM,
        rooms: 1,
        villa: 1,
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
    const [isDateAvailable, setIsDateAvailable] = useState(true);
    const [availabilityMessage, setAvailabilityMessage] = useState("");
    const [guestError, setGuestError] = useState("");
    const [isGuestLimitExceeded, setGuestLimitExceeded] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [otp, setOtp] = useState("");
    const correctOtp = "123456"; // Manually set OTP
    const formattedStartDate = startDate ? new Date(startDate).toISOString().split("T")[0] : "";
    const formattedEndDate = endDate ? new Date(endDate).toISOString().split("T")[0] : "";


    // Constants
    const maxGuestsPerRoom = 3;
    const maxRooms = 2;
    const maxVillaCapacity = 8;
    const maxHutCapacity = 6;
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

    useEffect(() => {
        const checkAvailability = async () => {
            if (!startDate || !endDate) return;

            if (isNaN(new Date(startDate)) || isNaN(new Date(endDate))) {
                console.error("Invalid Date:", startDate, endDate);
                return;
            }

            let accommodationType = roomSelection.type;

            console.log("Checking availability with:", {
                accommodationType,
                startDate,
                endDate
            });

            try {
                setAvailabilityMessage(""); // Clear previous availability messages

                const response = await axios.post("https://express-backend-latest.onrender.com/check-availability", {
                    accommodationType,
                    startDate,
                    endDate
                });

                console.log("Response from backend:", response.data);

                if (!response.data.available) {
                    setAvailabilityMessage("❌ The selected dates are already booked. Please choose different dates.");
                    setIsDateAvailable(false);  // Set availability state to false
                } else {
                    setAvailabilityMessage(""); // Clear message if available
                    setIsDateAvailable(true); // Set availability state to true
                }
            } catch (error) {
                console.error("Error checking availability:", error?.response?.data || error);
                setAvailabilityMessage("⚠️ Error checking availability. Please try again.");
            }
        };

        checkAvailability();
    }, [startDate, endDate, roomSelection]);

    // Fetch total cost and nights from the backend
    useEffect(() => {
        const fetchTotalCostAndNights = async () => {
            if (!startDate || !endDate) return;

            try {
                const response = await axios.post('https://express-backend-latest.onrender.com/book', {
                    accommodationType: roomSelection.type,
                    startDate: startDate,
                    endDate: endDate,

                    ...(roomSelection.type === ROOM_TYPE.ROOM) && { rooms: roomSelection.rooms },
                    ...(roomSelection.type === ROOM_TYPE.VILLA) && { villaRooms: roomSelection.villa },
                    hutRooms: roomSelection.huts,
                    adults,
                    children,
                });

                if (response.status === 200) {
                    const { totalCost, totalNights } = response.data;
                    setTotalCost(totalCost);  // Update total cost
                    setTotalNights(totalNights);  // Update total nights
                }
            } catch (error) {
                console.error("Error fetching total cost and nights:", error);
                setMessage("Error calculating cost and nights.");
            }
        };

        fetchTotalCostAndNights();
    }, [startDate, endDate, roomSelection.type, roomSelection.villa, roomSelection.huts, roomSelection.rooms, adults, children]); // Only depend on roomSelection changes

    // Handle search (submit)
    const handleSearch = async (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault(); // Only call preventDefault if e is present
        }

        if (!isDateAvailable) {
            setAvailabilityMessage("❌ The selected dates are already booked. Please choose different dates.");
            return;
        }

        if (typeof window.Razorpay === "undefined") {
            console.error("Razorpay is not loaded properly.");
            setAvailabilityMessage("Error loading Razorpay.");
            return;
        }

        try {
            // Proceed with booking if the dates are available
            const response = await axios.post("https://express-backend-latest.onrender.com/book", {
                accommodationType: roomSelection.type,
                startDate,
                endDate,
                villaRooms: roomSelection.villa,
                hutRooms: roomSelection.huts,
                adults,
                children,
            });

            if (response.status === 200) {
                const { totalNights: nights, totalCost: cost } = response.data;
                setTotalNights(nights);
                setTotalCost(cost);

                // Create Razorpay order
                const orderResponse = await axios.post("https://express-backend-latest.onrender.com/create-order", {
                    amount: cost,
                    currency: "INR",
                });

                const razorpayOrder = orderResponse.data;

                const options = {
                    key: "rzp_test_c91Uj3VDXtW4Nc",
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
                            accommodationType: roomSelection.type,
                            startDate,
                            endDate,
                            userDetails: { name, email, phone },
                            totalAmount: cost,
                            rooms: roomSelection.type === ROOM_TYPE.ROOM ? roomSelection.rooms : roomSelection.type === ROOM_TYPE.VILLA ? roomSelection.villa : roomSelection.huts,
                            adults,
                            children,
                            villaRooms: roomSelection.villa,
                            hutRooms: roomSelection.huts,
                        };

                        try {
                            const verifyPaymentResponse = await axios.post("https://express-backend-latest.onrender.com/verify-payment", paymentData);
                            setAvailabilityMessage(verifyPaymentResponse.data.message);
                            if (verifyPaymentResponse.data.success) {
                                const saveBookingResponse = await axios.post("https://express-backend-latest.onrender.com/save-booking", {
                                    accommodationType: roomSelection.type,
                                    startDate,
                                    endDate,
                                    rooms: roomSelection.type === ROOM_TYPE.ROOM ? roomSelection.rooms : roomSelection.type === ROOM_TYPE.VILLA ? roomSelection.villa : roomSelection.huts,
                                    adults,
                                    children,
                                    totalCost: cost,
                                    userDetails: paymentData.userDetails,
                                    totalNights: nights,
                                });

                                if (saveBookingResponse.status === 200) {
                                    navigate("/villabooking"); // Redirect after successful booking
                                    console.log('Payment verified and booking saved, about to navigate...');
                                }
                            }
                        } catch (error) {
                            console.error("Error verifying payment:", error);
                            setAvailabilityMessage("⚠️ Payment verification failed!");
                        }
                    },
                    prefill: { name, email, phone },
                    theme: { color: "#F37254" },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
            }
        } catch (error) {
            console.error("Error during booking:", error);
            setAvailabilityMessage(error.response?.data?.message || "⚠️ An error occurred.");
        }
    };

    // Handle next/prev page
    const handleNextPage = async () => {
        if (!startDate || !endDate) {
            setMessage("Please select both start and end dates.");
            return;
        }

        // Ensure the user cannot proceed if dates are unavailable
        if (message.includes("❌")) {
            return;
        }

        let accommodationType = roomSelection.type;

        // Optimistically go to the next page and show a loading indicator
        setPage(2);
        setMessage("⏳ Checking availability...");

        try {
            const response = await axios.post("https://express-backend-latest.onrender.com/check-availability", {
                accommodationType,
                startDate,
                endDate,
            });

            if (!response.data.available) {
                setMessage("❌ The selected dates are already booked. Please choose different dates.");
                setPage(1); // Move back if unavailable
            } else {
                setMessage(""); // Clear message if available
            }
        } catch (error) {
            console.error("Error checking availability:", error);
            setMessage("⚠️ Error checking availability. Please try again.");
        }
    };

    const handlePrevPage = () => {
        setPage(1);
    };

    const [accommodationType, setAccommodationType] = useState("rooms"); // To track the selected accommodation type

    // Handle accommodation change logic
    const handleAccommodationChange = (type: ROOM_TYPE) => {
        setRoomSelection(prev => ({ ...prev, type, huts: type === ROOM_TYPE.HUT ? 1 : 0 }))

    };



    const confirmRoomChange = () => {
        setRoomSelection(prev => ({ ...prev, rooms: 1, type: ROOM_TYPE.VILLA }))// Switch to villa


    };

    const cancelRoomChange = () => {
        setRoomSelection(prev => ({ ...prev, rooms: 1 }))// Switch to villa

    };

    console.log("Sending to backend:", {
        accommodationType: roomSelection.type,
        startDate: startDate,
        endDate: endDate,
        rooms: roomSelection.rooms,
        villaRooms: roomSelection.villa,
        hutRooms: roomSelection.huts,
        adults,
        children,
    });



    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleOtpSubmit = () => {
        console.log("OTP Submitted: ", otp); // Log OTP to see if it's being entered correctly
        if (otp === correctOtp) {
            console.log("OTP is correct, proceeding with search...");
            setModalOpen(false);
            handleSearch(); // Trigger search after OTP verification
        } else {
            alert("Please enter a valid 6-digit OTP.");
            console.log("OTP mismatch!"); // Log OTP mismatch
        }
    };

    return (
        <>
            {page === 1 && (
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    {/* Accommodation Type */}
                    <div className="flex gap-4 justify-between bg-black p-2 rounded px-2">
                        <div>
                            <label htmlFor="rooms" className="cursor-pointer text-white">
                                <input
                                    type="radio"
                                    id="rooms"
                                    name="accommodation"
                                    checked={roomSelection.type === ROOM_TYPE.ROOM}
                                    onChange={() => handleAccommodationChange(ROOM_TYPE.ROOM)}
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
                                    value='villa'
                                    checked={roomSelection.type === ROOM_TYPE.VILLA}
                                    onChange={() => handleAccommodationChange(ROOM_TYPE.VILLA)}
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
                                    checked={roomSelection.type === ROOM_TYPE.HUT}
                                    onChange={() => handleAccommodationChange(ROOM_TYPE.HUT)}
                                    className="mr-2"
                                />
                                Hut
                            </label>
                        </div>
                    </div>

                    {/* Check-in & Check-out */}<div>
                        <label className="block text-sm font-medium mb-1 text-black">Check In</label>
                        <input
                            type="date"
                            min={today}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className={`w-full border ${isDateAvailable ? "border-gray-300" : "border-red-500"} rounded-lg p-2 text-black cursor-pointer`}
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
                            className={`w-full border ${isDateAvailable ? "border-gray-300" : "border-red-500"} rounded-lg p-2 text-black cursor-pointer`}
                            required
                        />
                    </div>
                    {availabilityMessage && (
                        <p className="text-sm text-red-600">{availabilityMessage}</p>
                    )}

                    {/* Conditional Rendering for Rooms, Villa, Huts, and Costs */}
                    {startDate && endDate && (
                        <>
                            {/* Rooms Selection */}
                            {roomSelection.type === ROOM_TYPE.ROOM && (
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">Rooms</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            min="1"
                                            max={maxRooms}
                                            value={roomSelection.rooms}
                                            onChange={(e) => setRoomSelection({ ...roomSelection, rooms: Number(e.target.value) })}
                                            className="w-full border border-gray-300 rounded-lg p-2 text-black"
                                        />
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
                            {roomSelection.type === ROOM_TYPE.VILLA && (
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
                                    </div>
                                    <p className="text-xs text-green-900 mt-1">Each villa can accommodate up to 8 guests.</p>
                                </div>
                            )}
                            {/* Huts Selection */}
                            {roomSelection.type === ROOM_TYPE.HUT &&
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
                                    </div>
                                    <p className="text-xs text-green-900 mt-1">Each hut can accommodate up to 6 guests.</p>
                                </div>
                            }

                            {/* Guests Selection */}

                            {roomSelection.type === ROOM_TYPE.ROOM &&
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">No of Guests</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="3"
                                        value={adults}
                                        onChange={(e) => setAdults(Number(e.target.value))}

                                        className="w-full border border-gray-300 rounded-lg p-2 text-black"

                                    />
                                </div>
                            }
                            {roomSelection.type === ROOM_TYPE.VILLA &&
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">No of Guests</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="8"
                                        value={adults}
                                        onChange={(e) => setAdults(Number(e.target.value))}

                                        className="w-full border border-gray-300 rounded-lg p-2 text-black"

                                    />
                                </div>
                            }
                            {/* <div>
                                    <label className="block text-sm font-medium mb-1 text-black">Children</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max=""
                                        value={children}
                                        onChange={(e) => setChildren(Number(e.target.value))}
                                       
                                        className="w-full border border-gray-300 rounded-lg p-2 text-black"
                                    />
                                </div> */}

                            {guestError && (
                                <p className="text-sm text-red-600">{guestError}</p>
                            )}

                            {/* Huts Selection */}
                            {roomSelection.type !== ROOM_TYPE.HUT &&
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
                                    </div>
                                    <p className="text-xs text-green-900 mt-1">Each hut can accommodate up to 6 guests.</p>
                                </div>
                            }
                            {roomSelection.type !== ROOM_TYPE.HUT &&
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">Number of Guest</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="3"
                                        value={children}
                                        onChange={(e) => setChildren(Number(e.target.value))}

                                        className="w-full border border-gray-300 rounded-lg p-2 text-black"

                                    />
                                </div>
                            }
                            {roomSelection.type === ROOM_TYPE.HUT &&
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-black">No Of Guest</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="3"
                                        value={children}
                                        onChange={(e) => setChildren(Number(e.target.value))}

                                        className="w-full border border-gray-300 rounded-lg p-2 text-black"

                                    />
                                </div>
                            }


                            {/* Cost & Submit */}
                            <div className="flex flex-row justify-between">
                                <div className="text-black text-[18px] font-bold">Total Amount:</div>
                                <div className="text-black text-[18px] font-bold">₹{totalCost}</div>
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
                        disabled={!startDate || !endDate || !!guestError}
                    >
                        Next
                    </button>
                </form>
            )}

            {/* Confirmation Modal */}
            {roomSelection.rooms > 1 && roomSelection.type === ROOM_TYPE.ROOM && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-black p-6 rounded-lg w-96">
                        <h3 className="text-lg font-bold mb-4">Confirmation</h3>
                        <p className="mb-4">You have selected more than 1 room. Would you like to switch to a full villa instead?</p>
                        <div className="flex justify-end gap-4">
                            <button onClick={confirmRoomChange} className="bg-green-500 text-white py-2 px-4 rounded-lg">Yes</button>
                            <button onClick={cancelRoomChange} className="bg-gray-500 text-white py-2 px-4 rounded-lg">No</button>
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
                        <label className="block text-sm font-medium mb-1 text-black">Phone</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 text-black"
                            required
                        />
                    </div>

                    <button
                        onClick={handleOpenModal}
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-green-600"
                    >
                        Make Payment
                    </button>
                    <button onClick={handlePrevPage} className="w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500">
                        Previous
                    </button>
                </div>

            )}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 text-black mb-4"
                            maxLength={6}
                            placeholder="Enter 6-digit OTP"
                        />
                        <button
                            onClick={handleOtpSubmit}
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                        >
                            Submit OTP
                        </button>
                        <button
                            onClick={() => setModalOpen(false)}
                            className="w-full mt-2 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default BookingForm;