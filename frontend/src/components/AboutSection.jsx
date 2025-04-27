// components/AboutSection.jsx
import React from 'react';

const AboutSection = ({ image, title, description }) => {
  return (
    <div className="mb-10">
      <div className="overflow-hidden rounded-xl mb-4">
        <img src={image} alt={title} className="w-full object-cover hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="text-gray-700">
        <h4 className="font-semibold text-lg mb-2">{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default AboutSection;
