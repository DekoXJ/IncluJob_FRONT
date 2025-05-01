// src/components/CTASection.tsx
import React from 'react'
import { Link } from 'react-router-dom'

const CTASection: React.FC = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-purple-900 mb-6">
        Ready to Get Started?
      </h2>
      <div className="flex justify-center space-x-4">
        <Link
          to="/login?role=empresa"
          className="px-6 py-3 bg-purple-900 text-white rounded-lg hover:bg-purple-800"
        >
          Empresa
        </Link>
        <Link
          to="/login?role=postulante"
          className="px-6 py-3 bg-purple-900 text-white rounded-lg hover:bg-purple-800"
        >
          Postulante
        </Link>
      </div>
    </div>
  </section>
)

export default CTASection
