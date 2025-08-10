// components/NewsHighlights.tsx
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type Category = 'Nuevos estudios' | 'Congresos médicos' | 'Logros del equipo' | 'Publicaciones';

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  image: string; // /images/... o URL
  date: string;  // ISO
  category: Category;
  href: string;  // enlace a detalle / noticia
  isNew?: boolean;
  tag?: string;  // p.ej. "Respiratorio"
};

const SAMPLE: NewsItem[] = [
  {
    id: '1',
    title: 'Inicio de estudio Fase II en EPOC con terapia inhalada',
    excerpt: 'CIMER inicia reclutamiento para evaluar eficacia y seguridad de una nueva combinación inhalada.',
    image: '/doctor.png',
    date: '2025-08-06',
    category: 'Nuevos estudios',
    href: '/news/epoc-fase-ii-cimer',
    isNew: true,
    tag: 'Respiratorio',
  },
  {
    id: '2',
    title: 'Presentación en Congreso Chileno de Neumología',
    excerpt: 'Resultados interinos sobre adherencia en asma severa: reducción de reingresos a 90 días.',
    image: '/doctor.png',
    date: '2025-07-29',
    category: 'Congresos médicos',
    href: '/news/congreso-neumologia-2025',
    tag: 'Respiratorio',
  },
  {
    id: '3',
    title: 'Premio a nuestro equipo de investigación clínica',
    excerpt: 'Reconocimiento por excelencia en calidad de datos y seguridad del paciente.',
    image: '/doctor.png',
    date: '2025-07-15',
    category: 'Logros del equipo',
    href: '/news/premio-equipo-cimer',
  },
  {
    id: '4',
    title: 'Publicación sobre biomarcadores en fibrosis pulmonar',
    excerpt: 'Artículo aceptado en revista indexada sobre panel sanguíneo para diagnóstico temprano.',
    image: '/doctor.png',
    date: '2025-07-10',
    category: 'Publicaciones',
    href: '/news/biomarcadores-fibrosis-paper',
    tag: 'Investigación',
  },
];

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('es-CL', { dateStyle: 'medium' }).format(new Date(iso));
  } catch {
    return iso;
  }
}

const CATEGORIES: Category[] = [
  'Nuevos estudios',
  'Congresos médicos',
  'Logros del equipo',
  'Publicaciones',
];

export default function NewsHighlights({ items = SAMPLE }: { items?: NewsItem[] }) {
  const [active, setActive] = useState<Category | 'Todos'>('Todos');

  const filtered = useMemo(() => {
    if (active === 'Todos') return items;
    return items.filter((i) => i.category === active);
  }, [active, items]);

  return (
    <section id="news" className="py-12 md:py-20 bg-gradient-to-b from-emerald-50/60 via-white to-white">
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 md:gap-2 text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold tracking-wide">
            Noticias CIMER
          </span>
          <h2 className="mt-3 md:mt-4 text-2xl md:text-4xl font-bold text-slate-900">
            Nuevos estudios, congresos y logros
          </h2>
          <p className="mt-2 md:mt-3 text-slate-600 text-sm md:text-base">
            Actualizaciones sobre investigación clínica y avances de nuestro equipo.
          </p>
        </div>

        {/* Filtros */}
        <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActive('Todos')}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full border text-xs md:text-sm transition ${
              active === 'Todos'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:text-emerald-700'
            }`}
          >
            Todos
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full border text-xs md:text-sm transition ${
                active === cat
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards: horizontal scroll on mobile; grid on desktop. Border-only style. */}
        <div className="mt-8 md:mt-12">
          <div
            className="flex gap-4 overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6"
            aria-label="Lista de noticias (desplazable en móviles)"
          >
            {filtered.map((item) => (
              <article
                key={item.id}
                className="group relative flex-shrink-0 w-72 md:w-auto overflow-hidden rounded-xl md:rounded-2xl bg-white ring-1 ring-slate-100 border border-slate-200 hover:border-emerald-300 transition"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-40 md:h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    {item.tag && (
                      <span className="rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] md:text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                        {item.tag}
                      </span>
                    )}
                    {item.isNew && (
                      <span className="rounded-full bg-emerald-600 px-2 py-1 text-[11px] md:text-xs font-semibold text-white">
                        Nuevo
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <time className="text-[11px] md:text-xs text-slate-500">{formatDate(item.date)}</time>
                  <h3 className="mt-1.5 md:mt-2 text-base md:text-lg font-bold text-slate-900 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 md:mt-2 text-slate-600 text-sm md:text-base line-clamp-3">
                    {item.excerpt}
                  </p>

                  <div className="mt-4 md:mt-5">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 md:gap-2 text-emerald-700 font-semibold text-sm md:text-base hover:text-emerald-800"
                      aria-label={`Leer más: ${item.title}`}
                    >
                      Leer más
                      <svg className="h-3.5 w-3.5 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path d="M12.293 4.293a1 1 0 011.414 0L18 8.586a2 2 0 010 2.828l-4.293 4.293a1 1 0 01-1.414-1.414L14.586 11H4a1 1 0 110-2h10.586l-2.293-2.293a1 1 0 010-1.414z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 md:mt-12 flex justify-center">
          <Link
            href="/news"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 md:px-5 md:py-2.5 text-slate-700 font-medium text-sm md:text-base hover:border-emerald-400 hover:text-emerald-700 transition"
          >
            Ver todas las noticias
          </Link>
        </div>
      </div>
    </section>
  );
}
