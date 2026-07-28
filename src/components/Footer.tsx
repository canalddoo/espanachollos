import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return ( 
    <footer className="main-footer"> 
      <div className="footer-container"> 
        
        {/* Navigation des liens légaux */}
        <nav className="footer-links">
          <Link href="/terminos-y-condiciones">Términos y Condiciones</Link>
          <Link href="/politica-de-privacidad">Política de Privacidad</Link>
          <Link href="/contact">Contacto</Link>
        </nav>

        {/* Derechos de autor */}
        <div className="footer-copyright">
          <p>© {currentYear} <strong>EspanaChollos</strong>. Todos los derechos reservados.</p>
        </div> 

      </div>
    </footer>
  );
}