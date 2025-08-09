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
  } catch { return iso; }
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
    return items.filter(i => i.category === active);
  }, [active, items]);

  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50/60 via-white to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            Noticias CIMER
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">Nuevos estudios, congresos y logros</h2>
          <p className="mt-3 text-slate-600">Actualizaciones sobre investigación clínica y avances de nuestro equipo.</p>
        </div>

        {/* Filtros */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActive('Todos')}
            className={`px-4 py-2 rounded-full border transition ${
              active === 'Todos'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:text-emerald-700'
            }`}
          >
            Todos
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full border transition ${
                active === cat
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <article
              key={item.id}
              className="group relative h-full overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100 shadow-xl hover:shadow-2xl transition"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  {item.tag && (
                    <span className="rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                      {item.tag}
                    </span>
                  )}
                  {item.isNew && (
                    <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white">Nuevo</span>
                  )}
                </div>
              </div>

              <div className="p-6">
                <time className="text-xs text-slate-500">{formatDate(item.date)}</time>
                <h3 className="mt-2 text-lg font-bold text-slate-900 line-clamp-2">{item.title}</h3>
                <p className="mt-2 text-slate-600 text-sm line-clamp-3">{item.excerpt}</p>

                <div className="mt-5">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800"
                    aria-label={`Leer más: ${item.title}`}
                  >
                    Leer más
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path d="M12.293 4.293a1 1 0 011.414 0L18 8.586a2 2 0 010 2.828l-4.293 4.293a1 1 0 01-1.414-1.414L14.586 11H4a1 1 0 110-2h10.586l-2.293-2.293a1 1 0 010-1.414z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/news"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-slate-700 font-medium hover:border-emerald-400 hover:text-emerald-700 transition"
          >
            Ver todas las noticias
          </Link>
        </div>
      </div>
    </section>
  );
}
