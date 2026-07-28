"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SLIDES_DATA = [
  {
    id: 1,
    title: "Apple iPhone 17 Pro Max & High-Tech",
    subtitle: "Última Tecnología",
    description: "Descubre el espectacular iPhone 17 Pro Max y nuestra selección exclusiva de Apple y tecnología premium al mejor precio en EspanaChollos.",
    image: "https://c0.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2025/09/apple-iphone-17-pro-max-frandroid-2025-768x768.png?webp=1&key=edb35fd1",
    btnText: "Ver iPhone 17 Pro Max",
    link: "/produits/39" // Redirige directement vers le produit iPhone 17 Pro Max
  },
  {
    id: 2,
    title: "Audio Premium: Sony WH-1000XM5SA & AirPods Pro 3",
    subtitle: "Sonido y Cancelación de Ruido",
    description: "Disfruta de una calidad de audio insuperable y una cancelación activa de ruido perfecta con los auriculares top del mercado.",
    image: "/img/SonyWH-1000XM5SA.jpg",
    btnText: "Comprar Auriculares",
    link: "/produits/14" // Redirige vers le casque Sony (ou /produits?cat=electronique)
  },
  {
    id: 3,
    title: "Zapatillas Deportivas Urbanas: Adidas & PUMA",
    subtitle: "Moda y Tendencias",
    description: "Renueva tu estilo diario con las zapatillas PUMA Tazon 6, Puma Smash y Adidas VS Pace 2.0. Comodidad y diseño al mejor precio.",
    image: "/img/PUMATazon6FractureFM.jpg",
    btnText: "Ver Colección Sneakers",
    link: "/produits?cat=sport" // Renvoie vers la catégorie Sport / Fitness
  },
  {
    id: 4,
    title: "Apple Watch Series 9 & Accesorios GaN 100W",
    subtitle: "Estilo de Vida Inteligente",
    description: "Mantente conectado con el Apple Watch Series 9 (GPS + Cellular) de 45 MM y optimiza tus cargas con la tecnología rápida GaN III de CUKTECH.",
    image: "/img/AppleWatchSeries9.jpg",
    btnText: "Explorar Accesorios",
    link: "/produits/15" // Redirige vers l'Apple Watch
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gestion du défilement automatique toutes les 5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section-container">
      
      {/* COMPOSANT DE GAUCHE : LE SLIDER DYNAMIQUE */}
      <div className="hero-slider-left">
        {SLIDES_DATA.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`hero-slide ${index === currentSlide ? "slide-active" : ""}`}
          >
            {/* Image de fond simple */}
            <img src={slide.image} alt={slide.title} className="slide-bg-img" />
            
            {/* Voile sombre texturé pour garantir la lisibilité du texte blanc */}
            <div className="slide-overlay"></div>

            {/* Contenu textuel */}
            <div className="slide-content">
              <span className="slide-tag">{slide.subtitle}</span>
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-desc">{slide.description}</p>
              <Link href={slide.link} className="btn-hero-action">
                {slide.btnText}
              </Link>
            </div>
          </div>
        ))}

        {/* Boutons indicateurs (Dots) en bas au centre du slider */}
        <div className="slider-dots">
          {SLIDES_DATA.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`dot-indicator ${index === currentSlide ? "dot-active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir a la diapositiva ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* COMPOSANT DE DROITE : LES DEUX ENCARTS STATIQUES */}
      <div className="hero-banners-right">
  
        {/* Encart Haut - Sneakers */}
        <div className="right-banner-card text-light">
          <img 
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80" 
            alt="Sneakers Tendance" 
            className="banner-bg-img" 
          />
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-tag text-red">Moda</span>
            <h3>Sneakers de Tendencia: Nike, Jordan y New Balance</h3>
            <p>Encuentra los mejores estilos de zapatillas en Espanadeal.</p>
            <Link href="/produits?cat=mode" className="btn-banner-small">
              Comprar
            </Link>
          </div>
        </div>

        {/* Encart Bas - Wearables / Électronique */}
        <div className="right-banner-card text-light">
          <img 
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" 
            alt="Écouteurs et Montres Connectées" 
            className="banner-bg-img" 
          />
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-tag text-green">High-Tech</span>
            <h3>Smart Accessories & Audio</h3>
            <p>Disfruta de la mejor calidad de sonido y conectividad al mejor precio.</p>
            <Link href="/produits?cat=electronique" className="btn-banner-small">
              Comprar
            </Link>
          </div>
        </div>

      </div>

    </section>
  );
}