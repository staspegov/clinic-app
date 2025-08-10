'use client';

import { useState } from 'react';

export default function AppointmentForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus('loading');

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!res.ok) throw new Error('Network response was not ok');

    setStatus('success');
    setForm({ name: '', email: '', phone: '', message: '' });
  } catch (error) {
    console.error('Error sending lead:', error);
    setStatus('error');
  }
};


  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-emerald-50/60 via-white to-white">
      <div className="max-w-4xl mx-auto px-3 md:px-4">
        {/* Título */}
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-flex items-center gap-1.5 md:gap-2 text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold tracking-wide">
            Reserva tu cita
          </span>
          <h2 className="mt-3 md:mt-4 text-2xl md:text-4xl font-bold text-slate-900">
            Agenda tu evaluación médica
          </h2>
          <p className="mt-2 md:mt-3 text-slate-600 text-sm md:text-base">
            Completa el siguiente formulario y nuestro equipo se pondrá en contacto contigo lo antes posible.
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 md:p-8 rounded-xl md:rounded-2xl shadow-xl ring-1 ring-slate-100 space-y-4 md:space-y-5"
        >
          <div>
            <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              required
              className="w-full border border-slate-300 p-2.5 md:p-3 rounded-lg text-sm md:text-base focus:outline-none focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div>
              <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1">Correo electrónico</label>
              <input
                type="email"
                placeholder="tu@email.com"
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                required
                className="w-full border border-slate-300 p-2.5 md:p-3 rounded-lg text-sm md:text-base focus:outline-none focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1">Teléfono</label>
              <input
                type="tel"
                placeholder="+56 9 1234 5678"
                value={form.phone}
                onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                className="w-full border border-slate-300 p-2.5 md:p-3 rounded-lg text-sm md:text-base focus:outline-none focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1">Mensaje</label>
            <textarea
              placeholder="Cuéntanos brevemente el motivo de tu consulta"
              rows={4}
              value={form.message}
              onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
              required
              className="w-full border border-slate-300 p-2.5 md:p-3 rounded-lg text-sm md:text-base focus:outline-none focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition"
            ></textarea>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base rounded-lg transition"
            >
              {status === 'loading' ? 'Enviando…' : 'Enviar solicitud'}
            </button>
            {status === 'success' && <span className="text-sm text-emerald-600">¡Solicitud enviada!</span>}
            {status === 'error' && <span className="text-sm text-rose-600">Hubo un error. Intenta de nuevo.</span>}
          </div>
        </form>
      </div>
    </section>
  );
}
