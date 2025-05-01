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
    title: 'Website Design',
    description: 'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.',
  },
  {
    icon: <CodeBracketIcon />,
    title: 'Web Development',
    description: 'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.',
  },
  {
    icon: <DevicePhoneMobileIcon />,
    title: 'Mobile App Development',
    description: 'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.',
  },
  {
    icon: <ChartBarIcon />,
    title: 'Marketing',
    description: 'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.',
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
