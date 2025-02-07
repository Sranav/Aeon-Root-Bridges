import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const RoomDetails = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const services = [
        { name: "24-hour in-room dining", icon: "🍽️" },
        { name: "Coffee Set", icon: "☕" },
        { name: "Safe Box", icon: "🔒" },
        { name: "WiFi", icon: "📶" },
        { name: "Ambassador Service", icon: "🎖️" },
        { name: "Turndown Service", icon: "🛏️" },
        { name: "Hairdryer", icon: "💨" },
        { name: "Air conditioning", icon: "❄️" },
    ];

    return (
        <div className="text-white lg:p-0 xs:p-4">
            {/* Room Description */}
            <div className="lg:text-[40px] xs:text-[35px]" data-aos="fade-up">Room Description</div>
            <div className="text-[20px] py-4" data-aos="fade-up" data-aos-delay="200">
                All our Deluxe rooms have big windows to help you take a broad view of the cityscape and nature.
                We offer bigger beds, and every bathroom has a bathtub and shower for relaxation after a long day.
            </div>
            <div className="text-[20px] pb-4" data-aos="fade-up" data-aos-delay="400">
                Fast WIFI connection, satellite TV, and international standard electric sockets are standard throughout the hotel.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </div>

            {/* Divider */}
            <div className="border border-white mt-4" data-aos="fade-in" data-aos-delay="600"></div>

            {/* Services & Amenities */}
            <div className="lg:text-[40px] xs:text-[35px] py-6" data-aos="fade-up">Services & Amenities</div>

            <div className="grid xs:grid-cols-1 md:grid-cols-4 gap-10 p-4">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="group flex items-center justify-between border border-b-white p-6 rounded cursor-pointer transition-all duration-300 hover:bg-white"
                        data-aos="zoom-in"
                        data-aos-delay={index * 100} // Staggered animation effect
                    >
                        <div className="text-[20px] transition-all duration-300 group-hover:text-black">{service.name}</div>
                        <div className="text-[28px] transition-all duration-300 group-hover:text-black">{service.icon}</div>
                    </div>
                ))}
            </div>
            <div className="border border-white mt-10" data-aos-delay="600"></div>
            <div className="pt-10 text-[40px]" data-aos="fade-up">Room Rules</div>
            <div className="flex lg:flex-row xs:flex-col justify-stretch pt-6">
                <div className="flex flex-col">
                    <div className="text-[20px]" data-aos="fade-up">Check-in</div>
                    <ul className="list-disc py-6 pl-6" data-aos="fade-up">
                        <li>Check-in from 9:00 AM - anytime</li>
                        <li>Early check-in subject to availability</li>
                        <li>Minimum check-in age - 18</li>
                    </ul>
                </div>
                <div className="flex flex-col" data-aos="fade-up">
                    <div className="text-[20px]">Check-Out</div>
                    <ul className="list-disc py-6 pl-6">
                        <li>Check-out before noon</li>
                        <li>Express check-out</li>

                    </ul>
                </div>
            </div>
            <div className="text-[20px]" data-aos="fade-up">Special check-in instructions</div>
            <div className="text-[16px] pt-6" data-aos="fade-up">Guests will receive an email 5 days before arrival with check-in instructions; front desk staff will greet guests on arrival For more details, please contact the property using the information on the booking confirmation.</div>
            <div className="text-[20px] pt-6" data-aos="fade-up">Children and extra beds</div>
            <div className="text-[16px] pt-6" data-aos="fade-up">Children are welcome Kids stay free! Children stay free when using existing bedding; children may not be eligible for complimentary breakfast Rollaway/extra beds are available for INR 40.0 per day</div>
        </div>
    );
};

export default RoomDetails;
