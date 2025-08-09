import { Wind } from 'lucide-react';

export default function EspecialidadRespiratorio() {
  const respiratorio = {
    title: 'Respiratorio',
    subtitle: 'Asma, EPOC y enfermedades pulmonares intersticiales.',
    image: '/doctor.png', // Cambia por tu imagen real
    bullets: [
      'Espirometría y DLCO',
      'Imagenología de alta resolución',
      'Programas de adherencia',
    ],
  };

  return (
    <section className="py-20 from-emerald-50/60 via-white to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            Especialidad
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
            Área Respiratoria en CIMER
          </h2>
          <p className="mt-3 text-slate-600">
            Nuestro equipo combina investigación clínica, tecnología de última generación 
            y un enfoque humano para el diagnóstico y tratamiento de enfermedades respiratorias.
          </p>
        </div>

        {/* Content */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Image Card */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
            <img
              src={respiratorio.image}
              alt={respiratorio.title}
              className="h-[360px] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="bg-white/90 backdrop-blur rounded-xl p-5 shadow-lg">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <Wind className="w-5 h-5" />
                  {respiratorio.title}
                </div>
                <p className="text-slate-600 mt-1 text-sm">{respiratorio.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-100 p-8 flex flex-col">
            <h3 className="text-xl font-bold text-slate-900">¿Qué hacemos en {respiratorio.title}?</h3>
            <p className="mt-2 text-slate-600">
              Aplicamos protocolos de vanguardia, control de calidad y seguimiento personalizado 
              para cada paciente. Participamos en ensayos clínicos y programas de acceso temprano 
              a terapias innovadoras.
            </p>

            <ul className="mt-6 space-y-3">
              {respiratorio.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-slate-700">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/studies"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-700 transition"
              >
                Ver estudios activos
              </a>
              <a
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-slate-700 font-medium hover:border-emerald-400 hover:text-emerald-700 transition"
              >
                Agendar evaluación
              </a>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-600">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="font-semibold text-slate-800">Equipo Subespecialista</p>
                <p>Neumólogos, inmunólogos y enfermería especializada.</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="font-semibold text-slate-800">Infraestructura</p>
                <p>Capacidad para Fase II–III, monitoreo y farmacovigilancia.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mini “Why CIMER” strip */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { t: 'Investigación con impacto', d: 'Ensayos con estándares internacionales.' },
            { t: 'Cuidado centrado en el paciente', d: 'Educación, adherencia y seguimiento.' },
            { t: 'Tecnología y calidad', d: 'Equipamiento y control de procesos.' },
          ].map((f, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
              <p className="font-semibold text-slate-900">{f.t}</p>
              <p className="text-slate-600 text-sm mt-1">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
