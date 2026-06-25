import { useEffect, useRef } from 'react';

export default function GlobalEffects() {
  const glowRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const prog = progRef.current;
    if (prog) {
      const update = () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        prog.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
      };
      window.addEventListener('scroll', update, { passive: true });
      update();
      return () => window.removeEventListener('scroll', update);
    }
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const glow = glowRef.current;
    if (!fine || !glow) { if (glow) glow.style.display = 'none'; return; }

    let gx = window.innerWidth / 2, gy = window.innerHeight / 2, cx = gx, cy = gy;
    const onMove = (e: MouseEvent) => { gx = e.clientX; gy = e.clientY; };
    window.addEventListener('mousemove', onMove);
    let raf = 0;
    const loop = () => {
      cx += (gx - cx) * 0.12;
      cy += (gy - cy) * 0.12;
      glow.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;

    const btns = document.querySelectorAll<HTMLElement>('.magnetic');
    const cleanups: (() => void)[] = [];
    btns.forEach((btn) => {
      const onMove = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.25}px,${y * 0.35}px) translateY(-2px)`;
      };
      const onLeave = () => { btn.style.transform = ''; };
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
      cleanups.push(() => { btn.removeEventListener('mousemove', onMove); btn.removeEventListener('mouseleave', onLeave); });
    });
    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <>
      <div className="scroll-progress" ref={progRef}></div>
      <div className="cursor-glow" ref={glowRef}></div>
    </>
  );
}
