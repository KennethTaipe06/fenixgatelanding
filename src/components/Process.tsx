import { useGsapStagger } from '../lib/useGsapReveal';

const steps = [
  { num: '01', title: 'Entendemos', desc: 'Reunión inicial donde definimos alcance, objetivos y expectativas de tu proyecto.', first: true },
  { num: '02', title: 'Diseñamos', desc: 'Arquitectura técnica y propuesta visual adaptada a tu marca y usuarios.' },
  { num: '03', title: 'Construimos', desc: 'Desarrollo ágil con entregas iterativas para que veas avances desde el inicio.' },
  { num: '04', title: 'Lanzamos', desc: 'Deploy, pruebas exhaustivas y soporte post-entrega para un lanzamiento sin sorpresas.' },
];

export default function Process() {
  const ref = useGsapStagger<HTMLDivElement>('.step-card', { stagger: 0.15, y: 30 });
  return (
    <section className="proceso" id="proceso" aria-labelledby="proc-title">
      <div className="container">
        <div className="proceso-hdr">
          <h2 className="section-title" id="proc-title">De la idea al lanzamiento</h2>
        </div>
        <div className="proceso-grid" ref={ref}>
          {steps.map((s, i) => (
            <div key={i} className={`step-card${s.first ? ' first' : ''}`}>
              <div className="step-num" aria-hidden="true">{s.num}</div>
              <div className="step-ttl">{s.title}</div>
              <p className="step-dsc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
