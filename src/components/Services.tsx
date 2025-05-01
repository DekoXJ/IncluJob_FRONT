import React from 'react'

const Services = () => {
  const items = [
    { title: 'Website Design', icon: '/img/website.svg', bg: 'bg-blue-100' },
    { title: 'Web Development', icon: '/img/code.svg', bg: 'bg-yellow-100' },
    { title: 'Mobile App', icon: '/img/mobile.svg', bg: 'bg-green-100' },
    { title: 'Marketing', icon: '/img/marketing.svg', bg: 'bg-pink-100' },
  ]

  return (
        <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
            What We Do For Your Business
            </h3>
            <p className="text-gray-600 mt-2">Professional services to elevate your digital presence.</p>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map(item => (
            <div key={item.title} className="p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className={`${item.bg} p-4 rounded-full inline-block mb-4`}>
                <img src={item.icon} alt={item.title} className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            </div>
            ))}
        </div>
        </section>
    )
}

export default Services
