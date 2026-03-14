import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'
import type { Media } from '@/payload-types'
import CategoryFilter from '../eventos/CategoryFilter'

export const metadata: Metadata = {
  title: 'Noticias | Grupo Gestor Quetzaltenango',
  description: 'Últimas noticias y actualizaciones del Grupo Gestor Quetzaltenango.',
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-GT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

interface NewsPageProps {
  searchParams: Promise<{ categoria?: string }>
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const { categoria } = await searchParams
  const payload = await getPayload({ config })
  const categoriesResult = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  const categoriesList = categoriesResult.docs.map((cat) => ({
    id: String(cat.id),
    title: cat.title, 
    slug: cat.slug || '',
  }))
  let categoryId = null
  if (categoria) {
    const selectedCat = categoriesResult.docs.find((c) => c.slug === categoria)
    if (selectedCat) categoryId = selectedCat.id
  }
  const baseConditions: any[] = [{ status: { equals: 'published' } }]

  if (categoryId) {
    baseConditions.push({ category: { contains: categoryId } })
  }

  const newsResult = await payload.find({
    collection: 'news',
    where: { and: baseConditions },
    sort: '-publishedAt', 
    limit: 100,
    overrideAccess: false,
  })

  const news = newsResult.docs

  return (
    <section className="pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Cabecera Responsiva y Centrada */}
        <div className="mb-8 relative flex flex-col items-center justify-center w-full">          
          <div className="relative flex flex-col items-center justify-center w-full">
            
            {/* Botón: En celular se centra arriba */}
            <div className="mb-4 sm:mb-0 sm:absolute sm:left-0 sm:top-1/2 sm:-translate-y-1/2">
              <Link
                href="/"
                className="inline-flex items-center text-[#2d5a8f] font-semibold hover:text-[#1e3a5f] text-sm transition-colors"
              >
                ← Volver a inicio
              </Link>
            </div>
            
            {/* Título: Siempre al centro  */}
            <h1 className="text-3xl font-bold text-gray-900 text-center">
              NOTICIAS
            </h1>
            
          </div>
          
          <p className="text-gray-600 max-w-2xl w-full text-center mt-4">
            Mantente al tanto de nuestros últimos proyectos, comunicados y logros.
          </p>
        </div>

        {/* Filtros*/}
        <div className="flex justify-center sm:justify-end mb-10 w-full px-4 sm:px-0">            <div className="w-full sm:w-72">
            <CategoryFilter categories={categoriesList} />
          </div>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">No hay noticias publicadas con este filtro por el momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow flex flex-col"
              >
                {/* Imagen */}
                <div className="h-48 bg-gradient-to-br from-[#2d5a8f] to-[#1e3a5f] relative overflow-hidden">
                  {typeof item.image === 'object' && (item.image as Media).url ? (
                    <Image
                      src={(item.image as Media).url!}
                      alt={(item.image as Media).alt || item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute top-4 left-4 w-12 h-12 bg-[#c9a961] rounded-lg flex items-center justify-center text-2xl">
                      
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  {item.excerpt && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-2">{item.excerpt}</p>
                  )}
                  <div className="text-sm text-gray-500 mt-auto mb-4">
                    <div>Fecha: {item.publishedAt ? formatDate(item.publishedAt) : ''}</div>
                  </div>
                  <Link
                    href={`/noticias/${item.slug}`}
                    className="inline-block w-full text-center bg-[#c9a961] hover:bg-[#b39652] text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    LEER MÁS
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
