'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const pathname = usePathname()

  // Derive active section from pathname for non-homepage routes
  useEffect(() => {
    if (pathname.startsWith('/eventos')) {
      setActiveSection('eventos')
    } else if (pathname.startsWith('/noticias')) {
      setActiveSection('noticias')
    } else if (pathname === '/') {
      // Reset to scroll-based detection on homepage
      setActiveSection('inicio')
    }
  }, [pathname])

  useEffect(() => {
    // Scroll-based detection only applies on the homepage
    if (pathname !== '/') return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      setShowScrollTop(window.scrollY > 400)

      // Detect active section based on scroll position
      const scrollPosition = window.scrollY + 150 // Offset for header height
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Check if at top of page
      if (window.scrollY < 200) {
        setActiveSection('inicio')
        return
      }

      // Check if at bottom of page (for contacto)
      if (windowHeight + scrollPosition >= documentHeight - 50) {
        setActiveSection('contacto')
        return
      }

      // Check sections in reverse order (bottom to top) for more accurate detection
      const sections = ['eventos', 'proyectos', 'alianzas', 'quienes-somos']

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY

          // Check if we're past this section's start
          if (scrollPosition >= elementTop) {
            setActiveSection(sectionId)
            return
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinkClass = (section: string) =>
    `font-semibold transition-all duration-300 hover:!text-[#c9a961] ${
      isScrolled ? 'text-sm' : 'text-base'
    } ${activeSection === section ? 'border-b-2 border-[#c9a961] pb-1' : ''}`

  const mobileNavLinkClass = (section: string) =>
    `block py-3 px-4 font-semibold transition-all duration-300 hover:bg-gray-100 hover:!text-[#c9a961] ${
      activeSection === section ? 'bg-gray-100 border-l-4 border-[#c9a961]' : ''
    }`

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  const scrollToTop = () => {
    const startPosition = window.scrollY
    const duration = 400 // milliseconds (faster than default ~600-800ms)
    const startTime = performance.now()

    const easeInOutQuad = (t: number) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    }

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = easeInOutQuad(progress)
      
      window.scrollTo(0, startPosition * (1 - easeProgress))
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }

    requestAnimationFrame(animateScroll)
  }

  return (
    <header
      className={`bg-white shadow-md fixed top-0 left-0 right-0 z-50 border-b border-gray-200 transition-all duration-300 ${
        isScrolled ? 'h-12' : 'h-20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Grupo Gestor Xela"
              width={180}
              height={50}
              className="w-auto transition-all duration-300 ease-in-out"
              style={{
                height: isScrolled ? '32px' : '50px',
              }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={navLinkClass('inicio')} style={{ color: '#1e3a5f' }}>
              INICIO
            </Link>
            <Link
              href="#quienes-somos"
              className={navLinkClass('quienes-somos')}
              style={{ color: '#1e3a5f' }}
            >
              QUIÉNES SOMOS
            </Link>
            <Link
              href="#alianzas"
              className={navLinkClass('alianzas')}
              style={{ color: '#1e3a5f' }}
            >
              ALIANZAS
            </Link>
            <Link
              href="#proyectos"
              className={navLinkClass('proyectos')}
              style={{ color: '#1e3a5f' }}
            >
              PROYECTOS
            </Link>
            <Link href="/eventos" className={navLinkClass('eventos')} style={{ color: '#1e3a5f' }}>
              EVENTOS
            </Link>
            <Link
              href="#contacto"
              className={navLinkClass('contacto')}
              style={{ color: '#1e3a5f' }}
            >
              CONTACTO
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:text-[#c9a961]"
            style={{ color: '#1e3a5f' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              className={`transition-all duration-300 ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden bg-white border-t border-gray-200 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col py-2">
          <Link
            href="/"
            className={mobileNavLinkClass('inicio')}
            style={{ color: '#1e3a5f' }}
            onClick={handleMobileNavClick}
          >
            INICIO
          </Link>
          <Link
            href="#quienes-somos"
            className={mobileNavLinkClass('quienes-somos')}
            style={{ color: '#1e3a5f' }}
            onClick={handleMobileNavClick}
          >
            QUIÉNES SOMOS
          </Link>
          <Link
            href="#alianzas"
            className={mobileNavLinkClass('alianzas')}
            style={{ color: '#1e3a5f' }}
            onClick={handleMobileNavClick}
          >
            ALIANZAS
          </Link>
          <Link
            href="#proyectos"
            className={mobileNavLinkClass('proyectos')}
            style={{ color: '#1e3a5f' }}
            onClick={handleMobileNavClick}
          >
            PROYECTOS
          </Link>
          <Link
            href="/eventos"
            className={mobileNavLinkClass('eventos')}
            style={{ color: '#1e3a5f' }}
            onClick={handleMobileNavClick}
          >
            EVENTOS
          </Link>
          <Link
            href="#contacto"
            className={mobileNavLinkClass('contacto')}
            style={{ color: '#1e3a5f' }}
            onClick={handleMobileNavClick}
          >
            CONTACTO
          </Link>
        </nav>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 bg-[#2d5a8f] hover:bg-[#1e3a5f] text-white p-3 rounded-full shadow-lg transition-all duration-300 z-40 ${
          showScrollTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </header>
  )
}
