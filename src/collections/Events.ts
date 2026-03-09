import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Evento',
    plural: 'Eventos',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', 'location', 'status'],
    group: 'Contenido',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
      index: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Resumen',
      maxLength: 160,
      admin: {
        description: 'Descripción corta para tarjetas y vista previa (máx. 160 caracteres)',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Descripción completa',
      required: true,
    },
    {
      name: 'promotionalImage',
      type: 'upload',
      label: 'Imagen promocional',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'eventDate',
      type: 'date',
      label: 'Fecha del evento',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'd MMM yyy HH:mm',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'Fecha de finalización',
      admin: {
        position: 'sidebar',
        description: 'Opcional: para eventos de varios días',
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'd MMM yyy HH:mm',
        },
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Lugar',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'registrationFormLink',
      type: 'text',
      label: 'Enlace de inscripción',
      admin: {
        position: 'sidebar',
        description: 'URL del formulario de inscripción (Google Form u otro)',
      },
    },
    {
      name: 'maxCapacity',
      type: 'number',
      label: 'Capacidad máxima',
      min: 1,
      admin: {
        position: 'sidebar',
        description: 'Opcional: número máximo de participantes',
      },
    },
    {
      name: 'currentRegistrations',
      type: 'number',
      label: 'Inscripciones actuales',
      defaultValue: 0,
      admin: {
        hidden: true,
        description: 'Se actualiza automáticamente',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Estado',
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' },
        { label: 'Cancelado', value: 'cancelled' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isPast',
      type: 'checkbox',
      label: '¿Evento pasado?',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Calculado automáticamente según la fecha del evento',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Categorías a las que pertenece este evento',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        // Auto-generate slug from title on create
        if (data?.title && (operation === 'create' || !data.slug)) {
          data.slug = data.title
            .toLowerCase()
            .normalize('NFD') // decompose accented chars (á → a + ́)
            .replace(/[\u0300-\u036f]/g, '') // strip accent marks
            .replace(/ñ/g, 'n')
            .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric
            .trim()
            .replace(/\s+/g, '-') // replace spaces with hyphens
            .replace(/-+/g, '-') // collapse multiple hyphens
        }
        return data
      },
    ],
    beforeChange: [
      ({ data }) => {
        if (data.eventDate) {
          data.isPast = new Date(data.eventDate) < new Date()
        }
        return data
      },
    ],
  },
}
