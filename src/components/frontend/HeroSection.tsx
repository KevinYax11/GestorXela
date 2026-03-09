import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative h-[500px] md:h-[600px] flex items-center justify-start bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f]">
      {/* TODO: Replace with dynamic background image from Payload Global */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920')",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
            LIDERAZGO EMPRESARIAL E INNOVACIÓN PARA EL DESARROLLO ECONÓMICO DE QUETZALTENANGO.
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
            Asociación de líderes, empresarios y académicos comprometidos con el bienestar y
            crecimiento de Xela.
          </p>
        </div>
      </div>
    </section>
  )
}
