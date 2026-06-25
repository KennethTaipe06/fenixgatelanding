import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, raf: number | null = null, running = true;

    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    const makeEmber = () => {
      const intensity = Math.random();
      return {
        x: Math.random() * W,
        y: H + Math.random() * 60,
        r: Math.max(0.8, 1 + intensity * 3.5),
        vy: -(0.4 + intensity * 1.6),
        vx: (Math.random() - 0.5) * 0.6,
        accel: -0.008 - Math.random() * 0.012,
        life: 0,
        max: 120 + Math.random() * 200,
        hueStart: 45 - intensity * 30,
        flicker: Math.random() * Math.PI * 2,
        flickerSpeed: 0.08 + Math.random() * 0.06,
      };
    };
    const COUNT = 120;
    let embers: ReturnType<typeof makeEmber>[] = [];
    const init = () => { embers = []; for (let i = 0; i < COUNT; i++) { const e = makeEmber(); e.y = Math.random() * H; embers.push(e); } };

    const tick = () => {
      if (!running) { raf = null; return; }
      ctx.clearRect(0, 0, W, H);
      // fire base glow across full width
      const grad = ctx.createLinearGradient(0, H, 0, H * 0.5);
      grad.addColorStop(0, 'rgba(255,107,0,0.18)');
      grad.addColorStop(0.4, 'rgba(255,61,0,0.08)');
      grad.addColorStop(1, 'rgba(255,107,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
      // embers
      ctx.shadowBlur = 10;
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.vy += e.accel;
        e.x += e.vx + Math.sin(e.flicker) * 0.3;
        e.y += e.vy;
        e.life++;
        e.flicker += e.flickerSpeed;
        const p = e.life / e.max;
        const alpha = p < 0.15 ? p * 6.7 : (1 - p) * 1.18;
        const hue = e.hueStart - p * 25;
        const light = 60 - p * 15;
        const rad = e.r * (1 - p * 0.4);
        ctx.shadowColor = `hsla(${Math.max(0, hue)},100%,50%,0.7)`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, Math.max(0.3, rad), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${Math.max(0, hue)},100%,${light}%,${Math.max(0, alpha) * 0.85})`;
        ctx.fill();
        if (e.life >= e.max || e.y < -20) embers[i] = makeEmber();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    };

    resize(); init();
    raf = requestAnimationFrame(tick);
    let resizeTimer: ReturnType<typeof setTimeout>;
    window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { resize(); init(); }, 150); });

    const heroEl = canvas.parentElement;
    if (heroEl && 'IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => { running = en.isIntersecting; if (running && !raf) raf = requestAnimationFrame(tick); });
      }, { threshold: 0 }).observe(heroEl);
    }

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const laptop = laptopRef.current;

    if (fine && laptop) {
      let rafPending = false;
      let lastDx = 0, lastDy = 0;
      const onMove = (e: MouseEvent) => {
        const r = laptop.getBoundingClientRect();
        lastDx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
        lastDy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
        if (!rafPending) {
          rafPending = true;
          requestAnimationFrame(() => {
            laptop.style.transform = `rotateY(${lastDx * 8}deg) rotateX(${-lastDy * 8}deg)`;
            rafPending = false;
          });
        }
      };
      window.addEventListener('mousemove', onMove);
      return () => window.removeEventListener('mousemove', onMove);
    }
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const content = contentRef.current;
    const visual = visualRef.current;
    if (!content || !visual) return;
    const hero = content.closest('.hero');
    if (!hero) return;
    const ctx = gsap.context(() => {
      gsap.to(content, { y: 50, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 } });
      gsap.to(visual, { y: 25, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 } });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.querySelector('.sc-main');
    if (!root) return;
    const setupCounters = (ms: number) => {
      root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const target = parseFloat(el.dataset.count || '0');
        const dec = parseInt(el.dataset.dec || '0');
        const run = () => {
          let t0: number | null = null;
          const step = (ts: number) => {
            if (!t0) t0 = ts;
            const p = Math.min((ts - t0) / ms, 1);
            const e = 1 - Math.pow(1 - p, 3);
            const val = e * target;
            el.textContent = dec ? val.toFixed(dec) : Math.floor(val).toString();
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = dec ? target.toFixed(dec) : target.toString();
          };
          requestAnimationFrame(step);
        };
        if ('IntersectionObserver' in window) {
          const o = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { run(); o.unobserve(en.target); } }), { threshold: 0.5 });
          o.observe(el);
        } else { run(); }
      });
    };
    setupCounters(reduce ? 0 : 1800);
  }, []);

  return (
    <section className="hero" aria-labelledby="h-headline">
      <canvas className="embers" ref={canvasRef}></canvas>
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content" ref={contentRef}>
            <div className="fenix-icon" aria-hidden="true">🔥</div>
            <h1 className="hero-headline" id="h-headline">
              <span className="ln1"><b>SOFTWARE</b></span>
              <span className="ln2"><b>ESCALABLE</b></span>
              <span className="ln3"><b>A MEDIDA</b></span>
            </h1>
            <p className="hero-sub">Soluciones que impulsan tu negocio, <strong>sin pagar de más.</strong></p>
            <div className="hero-ctas">
              <a href="https://api.whatsapp.com/send?phone=593998878789" target="_blank" rel="noopener noreferrer" className="btn-primary magnetic">Solicitar propuesta</a>
              <a href="#servicios" className="btn-outline magnetic">Ver servicios</a>
            </div>
          </div>

          <div className="hero-visual" ref={visualRef}>
            {/* PRUEBA: logo con slogan en lugar del dashboard
            <div className="laptop-wrap" ref={laptopRef} id="laptopWrap">
              <div className="laptop" role="img" aria-label="Dashboard de FenixGate">
                <div className="laptop-bar">
                  <div className="dot dot-r"></div>
                  <div className="dot dot-y"></div>
                  <div className="dot dot-g"></div>
                  <span className="lap-url">app.fenixgate.com/dashboard</span>
                </div>
                <div className="laptop-screen">
                  <div className="sc-sidebar">
                    <div className="sb-dot on"></div>
                    <div className="sb-dot"></div>
                    <div className="sb-dot"></div>
                    <div className="sb-dot"></div>
                    <div className="sb-line"></div>
                  </div>
                  <div className="sc-main">
                    <div className="sc-header">
                      <span className="sc-title">Panel de control</span>
                      <span className="sc-badge">EN VIVO</span>
                    </div>
                    <div className="kpi-row">
                      <div className="kpi"><div className="kpi-lbl">Usuarios</div><div className="kpi-val on" data-count="1247">0</div><div className="kpi-chg">+12% mes</div></div>
                      <div className="kpi"><div className="kpi-lbl">Ventas</div><div className="kpi-val">$<span data-count="8.4" data-dec="1">0</span>k</div><div className="kpi-chg">+8.3%</div></div>
                      <div className="kpi"><div className="kpi-lbl">Pedidos</div><div className="kpi-val" data-count="342">0</div><div className="kpi-chg">+5.1%</div></div>
                    </div>
                    <div className="chart-box">
                      <div className="chart-lbl">Rendimiento mensual</div>
                      <svg className="chart-svg" viewBox="0 0 280 56" preserveAspectRatio="none" aria-hidden="true">
                        <defs>
                          <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path className="line" d="M0,48 C25,44 45,35 70,28 C95,21 115,36 140,24 C165,12 190,18 215,10 C235,5 258,8 280,4" fill="none" stroke="#FF6B00" strokeWidth="1.5" />
                        <path className="area" d="M0,48 C25,44 45,35 70,28 C95,21 115,36 140,24 C165,12 190,18 215,10 C235,5 258,8 280,4 L280,56 L0,56Z" fill="url(#cg)" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="laptop-glow" aria-hidden="true"></div>
            </div>
            */}
            <img src="/Logos/Logo con slogan.png" alt="FenixGate - Fabrica de Software" className="hero-logo-img" width="480" height="240" fetchPriority="high" />
          </div>
        </div>
      </div>
    </section>
  );
}
