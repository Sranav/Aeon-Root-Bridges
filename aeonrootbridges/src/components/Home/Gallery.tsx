import React, { useState, useEffect } from 'react';
import GallerImg1 from '@assets/images/gallery1.jpg';
import GallerImg2 from '@assets/images/gallery2.jpg';
import GallerImg3 from '@assets/images/gallery3.jpg';
import GallerImg4 from '@assets/images/gallery4.jpg';
import GallerImg5 from '@assets/images/gallery5.jpg';
import GallerImg6 from '@assets/images/gallery6.jpg';
import GallerImg7 from '@assets/images/gallery7.jpg';
import GallerImg8 from '@assets/images/gallery8.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const allImages = [
  { src: GallerImg1, category: 'Villa' },
  { src: GallerImg2, category: 'Villa' },
  { src: GallerImg3, category: 'Villa' },
  { src: GallerImg4, category: 'Villa' },
  { src: GallerImg5, category: 'Investment' },
  { src: GallerImg6, category: 'Hutt' },
  { src: GallerImg7, category: 'Hutt' },
  { src: GallerImg8, category: 'Hutt' },
];

const categories = ['All', 'Villa', 'Hutt'];

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const filteredImages =
    activeCategory === 'All'
      ? allImages
      : allImages.filter((image) => image.category === activeCategory);

  const openModal = (index: number) => setCurrentIndex(index);
  const closeModal = () => setCurrentIndex(null);
  const showPrevious = () => {
    if (currentIndex !== null && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const showNext = () => {
    if (currentIndex !== null && currentIndex < filteredImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      easing: 'ease-in-out', // Easing type
      once: true, // Animation happens only once
    });
  }, []);

  return (
    <div className="p-4">
      {/* Category Tabs */}
      <div className="flex space-x-4 justify-center mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded ${
              activeCategory === category
                ? 'bg-white text-black'
                : 'bg-white text-black'
            }`}
            onMouseDown={(e) => e.preventDefault()}
            data-aos="fade-up" // Adding AOS animation to the tabs
          >
            {category}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
            data-aos="zoom-in" // Adding zoom-in animation for images
            data-aos-delay={index * 100} // Delay to stagger animation
          >
            <img
              src={image.src}
              alt={`Gallery image ${index + 1}`}
              className="object-cover w-full h-[350px] transition-transform duration-300 transform group-hover:scale-110"
            />
            {/* Zoom + Icon Overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              onClick={() => openModal(index)} // Open modal with current index
            >
              <span className="text-white text-4xl font-bold">+</span>
            </div>
          </div>
        ))}
      </div>

      {/* Zoom Modal */}
      {currentIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          data-aos="fade-in" // Adding fade-in animation to modal background
        >
          <div className="relative max-w-[90%] max-h-[90%] flex items-center">
            <button
              className="absolute left-4 bg-black text-white px-4 py-2 rounded shadow"
              onClick={showPrevious}
              disabled={currentIndex === 0}
            >
              &lt;
            </button>
            <img
              src={filteredImages[currentIndex].src}
              alt={`Zoomed image ${currentIndex + 1}`}
              className="w-full h-[600px] rounded-lg"
            />
            <button
              className="absolute right-4 bg-black text-white px-4 py-2 rounded shadow"
              onClick={showNext}
              disabled={currentIndex === filteredImages.length - 1}
            >
              &gt;
            </button>
            <button
              className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded shadow"
              onClick={closeModal}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
