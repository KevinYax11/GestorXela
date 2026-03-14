import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'
import type { Media } from '@/payload-types'
import CategoryFilter from './CategoryFilter'

export const metadata: Metadata = {
  title: 'Eventos | Grupo Gestor Quetzaltenango',
  description: 'Próximos eventos y actividades organizadas por Grupo Gestor Quetzaltenango.',
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-GT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

interface EventsPageProps {
  searchParams: Promise<{ filter?: string, categoria?:string }>
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const { filter, categoria } = await searchParams
  const showPast = filter === 'past'
  const now = new Date().toISOString()

  const payload = await getPayload({ config })

  // 1. Obtener TODAS las categorías para llenar el combobox
  const categoriesResult = await payload.find({
    collection: 'categories',
    limit: 100,
  })
  const categoriesList = categoriesResult.docs.map(cat => ({
    id: String(cat.id),
    title: cat.title,
    slug: cat.slug || '',
  }))
  // 1.
  let categoryId = null
  if (categoria) {
    const categoryResult = await payload.find({
      collection: 'categories',
      where: {
        slug: { equals: categoria },
      },
      limit: 1,
    })
    
    if (categoryResult.docs.length > 0) {
      categoryId = categoryResult.docs[0].id
    }
  }
  // 2. 
  const baseConditions: any[] = [
    { status: { equals: 'published' } },
    showPast ? { eventDate: { less_than: now } } : { eventDate: { greater_than_equal: now } },
  ]

  // 3. 
  if (categoryId) {
    baseConditions.push({
      categories: { contains: categoryId },
    })
  }

// 4.
  const eventsResult = await payload.find({
    collection: 'events',
    where: {
      and: baseConditions, 
    },
    sort: showPast ? '-eventDate' : 'eventDate',
    limit: 100,
    overrideAccess: false,
  })

  const events = eventsResult.docs
  const allCategories = await payload.find({
    collection: 'categories',
    limit: 50,
  })

  return (
    <section className="pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Page Header */}
        <div className="mb-8 flex flex-col items-center justify-center w-full">
          <div className="relative flex flex-col items-center justify-center w-full">
            <div className="mb-4 sm:mb-0 sm:absolute sm:left-0 sm:top-1/2 sm:-translate-y-1/2">
            <Link
              href="/"
              className="inline-flex items-center text-[#2d5a8f] font-semibold hover:text-[#1e3a5f] text-sm transition-colors"
            >
              ← Volver a inicio
            </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 text-center">EVENTOS</h1>
          </div>
          <p className="text-gray-600 max-w-2xl w-full text-center mt-4">
            Conoce los eventos y actividades organizados por Grupo Gestor Quetzaltenango y mantente
            informado de cómo puedes participar.
          </p>
        </div>
        
        {/* Filtros: Toggle y Combobox */}
        <div className="relative flex flex-col sm:flex-row justify-center items-center mb-12 min-h-[40px]">
          
          {/* Upcoming / Past Toggle (Se queda en el centro) */}
          <div className="flex gap-3">
            <Link
              href={categoria ? `/eventos?categoria=${categoria}` : `/eventos`}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                !showPast
                  ? 'bg-[#2d5a8f] text-white'
                  : 'bg-white text-[#2d5a8f] border border-[#2d5a8f] hover:bg-[#2d5a8f] hover:text-white'
              }`}
            >
              Próximos
            </Link>
            <Link
              href={categoria ? `/eventos?filter=past&categoria=${categoria}` : `/eventos?filter=past`}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                showPast
                  ? 'bg-[#2d5a8f] text-white'
                  : 'bg-white text-[#2d5a8f] border border-[#2d5a8f] hover:bg-[#2d5a8f] hover:text-white'
              }`}
            >
              Pasados
            </Link>
          </div>
          <div className="mt-6 sm:mt-0 sm:absolute sm:right-0 w-full sm:w-auto">
            <CategoryFilter categories={categoriesList} />
          </div>  
  </div>
        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">
              {showPast ? 'No hay eventos pasados.' : 'No hay eventos próximos por el momento.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow flex flex-col"
              >
                {/* Event Image */}
                <div className="h-48 bg-gradient-to-br from-[#2d5a8f] to-[#1e3a5f] relative overflow-hidden">
                  {typeof event.promotionalImage === 'object' &&
                  (event.promotionalImage as Media).url ? (
                    <Image
                      src={(event.promotionalImage as Media).url!}
                      alt={(event.promotionalImage as Media).alt || event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute top-4 left-4 w-12 h-12 bg-[#c9a961] rounded-lg flex items-center justify-center text-2xl">
                      💡
                    </div>
                  )}
                </div>

                {/* Event Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                  {event.excerpt && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-2">{event.excerpt}</p>
                  )}
                  <div className="text-sm text-gray-500 mt-auto mb-4">
                    <div>Fecha: {formatDate(event.eventDate)}</div>
                    {event.location && <div>Lugar: {event.location}</div>}
                  </div>
                  <Link
                    href={`/eventos/${event.slug}`}
                    className="inline-block w-full text-center bg-[#c9a961] hover:bg-[#b39652] text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    VER MÁS
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
