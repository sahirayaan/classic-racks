"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    image: "/images/supermarket-hero.png",
    title: "Premium Supermarket Gondola Racks",
    location: "Commercial Retail Store Aisle",
  },
  {
    image: "/images/warehouse-hero.png",
    title: "Heavy-Duty Pallet Racking",
    location: "Industrial Storage Facility",
  },
  {
    image: "/images/garment-hero.png",
    title: "Minimalist Metal Garment Stands",
    location: "Premium Fashion Boutique",
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const categories = [
    {
      id: "supermarket-display-rack",
      title: "Supermarket Racks",
      desc: "Double-sided gondolas, wall mount racks, and end caps designed to maximize retail floor space and product visibility.",
      icon: "🏪",
    },
    {
      id: "industrial-rack",
      title: "Industrial & Warehouse",
      desc: "Heavy-duty pallet racking and slotted angle shelves designed to support massive loads safely in storage facilities.",
      icon: "🏭",
    },
    {
      id: "garment-display-rack",
      title: "Garment Display Racks",
      desc: "Customized clothing hangers, shoes display, and minimalist stands matching high-end clothing store layouts.",
      icon: "👗",
    },
    {
      id: "shopping-basket-and-trolley",
      title: "Baskets & Trolleys",
      desc: "Shopping trolleys, plastic handheld baskets, store counters, and hanging peg hooks for a complete retail store setup.",
      icon: "🛒",
    },
  ];

  return (
    <div className="home-container animate-fade">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="badge">ESTABLISHED 2007 • DELHI</span>
            <h1>
              Engineered Steel <span>Racking Systems</span>
            </h1>
            <p>
              Classic Racks manufactures premium, highly durable, and
              fine-finished retail display racks, industrial warehouse shelving,
              and specialty store fixtures designed for maximum storage efficiency.
            </p>
            <div className="hero-actions">
              <Link href="/catalog" className="btn btn-primary">
                Explore Catalog
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Request a Quote
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-slideshow-container">
              {/* Slides */}
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`hero-slide ${idx === activeSlide ? "active" : ""}`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="hero-slide-img"
                  />
                  <div className="hero-slide-overlay">
                    <p>{slide.location}</p>
                    <h3>{slide.title}</h3>
                  </div>
                </div>
              ))}

              {/* Dots Indicator */}
              <div className="hero-slideshow-dots">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`hero-slideshow-dot ${idx === activeSlide ? "active" : ""}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Arrow Controls */}
              <div className="hero-slideshow-nav">
                <button
                  onClick={handlePrev}
                  className="hero-slideshow-btn"
                  aria-label="Previous slide"
                >
                  &larr;
                </button>
                <button
                  onClick={handleNext}
                  className="hero-slideshow-btn"
                  aria-label="Next slide"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-card">
            <h3>19+</h3>
            <p>Years of Service</p>
          </div>
          <div className="stat-card">
            <h3>100%</h3>
            <p>GST Verified Quality</p>
          </div>
          <div className="stat-card">
            <h3>20+</h3>
            <p>Core Categories</p>
          </div>
          <div className="stat-card">
            <h3>94%</h3>
            <p>Response Rate</p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <span className="badge">Featured Racks</span>
            <h2>Our Core Racking Categories</h2>
            <p>Explore our heavy-duty retail and industrial racking solutions manufactured in Uttam Nagar, Delhi.</p>
          </div>

          <div className="grid-2">
            {categories.map((cat) => (
              <div key={cat.id} className="category-card">
                <div className="category-icon">{cat.icon}</div>
                <div className="category-info">
                  <h3>{cat.title}</h3>
                  <p>{cat.desc}</p>
                  <Link href={`/catalog?cat=${cat.id}`} className="category-link">
                    Explore category →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us-section section">
        <div className="container">
          <div className="section-header">
            <span className="badge">Quality Standards</span>
            <h2>Why Choose Classic Racks?</h2>
            <p>We manufacture premium steel components designed to last under heavy loads.</p>
          </div>

          <div className="grid-3">
            <div className="quality-card">
              <h4>🛡️ Epoxy Powder Coating</h4>
              <p>All display fixtures undergo comprehensive zinc phosphating and electrostatic powder coating to ensure scratch and rust protection.</p>
            </div>
            <div className="quality-card">
              <h4>⚙️ Modular & Customizable</h4>
              <p>Easily assemble, modify, or extend shelf heights. We customize lengths, widths, and load capacities matching your store space.</p>
            </div>
            <div className="quality-card">
              <h4>🏋️ Heavy Load Bearing</h4>
              <p>Crafted using cold rolled steel plates and structural columns designed to bear up to 350kg per shelf without sagging.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
