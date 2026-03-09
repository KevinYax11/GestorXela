import Link from 'next/link'
import Image from 'next/image'
import type { Event, Media } from '@/payload-types'

const placeholderEvents = [
  {
    id: 1,
    title: 'FORO ECONÓMICO XELA 2026',
    speaker: 'Conferencista: Dr. Alejandro López',
    date: 'Fecha: 15 FEB 2026',
    deadline: 'Inscripción límite: 10 FEB 2026',
    buttonText: 'VER MÁS',
    href: '#',
  },
  {
    id: 2,
    title: 'CUMBRE DE INNOVACIÓN DIGITAL',
    speaker: 'Conferencista: Ing. Sofía Ramírez',
    date: 'Fecha: 20 MAR 2026',
    deadline: 'Inscripción límite: 15 FEB 2026',
    buttonText: 'VER MÁS',
    href: '#',
  },
  {
    id: 3,
    title: 'LIDERAZGO EMPRESARIAL',
    speaker: 'Conferencista: Dr. Carlos Soto',
    date: 'Fecha: 25 ABR 2026',
    deadline: 'Inscripción límite: 15 MAR 2026',
    buttonText: 'INSCRIBIRSE',
    href: '#',
  },
]

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-GT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

interface EventsSectionProps {
  events?: Event[]
}

export function EventsSection({ events }: EventsSectionProps) {
  const usePlaceholder = !events || events.length === 0

  return (
    <section id="eventos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">PRÓXIMOS EVENTOS</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {usePlaceholder
            ? placeholderEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
                >
                  {/* Event Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-[#2d5a8f] to-[#1e3a5f] relative">
                    <div className="absolute top-4 left-4 w-12 h-12 bg-[#c9a961] rounded-lg flex items-center justify-center text-2xl">
                      💡
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{event.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600 mb-6">
                      <p>{event.date}</p>
                      <p>{event.deadline}</p>
                    </div>
                    <Link
                      href={event.href}
                      className="inline-block w-full text-center bg-[#c9a961] hover:bg-[#b39652] text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                      {event.buttonText}
                    </Link>
                  </div>
                </div>
              ))
            : events!.map((event) => (
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

        <div className="text-center mt-12">
          <Link
            href="/eventos"
            className="inline-block bg-[#2d5a8f] hover:bg-[#1e3a5f] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            VER TODOS LOS EVENTOS
          </Link>
        </div>
      </div>
    </section>
  )
}
