import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/dist/client/link'

interface NewsArticleProps {
  params: Promise<{ slug: string }>
}

export default async function NewsArticlePage({ params }: NewsArticleProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const newsResult = await payload.find({
    collection: 'news',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
  })

  const article = newsResult.docs[0]

  if (!article) {
    notFound()
  }

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('es-GT', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Botón de regresar (formato estándar) */}
      <div className="mb-8">
        <Link
          href="/noticias"
          className="inline-flex items-center text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
        >
          ← Volver a noticias
        </Link>
      </div>

      {/* Cabecera del artículo */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{article.title}</h1>
        <div className="text-gray-500 flex justify-center gap-4 text-sm font-medium">
          <span>{formattedDate}</span>
          {article.author && <span>• Por {article.author}</span>}
        </div>
      </header>

      {/* Imagen Principal*/}
      {typeof article.image === 'object' && (article.image as Media).url && (
        <div className="relative w-full max-w-md aspect-[4/3] mx-auto mb-6 rounded-xl overflow-hidden shadow-md bg-white">
          <Image
            src={(article.image as Media).url!}
            alt={(article.image as Media).alt || article.title}
            fill
            className="object-contain"
            priority
          />
        </div>
      )}

      {/* Contenido */}
      {article.content && (
        <div className="text-gray-800 text-lg leading-relaxed flex flex-col gap-4 max-w-4xl mx-auto">
          <RichText data={article.content} />
        </div>
      )}
    </article>
  )
}
