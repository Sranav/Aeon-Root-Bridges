import { Carousel } from 'flowbite-react';
import slide1 from '@assets/images/Banner1.jpg';
const PropertyCarousal = () => (
  <Carousel>
    <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
    <img src={slide1} alt="" />
    </div>
    <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
    <img src={slide1} alt="" />
    </div>
    <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
    <img src={slide1} alt="Banner" className="w-full h-auto object-cover" />

    </div>
  </Carousel>
);
export default PropertyCarousal;