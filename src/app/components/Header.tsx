'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toggleMenu = () => setIsOpen(v => !v);
  const closeMenu = () => setIsOpen(false);

  // Smooth scroll with dynamic offset
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const href = (e.currentTarget.getAttribute('href') || '').trim();
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href) as HTMLElement | null;
      if (el) {
        const headerEl = headerRef.current || document.querySelector('header') as HTMLElement | null;
        const headerH = (headerEl?.offsetHeight ?? 80) + 8; // +8px breathing room
        const y = el.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      closeMenu();
    } else {
      closeMenu();
    }
  };

  return (
    <header
      ref={headerRef}
      className="bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-700">CimerChile</Link>

        <nav className="space-x-6 hidden md:flex">
          <a href="#features" onClick={handleAnchorClick} className="text-gray-700 hover:text-blue-600">Especialidades</a>
          <a href="#testimonios" onClick={handleAnchorClick} className="text-gray-700 hover:text-blue-600">Testimonios</a>
          <a href="#news" onClick={handleAnchorClick} className="text-gray-700 hover:text-blue-600">Noticias</a>
          <a href="#aboutus" onClick={handleAnchorClick} className="text-gray-700 hover:text-blue-600">Quiénes somos</a>
        </nav>

        <Link href="/contact-us" className="bg-blue-600 text-white px-4 py-2 rounded hidden md:inline hover:bg-blue-700 transition">
          Reserva tu cita
        </Link>

        <button
          onClick={toggleMenu}
          className="md:hidden text-blue-700 p-2 rounded hover:bg-blue-50"
          aria-label="Abrir menú"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="md:hidden px-4 pb-4 space-y-2">
          <a href="#features" onClick={handleAnchorClick} className="block text-gray-700 hover:text-blue-600">Especialidades</a>
          <a href="#testimonios" onClick={handleAnchorClick} className="block text-gray-700 hover:text-blue-600">Testimonios</a>
          <a href="#news" onClick={handleAnchorClick} className="block text-gray-700 hover:text-blue-600">Noticias</a>
          <a href="#estudios" onClick={handleAnchorClick} className="block text-gray-700 hover:text-blue-600">Estudios</a>
          <a href="#aboutus" onClick={handleAnchorClick} className="block text-gray-700 hover:text-blue-600">Quiénes somos</a>
          <Link href="/contact-us" onClick={closeMenu} className="block text-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Agenda tu evaluación
          </Link>
        </div>
      )}
    </header>
  );
}
