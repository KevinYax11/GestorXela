import Image from 'next/image'

export function AboutSection() {
  return (
    <>
      {/* Quienes Somos Section */}
      <section id="quienes-somos" className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Images Section - TODO: Replace with dynamic images from Payload */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-3 gap-4">
                {/* Placeholder for leader images */}
                <div className="bg-[#2d5a8f] h-80 rounded-lg"></div>
                <div className="bg-[#1e3a5f] h-80 rounded-lg mt-8"></div>
                <div className="bg-[#c9a961] h-80 rounded-lg"></div>
              </div>
            </div>

            {/* Content Section */}
            <div>
              <p className="text-[#c9a961] text-sm font-semibold uppercase mb-2">
                Quiénes Somos:
              </p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                ALIANZA ESTRATÉGICA PARA EL FUTURO
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                Somos una asociación de líderes empresariales y académicos, enfocada en el desarrollo económico local, 
                procurando el bienestar de Quetzaltenango (Xela).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partners Section */}
      <section id="alianzas" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-gray-600 mb-6 text-center">Partners estratégicos:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-center">
            {/* TODO: Replace with actual partner logos from Payload Global */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white h-16 rounded flex items-center justify-center shadow-sm">
                <span className="text-xs text-gray-400">Logo {i}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-center mt-4">
            {[5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white h-16 rounded flex items-center justify-center shadow-sm">
                <span className="text-xs text-gray-400">Logo {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
