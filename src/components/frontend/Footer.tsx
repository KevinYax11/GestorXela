import Link from 'next/link'

export function Footer() {
  return (
    <footer id="contacto" className="bg-[#1e3a5f] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* TODO: Add footer sections (About, Quick Links, Contact) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Grupo Gestor Quetzaltenango</h3>
            <p className="text-gray-300 text-sm">
              Asociación de líderes empresariales y académicos comprometidos con el bienestar y
              crecimiento de Xela.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#quienes-somos" className="text-gray-300 hover:text-[#c9a961]">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link href="/eventos" className="text-gray-300 hover:text-[#c9a961]">
                  Eventos
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="text-gray-300 hover:text-[#c9a961]">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            {/* TODO: Fetch from SiteSettings Global */}
            <p className="text-gray-300 text-sm">
              Email: info@grupogestorxela.org
              <br />
              Tel: +502 1234-5678
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar with hidden admin link */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Grupo Gestor Quetzaltenango |{' '}
            <Link target="_blank" href="/admin" className="hover:text-[#c9a961] transition-colors">
              Administrar
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
