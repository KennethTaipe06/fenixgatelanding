import { useGsapStagger } from '../lib/useGsapReveal';

const services = [
  {
    name: 'Bots con IA',
    desc: 'Bots inteligentes que atienden a tus clientes en WhatsApp, Telegram y todas tus apps de mensajería. Nunca pierdas una venta por no responder a tiempo.',
    features: ['WhatsApp Business', 'Telegram', 'Messenger & Instagram', 'Atención 24/7 sin descanso'],
    cta: 'Solicitar demo gratis',
    photo: '/bot-ia.png',
    icon: <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/></>,
    highlight: true,
  },
  {
    name: 'Automatizaciones',
    desc: 'Elimina tareas repetitivas que consumen tu tiempo. Facturación automática, seguimiento de emails, sincronización de datos y más.',
    features: ['Facturación automática', 'Seguimiento de emails', 'Sync de datos', 'Reportes automáticos'],
    cta: 'Automatizar mi negocio',
    photo: '/Automatizacion de procesos.png',
    icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>,
  },
  {
    name: 'Software a medida',
    desc: 'Sistemas construidos desde cero para tu proceso exacto. No adaptas tu negocio al software, el software se adapta a ti.',
    features: ['ERP / CRM custom', 'Dashboards a medida', 'Sistemas internos', 'Apps de escritorio'],
    cta: 'Construir mi sistema',
    photo: '/software a medida.png',
    icon: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
  },
  {
    name: 'Paginas web',
    desc: 'Sitios web que cargan rapido, se ven increibles y convierten visitantes en clientes. SEO optimizado desde el primer dia.',
    features: ['Landing pages', 'E-commerce', 'SEO optimizado', 'Diseño responsive'],
    cta: 'Crear mi web',
    photo: '/paginas web.png',
    icon: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  },
  {
    name: 'Consultoría tecnológica',
    desc: 'Te ayudamos a tomar las mejores decisiones técnicas. Auditoría de tu stack, roadmap de crecimiento y arquitectura escalable.',
    features: ['Auditoría tech', 'Roadmap de crecimiento', 'Arquitectura escalable', 'Stack review'],
    cta: 'Agendar consulta',
    photo: '/Screenshot 2026-06-24 142040.png',
    icon: <><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/></>,
  },
  {
    name: 'Integraciones y APIs',
    desc: 'Conectamos todas tus herramientas para que trabajen en conjunto. APIs REST/GraphQL, webhooks y sincronización en tiempo real.',
    features: ['APIs REST / GraphQL', 'Webhooks', 'Sync en tiempo real', 'Migracion de datos'],
    cta: 'Conectar mis herramientas',
    photo: '/integraciones.jpeg',
    icon: <><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><line x1="9" y1="6" x2="15" y2="6"/><line x1="7.8" y1="8.4" x2="10.2" y2="15.6"/><line x1="16.2" y1="8.4" x2="13.8" y2="15.6"/></>,
  },
];

export default function Services() {
  const ref = useGsapStagger<HTMLDivElement>('.srv-card', {
    stagger: 0.12,
    y: 50,
    start: 'top 80%',
  });

  return (
    <section className="servicios" id="servicios" aria-labelledby="srv-title">
      <div className="container">
        <div className="sec-hdr">
          <h2 className="section-title" id="srv-title">Soluciones que impulsan tu empresa</h2>
        </div>
        <div className="srv-grid" ref={ref}>
          {services.map((s, i) => {
            const clazz = 'srv-card glow-card' + (s.highlight ? ' srv-featured' : '');
            return (
              <div
                key={i}
                className={clazz}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--gx', `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty('--gy', `${e.clientY - r.top}px`);
                }}
              >
                <div className="srv-photo">
                  <img src={s.photo} alt={s.name} loading="lazy" />
                  <div className="srv-photo-overlay" aria-hidden="true"></div>
                  <div className="srv-ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{s.icon}</svg>
                  </div>
                </div>
                <div className="srv-body">
                  <h3 className="srv-name">{s.name}</h3>
                  <p className="srv-dsc">{s.desc}</p>
                  <ul className="srv-features">
                    {s.features.map((f, j) => (
                      <li key={j}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="https://api.whatsapp.com/send?phone=593998878789" target="_blank" rel="noopener noreferrer" className="srv-cta">
                    {s.cta}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
