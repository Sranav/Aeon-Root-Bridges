import React, { useState } from 'react';

const HotelDetails = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div>
            <h2 className="text-2xl font-bold">
              DE FINIBUS BONORUM ET MALORUM", WRITTEN BY CICERO IN 45 BC
            </h2>
            <p className="mt-2 text-gray-600">
              Located in the heart of Aspen with a unique blend of contemporary luxury and historic
              heritage, deluxe accommodations, superb amenities, genuine hospitality, and dedicated
              service for an elevated experience in the Rocky Mountains.
            </p>
          </div>
        );
      case 'Amenities':
        return (
          <div>
            <h3 className="text-2xl font-bold">Amenities</h3>
            <ul className="mt-2 text-gray-600 space-y-2">
              <li>• Complimentary Wi-Fi</li>
              <li>• 24/7 room service</li>
              <li>• Swimming pool and gym</li>
              <li>• Spa and wellness center</li>
            </ul>
          </div>
        );
      case 'Package':
        return (
          <div>
            <h3 className="text-2xl font-bold">Package</h3>
            <p className="mt-2 text-gray-600">
              Choose from a variety of vacation packages that suit your needs, including family
              retreats, romantic getaways, and adventure-filled stays.
            </p>
          </div>
        );
      case 'Rates':
        return (
          <div>
            <h3 className="text-2xl font-bold">Rates</h3>
            <p className="mt-2 text-gray-600">
              Starting at $299 per night. Seasonal discounts and promotional offers are available.
            </p>
          </div>
        );
      case 'Calendar':
        return (
          <div>
            <h3 className="text-2xl font-bold">Calendar</h3>
            <p className="mt-2 text-gray-600">Check availability and plan your stay using our interactive calendar.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 bg-white">
      {/* Navigation Tabs */}
      <div className="lg:w-1/4">
        <ul className="space-y-4 text-gray-600 font-medium">
          {['Overview', 'Amenities', 'Package', 'Rates', 'Calendar'].map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer p-2 rounded ${
                activeTab === tab
                  ? 'bg-gold text-black font-semibold' // Active Tab Style
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black' // Inactive Tab Style
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="lg:w-3/4 space-y-6">{renderTabContent()}</div>
    </div>
  );
};

export default HotelDetails;
