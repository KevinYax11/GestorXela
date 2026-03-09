import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import type { Media } from '@/payload-types'

interface EventDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: false,
  })

  const event = result.docs[0]
  if (!event) return {}

  const image =
    typeof event.promotionalImage === 'object' ? (event.promotionalImage as Media) : null

  return {
    title: `${event.title} | Grupo Gestor Quetzaltenango`,
    description: event.excerpt ?? undefined,
    openGraph: {
      title: event.title,
      description: event.excerpt ?? undefined,
      images: image?.url ? [{ url: image.url }] : [],
    },
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-GT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('es-GT', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'events',
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
    },
    limit: 1,
    depth: 2,
    overrideAccess: false,
  })

  const event = result.docs[0]
  if (!event) notFound()

  const image =
    typeof event.promotionalImage === 'object' ? (event.promotionalImage as Media) : null

  const isFull =
    event.maxCapacity != null &&
    event.currentRegistrations != null &&
    event.currentRegistrations >= event.maxCapacity

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? ''

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.excerpt ?? undefined,
    startDate: event.eventDate,
    ...(event.endDate && { endDate: event.endDate }),
    ...(event.location && {
      location: {
        '@type': 'Place',
        name: event.location,
      },
    }),
    ...(image?.url && { image: `${serverUrl}${image.url}` }),
    url: `${serverUrl}/eventos/${event.slug}`,
    eventStatus:
      event.status === 'cancelled'
        ? 'https://schema.org/EventCancelled'
        : event.isPast
          ? 'https://schema.org/EventScheduled'
          : 'https://schema.org/EventScheduled',
    ...(event.registrationFormLink && {
      offers: {
        '@type': 'Offer',
        url: event.registrationFormLink,
        availability: isFull ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      },
    }),
    organizer: {
      '@type': 'Organization',
      name: 'Grupo Gestor Quetzaltenango',
      url: serverUrl,
    },
  }

  return (
    <article className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Image */}
      <div className="w-full h-72 md:h-96 bg-gradient-to-br from-[#2d5a8f] to-[#1e3a5f] relative overflow-hidden">
        {image?.url && (
          <Image
            src={image.url}
            alt={image.alt || event.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10">
            <Link
              href="/eventos"
              className="inline-flex items-center text-white/80 hover:text-white text-sm mb-4 transition-colors"
            >
              ← Volver a eventos
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-white">{event.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {event.excerpt && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{event.excerpt}</p>
            )}
            <div className="prose prose-lg max-w-none text-gray-700">
              <RichText data={event.description} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="bg-gray-50 rounded-2xl p-6 space-y-5 sticky top-24">
              {/* Status badge */}
              {event.isPast && (
                <div className="inline-block bg-gray-200 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                  Evento pasado
                </div>
              )}
              {event.status === 'cancelled' && (
                <div className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                  Cancelado
                </div>
              )}

              {/* Date & Time */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Fecha
                </p>
                <p className="text-gray-800 font-medium capitalize">
                  {formatDate(event.eventDate)}
                </p>
                <p className="text-gray-500 text-sm">{formatTime(event.eventDate)}</p>
                {event.endDate && (
                  <p className="text-gray-500 text-sm mt-1">Hasta: {formatDate(event.endDate)}</p>
                )}
              </div>

              {/* Location */}
              {event.location && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Lugar
                  </p>
                  <p className="text-gray-800 font-medium">{event.location}</p>
                </div>
              )}

              {/* Capacity */}
              {event.maxCapacity != null && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Capacidad
                  </p>
                  <p className="text-gray-800 font-medium">
                    {event.currentRegistrations ?? 0} / {event.maxCapacity} inscritos
                  </p>
                  {isFull && (
                    <span className="inline-block mt-1 text-xs font-semibold bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                      Cupo lleno
                    </span>
                  )}
                </div>
              )}

              {/* Registration CTA */}
              {event.registrationFormLink && !event.isPast && event.status !== 'cancelled' && (
                <a
                  href={event.registrationFormLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center px-6 py-3 rounded-xl font-semibold transition-colors ${
                    isFull
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                      : 'bg-[#c9a961] hover:bg-[#b39652] text-white'
                  }`}
                >
                  {isFull ? 'Cupo lleno' : 'Inscribirse'}
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}
