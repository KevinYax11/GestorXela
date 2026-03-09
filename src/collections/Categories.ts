import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Categoría',
    plural: 'Categorías',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Configuraciones',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Nombre de la Categoría',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      unique: true,
      index: true,
      admin: {
        hidden: true, 
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
      required: false,
      admin: {
        description: 'Breve explicación de lo que abarca esta categoría',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (data?.title && (operation === 'create' || !data.slug)) {
          data.slug = data.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
        }
        return data
      },
    ],
  },
}