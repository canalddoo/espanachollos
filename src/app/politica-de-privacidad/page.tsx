import Link from "next/link";

export const metadata = {
  title: 'Política de Privacidad | EspanaChollos',
  description: 'Política de privacidad y protección de datos personales de EspanaChollos.',
};

export default function PoliticaDePrivacidad() {
  return (
    <main className="legal-container">
      <h1 className="legal-title">Política de Privacidad</h1>
      <p className="legal-updated">Última actualización: Julio de 2026</p>

      <section className="legal-section">
        <h2>1. Protección de Datos (RGPD)</h2>
        <p>
          En <strong>EspanaChollos</strong> nos tomamos muy en serio la privacidad de tus datos. Cumplimos rigurosamente con el Reglamento General de Protección de Datos (RGPD) de la Unión Europea y la Ley Orgánica de Protección de Datos en España (LOPDGDD).
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Datos Recopilados</h2>
        <p>Recopilamos únicamente la información necesaria para procesar tus compras y ofrecerte el mejor servicio posible:</p>
        <ul>
          <li>Datos de contacto (Nombre, e-mail, teléfono).</li>
          <li>Dirección de envío y facturación.</li>
          <li>Historial de pedidos e interacción con la plataforma.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>3. Uso de la Información</h2>
        <p>
          Tus datos se utilizan exclusivamente para gestionar la entrega de tus pedidos, enviar confirmaciones de compra, atender tus consultas de soporte y, si lo autorizas, informarte sobre chollos y promociones exclusivas.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Transferencia de Datos a Terceros</h2>
        <p>
          No vendemos ni cedemos tus datos a terceros. Únicamente compartimos la información estrictamente necesaria con empresas de transporte para efectuar el envío de tu paquete.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Tus Derechos</h2>
        <p>
          Tienes derecho a acceder, rectificar, limitar o solicitar la eliminación total de tus datos personales almacenados en nuestro sistema. Para ejercer estos derechos, simplemente escríbenos mediante la <Link href="/contact">página de contacto</Link>.
        </p>
      </section>
    </main>
  );
}