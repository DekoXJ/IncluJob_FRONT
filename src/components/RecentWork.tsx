const RecentWork = () => {
    const works = [
      { title: 'UI Soup', img: '/img/work1.png' },
      { title: 'Goldcrown Labs', img: '/img/work2.png' },
      { title: 'Close Concierge', img: '/img/work3.png' },
    ]

    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800">Our Recent Work</h3>
          <p className="text-gray-600 mt-2">By Our Experts</p>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map(w => (
            <div key={w.title} className="group relative overflow-hidden rounded-lg shadow">
              <img
                src={w.img}
                alt={w.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent p-4">
                <h4 className="text-white font-semibold">{w.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
  )
}

export default RecentWork
