import { useGsapStagger } from '../lib/useGsapReveal';

const projects = [
  { cat: 'Página Web + E-commerce', name: 'Graphic Pantone', desc: 'Sitio institucional y catálogo online para empresa de impresión offset, digital y gran formato con más de 16 años de experiencia en Ecuador. Cotización automática, gestión de clientes y entrega nacional.', photo: '/graphic-pantone.png', url: 'https://graphicpantone.shop/' },
  { cat: 'Página Web', name: 'Magic Cleaning Carpet', desc: 'Sitio web para empresa de limpieza de alfombras y tapizados en Londres, UK. Más de 10 años de experiencia, +1500 clientes satisfechos. Catálogo de 9 servicios especializados con cotización gratis.', photo: '/magic-cleaning.png', url: 'https://magiccleaningcarpet.com/' },
  { cat: 'App Web', name: 'MindTalent TH', desc: 'Plataforma de selección y gestión de talento humano. Dashboard interactivo, evaluaciones de candidatos, reportes en tiempo real y seguimiento de procesos de contratación.', photo: '/mindtalentth.png', url: 'https://app.mindtalentth.com' },
];

export default function Portfolio() {
  const gridRef = useGsapStagger<HTMLDivElement>('.port-card', { stagger: 0.14, y: 40, start: 'top 80%' });
  return (
    <section className="portafolio" id="portafolio" aria-labelledby="port-title">
      <div className="container">
        <div className="port-hdr">
          <div className="eyebrow">Nuestro trabajo</div>
          <h2 className="section-title" id="port-title">Nuestros últimos trabajos</h2>
          <p className="port-sub">Proyectos reales que están impulsando negocios hoy.</p>
        </div>
        <div className="port-grid" ref={gridRef}>
          {projects.map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="port-card glow-card">
              <div className="port-shot">
                <img src={p.photo} alt={p.name} loading="lazy" />
                <div className="port-overlay" aria-hidden="true"></div>
                <div className="port-visit" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  <span>Visitar sitio</span>
                </div>
              </div>
              <div className="port-info">
                <div className="port-cat">{p.cat}</div>
                <div className="port-name">{p.name}</div>
                <p className="port-dsc">{p.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
