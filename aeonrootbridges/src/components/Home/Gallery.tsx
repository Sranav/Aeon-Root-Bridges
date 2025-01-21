import React, { useState } from 'react';
import BestExpBanner from '@assets/images/BestExpBanner.jpg';

const allImages = [
  { src: BestExpBanner, category: 'Investment' },
  { src: BestExpBanner, category: 'Adventure' },
  { src: BestExpBanner, category: 'Villa Residency' },
  { src: BestExpBanner, category: 'Luxury Stay' },
  { src: BestExpBanner, category: 'Investment' },
  { src: BestExpBanner, category: 'Investment' },
  { src: BestExpBanner, category: 'Investment' },
  { src: BestExpBanner, category: 'Investment' },
  { src: BestExpBanner, category: 'Investment' },
  { src: BestExpBanner, category: 'Adventure' },
  { src: BestExpBanner, category: 'Villa Residency' },
  { src: BestExpBanner, category: 'Luxury Stay' },
];

const categories = ['All', 'Investment', 'Adventure', 'Villa Residency', 'Luxury Stay'];

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter images based on the selected category
  const filteredImages =
    activeCategory === 'All'
      ? allImages
      : allImages.filter((image) => image.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Category Tabs */}
      <div className="flex space-x-4 justify-center mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded ${
              activeCategory === category
                ? 'bg-blue-700 text-white'
                : 'bg-blue-500 text-white hover:bg-blue-700'
            }`}
            // Disable focus outline
            onMouseDown={(e) => e.preventDefault()}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredImages.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image.src}
              alt={`Gallery image ${index + 1}`}
              className="object-cover w-full h-64 rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
