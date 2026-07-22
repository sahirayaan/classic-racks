"use client";

import React, { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useInquiry } from "../context/InquiryContext";

interface Product {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  description: string;
  specifications: Record<string, any>;
  features: string[];
  image: string;
  images?: string[];
}

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const router = useRouter();
  const { addItem } = useInquiry();

  const allImages = (product.images && product.images.length > 0)
    ? product.images
    : [product.image].filter(Boolean);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [added, setAdded] = useState(false);

  // ── Touch Swipe State ──
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const swipeDetected = useRef(false);
  const lastTap = useRef(0);

  const nextSlide = useCallback(() => {
    setActiveSlide((p) => (p + 1) % allImages.length);
    setIsZoomed(false);
  }, [allImages.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((p) => (p - 1 + allImages.length) % allImages.length);
    setIsZoomed(false);
  }, [allImages.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 1) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    swipeDetected.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 1) return;
    touchEndX.current = e.touches[0].clientX;
    const dx = Math.abs(touchEndX.current - touchStartX.current);
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
    if (dx > 10 && dx > dy) {
      swipeDetected.current = true;
    }
  };

  const handleTouchEnd = () => {
    if (!swipeDetected.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  // Double-tap to zoom
  const handleDoubleTap = () => {
    setIsZoomed((z) => !z);
  };

  const handleImgClick = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      handleDoubleTap();
    }
    lastTap.current = now;
  };

  const handleAddToQuote = () => {
    addItem(product.id, product.name, product.categoryLabel);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="detail-page">
      {/* ── Back Bar ── */}
      <div className="detail-topbar">
        <button className="back-btn" onClick={() => router.back()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
          </svg>
          <span>Back</span>
        </button>
        <span className="detail-category-badge">{product.categoryLabel}</span>
      </div>

      {/* ── Image Slideshow ── */}
      <div
        className="detail-slider"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Image */}
        <div
          className={`detail-img-viewport${isZoomed ? " zoomed" : ""}`}
          onClick={handleImgClick}
          style={{ touchAction: isZoomed ? "pinch-zoom" : "pan-y" }}
        >
          {allImages.length > 0 ? (
            <img
              src={allImages[activeSlide]}
              alt={`${product.name} - ${activeSlide + 1}`}
              className="detail-img"
            />
          ) : (
            <div className="detail-no-img">No image available</div>
          )}
          {isZoomed && (
            <div className="zoom-hint">Pinch to zoom · Double-tap to reset</div>
          )}
        </div>

        {/* Arrow Buttons (desktop) */}
        {allImages.length > 1 && (
          <>
            <button className="slider-arrow prev-arrow" onClick={prevSlide} aria-label="Previous image">
              ‹
            </button>
            <button className="slider-arrow next-arrow" onClick={nextSlide} aria-label="Next image">
              ›
            </button>
          </>
        )}

        {/* Counter */}
        {allImages.length > 1 && (
          <span className="detail-counter">{activeSlide + 1} / {allImages.length}</span>
        )}

        {/* Zoom hint (mobile) */}
        <div className="tap-zoom-tip">
          {isZoomed ? "Pinch to zoom • Double-tap to reset" : "Double-tap image to zoom"}
        </div>
      </div>

      {/* ── Thumbnail Strip ── */}
      {allImages.length > 1 && (
        <div className="thumb-strip">
          {allImages.map((src, i) => (
            <button
              key={i}
              className={`thumb-btn${i === activeSlide ? " thumb-active" : ""}`}
              onClick={() => { setActiveSlide(i); setIsZoomed(false); }}
              aria-label={`Go to image ${i + 1}`}
            >
              <img src={src} alt={`Thumb ${i + 1}`} className="thumb-img" />
            </button>
          ))}
        </div>
      )}

      {/* Swipe dots (mobile) */}
      {allImages.length > 1 && (
        <div className="detail-dots">
          {allImages.map((_, i) => (
            <button
              key={i}
              className={`detail-dot${i === activeSlide ? " active" : ""}`}
              onClick={() => { setActiveSlide(i); setIsZoomed(false); }}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* ── Content Section ── */}
      <div className="detail-content">
        <div className="container">
          {/* Header */}
          <div className="detail-header">
            <div>
              <h1 className="detail-name">{product.name}</h1>
              <p className="detail-desc">{product.description}</p>
            </div>
            <button
              className={`btn ${added ? "btn-added" : "btn-primary"} add-btn`}
              onClick={handleAddToQuote}
            >
              {added ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Added!
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                  Add to Inquiry
                </>
              )}
            </button>
          </div>

          <div className="detail-body-grid">
            {/* Specifications */}
            {Object.keys(product.specifications).length > 0 && (
              <section className="spec-section">
                <h2 className="section-title">Specifications</h2>
                <div className="spec-table">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="spec-row">
                      <span className="spec-key">{key}</span>
                      <span className="spec-val">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <section className="feat-section">
                <h2 className="section-title">Key Features</h2>
                <ul className="feat-list">
                  {product.features.map((feat, i) => (
                    <li key={i} className="feat-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Bottom CTA */}
          <div className="detail-cta">
            <p className="cta-text">
              Interested in this product? Add it to your inquiry list and we'll get back to you with a custom quote.
            </p>
            <div className="cta-btns">
              <button
                className={`btn ${added ? "btn-added" : "btn-primary"} cta-btn`}
                onClick={handleAddToQuote}
              >
                {added ? "✓ Added to Quote" : "Add to Inquiry Quote"}
              </button>
              <button
                className="btn btn-secondary cta-btn"
                onClick={() => router.push("/contact")}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ── Page ── */
        .detail-page {
          min-height: 100vh;
          padding-bottom: 6rem;
        }

        /* ── Top Bar ── */
        .detail-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.25rem;
          background: var(--bg-card);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 4.5rem;
          z-index: 40;
          backdrop-filter: blur(8px);
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: none;
          border: 1px solid var(--border);
          color: var(--fg-main);
          padding: 0.45rem 0.9rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .back-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .detail-category-badge {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--primary);
          background: var(--primary-glow);
          padding: 0.25rem 0.7rem;
          border-radius: 9999px;
          border: 1px solid rgba(234, 88, 12, 0.2);
        }

        /* ── Slider ── */
        .detail-slider {
          position: relative;
          background: #f5f5f5;
          width: 100%;
          max-height: 560px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .detail-img-viewport {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          cursor: zoom-in;
          overflow: hidden;
          max-height: 560px;
        }

        .detail-img-viewport.zoomed {
          cursor: zoom-out;
          overflow: auto;
        }

        .detail-img {
          max-width: 100%;
          max-height: 500px;
          object-fit: contain;
          border-radius: 0.5rem;
          transition: transform 0.3s ease;
          display: block;
          margin: auto;
        }

        .detail-img-viewport.zoomed .detail-img {
          transform: scale(2.2);
          transform-origin: center center;
        }

        .detail-no-img {
          color: var(--fg-muted);
          font-size: 0.9rem;
          padding: 3rem;
        }

        .zoom-hint {
          position: absolute;
          bottom: 0.75rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.7rem;
          background: rgba(0,0,0,0.65);
          color: #fff;
          padding: 0.3rem 0.8rem;
          border-radius: 9999px;
          pointer-events: none;
          white-space: nowrap;
        }

        /* ── Arrow buttons ── */
        .slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background: rgba(11,15,25,0.6);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          font-size: 1.75rem;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.18s ease;
          padding: 0;
        }

        .slider-arrow:hover {
          background: var(--primary);
        }

        .prev-arrow { left: 1rem; }
        .next-arrow { right: 1rem; }

        /* ── Counter ── */
        .detail-counter {
          position: absolute;
          top: 0.75rem;
          right: 0.85rem;
          font-size: 0.72rem;
          font-weight: 700;
          background: rgba(0,0,0,0.5);
          color: #fff;
          padding: 0.2rem 0.55rem;
          border-radius: 9999px;
          pointer-events: none;
        }

        /* ── Tap zoom tip ── */
        .tap-zoom-tip {
          position: absolute;
          bottom: 0.6rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.65rem;
          color: rgba(255,255,255,0.8);
          background: rgba(0,0,0,0.45);
          padding: 0.2rem 0.7rem;
          border-radius: 9999px;
          pointer-events: none;
          white-space: nowrap;
        }

        /* ── Thumbnail strip ── */
        .thumb-strip {
          display: flex;
          gap: 0.6rem;
          padding: 0.85rem 1.25rem;
          overflow-x: auto;
          background: var(--bg-card);
          border-bottom: 1px solid var(--border);
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }

        .thumb-strip::-webkit-scrollbar { display: none; }

        .thumb-btn {
          flex-shrink: 0;
          width: 72px;
          height: 72px;
          border-radius: 0.5rem;
          overflow: hidden;
          border: 2px solid var(--border);
          padding: 0;
          background: #f5f5f5;
          cursor: pointer;
          transition: border-color 0.18s ease;
        }

        .thumb-btn.thumb-active {
          border-color: var(--primary);
        }

        .thumb-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          padding: 4px;
        }

        /* ── Dots (mobile) ── */
        .detail-dots {
          display: none;
          justify-content: center;
          gap: 6px;
          padding: 0.65rem 0;
          background: var(--bg-card);
        }

        .detail-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(0,0,0,0.2);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background 0.2s, width 0.2s;
          flex-shrink: 0;
        }

        .detail-dot.active {
          background: var(--primary);
          width: 18px;
          border-radius: 4px;
        }

        /* ── Content ── */
        .detail-content {
          padding-top: 2.5rem;
        }

        /* ── Header ── */
        .detail-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .detail-name {
          font-size: 2rem;
          font-weight: 800;
          color: var(--fg-main);
          line-height: 1.25;
          margin: 0 0 0.65rem;
        }

        .detail-desc {
          font-size: 0.93rem;
          color: var(--fg-muted);
          line-height: 1.65;
          max-width: 640px;
          margin: 0;
        }

        /* ── Add Button ── */
        .add-btn {
          flex-shrink: 0;
          padding: 0.65rem 1.4rem;
          font-size: 0.9rem;
          white-space: nowrap;
        }

        .btn-added {
          background: #22c55e;
          color: #fff;
          box-shadow: 0 4px 14px rgba(34,197,94,0.3);
        }

        /* ── Body Grid ── */
        .detail-body-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        /* ── Spec Section ── */
        .section-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--fg-main);
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--primary);
          display: inline-block;
        }

        .spec-table {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          overflow: hidden;
        }

        .spec-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          gap: 1rem;
          border-bottom: 1px solid var(--border);
        }

        .spec-row:last-child { border-bottom: none; }

        .spec-row:nth-child(even) {
          background: rgba(234, 88, 12, 0.025);
        }

        .spec-key {
          font-size: 0.85rem;
          color: var(--fg-muted);
          font-weight: 500;
          flex-shrink: 0;
        }

        .spec-val {
          font-size: 0.88rem;
          color: var(--fg-main);
          font-weight: 700;
          text-align: right;
        }

        /* ── Features ── */
        .feat-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .feat-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.9rem;
          color: var(--fg-muted);
          line-height: 1.5;
        }

        .feat-item svg {
          flex-shrink: 0;
          color: var(--primary);
          margin-top: 2px;
        }

        /* ── Bottom CTA ── */
        .detail-cta {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
        }

        .cta-text {
          color: var(--fg-muted);
          font-size: 0.92rem;
          margin-bottom: 1.25rem;
          line-height: 1.6;
        }

        .cta-btns {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-btn {
          min-width: 180px;
          padding: 0.75rem 1.5rem;
        }

        /* ─────────────────────────────────
           RESPONSIVE
        ───────────────────────────────── */

        @media (max-width: 900px) {
          .detail-body-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .detail-slider {
            max-height: 420px;
          }

          .detail-img-viewport {
            max-height: 420px;
            padding: 0.25rem;
          }

          .detail-img {
            max-height: 390px;
          }

          .slider-arrow {
            width: 2.25rem;
            height: 2.25rem;
            font-size: 1.35rem;
          }

          /* Show dots on mobile, hide thumb strip */
          .thumb-strip {
            display: none;
          }

          .detail-dots {
            display: flex;
          }

          .detail-name {
            font-size: 1.4rem;
          }

          .detail-desc {
            font-size: 0.85rem;
          }

          .detail-header {
            flex-direction: column;
            gap: 1rem;
          }

          .add-btn {
            width: 100%;
            justify-content: center;
          }

          .cta-btn {
            width: 100%;
            min-width: unset;
          }

          .tap-zoom-tip {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
