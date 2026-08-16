"use client";

import { useCart } from "@/context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import Hero from "@/components/Hero";
import { Suspense, useState, useEffect } from "react";
import ContactPage from "./contact/page";

const PRODUCTS_DATA = [
 
  { id: 1, name: "iPhone 11", price: 130, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/www.frandroid.com/wp-content/uploads/2019/08/apple-iphone-11-frandroid-2019.png?webp=1&resize=580,580&key=fcb2a39b" },
  { id: 2, name: "iPhone 12", price: 155, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2020/10/iphone-12-frandroid-2020-768x768.png?webp=1&resize=580,580&key=1b5d60de" },
  { id: 3, name: "iPhone 12 Pro", price: 479, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2020/10/iphone-12-max-frandroid-2020-768x768.png?webp=1&resize=580,580&key=85d800ac" },
  { id: 4, name: "iPhone 13", price: 499, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2021/09/apple-iphone-13-frandroid-2021-768x768.png?webp=1&resize=580,580&key=a6b052d7" },
  { id: 5, name: "iPhone 13 Pro Max", price: 349, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2021/09/apple-iphone-13-pro-max-frandroid-2021-768x768.png?webp=1&key=33af98cc" },
  { id: 7, name: "iPhone 14 Pro", price: 699, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2022/09/iphone-14-pro-max-officiel-frandroid-2022-768x768.png?webp=1&key=1e26da76" },
  { id: 8, name: "iPhone 15", price: 749, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2023/09/iphone-15-768x768.png?webp=1&key=62513184" },
  { id: 9, name: "iPhone 15 Pro Max", price: 620, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2023/09/iphone-15-pro-max-768x768.png?webp=1&key=6d7ed62f" },
  { id: 10, name: "Apple iPhone 16 (128 GB) - Cian + Funda Transparente con MagSafe", price: 806, category: "Dispositivos electrónicos", image: "/img/iPhone16.jpg" },
  { id: 11, name: "iPhone 16 Pro Max", price: 817.40, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2024/08/apple-iphone-16-pro-max-frandroid-2024-hd-768x768.png?webp=1&key=ce4d50e3" },
  { id: 12, name: "iPhone 17 Pro", price: 1099, category: "Dispositivos electrónicos", image: "https://www.apple.com/v/iphone-17-pro/d/images/overview/contrast/iphone_17_pro__dwccrdina7qu_large.jpg" },
  { id: 39, name: "iPhone 17 Pro Max", price: 1199, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2025/09/apple-iphone-17-pro-max-frandroid-2025-768x768.png?webp=1&key=edb35fd1" },
  // Audio, Accesorios & Relojes Inteligentes
  { id: 13, name: "Apple AirPods Pro 3 Auriculares Inalámbricos, Cancelación Activa de Ruido", price: 150, category: "Dispositivos electrónicos", image: "/img/AppleAirPodsPro3.jpg" },
  { id: 14, name: "Sony WH-1000XM5SA Edición Especial con estuche blando, Cancelación Activa de Ruido, Bluetooth, calidad de llamada clara", price: 209, category: "Dispositivos electrónicos", image: "/img/SonyWH-1000XM5SA.jpg" },
  { id: 15, name: "Apple Watch Series 9 (GPS + Cellular, 45 MM) Caja de Aluminio Blanco Estrella con Correa Deportiva Blanco Estrella, M/L (Reacondicionado)", price: 399, category: "Dispositivos electrónicos", image: "/img/AppleWatchSeries9.jpg" },
  { id: 16, name: "CUKTECH Cargador USB C 100W, 3 Puertos GaN III Tech y PPS PD3.0 Cargador Rápido, Cargador 100W USB C Rápido", price: 34.99, category: "Dispositivos electrónicos", image: "/img/CUKTECHChargeurUSBC.jpg" },
  { id: 40, name: "SHOKZ OpenFit Pro Open Ear Auriculares Inalámbricos Negro", price: 289, category: "Dispositivos electrónicos", image: "/img/SHOKZOpenFitProOpen.jpg" },
  { id: 41, name: "Realme Buds Clip", price: 74.99, category: "Dispositivos electrónicos", image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2025/12/realme-buds-clip-frandroid-2025-300x300.png?webp=1&key=4be0b994" },
  { id: 44, name: "JBL Wave Beam 2, Auriculares Inalámbricos Bluetooth, Cancelación de Ruido, 40 horas de autonomía", price: 49.99, category: "Dispositivos electrónicos", image: "/img/JBLWaveBeam2.jpg" },
  { id: 45, name: "Auriculares inalámbricos para Apple iPhone - Auriculares Bluetooth 5.4 con ganchos para el oído, Estéreo", price: 27, category: "Dispositivos electrónicos", image: "/img/ecouteurssansfilpourApple.jpg" },
  { id: 46, name: "Soundcore Space One Auriculares de Diadema Bluetooth Inalámbricos con Cancelación Activa de Ruido Adaptativa de Anker, Reducción de voces humanas 2 veces más eficaz", price: 19.99, category: "Dispositivos electrónicos", image: "/img/SoundcoreSpaceOneCasque.jpg" },
  { id: 47, name: "COROS Pace 4 Reloj Deportivo Ultraligero con Sensor de Frecuencia Cardíaca", price: 349, category: "Dispositivos electrónicos", image: "/img/COROSPace4Montre.jpg" },
  { id: 55, name: "Bissell PowerClean FurGuard 280W Aspiradora inalámbrica que se mantiene en pie con cepillo autolimpiante, succión fuerte, batería extraíble, montaje", price: 222.99, category: "Dispositivos electrónicos", image: "/img/BissellPowerClean.jpg" },
  { id: 57, name: "DREAME H15 Pro CarpetFlex aspiradora inalámbrica con mopa, aspiradora húmeda y seca con cepillos duales para pisos duros y alfombras, sin enredos", price: 399, category: "Dispositivos electrónicos", image: "/img/DREAMEH15Pro.jpg" },
  { id: 58, name: "Cintas de correr eléctricas para ejercicio en casa, cintas portátiles (0,6-10 mph) para espacios reducidos, minicintas de 3,5 HP con manillar.", price: 120, category: "Dispositivos electrónicos", image: "/img/ElectricTreadmills.jpg" },
  { id: 59, name: "Pack de volante y pedales de carreras MOZA R3 para PC: base Direct Drive de 3,9 Nm, volante ES Lite de 11 pulgadas, pedales y abrazadera de escritorio para juegos de alto rendimiento.", price: 210.99, category: "Dispositivos electrónicos", image: "/img/MOZAR3Racing.jpg" },
  { id: 60, name: "DREAME H15 Pro CarpetFlex aspiradora inalámbrica con mopa, aspiradora húmeda y seca con cepillos duales para pisos duros y alfombras, sin enredos", price: 349, category: "Dispositivos electrónicos", image: "/img/DREAMEH15Pro.jpg" },
  { id: 61, name: "Amazon Fire TV Stick 4K Select (última generación) + Ring Intercom Audio", price: 70, category: "Dispositivos electrónicos", image: "/img/AmazonFireTV.jpg" },
  { id: 63, name: "Smartwatch HUAWEI Watch FIT 5 (Blanco) + FreeBuds SE 4 (Beige), GPS, pantalla AMOLED de 1,82″, 2500 nits, ultraligero, pago NFC, 5 ATM, hasta 10 días de autonomía.", price: 215, category: "Dispositivos electrónicos", image: "/img/HUAWEIWatch.jpg" },
  { id: 68, name: "DJI Osmo Pocket 4 Essential Bundle, cámara de vlogging de bolsillo con gimbal | Sensor CMOS de 1 pulgada y 4K/240 fps, estabilización de 3 ejes", price: 469, category: "Dispositivos electrónicos", image: "/img/BundleEssentielDJIOsmoPocket4.jpg" },
  { id: 69, name: "DJI Osmo Pocket 3 + Transmisor Mic Mini (Negro Obsidiana), cámara para vlogging, micrófono inalámbrico", price: 399, category: "Dispositivos electrónicos", image: "/img/DJIOsmoPocket3.jpg" },

  
  // Videojuegos
  { id: 17, name: "Sony, Consola PlayStation 5 Edición Estándar 1 TB con lector Blu-ray 4K, SSD Ultrarrápido, Audio 3D, Ray Tracing, 1 Mando DualSense con Retroalimentación Háptica", price: 509.99, category: "Dispositivos electrónicos", image: "/img/SonyConsolePlayStation5.jpg" },
  { id: 18, name: "Playstation Sony, Reproductor a Distancia Portal 5, Pantalla LCD Full HD de 8\", Juegos en Streaming vía Wi-Fi, Retroalimentación Háptica y Gatillos Adaptativos, Color Blanco", price: 220, category: "Dispositivos electrónicos", image: "/img/PlaystationSonyLecteur.jpg" },
  { id: 19, name: "Nintendo Switch (OLED) Consola de Juegos Portátil de 17,8 cm, 64 GB, Pantalla Táctil, WiFi, Blanco", price: 209, category: "Dispositivos electrónicos", image: "/img/NintendoSwitch.jpg" },

  { id: 20, name: "PUMA Tazon 6 Fracture FM, Zapatillas para Hombre", price: 34.99, category: "Deporte / Fitness", image: "/img/PUMATazon6FractureFM.jpg" },
  { id: 21, name: "Puma Smash V2 L Zapatillas Unisex", price: 24.99, category: "Deporte / Fitness", image: "/img/PumaSmashV2LBasketsMixte.jpg" },
 { id: 42, name: "URLIFE Bicicleta Eléctrica para Adultos, Neumáticos Anchos de 16\"", price: 1299, category: "Deporte / Fitness", image: "/img/URLIFEVeloelectrique.jpg" },
  { id: 43, name: "ZIPRO Bicicleta Estática para Adulto con Resistencia Magnética de 8 Niveles, Pantalla LCD, Soporte para Teléfono y Sillín Ajustable", price: 109, category: "Deporte / Fitness", image: "/img/ZIPROVelo.jpg" },
  { id: 49, name: "FabricBike Aero - Bicicleta de Piñón Fijo, Fixie Completa de Una Sola Velocidad, Cuadro de Aluminio", price: 599.99, category: "Deporte / Fitness", image: "/img/FabricBikeAero.jpg" },
  { id: 50, name: "Dskeuzeew Bicicleta Estática Profesional para Gimnasio con Pantalla LCD y Portavasos, Estructura de Acero de 80 mm, Capacidad de 160 kg (Negro)", price: 240, category: "Deporte / Fitness", image: "/img/DskeuzeewVélo.jpg" },
  { id: 51, name: "UrbanLuxe Colchoneta de Gimnasia Inflable Air Tumble Track para Volteretas y Acrobacias", price: 90, category: "Deporte / Fitness", image: "/img/TapisdeGymnastique.jpg" },
  { id: 52, name: "PROIRON Tapis de Yoga Epais 10MM/15MM,Antidérapant Tapis d'exercice Fitness,Tapis de Gymnastique", price: 21.99, category: "Deporte / Fitness", image: "/img/PROIRONTapis.jpg" },
  { id: 53, name: "Balones medicinales Slam de Amazon Basics para ejercicio", price: 16.99, category: "Deporte / Fitness", image: "/img/AmazonBasics.jpg" },
  { id: 54, name: "QIANBAIYI Soporte de cabestros, 3 posiciones, peu encombrant, para la sala de gimnasio de la casa y la sala de deportes, organizador para cabestros,", price: 90, category: "Deporte / Fitness", image: "/img/QIANBAIYISupport.jpg" },
  // ==========================================
  { id: 30, name: "MIXA - Sérum Booster de Hidratación Intensa 24H - Rellena e Ilumina", price: 6.99, category: "Belleza y cuidado", image: "/img/MIXASérumBooste.jpg" },
  { id: 32, name: "JEANNE ARTHES - Perfume para Hombre Sexy Boy Intense - Eau de Parfum - Frasco Vaporizador de 100 ml", price: 5.12, category: "Belleza y cuidado", image: "/img/JEANNEARTHES.jpg" },
  { id: 67, name: "Loción solar Garnier Ambre Solaire Sensitive Expert+ SPF 50+, protector solar muy ligero y sin residuos para pieles claras y sensibles, 1 x 175 ml (paquete de 2)", price: 17.99, category: "Belleza y cuidado", image: "/img/GarnierAmbre.jpg" },
  // ==========================================
  { id: 36, name: "Ninja Foodi FlexDrawer Freidora de Aire, Dual Zone Con Separador Extraíble", price: 156, category: "Cocina", image: "/img/NinjaFoodiFlexDrawerAir.jpg" },
  { id: 37, name: "ECOVACS T50 Omni GEN2 Robot Aspirador con Estación, Potencia de 21000 Pa, Cepillo lateral y mopa", price: 270, category: "Hogar", image: "/img/ECOVACST50OmniGEN2Aspirateur.jpg" },
  { id: 48, name: "GASLAND GIH604BF Placa Mixta de Gas e Inducción 60 cm, Gas 5200 W con quemador wok, Inducción 3500 W con función Barbacoa, Cristal negro integrable (Sin sartén)", price: 350, category: "Cocina", image: "/img/GASLANDGIH604BF.jpg" },
  

];

export function HomePageContent() {
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Recuperación de los filtros desde la URL
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const categoryQuery = searchParams.get("cat") || "";

  const [shuffledProducts, setShuffledProducts] = useState<typeof PRODUCTS_DATA>([]);

  useEffect(() => {
    // Registra la visita al cargar la página
    fetch("/api/visits", { method: "POST" })
      .then((res) => {
        if (!res.ok) console.error("Erreur d'enregistrement de la visite");
      })
      .catch((err) => console.error("Erreur réseau pour l'API visite :", err));
  }, []);

  useEffect(() => {
    // Mezcla de productos mediante Fisher-Yates
    const mixProducts = [...PRODUCTS_DATA];
    for (let i = mixProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mixProducts[i], mixProducts[j]] = [mixProducts[j], mixProducts[i]];
    }
    setShuffledProducts(mixProducts);
  }, []);

  // 2. Traducción de los slugs de URL
  const categoryMapping: { [key: string]: string } = {
    electronique: "Dispositivos electrónicos",
    beaute: "Belleza y cuidado",
    maison: "Hogar",
    cuisine: "Cocina",
    sport: "Deporte / Fitness"
  };
  const targetCategory = categoryMapping[categoryQuery] || "";

  // 3. Filtrado dinámico
  const filteredProducts = shuffledProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery);
    
    const cleanProductCat = product.category.replace(/\s+/g, '').toLowerCase();
    const cleanTargetCat = targetCategory.replace(/\s+/g, '').toLowerCase();
    
    const matchesCategory = targetCategory ? cleanProductCat === cleanTargetCat : true;
    
    return matchesSearch && matchesCategory;
  });

  const handleBuyNow = (product: typeof PRODUCTS_DATA[0]) => {
    addToCart(product);
    router.push("/panier");
  };

  return (
    <main>
      {/* El Hero y las ventajas solo se muestran si el usuario no está filtrando */}
      {!searchQuery && !categoryQuery && (
        <div>
          <Hero />
            
          <div className="features-section">
            <div className="features-container">
              
              {/* Tarjeta 1: Calidad */}
              <div className="feature-card">
                <div className="feature-icon-wrapper icon-shipping">
                  <i className="fas fa-award"></i>
                </div>
                <h3>Calidad Garantizada</h3>
                <p>Productos 100% auténticos y seleccionados con total cuidado</p>
              </div>

              {/* Tarjeta 2: Pago */}
              <div className="feature-card">
                <div className="feature-icon-wrapper icon-security">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Pago Seguro</h3>
                <p>Transacciones 100% protegidas y cifradas de forma segura</p>
              </div>

              {/* Tarjeta 3: Soporte */}
              <div className="feature-card"> 
                <div className="feature-icon-wrapper icon-support">
                  <i className="fas fa-headset"></i>
                </div>
                <h3>Soporte 24/7</h3>
                <p>Asistencia disponible y atenta en cualquier momento</p>
              </div>

              {/* Tarjeta 4: Retirada */}
              <div className="feature-card">
                <div className="feature-icon-wrapper icon-guarantee">
                  <i className="fas fa-store"></i>
                </div>
                <h3>Recogida Rápida</h3>
                <p>Recoja sus artículos directamente en tienda y ahorre tiempo</p>
              </div>

            </div>
          </div>
        </div>
      )}

      <div className="home-page-container">
        <div className="featured-hero">
          <span className="featured-subtitle">Ofertas Exclusivas Espanachollos</span>
          <h1>
            {searchQuery || categoryQuery 
              ? `Resultados de su búsqueda (${filteredProducts.length})` 
              : "Descubra nuestros artículos destacados del momento"}
          </h1>
          
          {/* Botón para restablecer los filtros */}
          {(searchQuery || categoryQuery) && (
            <button 
              onClick={() => router.push("/")}
              style={{ marginTop: "15px", padding: "8px 16px", backgroundColor: "#1a1a1a", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }}
            >
              Ver todos los productos
            </button>
          )}
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-img"
                    loading="lazy"
                  />
                </div>

                <div className="product-info">
                  <span className="product-cat">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.price.toLocaleString()} €</p>
                  
                  <div className="product-card-actions">
                    <button 
                      onClick={() => addToCart(product)} 
                      className="btn-add-cart"
                      title="Añadir al carrito"
                      type="button"
                    >
                      <i className="fas fa-shopping-basket"></i> +
                    </button>
                    <button 
                      onClick={() => handleBuyNow(product)} 
                      className="btn-buy-now"
                      type="button"
                    >
                      Tramitar pedido
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#636366" }}>
            <i className="fas fa-search" style={{ fontSize: "30px", marginBottom: "15px", display: "block" }}></i>
            Ningún producto coincide con sus criterios de búsqueda.
          </div>
        )}
      </div>

      {filteredProducts.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button 
            onClick={() => router.push("/produits")}
            className="btn-see-more"
            type="button"
          >
            Ver más <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
          </button>
        </div>
      )}

      <ContactPage />
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center" }}>Cargando...</div>}>
      <HomePageContent />
    </Suspense>
  );
}