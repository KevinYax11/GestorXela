'use client'

import { useRouter, useSearchParams,usePathname } from 'next/navigation'

interface Category {
  id: string
  title: string
  slug: string
}

export default function CategoryFilter({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  
  const currentCategory = searchParams.get('categoria') || ''

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value
    

    const params = new URLSearchParams(searchParams.toString())

    if (newCategory) {
      params.set('categoria', newCategory)
    } else {
      params.delete('categoria')
    }


    router.push(`${pathname}?${params.toString()}`)  }
return (
    
    <div className="relative w-full max-w-full">
      <select
        value={currentCategory}
        onChange={handleChange}
        className="appearance-none w-full px-4 pr-10 py-3 rounded-lg font-semibold bg-white border border-[#2d5a8f] text-[#2d5a8f] focus:outline-none focus:ring-2 focus:ring-[#2d5a8f] cursor-pointer truncate shadow-sm"      >
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.slug}>
            {cat.title}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#2d5a8f]">
        <svg className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
    )
 } 