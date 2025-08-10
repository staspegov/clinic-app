import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { adminDb } from '../../../../firebase/firebaseAdmin'; // ✅ Corrected path

type Lead = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

function toCSV(lead: Lead) {
  const header = ['name', 'email', 'phone', 'message', 'createdAt'];
  const createdAt = new Date().toISOString();
  const row = [
    (lead.name ?? '').replace(/"/g, '""'),
    (lead.email ?? '').replace(/"/g, '""'),
    (lead.phone ?? '').replace(/"/g, '""'),
    (lead.message ?? '').replace(/"/g, '""'),
    createdAt,
  ];
  return {
    csv: `${header.join(',')}\n"${row.join('","')}"\n`,
    tsv: `${header.join('\t')}\n${row.join('\t')}\n`,
    createdAt,
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Lead>;
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to Firestore
    const docRef = await adminDb.collection('leads').add({
      name,
      email,
      phone: phone ?? '',
      message,
      createdAt: new Date(),
      source: 'contact-api',
    });

    const { csv, tsv, createdAt } = toCSV({ name, email, phone, message });

    // Gmail SMTP transporter (works better than service: 'gmail')
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'atencionalclientecimerchile@gmail.com',
        pass: 'CimerChile2025-', // ⚠️ Keep secure
      },
    });

    const FROM = 'CeCim <atencionalclientecimerchile@gmail.com>';
    const ADMIN = 'atencionalclientecimerchile@gmail.com';

    // Email to client
    await transporter.sendMail({
      from: FROM,
      to: email,
      subject: 'Gracias por contactarnos – CeCim',
      text:
        `Hola ${name},\n\n` +
        `Gracias por escribirnos. Hemos recibido tu solicitud y nuestro equipo te contactará pronto.\n\n` +
        `Resumen enviado:\n` +
        `Nombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone || '-'}\nMensaje: ${message}\n\n` +
        `CeCim – Centro de Estudios Clínicos`,
      html:
        `<p>Hola <b>${name}</b>,</p>` +
        `<p>Gracias por escribirnos. Hemos recibido tu solicitud y nuestro equipo te contactará pronto.</p>` +
        `<p><b>Resumen enviado:</b><br/>` +
        `Nombre: ${name}<br/>Correo: ${email}<br/>Teléfono: ${phone || '-'}<br/>Mensaje: ${message}</p>` +
        `<p>CeCim – Centro de Estudios Clínicos</p>`,
    });

    // Email to admin
    await transporter.sendMail({
      from: FROM,
      to: ADMIN,
      subject: `Nuevo lead (${name}) – CeCim`,
      text:
        `Nuevo lead recibido (${createdAt}).\n\n` +
        `Nombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone || '-'}\nMensaje: ${message}\n` +
        `Doc ID: ${docRef.id}\n\n` +
        `--- COPIAR EN EXCEL (TSV) ---\n` +
        tsv,
      html:
        `<p><b>Nuevo lead</b> (${createdAt})</p>` +
        `<ul>` +
        `<li><b>Nombre:</b> ${name}</li>` +
        `<li><b>Correo:</b> ${email}</li>` +
        `<li><b>Teléfono:</b> ${phone || '-'}</li>` +
        `<li><b>Mensaje:</b> ${message}</li>` +
        `<li><b>Doc ID:</b> ${docRef.id}</li>` +
        `</ul>` +
        `<p><b>Copiar en Excel (TSV):</b></p>` +
        `<pre style="background:#f6f8fa;padding:12px;border-radius:8px;white-space:pre-wrap;">${tsv}</pre>`,
      attachments: [
        {
          filename: `lead-${docRef.id}.csv`,
          content: csv,
          contentType: 'text/csv',
        },
      ],
    });

    return NextResponse.json({ ok: true, id: docRef.id });
  } catch (err) {
    console.error('CONTACT API ERROR', err);
    return NextResponse.json({ error: 'Internal error', details: (err as Error).message }, { status: 500 });
  }
}
