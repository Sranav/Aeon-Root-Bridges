import React, { useState } from 'react';

const HotelDetails = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div>
            <div className="text-2xl font-semibold text-black">
              DE FINIBUS BONORUM ET MALORUM", WRITTEN BY CICERO IN 45 BC
            </div>
            <div className="mt-2 text-black text-[18px] font-playfair">
              Located in the heart of Aspen with a unique blend of contemporary luxury and historic
              heritage, deluxe accommodations, superb amenities, genuine hospitality, and dedicated
              service for an elevated experience in the Rocky Mountains.
            </div>
            <div className='flex flex-row gap-[140px] pt-10'>
              <div>
                <div className='text-[20px] text-black font-semibold pt-6'>SPECIAL ROOM</div>
                <ul className='text-black font-playfair list-disc pl-10'>
                <li>Max: 3 Person(s)</li>
                <li>Size: 35 m2 / 376 ft2</li>
                <li>View: Ocen</li>
                <li>Bed: King-size or twin beds</li>
                </ul>
              </div>
              <div>
                <div className='text-[20px] text-black font-semibold pt-6'>SERVICE ROOM</div>
                <ul className='text-black font-playfair list-disc pl-10'>
                <li>Oversized work desk</li>
                <li>Hairdryer</li>
                <li>Iron/ironing board upon request</li>
                
                </ul>
              </div>
            </div>
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
