import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Av1 from "@assets/images/av1.webp";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  message: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mike Hardson",
    position: "CEO - Co Founder",
    message:
      "Lorem ipsum is simply free dolor not sit amet, notted adipiscing elit sed do eiusmod incididunt labore et dolore text.",
    image: Av1,
  },
  {
    id: 2,
    name: "Alesha Brown",
    position: "Co Founder",
    message:
      "Lorem ipsum is simply free dolor not sit amet, notted adipiscing elit sed do eiusmod incididunt labore et dolore text.",
    image: Av1,
  },
];

const Testimonial: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-black py-12">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h4 className="text-sm text-gray-400 uppercase tracking-wide">Guest Reviews</h4>
        <h2 className="text-4xl font-extrabold text-white mb-4">
          What Guests Saying?
        </h2>
        {/* Star Ratings */}
        <div className="flex justify-center gap-1 mb-3">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className="text-yellow-400 text-2xl drop-shadow-lg"
            >
              ★
            </span>
          ))}
        </div>
        <p className="text-gray-400 text-sm">
          Trust Score 4.5 (Based on 2,500 Reviews)
        </p>
      </div>

      {/* Testimonial Slider */}
      <div className="max-w-7xl mx-auto px-4">
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-4">
              <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                {/* Message */}
                <div className="p-6">
                  <p className="italic text-gray-300 text-lg leading-relaxed">
                    {`"${testimonial.message}"`}
                  </p>
                </div>
                {/* Profile */}
                <div className="bg-white p-6 flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-4 border-gray-800 shadow-md"
                  />
                  <div className="ml-4">
                    <div className=" font-bold text-lg text-black">
                      {testimonial.name}
                    </div>
                    <p className="text-black text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
