import Link from 'next/link'

export function ThematicAreasSection() {
  // TODO: Fetch categories from Payload Collection
  const areas = [
    {
      title: 'TEMA MUJER',
      description: 'Empoderamiento y liderazgo',
      icon: '👤',
      color: 'bg-[#2d5a8f]',
    },
    {
      title: 'TEMA JOVEN',
      description: 'Emprendimiento e innovación',
      icon: '💡',
      color: 'bg-[#c9a961]',
    },
    {
      title: 'CULTURA Y ENTORNO ECONÓMICO',
      description: 'Desarrollo Local y Turismo',
      icon: '📍',
      color: 'bg-[#2d5a8f]',
    },
  ]

  return (
    <section id="proyectos" className="py-20 bg-gradient-to-b from-[#1e3a5f] to-[#2d5a8f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white text-center mb-12">ÁREAS TEMÁTICAS</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {areas.map((area, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow flex flex-col h-full"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gray-200 relative flex-shrink-0">
                <div
                  className={`absolute top-4 left-4 w-12 h-12 ${area.color} rounded-lg flex items-center justify-center text-2xl`}
                >
                  {area.icon}
                </div>
              </div>

              {/* Content - Flexbox ensures button stays at bottom */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{area.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{area.description}</p>
                <Link
                  href="#"
                  className="inline-block bg-[#c9a961] hover:bg-[#b39652] text-white px-6 py-2 rounded-lg font-semibold transition-colors mt-auto text-center"
                >
                  VER MÁS
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
