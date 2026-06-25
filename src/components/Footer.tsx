const links = ['Servicios', 'Portafolio', 'Proceso', 'Contacto'];

export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="container">
        <div className="footer-main">
          <img src="/Logos/logo solo.png" alt="FenixGate" className="footer-logo" />
          <div className="footer-tg">TU VISIÓN, NUESTRO CÓDIGO, <span className="acc">TU ÉXITO.</span></div>
        </div>
        <nav className="footer-links" aria-label="Footer">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
          ))}
        </nav>
        <div className="footer-copy">
          <p>&copy; 2025 FenixGate. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
