import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './HomeCalander.css';

const HotelSearching = () => {
    const [formData, setFormData] = useState({
        destination: '',
        dates: '',
        guests: { adults: 1, children: 0 },
    });
    const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
    const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const locations = ['Villa', 'Hut'];

    const handleDestinationFocus = () => {
        setShowDestinationDropdown(true);
        setShowGuestsDropdown(false);
    };

    const handleDestinationBlur = () => {
        setTimeout(() => {
            setShowDestinationDropdown(false);
        }, 200);
    };

    const handleDestinationChange = (e) => {
        setFormData((prev) => ({ ...prev, destination: e.target.value }));
    };

    const handleSelectLocation = (location) => {
        setFormData((prev) => ({ ...prev, destination: location }));
        setShowDestinationDropdown(false);
    };

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        setFormData((prev) => ({
            ...prev,
            dates: `${start ? start.toLocaleDateString() : ''} - ${end ? end.toLocaleDateString() : ''}`,
        }));
    };

    const handleGuestChange = (type, operation) => {
        setFormData((prev) => {
            const updatedGuests = { ...prev.guests };
            if (operation === 'increment') {
                updatedGuests[type]++;
            } else if (operation === 'decrement' && updatedGuests[type] > 0) {
                updatedGuests[type]--;
            }
            return { ...prev, guests: updatedGuests };
        });
    };

    const handleGuestsFocus = () => {
        setShowGuestsDropdown(true);
        setShowDestinationDropdown(false);
    };

    const handleGuestsBlur = () => {
        setTimeout(() => {
            setShowGuestsDropdown(false);
        }, 200);
    };
    const handleButtonMouseDown = (e) => {
        e.preventDefault(); // Prevent blur event from triggering when button is clicked
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-11/12 max-w-6xl bg-white shadow-lg rounded-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Destination */}
                    <div className="flex flex-col relative">
                        <label className="text-sm font-semibold text-gray-600">Choose our property</label>
                        <input
                            type="text"
                            value={formData.destination}
                            onChange={handleDestinationChange}
                            onFocus={handleDestinationFocus}
                            onBlur={handleDestinationBlur}
                            placeholder="Select Property"
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-[15px] p-5 text-black"
                        />
                        {showDestinationDropdown && (
                            <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-1 max-h-48 overflow-y-auto z-10">
                                {locations.map((location, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleSelectLocation(location)}
                                        className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-black text-black"
                                    >
                                        {location}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Dates */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600">Choose Dates</label>
                        <DatePicker
                            selected={startDate}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={handleDateChange}
                            selectsRange
                            monthsShown={2}
                            dateFormat="MMM d, yyyy"
                            className="mt-1 block w-full  rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-[16px] p-5 text-black"
                            placeholderText="Select Dates"
                            minDate={new Date()}
                        />
                    </div>

                    {/* Guests */}
                    <div className="flex flex-col relative">
                        <label className="text-sm font-semibold text-gray-600">Guests</label>
                        <input
                            type="text"
                            value={`${formData.guests.adults} Adults, ${formData.guests.children} Children`}
                            readOnly
                            onFocus={handleGuestsFocus}
                            onBlur={handleGuestsBlur}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-[15px] p-5 text-black"
                            placeholder="1 Guest(s)"
                        />
                        {showGuestsDropdown && (
                            <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-1 max-h-48">
                                {/* Guest Options */}
                                <div className="flex justify-between px-4 py-2">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center justify-between lg:gap-24 xs:gap-40">
                                            <span className="text-black">Adults</span>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center text-[26px] border rounded-full text-black"
                                                    onClick={() => handleGuestChange('adults', 'decrement')}
                                                    onMouseDown={handleButtonMouseDown} // Prevent blur
                                                >
                                                    -
                                                </button>
                                                <span className="text-black">{formData.guests.adults}</span>
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center text-[26px] border rounded-full text-black"
                                                    onClick={() => handleGuestChange('adults', 'increment')}
                                                    onMouseDown={handleButtonMouseDown} // Prevent blur
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-black">Children</span>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center text-[26px] border rounded-full text-black"
                                                    onClick={() => handleGuestChange('children', 'decrement')}
                                                    onMouseDown={handleButtonMouseDown} // Prevent blur
                                                >
                                                    -
                                                </button>
                                                <span className="text-black">{formData.guests.children}</span>
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center text-[26px] border rounded-full text-black"
                                                    onClick={() => handleGuestChange('children', 'increment')}
                                                    onMouseDown={handleButtonMouseDown} // Prevent blur
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Search Button */}
                    <div className="flex items-end">
                        <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-red-500 w-full leading-[50px]">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelSearching;
