import { useState } from 'react';
import { useReveal } from '../lib/useReveal';

const faqs = [
  {
    q: '¿Cuánto cuesta desarrollar un software a medida?',
    a: 'El costo depende del alcance y complejidad del proyecto. Ofrecemos propuestas personalizadas sin compromiso. Contáctanos por WhatsApp para recibir una cotización gratuita en menos de 24 horas.',
  },
  {
    q: '¿Cuánto tiempo tarda en estar listo un bot con IA?',
    a: 'Un bot básico con respuestas automáticas puede estar listo en 1 a 2 semanas. Bots avanzados con flujos personalizados e integración a bases de datos toman entre 3 y 6 semanas según la complejidad.',
  },
  {
    q: '¿Pueden integrar el nuevo software con mis herramientas actuales?',
    a: 'Sí. Desarrollamos integraciones con APIs REST y GraphQL, webhooks y sincronización en tiempo real con CRMs, ERPs, plataformas de e-commerce y cualquier herramienta que tenga una API disponible.',
  },
  {
    q: '¿Trabajan con clientes fuera de Ecuador?',
    a: 'Sí, trabajamos con clientes en todo el mundo. Tenemos proyectos activos en Ecuador, Reino Unido y otros países. La comunicación es 100% remota y en español o inglés.',
  },
  {
    q: '¿Ofrecen soporte y mantenimiento después del lanzamiento?',
    a: 'Sí. Brindamos soporte post-lanzamiento, corrección de errores y actualizaciones. Los términos de mantenimiento se definen en cada propuesta según las necesidades del cliente.',
  },
  {
    q: '¿Qué tecnologías utilizan para el desarrollo?',
    a: 'Usamos tecnologías modernas como React, Next.js, Node.js, Python y bases de datos SQL y NoSQL. La elección de tecnología depende siempre de las necesidades específicas de cada proyecto.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const hdrRef = useReveal<HTMLDivElement>();

  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      {/* ponytail: inline JSON-LD so schema co-locates with the component */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container">
        <div className="sec-hdr reveal" ref={hdrRef}>
          <h2 className="section-title" id="faq-title">Preguntas frecuentes</h2>
          <p className="sec-sub">Todo lo que necesitas saber antes de empezar tu proyecto.</p>
        </div>
        <div className="faq-list" role="list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`faq-item${isOpen ? ' open' : ''}`}
                role="listitem"
              >
                <button
                  className="faq-q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  id={`faq-q-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <h3>{f.q}</h3>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="faq-chevron">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  className="faq-a"
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  hidden={!isOpen}
                >
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
