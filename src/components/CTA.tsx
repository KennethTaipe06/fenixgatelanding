export default function CTA() {
  return (
    <section className="cta-final" id="contacto" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-grid">
          <div className="cta-left">
            <div className="cta-left-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 11.5V14a3 3 0 0 0 6 0v-2.5" />
                <path d="M6.5 9A5.5 5.5 0 0 1 12 3.5 5.5 5.5 0 0 1 17.5 9V11H6.5V9z" />
                <path d="M4.5 11H19.5l1 10H3.5L4.5 11z" />
              </svg>
            </div>
            <div>
              <h2 className="cta-tagline" id="cta-title">IDEA. DESARROLLO.<br />CRECIMIENTO.</h2>
              <p className="cta-psub">Nosotros construimos el software, <strong>tú te enfocas en hacer crecer tu negocio.</strong></p>
            </div>
          </div>
          <div className="cta-right">
            <div className="cta-r-ttl">HABLEMOS!</div>
            <p className="cta-r-dsc">Cuéntanos tu idea y te ofrecemos la mejor solución al mejor precio.</p>
            <a href="https://api.whatsapp.com/send?phone=593998878789" target="_blank" rel="noopener noreferrer" className="btn-white magnetic">Solicitar propuesta gratuita</a>
          </div>
        </div>
      </div>
    </section>
  );
}
