export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Descripción */}
        <div>
          <h3 className="text-xl font-bold">CIMER</h3>
          <p className="mt-3 text-sm text-emerald-100 leading-relaxed">
            Comprometidos con la investigación clínica y el cuidado de la salud, 
            ofreciendo tratamientos innovadores y atención personalizada.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h4 className="font-semibold mb-3">Enlaces</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-emerald-300 transition">Inicio</a></li>
            <li><a href="/about" className="hover:text-emerald-300 transition">Sobre Nosotros</a></li>
            <li><a href="/studies" className="hover:text-emerald-300 transition">Estudios Activos</a></li>
            <li><a href="/contact" className="hover:text-emerald-300 transition">Contacto</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="font-semibold mb-3">Contacto</h4>
          <ul className="space-y-2 text-sm">
            <li>📍 Av. Irarrázaval 1234, Ñuñoa, Santiago</li>
            <li>📞 +56 9 1234 5678</li>
            <li>✉️ contacto@cimerchile.cl</li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h4 className="font-semibold mb-3">Síguenos</h4>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-emerald-300 transition">📘</a>
            <a href="#" aria-label="Instagram" className="hover:text-emerald-300 transition">📸</a>
            <a href="#" aria-label="LinkedIn" className="hover:text-emerald-300 transition">💼</a>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-emerald-800 mt-8 pt-4 text-center text-sm text-emerald-200">
        &copy; {new Date().getFullYear()} CIMER Chile. Todos los derechos reservados.
      </div>
    </footer>
  );
}
