const contacts = [
  { lbl: 'Web', val: 'www.fenixgate.com', href: 'https://www.fenixgate.com', external: true, icon: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></> },
  { lbl: 'Email', val: 'kennethtaipe@gmail.com', href: 'mailto:kennethtaipe@gmail.com', external: false, icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></> },
  { lbl: 'Teléfono', val: '+593 99 887 8789', href: 'https://api.whatsapp.com/send?phone=593998878789', external: true, icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.49 5.49l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/> },
  { lbl: 'Alcance', val: 'Clientes en todo el mundo', href: null, external: false, icon: <><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/></> },
];

export default function ContactStrip() {
  return (
    <div className="contact-strip" aria-label="Información de contacto">
      <div className="container">
        <div className="contact-grid">
          {contacts.map((c, i) => (
            <div key={i} className="contact-item">
              <div className="c-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{c.icon}</svg>
              </div>
              <div>
                <div className="c-lbl">{c.lbl}</div>
                {c.href ? (
                  <a href={c.href} className="c-val" {...(c.external ? { target: '_blank', rel: 'noopener' } : {})}>{c.val}</a>
                ) : (
                  <span className="c-val">{c.val}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
