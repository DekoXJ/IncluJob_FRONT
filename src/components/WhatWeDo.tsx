// WhatWeDo.tsx
import React, { useState, useEffect, useRef } from 'react';
import ServiceCard from './ServiceCard';

const services = [
  {
    title: 'Website Design',
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    color: '#FFE5DA',
  },
  {
    title: 'Web Development',
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    color: '#FFF1CC',
  },
  {
    title: 'Mobile App Development',
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    color: '#D3F9D8',
  },
  {
    title: 'Marketing',
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    color: '#FFD3E2',
  },
];

const WhatWeDo: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(1);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Determine how many cards to show based on width
  const updateVisible = () => {
    const w = window.innerWidth;
    if (w >= 1024) setVisible(4);
    else if (w >= 768) setVisible(3);
    else if (w >= 640) setVisible(2);
    else setVisible(1);
  };

  useEffect(() => {
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  useEffect(() => {
    // auto-advance every 4s
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  // Width % per card and container
  const cardWidth = 100 / visible;
  const containerWidth = (services.length * 100) / visible;
  const translateX = (current * 100) / visible;

  return (
    <section className="relative bg-[#EFFBFF] py-16 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2B1A56]">
          What We Do
        </h2>
        <p className="mt-2 text-xl text-[#2B1A56]/80">
          For Your Business
        </p>
      </div>

      {/* Carousel wrapper */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            width: `${containerWidth}%`,
            transform: `translateX(-${translateX}%)`,
          }}
        >
          {services.map((svc, idx) => (
            <div
              key={idx}
              className="flex-shrink-0"
              style={{ width: `${cardWidth}%` }}
            >
              <ServiceCard {...svc} />
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {services.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === current
                ? 'bg-[#2B1A56]'
                : 'border-2 border-[#2B1A56]'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default WhatWeDo;
