const Testimonials = () => {
    const quotes = [
      { text: '¡¡Encontré trabajo en solo unas semanas después de registrarme!!', author: 'Carlos Paez' },
      { text: 'Los videos guía son de mucha ayuda :).', author: 'Valeria Campos' },
      { text: 'Pude entender rápido como manejar el sitio', author: 'Miguel Sanchez' },
    ]

    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800">Nuestros Testimonios</h3>
          <p className="text-gray-600 mt-2">¿Qué dicen nuestros usuarios?</p>
        </div>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {quotes.map((q, i) => (
            <blockquote key={i} className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-700 italic mb-4">“{q.text}”</p>
              <cite className="block text-right font-semibold text-gray-900">— {q.author}</cite>
            </blockquote>
          ))}
        </div>
      </section>
  )
}

export default Testimonials
