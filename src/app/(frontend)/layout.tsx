import React from 'react'
import '@/styles/globals.css'
import './styles.css'
import { Header } from '@/components/frontend/Header'
import { Footer } from '@/components/frontend/Footer'

export const metadata = {
  description:
    'Asociación de líderes empresariales y académicos comprometidos con el bienestar y crecimiento de Quetzaltenango (Xela)',
  title: 'Grupo Gestor Quetzaltenango - Desarrollo Económico Regional',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      url: '/icon.png',
    },
  ],
  openGraph: {
    title: 'Grupo Gestor Quetzaltenango',
    description: 'Alianza estratégica para el desarrollo económico de Quetzaltenango',
    type: 'website',
    locale: 'es_GT',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  // TODO Phase 6: Fetch site settings from Payload Global
  // const payload = await getPayload({ config })
  // const settings = await payload.findGlobal({ slug: 'site-settings' })

  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen overflow-x-hidden w-full bg-white">
        <Header />
        <main className="flex-grow pt-20 w-full bg-white">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
