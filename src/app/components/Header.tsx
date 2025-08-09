'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // You can use any icon library
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-700">CimerChile</div>

        {/* Desktop Navigation */}
        <nav className="space-x-6 hidden md:flex">
          
        
          <a href="#" className="text-gray-700 hover:text-blue-600">Especialidades</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Testimonios</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Noticias</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Quienes somos</a>
        </nav>

        

<Link
  href="/contact-us"
  className="bg-blue-600 text-white px-4 py-2 rounded hidden md:inline hover:bg-blue-700 transition"
>
  Reserva tu cita
</Link>


        {/* Mobile Hamburger Icon */}
        <button onClick={toggleMenu} className="md:hidden text-blue-700">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <a href="#" className="block text-gray-700 hover:text-blue-600">Inicio</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Nosotros</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Nuestro Equipo</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Estudios</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Testimonios</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Noticias</a>
          <button className="w-full bg-blue-600 text-white py-2 rounded">WhatsApp Button</button>
        </div>
      )}
    </header>
  );
}
