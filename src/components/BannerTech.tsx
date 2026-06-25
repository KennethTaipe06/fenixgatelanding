import { useReveal } from '../lib/useReveal';

export default function BannerTech() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="banner-tech" aria-label="Tecnología y seguridad">
      <div className="container">
        <div className="banner-inner reveal" ref={ref}>
          <div className="banner-col">
            <div className="banner-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <div>
              <div className="banner-ttl">TECNOLOGÍA MODERNA Y SEGURA</div>
              <p className="banner-dsc">Usamos las mejores tecnologías para entregar soluciones robustas, seguras y de alto rendimiento.</p>
            </div>
          </div>
          <div className="banner-divider" aria-hidden="true"></div>
          <div className="banner-col">
            <div className="banner-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 11.75c1.38 0 2.5-1.12 2.5-2.5S10.38 6.75 9 6.75 6.5 7.87 6.5 9.25 7.62 11.75 9 11.75z" />
                <path d="M2 20c0-3.5 3.5-6 7-6s7 2.5 7 6" />
                <path d="M17 8h6" />
                <path d="M20 5v6" />
              </svg>
            </div>
            <div>
              <div className="banner-ttl">CONFIABILIDAD Y EXPERIENCIA</div>
              <p className="banner-dsc">Contamos con profesionales con múltiples años de experiencia en la industria, capaces de afrontar cualquier reto tecnológico.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
