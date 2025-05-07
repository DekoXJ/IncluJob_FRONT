// WhatWeDo.tsx
import React, { useState, useEffect, useRef } from 'react';
import ServiceCard from './ServiceCard';

const services = [
  {
    title: 'Orientación Laboral Personalizada',
    description:
      "Ofrecemos asesoría individualizada para identificar habilidades, intereses y oportunidades laborales acordes a las capacidades y necesidades de cada usuario",
    color: '#FFE5DA',
  },
  {
    title: 'Capacitación y Formación Online',
    description:
      "Participa en cursos virtuales gratuitos en habilidades técnicas y blandas, diseñados para mejorar tu empleabilidad y potenciar tu desarrollo profesional.",
    color: '#FFF1CC',
  },
  {
    title: 'Asistencia en la Elaboración de CV',
    description:
      "Recibe ayuda para crear o mejorar tu currículum vitae, destacando tus fortalezas, logros y capacidades con herramientas accesibles e intuitivas.",
    color: '#D3F9D8',
  },
  {
    title: 'Conexión con Empresas Inclusivas',
    description:
      "Facilitamos el contacto con organizaciones que practican políticas de diversidad, equidad e inclusión, generando oportunidades laborales reales y sostenibles.",
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
          ¿Qué ofrecemos?
        </h2>
        <p className="mt-2 text-xl text-[#2B1A56]/80">
          Para tu inserción laboral
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
