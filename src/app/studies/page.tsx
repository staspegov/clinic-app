'use client';

import { useMemo, useState } from "react";

// Types
export type StudyStatus = "RECLUTANDO" | "MANTENIMIENTO" | "CERRADO";

export type Study = {
  id: string;
  title: string;
  code?: string; // e.g., NCT number
  sponsor?: string;
  status: StudyStatus;
  area: string; // e.g., Respiratorio, Cardiovascular, etc.
  ageRange?: string;
  short: string; // short description
  tags?: string[];
};

// Mock data (replace with fetch from your CMS/API/Firestore)
const STUDIES: Study[] = [
  {
    id: "fibrosis-pulmonar-progresiva",
    title: "Fibrosis Pulmonar Progresiva",
    status: "RECLUTANDO",
    area: "Respiratorio",
    short:
      "Estudio en pacientes con diagnóstico de FPI; visitas ambulatorias cada 6–8 semanas. Se evalúa eficacia y seguridad de tratamiento en investigación.",
    tags: ["FPI", "Adultos"],
  },
  {
    id: "asma-adultos",
    title: "Asma (Adultos)",
    status: "RECLUTANDO",
    area: "Respiratorio",
    short:
      "Ensayo para evaluar eficacia y seguridad de un biológico en asma de moderada a severa.",
    tags: ["Asma", "Biológico"],
  },
  {
    id: "asma-12-17",
    title: "Asma en jóvenes de 12 a 17 años",
    status: "MANTENIMIENTO",
    area: "Respiratorio",
    short:
      "Pruebas dinámicas respiratorias y seguimiento de síntomas en adolescentes; visitas mensuales.",
    tags: ["Asma", "Adolescentes"],
  },
  {
    id: "fpi-idiopatica",
    title: "Fibrosis Pulmonar Idiopática",
    status: "CERRADO",
    area: "Respiratorio",
    short:
      "Estudio cerrado: medición de progresión de la enfermedad con espirometría y TCAR.",
    tags: ["FPI"],
  },
  {
    id: "asma-cerrado",
    title: "Asma (Cerrado)",
    status: "CERRADO",
    area: "Respiratorio",
    short:
      "Seguimiento finalizado de pacientes con asma grave en uso de corticoides inhalados.",
    tags: ["Asma"],
  },
];

const AREAS = [
  "Cardiovascular / Diabetes",
  "Gastroenterología",
  "Oncología",
  "Respiratorio",
  "Reumatología",
  "Dermatología",
];

// Status tabs definition
const STATUS_TABS: { key: StudyStatus | "TODOS"; label: string }[] = [
  { key: "TODOS", label: "Todos" },
  { key: "RECLUTANDO", label: "Reclutando" },
  { key: "MANTENIMIENTO", label: "Mantenimiento" },
  { key: "CERRADO", label: "Cerrado" },
];

// Helpers for badges/colors
const statusStyles: Record<StudyStatus, string> = {
  RECLUTANDO: "bg-emerald-100 text-emerald-700 border-emerald-200",
  MANTENIMIENTO: "bg-sky-100 text-sky-700 border-sky-200",
  CERRADO: "bg-rose-100 text-rose-700 border-rose-200",
};

function classNames(...cx: (string | boolean | undefined | null)[]) {
  return cx.filter(Boolean).join(" ");
}

// COMPONENTS
function StatusTabs({
  value,
  onChange,
}: {
  value: StudyStatus | "TODOS";
  onChange: (v: StudyStatus | "TODOS") => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {STATUS_TABS.map((tab) => {
        const active = value === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={classNames(
              "px-4 py-2 rounded-full text-sm border transition-colors",
              active
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative w-full">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="search"
        placeholder="Buscar estudios (ej: asma, fibrosis, NCT...)"
        className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-10 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
      >
        <path
          fillRule="evenodd"
          d="M10.5 3.75a6.75 6.75 0 1 0 4.247 12.06l3.72 3.72a.75.75 0 1 0 1.06-1.06l-3.72-3.72A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

function StudyCard({ study }: { study: Study }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="p-4 flex items-start gap-3">
        <span
          className={classNames(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
            statusStyles[study.status]
          )}
        >
          {study.status.toLowerCase()}
        </span>
        <div className="text-xs text-slate-500 ml-auto">{study.area}</div>
      </div>
      <div className="px-4 pb-4">
        <h3 className="text-base font-semibold text-slate-900">{study.title}</h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-4">{study.short}</p>
        {study.tags && (
          <div className="mt-3 flex flex-wrap gap-2">
            {study.tags.map((t) => (
              <span key={t} className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 flex gap-2">
          <button className="w-full rounded-lg bg-blue-600 text-white text-sm font-medium py-2 hover:bg-blue-700">
            Más información
          </button>
          <button className="w-full rounded-lg bg-slate-100 text-slate-800 text-sm font-medium py-2 hover:bg-slate-200">
            Inscribirse
          </button>
        </div>
      </div>
    </article>
  );
}

function Sidebar({ areas, activeAreas, onToggleArea }: {
  areas: string[];
  activeAreas: Set<string>;
  onToggleArea: (a: string) => void;
}) {
  return (
    <aside className="hidden lg:block lg:w-64 xl:w-72 shrink-0">
      <div className="sticky top-6 space-y-6">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Síguenos</h4>
          <div className="mt-3 flex gap-3 text-slate-500">
            <a href="#" aria-label="Facebook" className="hover:text-blue-600">FB</a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-600">IG</a>
            <a href="#" aria-label="LinkedIn" className="hover:text-sky-600">IN</a>
            <a href="#" aria-label="YouTube" className="hover:text-rose-600">YT</a>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Nuestros estudios clínicos</h4>
          <ul className="mt-3 space-y-2">
            {areas.map((a) => {
              const active = activeAreas.has(a);
              return (
                <li key={a}>
                  <button
                    onClick={() => onToggleArea(a)}
                    className={classNames(
                      "w-full text-left text-sm px-3 py-2 rounded-lg border",
                      active
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    )}
                  >
                    {a}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}

// MAIN PAGE COMPONENT
export default function RespiratorioStudiesPage() {
  const [status, setStatus] = useState<StudyStatus | "TODOS">("TODOS");
  const [q, setQ] = useState("");
  const [areas, setAreas] = useState<Set<string>>(new Set(["Respiratorio"]));

  const toggleArea = (a: string) => {
    setAreas((prev) => {
      const next = new Set(prev);
      if (next.has(a)) next.delete(a);
      else next.add(a);
      return next;
    });
  };

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();

    return STUDIES.filter((s) => {
      if (status !== "TODOS" && s.status !== status) return false;
      if (areas.size && !areas.has(s.area)) return false;
      if (!needle) return true;
      const haystack = (
        s.title + " " + (s.short || "") + " " + (s.tags || []).join(" ") + " " + (s.code || "")
      ).toLowerCase();
      return haystack.includes(needle);
    });
  }, [status, q, areas]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top hero-ish bar */}
      <section className="bg-[url('https://images.unsplash.com/photo-1581093588401-16b25189c122?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center">
        <div className="backdrop-brightness-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">Estudios clínicos de <span className="text-blue-200">Respiratorio</span></h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex gap-8">
          <Sidebar areas={AREAS} activeAreas={areas} onToggleArea={toggleArea} />

          <div className="flex-1 space-y-6">
            {/* Controls */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <StatusTabs value={status} onChange={setStatus} />
              <div className="sm:w-80 w-full">
                <SearchBar value={q} onChange={setQ} />
              </div>
            </div>

            {/* Results info */}
            <div className="text-sm text-slate-600">{results.length} estudio(s) encontrados</div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((s) => (
                <StudyCard key={s.id} study={s} />
              ))}
            </div>

            {/* Empty state */}
            {results.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
                No encontramos resultados para tu búsqueda. Ajusta los filtros o intenta con otras palabras.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ banner */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-blue-700 p-8 sm:p-10 text-white shadow-lg">
          <div className="max-w-2xl">
            <h3 className="text-xl font-semibold">¿Tienes preguntas o consultas sobre nuestros procedimientos?</h3>
            <p className="mt-2 text-sm text-blue-100">Visita nuestras preguntas frecuentes para conocer procesos, criterios y detalles de participación.</p>
            <div className="mt-4">
              <a href="/faq" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/20">
                Preguntas frecuentes
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l6 6a.75.75 0 1 1-1.06 1.06L13.5 6.56V20a.75.75 0 0 1-1.5 0V6.56l-5.47 4.47a.75.75 0 1 1-1.06-1.06l6-6Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-white/10" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-10 text-slate-300">
        <div className="mx-auto max-w-7xl px-4 text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2 font-semibold text-white">CeCim <span className="text-slate-400 text-xs font-normal">Centro de Estudios Clínicos</span></div>
            <div className="text-slate-400">Santiago, Chile · Protección de datos · Cookies</div>
          </div>
        </div>
      </footer>
    </div>
  );
}