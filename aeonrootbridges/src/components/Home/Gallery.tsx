import React, { useState } from 'react';
import GallerImg1 from '@assets/images/gallery1.jpg';
import GallerImg2 from '@assets/images/gallery2.jpg';
import GallerImg3 from '@assets/images/gallery3.jpg';
import GallerImg4 from '@assets/images/gallery4.jpg';
import GallerImg5 from '@assets/images/gallery5.jpg';
import GallerImg6 from '@assets/images/gallery6.jpg';
import GallerImg7 from '@assets/images/gallery7.jpg';
import GallerImg8 from '@assets/images/gallery8.jpg';

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

  // Filter images based on the selected category
  const filteredImages =
    activeCategory === 'All'
      ? allImages
      : allImages.filter((image) => image.category === activeCategory);

  return (
    <div className=" p-4">
      {/* Category Tabs */}
      <div className="flex space-x-4 justify-center mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded ${
              activeCategory === category
                ? 'bg-white text-black'
                : 'bg-white text-black '
            }`}
            // Disable focus outline
            onMouseDown={(e) => e.preventDefault()}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredImages.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image.src}
              alt={`Gallery image ${index + 1}`}
              className="object-cover w-full h-[350px] rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
