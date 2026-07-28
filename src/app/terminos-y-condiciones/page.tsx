import Link from "next/link";

export const metadata = {
  title: 'Términos y Condiciones | EspanaChollos',
  description: 'Condiciones generales de venta y uso de EspanaChollos.',
};

export default function TerminosYCondiciones() {
  return (
    <main className="legal-container">
      <h1 className="legal-title">Términos y Condiciones de Venta</h1>
      <p className="legal-updated">Última actualización: Julio de 2026</p>

      <section className="legal-section">
        <h2>1. Información General</h2>
        <p>
          El presente documento establece las Condiciones Generales de Uso y Venta del sitio web <strong>EspanaChollos</strong> (espanadeal.es). Al realizar un pedido en nuestra tienda en línea, aceptas íntegramente los términos aquí descritos.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Productos y Precios</h2>
        <p>
          Todos los precios mostrados en el sitio web incluyen los impuestos aplicables en España (IVA). Nos reservamos el derecho de modificar los precios en cualquier momento, garantizando la aplicación de las tarifas vigentes en el momento de la compra.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Pedidos y Envíos</h2>
        <p>
          Los pedidos procesados a través de nuestro sitio web se gestionan en un plazo hábil habitual. Realizamos envíos a toda España peninsular y Baleares. Los plazos de entrega estimados se indicarán al finalizar la compra.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Derecho de Desistimiento y Devoluciones</h2>
        <p>
          De acuerdo con la legislación europea y española, dispones de un plazo de <strong>14 días naturales</strong> a partir de la recepción del producto para ejercer tu derecho de devolución sin necesidad de justificación. El producto deberá encontrarse en su estado original y empaque intacto.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Garantía Legal</h2>
        <p>
          Todos los productos ofertados cuentan con la garantía legal de conformidad aplicable según la normativa vigente para la defensa de los consumidores en España.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Contacto</h2>
        <p>
          Para cualquier duda o reclamación, puedes ponerte en contacto con nuestro servicio de atención al cliente a través de nuestra <Link href="/contact">página de contacto</Link>.
        </p>
      </section>
    </main>
  );
}