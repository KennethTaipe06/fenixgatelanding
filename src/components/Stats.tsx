import { useEffect, useRef } from 'react';
import { useReveal } from '../lib/useReveal';

export default function Stats() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = gridRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLElement>('.counter').forEach((el) => {
      const target = parseInt(el.dataset.target || '0');
      const suffix = el.dataset.suffix || '';
      let t0: number | null = null;
      const step = (ts: number) => {
        if (!t0) t0 = ts;
        const p = Math.min((ts - t0) / (reduce ? 0 : 1600), 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(e * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      };
      if ('IntersectionObserver' in window) {
        const o = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { requestAnimationFrame(step); o.unobserve(en.target); } }), { threshold: 0.5 });
        o.observe(el);
      } else { requestAnimationFrame(step); }
    });
  }, []);

  const quoteRef = useReveal<HTMLDivElement>();

  return (
    <section className="stats" aria-label="Estadisticas">
      <div className="container">
        <div className="stats-inline" ref={gridRef}>
          <span className="stat-chunk"><span className="counter" data-target="50" data-suffix="+">0+</span> proyectos entregados</span>
          <span className="stat-sep" aria-hidden="true">·</span>
          <span className="stat-chunk"><span className="counter" data-target="100" data-suffix="%">100%</span> código a medida</span>
          <span className="stat-sep" aria-hidden="true">·</span>
          <span className="stat-chunk"><span className="counter" data-target="24" data-suffix="h">24h</span> tiempo de respuesta</span>
        </div>
        <div className="stats-quote reveal" ref={quoteRef}>
          <p>No vendemos plantillas. Construimos lo que tu negocio necesita.</p>
        </div>
      </div>
    </section>
  );
}
