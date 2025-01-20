import React, { useState } from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const ServiceCard: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      onClick={handleClick}
      className={`w-64 h-96 rounded-lg shadow-lg cursor-pointer transform transition-all duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}
    >
      <div className="relative w-full h-full">
        <div className={`absolute inset-0 bg-white p-6 rounded-lg transition-all duration-500 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
          <img src={imageUrl} alt={title} className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-center mb-2">{title}</h3>
          <p className="text-center text-gray-700">{description}</p>
        </div>

        <div className={`absolute inset-0 bg-blue-500 p-6 rounded-lg transition-all duration-500 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="text-2xl font-semibold text-white text-center mb-2">Back of Card</h3>
          <p className="text-center text-white">This is the back of the card.</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
