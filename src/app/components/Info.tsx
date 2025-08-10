// components/AboutUs.tsx
export default function AboutUs() {
  return (
    <section id="aboutus" className="py-20 bg-gradient-to-b from-white via-emerald-50/40 to-white">
     <div className="relative my-0 mb-40 ">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-transparent bg-gradient-to-r from-transparent via-emerald-200 to-transparent h-[2px]" />
  </div>
</div>

      <div className="max-w-7xl  mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Imagen */}
        <div className="relative">
          <img
            src="/doctor.png" // Cambia por tu imagen real
            alt="Equipo médico de CIMER"
            className="rounded-2xl shadow-xl object-cover w-full h-[420px]"
          />
          <div className="absolute -bottom-6 -left-6 bg-emerald-600 text-white p-6 rounded-2xl shadow-lg max-w-[240px]">
            <p className="text-4xl font-bold">15+</p>
            <p className="text-sm">Años de experiencia en investigación clínica</p>
          </div>
        </div>

        {/* Texto */}
        <div>
          <span className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            Sobre Nosotros
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
            Comprometidos con tu salud y la investigación médica
          </h2>

          {/* Historia */}
          <p className="mt-4 text-slate-600 leading-relaxed">
            Fundado hace más de 15 años, <span className="font-semibold text-emerald-700">CIMER</span> nació con el propósito de
            acercar los últimos avances de la ciencia médica a la comunidad. Desde nuestros inicios, hemos participado
            en múltiples ensayos clínicos internacionales y nacionales, contribuyendo al desarrollo de tratamientos innovadores.
          </p>

          {/* Equipo médico */}
          <p className="mt-4 text-slate-600 leading-relaxed">
            Nuestro equipo está compuesto por médicos especialistas, enfermeros de investigación, coordinadores clínicos y
            personal de apoyo, todos altamente capacitados y con experiencia en diversas áreas como enfermedades
            respiratorias, oncología, reumatología y dermatología.
          </p>

          {/* Motivación */}
          <p className="mt-4 text-slate-600 leading-relaxed">
            Nos motiva mejorar la calidad de vida de nuestros pacientes, ofreciendo un trato humano, ético y transparente.
            Creemos que cada paciente merece un cuidado integral, respaldado por evidencia científica y tecnología de vanguardia.
          </p>

          {/* Confianza */}
          <p className="mt-4 text-slate-600 leading-relaxed">
            Las personas pueden confiar en CIMER porque cumplimos estrictamente con protocolos internacionales,
            garantizamos la seguridad y confidencialidad de cada participante y mantenemos una comunicación abierta
            en todo el proceso. Nuestra reputación está respaldada por años de resultados exitosos y testimonios de
            quienes han confiado en nosotros.
          </p>

          {/* Datos destacados */}
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <p className="text-2xl font-bold text-emerald-700">+2000</p>
              <p className="text-sm text-slate-600">Pacientes atendidos</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <p className="text-2xl font-bold text-emerald-700">+120</p>
              <p className="text-sm text-slate-600">Estudios clínicos realizados</p>
            </div>
          </div>

          {/* Botones */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/studies"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-white font-medium hover:bg-emerald-700 transition"
            >
              Ver estudios activos
            </a>
           
          </div>
        </div>
      </div>
    </section>
  );
}
