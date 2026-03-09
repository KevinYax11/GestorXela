export function ConferenceSection() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8f] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            CONFERENCISTAS DE ALTO NIVEL
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Eventos que inspiran e impulsan la innovación y el liderazgo empresarial en Quetzaltenango.
          </p>

          {/* TODO: Implement carousel/slider with featured speakers */}
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            <button className="bg-white/20 hover:bg-white/30 p-2 md:p-3 rounded-full transition-colors">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Placeholder for speaker images */}
            <div className="flex space-x-2 md:space-x-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-32 h-32 md:w-48 md:h-48 bg-white/10 rounded-lg"></div>
              ))}
            </div>

            <button className="bg-white/20 hover:bg-white/30 p-2 md:p-3 rounded-full transition-colors">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
