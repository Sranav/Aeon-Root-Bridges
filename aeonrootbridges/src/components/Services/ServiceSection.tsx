import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

import banner1 from '@assets/images/Banner1.jpg';
import banner2 from '@assets/images/Banner3.jpg';

const ServiceSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className="">
      <div className=" px-6">
        <h2 className="text-4xl  font-bold mb-12 text-white">Our Resort Services</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Service 1 */}
          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <img
              src={banner1}
              alt="Spa"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Spa & Wellness</h3>
              <p className="text-gray-600 text-lg">
                Unwind and relax with our spa treatments designed to refresh and rejuvenate you.
              </p>
              <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">Learn More</a>
            </div>
          </div>

          {/* Service 2 */}
          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <img
              src={banner2}
              alt="Restaurant"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Dining & Cuisine</h3>
              <p className="text-gray-600 text-lg">
                Savor the finest cuisines with our world-class chefs and beachfront dining experience.
              </p>
              <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">Explore Menu</a>
            </div>
          </div>

          {/* Service 3 */}
          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <img
              src={banner1}
              alt="Adventure"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Adventure Activities</h3>
              <p className="text-gray-600 text-lg">
                From kayaking to mountain biking, enjoy a range of exciting outdoor adventures.
              </p>
              <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">Get Started</a>
            </div>
          </div>

          {/* Service 4 */}
          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <img
              src={banner2}
              alt="Yoga"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Yoga & Meditation</h3>
              <p className="text-gray-600 text-lg">
                Reconnect with your inner self through guided yoga and meditation sessions.
              </p>
              <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">Join Us</a>
            </div>
          </div>

          {/* Service 5 */}
          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            data-aos="fade-right"
            data-aos-delay="500"
          >
            <img
              src={banner2}
              alt="Pool"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Swimming Pool</h3>
              <p className="text-gray-600 text-lg">
                Relax by our infinity pool with breathtaking views of the surrounding landscape.
              </p>
              <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">Take a Dip</a>
            </div>
          </div>

          {/* Service 6 */}
          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            data-aos="fade-right"
            data-aos-delay="600"
          >
            <img
              src={banner1}
              alt="Beach"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Beachfront</h3>
              <p className="text-gray-600 text-lg">
                Enjoy our private beach with stunning views, perfect for sunbathing and relaxation.
              </p>
              <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">Relax Here</a>
            </div>
          </div>

          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            data-aos="fade-right"
            data-aos-delay="500"
          >
            <img
              src={banner2}
              alt="Pool"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Swimming Pool</h3>
              <p className="text-gray-600 text-lg">
                Relax by our infinity pool with breathtaking views of the surrounding landscape.
              </p>
              <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">Take a Dip</a>
            </div>
          </div>

          {/* Service 6 */}
          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            data-aos="fade-right"
            data-aos-delay="600"
          >
            <img
              src={banner1}
              alt="Beach"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Beachfront</h3>
              <p className="text-gray-600 text-lg">
                Enjoy our private beach with stunning views, perfect for sunbathing and relaxation.
              </p>
              <a href="#" className="text-blue-600 font-semibold mt-4 inline-block">Relax Here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
