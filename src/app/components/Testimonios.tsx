import { Quote, Star } from 'lucide-react';

type Testimonial = {
  name: string;
  role: string;
  text: string;
  avatar: string; // /images/...
  rating?: number; // 1-5
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'María G.',
    role: 'Paciente área respiratoria',
    text:
      'El equipo de CIMER me acompañó en todo el proceso. La evaluación fue clara y el seguimiento excelente. Respirar sin dolor volvió a ser parte de mi día.',
    avatar: '/doctor.png',
    rating: 5,
  },
  {
    name: 'Carlos R.',
    role: 'Participante en estudio clínico',
    text:
      'Me sentí seguro y bien informado. La coordinación y la comunicación del equipo fueron impecables durante todo el estudio.',
    avatar: '/doctor.png',
    rating: 5,
  },
  {
    name: 'Elena P.',
    role: 'Cuidadora',
    text:
      'Profesionales cercanos y muy humanos. Nos explicaron cada paso y adaptaron el tratamiento a las necesidades de mi madre.',
    avatar: '/doctor.png',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-12 md:py-20 from-emerald-50/60 via-white to-white">
      {/* Divider */}
      <div className="relative mb-10 md:mb-20">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-transparent bg-gradient-to-r from-transparent via-emerald-200 to-transparent h-[1px] md:h-[2px]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 md:px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 md:gap-2 text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold tracking-wide">
            Testimonios
          </span>
          <h2 className="mt-3 md:mt-4 text-2xl md:text-4xl font-bold text-slate-900">
            Lo que dicen nuestros pacientes
          </h2>
          <p className="mt-2 md:mt-3 text-slate-600 text-sm md:text-base">
            Historias reales de personas que confiaron en{' '}
            <span className="font-semibold text-emerald-700">CIMER</span>.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={i}
              className="relative h-full rounded-xl md:rounded-2xl bg-white p-4 md:p-6 shadow-xl ring-1 ring-slate-100 hover:shadow-2xl transition"
            >
              <Quote
                className="absolute -top-3 -left-3 w-6 h-6 md:w-8 md:h-8 p-1 rounded-full bg-emerald-600 text-white"
                aria-hidden
              />

              <div className="flex items-center gap-3 md:gap-4">
                <img
                  src={t.avatar}
                  alt={`Foto de ${t.name}`}
                  className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover ring-2 ring-emerald-100"
                />
                <div>
                  <p className="font-semibold text-slate-900 text-sm md:text-base">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>

              {typeof t.rating === 'number' && (
                <div
                  className="mt-2 md:mt-3 flex items-center gap-0.5 md:gap-1"
                  aria-label={`Calificación ${t.rating} de 5`}
                >
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-3.5 h-3.5 md:w-4 md:h-4 ${
                        idx < (t.rating ?? 0)
                          ? 'fill-emerald-500 text-emerald-500'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
              )}

              <p className="mt-3 md:mt-4 text-slate-700 leading-relaxed text-sm md:text-base">
                {t.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
