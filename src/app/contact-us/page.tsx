'use client';

import { useMemo, useState } from 'react';

// ====== CONFIG (edit these to your real info) ======
const ORG_NAME = 'CeCim – Centro de Estudios Clínicos';
const ADDRESS = 'Paseo Bulnes 79, Oficina 25';
const CITY = 'Santiago';
const REGION = 'Región Metropolitana';
const COUNTRY = 'Chile';
const EMAIL = 'contacto@cecim.cl';
const PHONE = '+56 2 1234 5678';
const HOURS = [
  ['Lun–Vie', '09:00 – 18:00'],
  ['Sáb', '10:00 – 14:00'],
  ['Dom', 'Cerrado'],
];
// If you know them, set precise coords; otherwise it will still work with the query-based map
const LAT = -33.447; // approx Santiago
const LNG = -70.66;
// ================================================

function classNames(...cx: Array<string | false | null | undefined>) {
  return cx.filter(Boolean).join(' ');
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const mapSrc = useMemo(() => {
    const q = encodeURIComponent(`${ADDRESS}, ${CITY}, ${REGION}, ${COUNTRY}`);
    return `https://www.google.com/maps?q=${q}&z=16&output=embed`;
  }, []);

  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contáctanos',
    mainEntity: {
      '@type': 'Organization',
      name: ORG_NAME,
      email: EMAIL,
      telephone: PHONE,
      address: {
        '@type': 'PostalAddress',
        streetAddress: ADDRESS,
        addressLocality: CITY,
        addressRegion: REGION,
        addressCountry: COUNTRY,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: LAT,
        longitude: LNG,
      },
      openingHours: HOURS.map(([d, h]) => `${d} ${h}`),
    },
  }), []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Example: POST to your API route. Replace '/api/contact' with your endpoint
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="bg-[url('https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center">
        <div className="backdrop-brightness-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">Contáctanos</h1>
            <p className="mt-3 max-w-2xl text-blue-100">Estamos en {CITY}. Escríbenos o visítanos en nuestra sede.</p>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-4 py-10 grid gap-10 lg:grid-cols-3">
        {/* Info panel */}
        <aside className="space-y-6 lg:col-span-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{ORG_NAME}</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div>
                <div className="font-medium text-slate-500">Dirección</div>
                <div>{ADDRESS}</div>
                <div>{CITY}, {REGION}, {COUNTRY}</div>
              </div>
              <div>
                <div className="font-medium text-slate-500">Correo</div>
                <a className="text-blue-700 hover:underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
              <div>
                <div className="font-medium text-slate-500">Teléfono</div>
                <a className="text-blue-700 hover:underline" href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a>
              </div>
              <div>
                <div className="font-medium text-slate-500">Horario</div>
                <ul className="mt-1">
                  {HOURS.map(([d, h]) => (
                    <li key={d} className="flex justify-between">
                      <span>{d}</span>
                      <span className="text-slate-600">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Ubicación</h3>
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <iframe
                title="Mapa"
                src={mapSrc}
                width="100%"
                height="340"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">Si no ves el mapa, verifica que tu navegador permita contenidos embebidos.</p>
          </div>
        </aside>

        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Envíanos un mensaje</h2>
            <p className="mt-1 text-sm text-slate-600">Responderemos lo antes posible.</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Nombre</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                  required
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Correo</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                  required
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Teléfono</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Mensaje</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                  rows={6}
                  required
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                disabled={status === 'loading'}
                className={classNames(
                  'rounded-xl px-5 py-2.5 text-sm font-semibold text-white',
                  status === 'loading' ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                )}
              >
                {status === 'loading' ? 'Enviando…' : 'Enviar'}
              </button>
              {status === 'success' && <span className="text-sm text-emerald-600">¡Mensaje enviado! Te contactaremos pronto.</span>}
              {status === 'error' && <span className="text-sm text-rose-600">Hubo un problema. Intenta nuevamente.</span>}
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 py-10 text-slate-300">
        <div className="mx-auto max-w-7xl px-4 text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2 font-semibold text-white">{ORG_NAME}</div>
            <div className="text-slate-400">{CITY}, {REGION} · {COUNTRY}</div>
          </div>
        </div>
      </footer>

      {/* SEO JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
