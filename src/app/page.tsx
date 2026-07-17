"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ── Slideshow Data ──────────────────────────────────
const slides = [
  {
    image: "/images/supermarket-hero.png",
    tag: "Retail Solutions",
    title: "Premium Supermarket Gondola Racks",
    subtitle: "Maximize product visibility with our double-sided gondola systems designed for modern retail stores.",
  },
  {
    image: "/images/warehouse-hero.png",
    tag: "Industrial Storage",
    title: "Heavy-Duty Pallet Racking",
    subtitle: "Built for warehouses. Load-tested steel structures that handle tonnes with ease.",
  },
  {
    image: "/images/garment-hero.png",
    tag: "Fashion Display",
    title: "Minimalist Garment Display Stands",
    subtitle: "Sleek clothing and shoe display racks crafted for premium boutiques and fashion stores.",
  },
];

// ── All Product Categories (from products.json) ─────
const categories = [
  {
    id: "display-racks",
    label: "Display Racks",
    count: 21,
    img: "/images/products/display-racks-metal-display-racks-0.jpg",
    desc: "Metal shelving units for all retail needs",
  },
  {
    id: "supermarket-display-rack",
    label: "Supermarket Display Rack",
    count: 11,
    img: "/images/products/supermarket-display-rack-supermarket-display-wall-mount-rack-0.jpg",
    desc: "Gondola & wall-mount systems",
  },
  {
    id: "industrial-rack",
    label: "Industrial Rack",
    count: 9,
    img: "/images/products/industrial-rack-industrial-storage-rack-0.jpg",
    desc: "Heavy-duty warehouse racking",
  },
  {
    id: "book-rack-and-shelf",
    label: "Book Rack & Shelf",
    count: 5,
    img: "/images/products/book-rack-and-shelf-ms-industrial-rack-0.jpg",
    desc: "Library & office shelving",
  },
  {
    id: "slotted-angle-rack",
    label: "Slotted Angle Rack",
    count: 3,
    img: "/images/products/slotted-angle-rack-iron-storage-racks-0.jpeg",
    desc: "Versatile adjustable shelves",
  },
  {
    id: "gondola-unit",
    label: "Gondola Unit",
    count: 3,
    img: "/images/products/gondola-unit-ms-gondola-unit-0.jpg",
    desc: "Classic retail floor gondolas",
  },
  {
    id: "cash-desk-counter",
    label: "Cash Desk Counter",
    count: 3,
    img: "/images/products/cash-desk-counter-l-shape-cash-desk-counter-0.jpeg",
    desc: "Checkout counters & billing desks",
  },
  {
    id: "hook-rack",
    label: "Hook Rack",
    count: 2,
    img: "/images/products/hook-rack-hanger-hook-rack-0.jpg",
    desc: "Pegboard & hook display systems",
  },
  {
    id: "glass-rack",
    label: "Glass Rack",
    count: 2,
    img: "/images/products/glass-rack-glass-display-rack-0.jpeg",
    desc: "Transparent display shelving",
  },
  {
    id: "medicine-rack",
    label: "Medicine Rack",
    count: 2,
    img: "/images/products/medicine-rack-pharmacy-medicine-rack-0.jpeg",
    desc: "Pharmacy & medical shelving",
  },
  {
    id: "vegetables-racks",
    label: "Vegetables & Fruits Rack",
    count: 2,
    img: "/images/products/vegetables-racks-fruits-and-vegetables-racks-0.jpeg",
    desc: "Produce & grocery display stands",
  },
  {
    id: "shopping-basket-and-trolley",
    label: "Shopping Basket & Trolley",
    count: 2,
    img: "/images/products/shopping-basket-and-trolley-plastic-shopping-basket-0.jpeg",
    desc: "Retail baskets & trolleys",
  },
  {
    id: "cloth-hanging-stand",
    label: "Cloth Hanging Stand",
    count: 1,
    img: "/images/products/cloth-hanging-stand-cloth-hanging-stand-0.jpg",
    desc: "Garment & cloth display stands",
  },
  {
    id: "crockery-racks",
    label: "Crockery Rack",
    count: 1,
    img: "/images/products/crockery-racks-crockery-display-rack-0.jpg",
    desc: "Kitchen & crockery display",
  },
  {
    id: "ss-wire-bin-basket",
    label: "SS Wire Bin Basket",
    count: 1,
    img: "/images/products/ss-wire-bin-basket-ss-wire-bin-basket-0.jpg",
    desc: "Stainless steel wire bins",
  },
  {
    id: "wall-mount-rack",
    label: "Wall Mount Rack",
    count: 1,
    img: "/images/products/wall-mount-rack-ms-wall-mount-rack-0.jpg",
    desc: "Space-saving wall shelving",
  },
  {
    id: "store-counters",
    label: "Store Counter",
    count: 1,
    img: "/images/products/store-counters-ss-store-counters-0.jpeg",
    desc: "Reception & store front counters",
  },
  {
    id: "storage-rack",
    label: "Storage Rack",
    count: 1,
    img: "/images/products/storage-rack-ss-shopping-trolley-0.jpeg",
    desc: "Multi-purpose storage solutions",
  },
  {
    id: "metal-storage-rack",
    label: "Metal Storage Rack",
    count: 1,
    img: "/images/products/metal-storage-rack-ms-storage-rack-0.jpg",
    desc: "Robust metal shelving systems",
  },
];

// ── Stats ────────────────────────────────────────────
const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "5000+", label: "Happy Clients" },
  { value: "50+", label: "Type of Products" },
  { value: "Pan-India", label: "Delivery" },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const t = setInterval(() => {
      setActiveSlide((p) => (p + 1) % slides.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const goNext = () => setActiveSlide((p) => (p + 1) % slides.length);
  const goPrev = () => setActiveSlide((p) => (p - 1 + slides.length) % slides.length);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) diff > 0 ? goNext() : goPrev();
  };

  return (
    <div className="home-page">

      {/* ═══════════════════════════════════════
          SECTION 1 — HERO SLIDESHOW
      ═══════════════════════════════════════ */}
      <section
        className="hero"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide${i === activeSlide ? " active" : ""}`}
          >
            <img src={slide.image} alt={slide.title} className="hero-bg-img" />
            <div className="hero-overlay" />
            <div className="hero-content container">
              <span className="hero-tag">{slide.tag}</span>
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-sub">{slide.subtitle}</p>
              <div className="hero-actions">
                <Link href="/catalog" className="btn btn-primary hero-btn">Browse All Products</Link>
                <Link href="/contact" className="btn btn-outline-white hero-btn">Get a Free Quote</Link>
              </div>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button className="hero-arrow hero-prev" onClick={goPrev} aria-label="Previous">&#8249;</button>
        <button className="hero-arrow hero-next" onClick={goNext} aria-label="Next">&#8250;</button>

        {/* Dots */}
        <div className="hero-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hero-dot${i === activeSlide ? " active" : ""}`}
              onClick={() => setActiveSlide(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 — QUICK STATS BAR
      ═══════════════════════════════════════ */}
      <section className="stats-bar">
        <div className="container stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3 — CATEGORIES GRID (main)
      ═══════════════════════════════════════ */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Products</span>
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-sub">
              Tap any category to explore all products. Every rack is manufactured in-house with premium steel and powder coating.
            </p>
          </div>

          <div className="cat-grid">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalog?cat=${cat.id}`}
                className="cat-card"
              >
                <div className="cat-img-wrap">
                  <img src={cat.img} alt={cat.label} className="cat-img" />
                  <div className="cat-overlay" />
                </div>
                <div className="cat-info">
                  <h3 className="cat-name">{cat.label}</h3>
                  <p className="cat-desc">{cat.desc}</p>
                  <span className="cat-count">{cat.count} {cat.count === 1 ? "product" : "products"}</span>
                </div>
                <div className="cat-arrow">→</div>
              </Link>
            ))}
          </div>

          <div className="all-products-cta">
            <Link href="/catalog" className="btn btn-primary">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4 — WHY CHOOSE US
      ═══════════════════════════════════════ */}
      <section className="why-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why Classic Racks</span>
            <h2 className="section-title">Built to Last. Made to Impress.</h2>
            <p className="section-sub">
              Every rack we manufacture goes through strict quality control before leaving our Delhi factory.
            </p>
          </div>
          <div className="why-grid">
            {[
              { icon: "🏭", title: "In-House Manufacturing", desc: "100% manufactured in our own factory in Uttam Nagar, New Delhi — no outsourcing." },
              { icon: "🔩", title: "Premium Steel Grade", desc: "MS steel with corrosion-resistant powder coating for 10+ year product life." },
              { icon: "📐", title: "Custom Dimensions", desc: "Every rack can be customized to your exact store dimensions and layout requirements." },
              { icon: "🚚", title: "Pan-India Delivery", desc: "We deliver and install across all major Indian cities including Delhi, Mumbai, Bengaluru." },
              { icon: "⭐", title: "1 Year Warranty", desc: "All products come with a full 1-year manufacturer warranty and after-sale support." },
              { icon: "💬", title: "Free Consultation", desc: "Our experts help you plan your store layout and suggest the best rack configuration." },
            ].map((item) => (
              <div key={item.title} className="why-card">
                <div className="why-icon">{item.icon}</div>
                <h4 className="why-title">{item.title}</h4>
                <p className="why-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5 — CTA BANNER
      ═══════════════════════════════════════ */}
      <section className="cta-banner">
        <div className="container cta-inner">
          <div>
            <h2 className="cta-title">Ready to Set Up Your Store?</h2>
            <p className="cta-sub">We design a new way of your business — get a free custom quote today.</p>
          </div>
          <div className="cta-btns">
            <Link href="/contact" className="btn btn-white">Request a Quote</Link>
            <Link href="/catalog" className="btn btn-outline-white-sm">Browse Catalog</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STYLES
      ══════════════════════════════════════ */}
      <style jsx>{`
        /* ── Page ── */
        .home-page { overflow-x: hidden; }

        /* ── HERO ── */
        .hero {
          position: relative;
          height: 92vh;
          min-height: 500px;
          max-height: 820px;
          overflow: hidden;
          background: #111;
        }

        .hero-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.8s ease;
          pointer-events: none;
        }
        .hero-slide.active {
          opacity: 1;
          pointer-events: auto;
        }

        .hero-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.75) 0%,
            rgba(0, 0, 0, 0.35) 60%,
            rgba(0, 0, 0, 0.15) 100%
          );
        }

        .hero-content {
          position: absolute;
          bottom: 15%;
          left: 0;
          right: 0;
          padding: 0 1.5rem;
          color: #ffffff;
          max-width: 700px;
          z-index: 2;
        }

        .hero-tag {
          display: inline-block;
          background: var(--primary);
          color: #fff;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.3rem 0.85rem;
          border-radius: 9999px;
          margin-bottom: 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .hero-title {
          font-size: clamp(1.8rem, 5vw, 3.2rem);
          font-weight: 900;
          line-height: 1.15;
          margin-bottom: 0.9rem;
          color: #ffffff !important;
          text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.95), -1px -1px 0 rgba(0, 0, 0, 0.4), 1px -1px 0 rgba(0, 0, 0, 0.4), -1px 1px 0 rgba(0, 0, 0, 0.4), 1px 1px 0 rgba(0, 0, 0, 0.4);
        }

        .hero-sub {
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          color: #ffffff !important;
          line-height: 1.6;
          margin-bottom: 1.75rem;
          max-width: 540px;
          text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.95);
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .hero-btn {
          padding: 0.75rem 1.6rem;
          font-size: 0.92rem;
        }

        .btn-outline-white {
          background: transparent;
          color: #fff;
          border: 2px solid rgba(255,255,255,0.7);
          border-radius: 0.5rem;
          padding: 0.72rem 1.5rem;
          font-weight: 600;
          font-size: 0.92rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
        }
        .btn-outline-white:hover {
          background: rgba(255,255,255,0.15);
          border-color: #fff;
        }

        /* Hero arrows */
        .hero-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 5;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff;
          font-size: 2rem;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease;
          padding: 0;
        }
        .hero-arrow:hover { background: var(--primary); }
        .hero-prev { left: 1.25rem; }
        .hero-next { right: 1.25rem; }

        /* Hero dots */
        .hero-dots {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 5;
        }
        .hero-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          border: none; padding: 0; cursor: pointer;
          transition: background 0.2s, width 0.2s;
          flex-shrink: 0;
        }
        .hero-dot.active {
          background: var(--primary);
          width: 22px;
          border-radius: 4px;
        }

        /* ── STATS BAR ── */
        .stats-bar {
          background: var(--primary);
          padding: 1.25rem 0;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          text-align: center;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .stat-value {
          font-size: 1.65rem;
          font-weight: 900;
          color: #fff;
          font-family: var(--font-family-display);
        }
        .stat-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: rgba(255,255,255,0.82);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* ── SECTION HEADER ── */
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .section-tag {
          display: inline-block;
          background: var(--primary-glow);
          color: var(--primary);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.3rem 0.85rem;
          border-radius: 9999px;
          border: 1px solid rgba(214, 79, 122, 0.2);
          margin-bottom: 0.75rem;
        }
        .section-title {
          font-size: clamp(1.7rem, 4vw, 2.5rem);
          font-weight: 900;
          color: var(--fg-main);
          margin-bottom: 0.75rem;
        }
        .section-sub {
          max-width: 620px;
          margin: 0 auto;
          color: var(--fg-muted);
          font-size: 0.95rem;
          line-height: 1.65;
        }

        /* ── CATEGORIES GRID ── */
        .categories-section {
          padding: 5rem 0;
          background: var(--bg-main);
        }

        .cat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        .cat-card {
          display: flex;
          flex-direction: column;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 1rem;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: all 0.25s ease;
          position: relative;
          box-shadow: var(--shadow-sm);
          cursor: pointer;
        }

        .cat-card:hover {
          border-color: var(--primary);
          box-shadow: 0 8px 30px rgba(214, 79, 122, 0.18);
          transform: translateY(-4px);
        }

        .cat-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: #f5f5f5;
        }

        .cat-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 0.75rem;
          transition: transform 0.35s ease;
        }

        .cat-card:hover .cat-img {
          transform: scale(1.06);
        }

        .cat-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(26,26,46,0.08), transparent);
          pointer-events: none;
        }

        .cat-info {
          padding: 0.9rem 1rem 0.4rem;
          flex-grow: 1;
        }

        .cat-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--fg-main);
          margin-bottom: 0.25rem;
          line-height: 1.3;
        }

        .cat-desc {
          font-size: 0.76rem;
          color: var(--fg-muted);
          line-height: 1.5;
          margin-bottom: 0.35rem;
        }

        .cat-count {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--primary);
          background: var(--primary-glow);
          padding: 0.18rem 0.5rem;
          border-radius: 9999px;
        }

        .cat-arrow {
          padding: 0.55rem 1rem;
          font-size: 1rem;
          color: var(--primary);
          font-weight: 700;
          text-align: right;
          transition: transform 0.2s ease;
        }

        .cat-card:hover .cat-arrow {
          transform: translateX(4px);
        }

        .all-products-cta {
          text-align: center;
          margin-top: 2.5rem;
        }

        /* ── WHY CHOOSE US ── */
        .why-section {
          padding: 5rem 0;
          background: var(--bg-card);
          border-top: 1px solid var(--border);
        }
        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }
        .why-card {
          background: var(--bg-main);
          border: 1px solid var(--border);
          border-radius: 0.9rem;
          padding: 1.75rem 1.5rem;
          transition: all 0.22s ease;
        }
        .why-card:hover {
          border-color: var(--primary);
          box-shadow: var(--shadow-md);
          transform: translateY(-3px);
        }
        .why-icon {
          font-size: 2rem;
          margin-bottom: 0.85rem;
        }
        .why-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--fg-main);
          margin-bottom: 0.5rem;
        }
        .why-desc {
          font-size: 0.87rem;
          color: var(--fg-muted);
          line-height: 1.6;
        }

        /* ── CTA BANNER ── */
        .cta-banner {
          background: linear-gradient(135deg, #0057B8 0%, #00438E 100%);
          padding: 4.5rem 0;
        }
        .cta-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .cta-title {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 900;
          color: #fff;
          margin-bottom: 0.5rem;
        }
        .cta-sub {
          color: rgba(255,255,255,0.85);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .cta-btns {
          display: flex;
          gap: 1rem;
          flex-shrink: 0;
          flex-wrap: wrap;
        }
        .btn-white {
          background: #fff;
          color: var(--primary);
          border: none;
          border-radius: 0.5rem;
          padding: 0.8rem 1.75rem;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }
        .btn-white:hover { background: #f0f0f0; transform: translateY(-2px); }
        .btn-outline-white-sm {
          background: transparent;
          color: #fff;
          border: 2px solid rgba(255,255,255,0.6);
          border-radius: 0.5rem;
          padding: 0.78rem 1.5rem;
          font-weight: 600;
          font-size: 0.92rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }
        .btn-outline-white-sm:hover { background: rgba(255,255,255,0.15); border-color: #fff; }

        /* ══════════════════════
           RESPONSIVE
        ══════════════════════ */

        /* 4-col → 3-col */
        @media (max-width: 1100px) {
          .cat-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* 3-col → 2-col */
        @media (max-width: 768px) {
          .hero { height: 82vh; min-height: 420px; }
          .hero-content { bottom: 12%; }
          .hero-actions { gap: 0.7rem; }
          .hero-btn { padding: 0.65rem 1.1rem; font-size: 0.85rem; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
          .stat-value { font-size: 1.35rem; }
          .cat-grid { grid-template-columns: repeat(2, 1fr); gap: 0.9rem; }
          .why-grid { grid-template-columns: repeat(2, 1fr); gap: 1.1rem; }
          .cta-inner { flex-direction: column; text-align: center; }
          .cta-btns { justify-content: center; }
          .categories-section { padding: 3.5rem 0; }
          .why-section { padding: 3.5rem 0; }
          .cta-banner { padding: 3rem 0; }
        }

        /* 2-col → 1-col */
        @media (max-width: 480px) {
          .cat-grid { grid-template-columns: 1fr; gap: 1.25rem; }
          .why-grid { grid-template-columns: 1fr; }
          .hero-arrow { display: none; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
