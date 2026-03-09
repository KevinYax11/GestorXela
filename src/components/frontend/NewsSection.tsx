import Link from 'next/link'
import Image from 'next/image'

export function NewsSection() {
  // TODO: Fetch latest news from Payload Collection (Phase 3)
  const placeholderNews = [
    {
      id: 1,
      title: 'Nueva alianza estratégica con sector financiero',
      excerpt: 'Grupo Gestor firma convenio de colaboración con instituciones financieras para impulsar el desarrollo económico local.',
      image: '/placeholder-news-1.jpg',
      category: 'Alianzas',
      date: '15 Febrero 2026',
    },
    {
      id: 2,
      title: 'Inauguración de centro de innovación empresarial',
      excerpt: 'Se inaugura el primer centro de innovación dedicado a emprendedores de Quetzaltenango.',
      image: '/placeholder-news-2.jpg',
      category: 'Innovación',
      date: '10 Febrero 2026',
    },
    {
      id: 3,
      title: 'Programa de liderazgo femenino alcanza 200 participantes',
      excerpt: 'El programa de empoderamiento y liderazgo femenino supera las expectativas en su primera edición.',
      image: '/placeholder-news-3.jpg',
      category: 'Desarrollo Social',
      date: '5 Febrero 2026',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            ÚLTIMAS NOTICIAS
          </h2>
          <Link
            href="/noticias"
            className="text-[#2d5a8f] hover:text-[#c9a961] font-semibold transition-colors"
          >
            Ver todas →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {placeholderNews.map((news) => (
            <article
              key={news.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              {/* News Image Placeholder */}
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute top-4 left-4 bg-[#c9a961] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {news.category}
                </div>
              </div>

              {/* News Content */}
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{news.date}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {news.excerpt}
                </p>
                <Link
                  href="#"
                  className="text-[#2d5a8f] hover:text-[#c9a961] font-semibold transition-colors inline-flex items-center"
                >
                  Leer más
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
