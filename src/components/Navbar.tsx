import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let tick = false;
    const onScroll = () => {
      if (!tick) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 72);
          tick = false;
        });
        tick = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#' || href.length < 2) return;
    const t = document.querySelector(href);
    if (t) {
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    }
  };

  return (
    <header>
      <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Navegación principal">
        <div className="container">
          <div className="nav-inner">
            <a href="#" className="wordmark" aria-label="FenixGate inicio">
              <img src="/Logos/logo solo.png" alt="FenixGate" className="wordmark-img" />
            </a>
            <ul className="nav-links" role="list">
              <li><a href="#servicios" onClick={(e) => smoothScroll(e, '#servicios')}>Servicios</a></li>
              <li><a href="#portafolio" onClick={(e) => smoothScroll(e, '#portafolio')}>Portafolio</a></li>
              <li><a href="#proceso" onClick={(e) => smoothScroll(e, '#proceso')}>Proceso</a></li>
              <li><a href="#contacto" onClick={(e) => smoothScroll(e, '#contacto')}>Contacto</a></li>
            </ul>
            <a href="https://api.whatsapp.com/send?phone=593998878789" target="_blank" rel="noopener noreferrer" className="btn-primary nav-cta-desk" style={{ padding: '10px 18px', fontSize: '13px' }}>Hablemos</a>
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-nav${menuOpen ? ' open' : ''}`} role="dialog" aria-label="Menú móvil">
        <a href="#servicios" onClick={(e) => { smoothScroll(e, '#servicios'); closeMenu(); }}>Servicios</a>
        <a href="#portafolio" onClick={(e) => { smoothScroll(e, '#portafolio'); closeMenu(); }}>Portafolio</a>
        <a href="#proceso" onClick={(e) => { smoothScroll(e, '#proceso'); closeMenu(); }}>Proceso</a>
        <a href="#contacto" onClick={(e) => { smoothScroll(e, '#contacto'); closeMenu(); }}>Contacto</a>
        <a href="https://api.whatsapp.com/send?phone=593998878789" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: '12px' }}>Hablemos</a>
      </div>
    </header>
  );
}
