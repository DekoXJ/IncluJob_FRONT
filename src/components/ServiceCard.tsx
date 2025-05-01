// ServiceCard.tsx
import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  color: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, color }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 mx-2">
    <div
      className="w-8 h-8 rounded-md"
      style={{ backgroundColor: color }}
    />
    <h3 className="mt-4 text-lg font-semibold text-[#2B1A56]">
      {title}
    </h3>
    <p className="mt-2 text-sm text-[#2B1A56]/80">
      {description}
    </p>
  </div>
);

export default ServiceCard;
