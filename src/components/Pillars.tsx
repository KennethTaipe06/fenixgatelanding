import { useReveal } from '../lib/useReveal';

const pillars = [
  { delay: '0', title: 'A MEDIDA', desc: 'Desarrollamos exactamente lo que tu negocio necesita.', icon: <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></> },
  { delay: '80', title: 'ESCALABLE', desc: 'Sistemas preparados para crecer contigo, sin límites.', icon: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></> },
  { delay: '160', title: 'PRECIOS ECONÓMICOS', desc: 'Calidad profesional a precios justos.', icon: <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></> },
];

export default function Pillars() {
  return (
    <section className="pillars" aria-label="Propuesta de valor">
      <div className="container">
        <div className="pillars-grid">
          {pillars.map((p, i) => {
            const ref = useReveal<HTMLDivElement>();
            return (
              <div key={i} className="pillar reveal" data-delay={p.delay} ref={ref}>
                <div className="pillar-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{p.icon}</svg>
                </div>
                <div>
                  <div className="pillar-ttl">{p.title}</div>
                  <p className="pillar-dsc">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
