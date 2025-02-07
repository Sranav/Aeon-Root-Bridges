import booking1 from "@assets/images/booking/booking-1.jpg";
import booking2 from "@assets/images/booking/booking-2.jpg";
import booking3 from "@assets/images/booking/booking-3.jpg";
import booking4 from "@assets/images/booking/booking-4.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const OtherProperties = () => {
  
  const properties = [
    { image: booking1, title: "Property 1", description: "lorem" },
    { image: booking2, title: "Property 2", description: "lorem" },
    { image: booking3, title: "Property 3", description: "lorem" },
    { image: booking4, title: "Property 4", description: "lorem" },
  ];
  useEffect(() => {
          AOS.init({ duration: 1000, once: true });
      }, []);

  return (
    <>
      <div className="text-white text-[40px] " data-aos="fade-up">Other Properties</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-aos="fade-up">
        {properties.map((property, index) => (
          <div key={index} className="relative group overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-[300px] object-cover rounded-md transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 transition-all duration-500 transform group-hover:translate-y-0 group-hover:opacity-100 opacity-0 translate-y-10">
              <div className="font-bold text-xl">{property.title}</div>
              <div>{property.description}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OtherProperties;
