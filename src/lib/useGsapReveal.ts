import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { el.classList.add('visible'); return; }
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => el.classList.add('visible'),
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return ref;
}

export function useGsapStagger<T extends HTMLElement = HTMLDivElement>(
  selector: string,
  options?: { start?: string; stagger?: number; y?: number; scale?: number; ease?: string; duration?: number }
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>(selector);
      gsap.fromTo(items,
        { opacity: 0, y: options?.y ?? 30, scale: options?.scale ?? 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: options?.duration ?? 0.8,
          ease: options?.ease ?? 'back.out(1.4)',
          stagger: { each: options?.stagger ?? 0.1, from: 'start' },
          scrollTrigger: {
            trigger: el,
            start: options?.start ?? 'top 82%',
            once: true,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [selector, options?.start, options?.stagger, options?.y, options?.scale, options?.ease, options?.duration]);
  return ref;
}
