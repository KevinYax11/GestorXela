import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { es } from '@payloadcms/translations/languages/es'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Events } from './collections/Events'
import { Categories } from './collections/Categories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      title: 'Grupo Gestor Quetzaltenango - Panel',
      titleSuffix: '', // Remove the default " - payload" suffix
      description: 'Panel de administración de la página web del Grupo Gestor Quetzaltenango',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/icon.png',
        },
      ],
    },
    components: {
      graphics: {
        Logo: '/components/payload/Logo',
        Icon: '/components/payload/Icon',
      },
    },
    theme: 'light', // Force light mode only
    timezones: {
      supportedTimezones: [
        {
          label: 'America/Guatemala',
          value: 'America/Guatemala',
        },
      ],
      defaultTimezone: 'America/Guatemala',
    },
  },
  collections: [Events, Users, Media, Categories],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      // Optimize connection pool for faster startup
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    },
    // Disable schema push in development (assumes schema is already set up)
    push: false,
  }),
  sharp,
  plugins: [],
  i18n: {
    supportedLanguages: { es },
    fallbackLanguage: 'es',
  },
})
