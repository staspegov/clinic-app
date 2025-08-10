import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { adminDb } from '../../../../firebase/firebaseAdmin';

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

function requiredEnv(name: string) {
  const v = process.env[name];
  if (!v || !String(v).trim()) throw new Error(`Missing env: ${name}`);
  return String(v).trim();
}

export async function POST(req: Request) {
  try {
    const raw = (await req.json()) as Partial<Lead>;
    const name = (raw.name ?? '').trim();
    const email = (raw.email ?? '').trim();
    const phone = (raw.phone ?? '').trim();
    const message = (raw.message ?? '').trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to Firestore first (so we don’t lose the lead if email fails)
    const docRef = await adminDb.collection('leads').add({
      name,
      email,
      phone,
      message,
      createdAt: new Date(),
      source: 'contact-api',
    });

    const { csv, tsv, createdAt } = toCSV({ name, email, phone, message });

    // --- SMTP / Transport ---
    // These are required; throw a 400 if they’re not present to avoid a 500 crash.
    let transporter;
    try {
      const host = requiredEnv('SMTP_HOST');
      const portStr = requiredEnv('SMTP_PORT');
      const user = requiredEnv('SMTP_USER');
      const pass = requiredEnv('SMTP_PASS');
      const port = Number(portStr);
      transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
      // Optional: verify connection (useful while setting up)
      await transporter.verify().catch(() => {});
    } catch (e) {
      console.error('SMTP CONFIG ERROR:', e);
      return NextResponse.json(
        { error: 'Email transport not configured' },
        { status: 400 }
      );
    }

    const FROM = (process.env.SMTP_FROM ?? process.env.SMTP_USER ?? '').trim();
    if (!FROM) {
      return NextResponse.json(
        { error: 'Missing sender address (SMTP_FROM/SMTP_USER)' },
        { status: 400 }
      );
    }

    // Resolve admin recipient (optional). We’ll skip admin mail if not set.
    const ADMIN =
      (process.env.ADMIN_EMAIL ?? process.env.CONTACT_EMAIL ?? '').trim() || null;

    // --- Send confirmation to client ---
    await transporter.sendMail({
      from: FROM,
      to: email,               // this is safe; we validated `email`
      replyTo: email,          // so you can reply from your inbox
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

    // --- Send notification to admin (only if ADMIN is defined) ---
    if (ADMIN) {
      await transporter.sendMail({
        from: FROM,
        to: ADMIN,            // if this were undefined, Nodemailer throws EENVELOPE
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
    } else {
      console.warn('ADMIN_EMAIL/CONTACT_EMAIL not set. Skipping admin notification email.');
    }

    return NextResponse.json({ ok: true, id: docRef.id });
  } catch (err) {
    console.error('CONTACT API ERROR', err);
    return NextResponse.json(
      { error: 'Internal error', details: (err as Error).message },
      { status: 500 }
    );
  }
}
