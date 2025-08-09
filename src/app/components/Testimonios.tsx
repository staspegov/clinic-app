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
    
    <section className="py-20  from-emerald-50/60 via-white to-white">
         <div className="relative  mb-20 ">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-transparent bg-gradient-to-r from-transparent via-emerald-200 to-transparent h-[2px]" />
  </div>
</div>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            Testimonios
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
            Lo que dicen nuestros pacientes
          </h2>
          <p className="mt-3 text-slate-600">
            Historias reales de personas que confiaron en <span className="font-semibold text-emerald-700">CIMER</span>.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={i}
              className="relative h-full rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-100 hover:shadow-2xl transition"
            >
              <Quote className="absolute -top-3 -left-3 w-8 h-8 p-1 rounded-full bg-emerald-600 text-white" aria-hidden />
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={`Foto de ${t.name}`}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-emerald-100"
                />
                <div>
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>

              {typeof t.rating === 'number' && (
                <div className="mt-3 flex items-center gap-1" aria-label={`Calificación ${t.rating} de 5`}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${idx < (t.rating ?? 0) ? 'fill-emerald-500 text-emerald-500' : 'text-slate-300'}`}
                    />
                  ))}
                </div>
              )}

              <p className="mt-4 text-slate-700 leading-relaxed">{t.text}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
