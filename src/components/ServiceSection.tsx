// src/components/ServiceSection.tsx
import React from 'react'
import ServiceCard, { ServiceCardProps } from './ServiceCard'
import {
  ComputerDesktopIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
} from '@heroicons/react/24/solid'

const services: ServiceCardProps[] = [
  {
    icon: <ComputerDesktopIcon />,
    title: 'Orientación Laboral Personalizada',
    description: 'Ofrecemos asesoría individualizada para identificar habilidades, intereses y oportunidades laborales acordes a las capacidades y necesidades de cada usuario ',
  },
  {
    icon: <CodeBracketIcon />,
    title: 'Capacitación y Formación Online',
    description: 'Participa en cursos virtuales gratuitos en habilidades técnicas y blandas, diseñados para mejorar tu empleabilidad y potenciar tu desarrollo profesional.',
  },
  {
    icon: <DevicePhoneMobileIcon />,
    title: 'Asistencia en la Elaboración de CV',
    description: 'Recibe ayuda para crear o mejorar tu currículum vitae, destacando tus fortalezas, logros y capacidades con herramientas accesibles e intuitivas.',
  },
  {
    icon: <ChartBarIcon />,
    title: 'Conexión con Empresas Inclusivas',
    description: 'Facilitamos el contacto con organizaciones que practican políticas de diversidad, equidad e inclusión, generando oportunidades laborales reales y sostenibles.',
  },
]

const ServiceSection: React.FC = () => (
  <section className="py-16 bg-purple-50">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-extrabold text-purple-900 text-center mb-12">
        What We Do For Your Business
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, idx) => (
          <ServiceCard key={idx} {...service} />
        ))}
      </div>
    </div>
  </section>
)

export default ServiceSection
