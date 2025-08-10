'use client';

import { useMemo, useState } from 'react';
import Footer from '@/app/components/Footer'

// Types
type FAQ = {
  q: string;
  a: string;
  category: 'Participación' | 'Requisitos' | 'Seguridad' | 'Compensación' | 'Datos' | 'Generales';
};

const FAQS: FAQ[] = [
  {
    q: '¿Qué es un estudio clínico? ',
    a: 'Es una investigación en personas para evaluar la seguridad y eficacia de medicamentos o dispositivos. Todos los estudios siguen protocolos aprobados por comités ético‑científicos.',
    category: 'Generales',
  },
  {
    q: '¿Cómo sé si soy elegible para participar?',
    a: 'Cada estudio tiene criterios de inclusión y exclusión (edad, diagnóstico, tratamientos previos, etc.). Nuestro equipo realiza una evaluación gratuita para confirmarlo.',
    category: 'Requisitos',
  },
  {
    q: '¿Participar tiene costo?',
    a: 'No. Las evaluaciones y el medicamento del estudio no tienen costo para el participante. En algunos casos, se reembolsa transporte y tiempo.',
    category: 'Compensación',
  },
  {
    q: '¿Qué riesgos existen?',
    a: 'Como toda intervención médica, puede haber efectos adversos. Se explica todo en el consentimiento informado y el equipo hace seguimiento cercano de seguridad.',
    category: 'Seguridad',
  },
  {
    q: '¿Puedo dejar el estudio cuando quiera?',
    a: 'Sí. La participación es voluntaria y puedes retirarte en cualquier momento sin afectar tu atención de salud.',
    category: 'Participación',
  },
  {
    q: '¿Qué pasa con mis datos personales?',
    a: 'Se manejan bajo estricta confidencialidad, se codifican y solo personal autorizado accede a ellos. Cumplimos la normativa local de protección de datos.',
    category: 'Datos',
  },
  {
    q: '¿Cuánto dura un estudio?',
    a: 'Depende del protocolo: desde algunas semanas hasta varios meses. En la ficha de cada estudio indicamos el calendario de visitas.',
    category: 'Generales',
  },
  {
    q: '¿Puedo seguir con mis medicamentos habituales?',
    a: 'Algunos tratamientos son compatibles y otros deben ajustarse. El médico investigador lo evaluará caso a caso antes de iniciar.',
    category: 'Seguridad',
  },
  {
    q: '¿Cómo me inscribo?',
    a: 'Puedes postular desde la página del estudio (botón “Inscribirse”) o llamarnos. Te contactaremos para aplicar pre‑filtro y agendar evaluación.',
    category: 'Participación',
  },
];

const CATEGORIES: Array<FAQ['category'] | 'Todas'> = [
  'Todas',
  'Generales',
  'Participación',
  'Requisitos',
  'Seguridad',
  'Compensación',
  'Datos',
];

function classNames(...cx: Array<string | false | null | undefined>) {
  return cx.filter(Boolean).join(' ');
}

function AccordionItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <button
        className="w-full flex items-start gap-3 p-4 text-left"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white text-xs">?
        </span>
        <span className="flex-1 font-medium text-slate-900">{q}</span>
        <svg className={classNames('h-5 w-5 shrink-0 transition', open && 'rotate-180')} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.061l-4.24 4.24a.75.75 0 01-1.06 0l-4.24-4.24a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && <div className="px-12 pb-4 -mt-2 text-slate-600">{a}</div>}
    </div>
  );
}

export default function FAQPage() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<typeof CATEGORIES[number]>('Todas');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return FAQS.filter((f) => (cat === 'Todas' || f.category === cat) && (!needle || (f.q + ' ' + f.a).toLowerCase().includes(needle)));
  }, [q, cat]);

  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }), [items]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="bg-[url('https://images.unsplash.com/photo-1559757175-08fda9fdc3a5?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center">
        <div className="backdrop-brightness-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">Preguntas frecuentes</h1>
            <p className="mt-3 max-w-2xl text-blue-100">Resuelve tus dudas sobre estudios clínicos, requisitos, seguridad y más.</p>
          </div>
        </div>
      </section>

      {/* CONTROLS */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              type="search"
              placeholder="Busca una pregunta (ej: elegible, costos, seguridad)"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-10 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100"
            />
            <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 104.247 12.06l3.72 3.72a.75.75 0 101.06-1.06l-3.72-3.72A6.75 6.75 0 0010.5 3.75z" clipRule="evenodd" />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={classNames(
                  'px-4 py-2 rounded-full text-sm border transition-colors',
                  c === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* COUNT */}
        <div className="mt-2 text-sm text-slate-600">{items.length} resultado(s)</div>

        {/* LIST */}
        <div className="mt-4 grid gap-3">
          {items.map((item, i) => (
            <AccordionItem
              key={item.q}
              q={item.q}
              a={item.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}

          {items.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
              No encontramos preguntas para tu búsqueda.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-blue-700 p-8 sm:p-10 text-white shadow-lg">
          <div className="max-w-2xl">
            <h3 className="text-xl font-semibold">¿Aún tienes dudas?</h3>
            <p className="mt-2 text-sm text-blue-100">Escríbenos y un coordinador te contactará para orientarte sobre el estudio adecuado.</p>
            <div className="mt-4 flex gap-2">
              <a href="/contact-us" className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/20">Contactar</a>
              <a href="/studies" className="rounded-xl bg-white text-slate-900 px-4 py-2 text-sm font-semibold hover:bg-slate-100">Ver estudios</a>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-white/10" />
        </div>
      </section>

      {/* FOOTER */}
      <Footer/>

      {/* SEO JSON‑LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
