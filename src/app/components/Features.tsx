'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

export type StudyStatus = 'RECLUTANDO' | 'MANTENIMIENTO' | 'CERRADO';

type Study = {
  id: string;
  title: string;
  description: string;
  status: StudyStatus;
  area: string;
  tags: string[];
};

const STUDIES: Study[] = [
  {
    id: 'fpi',
    title: 'Fibrosis Pulmonar Progresiva',
    description:
      'Estudio en pacientes con diagnóstico de FPI; visitas ambulatorias cada 6–8 semanas. Se evalúa eficacia y seguridad de tratamiento en investigación.',
    status: 'RECLUTANDO',
    area: 'Respiratorio',
    tags: ['FPI', 'Adultos'],
  },
  {
    id: 'asma',
    title: 'Asma (Adultos)',
    description:
      'Ensayo para evaluar eficacia y seguridad de un biológico en asma de moderada a severa.',
    status: 'RECLUTANDO',
    area: 'Respiratorio',
    tags: ['Asma', 'Biológico'],
  },
  // Ejemplo de no vigente:
  {
    id: 'hipertension',
    title: 'Estudio de Hipertensión',
    description: 'Ejemplo de estudio cerrado que no debe mostrarse.',
    status: 'CERRADO',
    area: 'Cardiología',
    tags: ['Hipertensión'],
  },
];

export default function ClinicalStudiesList() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Study | null>(null);

  const currentStudies = useMemo(
    () => STUDIES.filter((s) => s.status === 'RECLUTANDO'),
    []
  );

  return (
    <section className="py-12 bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Título + CTA ver todos */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">Estudios Clínicos Disponibles</h2>
          <Link
            href="/studies"
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Ver todos los estudios
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentStudies.map((study) => (
            <article
              key={study.id}
              className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md flex flex-col"
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-50 text-green-700 border border-green-200">
                  Reclutando
                </span>
                <span className="text-sm text-gray-500">{study.area}</span>
              </div>

              {/* Contenido */}
              <div>
                <h3 className="text-lg font-semibold mb-2">{study.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{study.description}</p>
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botones fijos al fondo */}
              <div className="mt-auto pt-6 flex gap-3">
                <Link
                  href={`/studies/${study.id}`}
                  className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg"
                >
                  Más información
                </Link>
                <button
                  onClick={() => {
                    setSelected(study);
                    setOpen(true);
                  }}
                  className="flex-1 text-center bg-gray-50 hover:bg-gray-100 border border-gray-200 font-medium px-4 py-2.5 rounded-lg"
                >
                  Inscribirse
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* CTA secundario al final (opcional) */}
   
      </div>

      {/* Modal */}
      {open && selected && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="mb-4">
              <h4 className="text-lg font-bold">Inscripción — {selected.title}</h4>
              <p className="text-sm text-gray-600">
                Completa tus datos y te contactaremos.
              </p>
            </div>

            <form className="space-y-4">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
              <input
                type="tel"
                name="celular"
                placeholder="Celular"
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-200"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-lg py-2.5 font-medium hover:bg-blue-700"
              >
                Enviar postulación
              </button>

              <p className="text-center text-sm text-gray-600">
                ¿Tienes dudas?{' '}
                <Link href="/faq" className="text-blue-600 hover:underline">
                  Revisa las preguntas frecuentes
                </Link>
              </p>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full bg-gray-100 text-gray-800 rounded-lg py-2.5 font-medium hover:bg-gray-200"
              >
                Cerrar
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
