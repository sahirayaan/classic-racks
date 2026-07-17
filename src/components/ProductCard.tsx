"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const allImages = (product.images && product.images.length > 0)
    ? product.images
    : [product.image].filter(Boolean);

  const [activeSlide, setActiveSlide] = useState(0);

  // ── Touch Swipe Tracking ──
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const swipeDetected = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 1) return; // ignore pinch
    touchStartX.current = e.touches[0].clientX;
    swipeDetected.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 1) return;
    touchEndX.current = e.touches[0].clientX;
    const delta = Math.abs(touchEndX.current - touchStartX.current);
    if (delta > 8) swipeDetected.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!swipeDetected.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        setActiveSlide((p) => (p + 1) % allImages.length);
      } else {
        setActiveSlide((p) => (p - 1 + allImages.length) % allImages.length);
      }
    }
  };

  // Key spec to show briefly on card
  const specKeys = Object.keys(product.specifications);
  const materialKey = specKeys.find((k) => k.toLowerCase() === "material");
  const capKey = specKeys.find((k) => k.toLowerCase().includes("capacity"));
  const keySpecKey = materialKey || capKey || specKeys[0];
  const keySpecVal = keySpecKey ? String(product.specifications[keySpecKey] || "").trim() : "";

  return (
    <div className="pcard">
      {/* ── Swipeable Image Area ── */}
      <div
        className="pcard-img-wrap"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Link
          href={`/catalog/${product.id}`}
          className="pcard-img-link"
          onClick={(e) => {
            // prevent navigation if user was swiping
            if (swipeDetected.current) e.preventDefault();
          }}
        >
          {allImages.length > 0 ? (
            <img
              src={allImages[activeSlide]}
              alt={`${product.name} - image ${activeSlide + 1}`}
              className="pcard-img"
            />
          ) : (
            <div className="pcard-no-img">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span>No Image</span>
            </div>
          )}
        </Link>

        {/* Category Badge */}
        <span className="pcard-badge">{product.categoryLabel}</span>

        {/* Slide dots */}
        {allImages.length > 1 && (
          <div className="pcard-dots">
            {allImages.map((_, i) => (
              <button
                key={i}
                className={`pdot${i === activeSlide ? " active" : ""}`}
                onClick={(e) => { e.stopPropagation(); setActiveSlide(i); }}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image counter */}
        {allImages.length > 1 && (
          <span className="pcard-counter">{activeSlide + 1}/{allImages.length}</span>
        )}
      </div>

      {/* ── Card Body - entire area is a link ── */}
      <Link href={`/catalog/${product.id}`} className="pcard-body-link">
        <div className="pcard-body">
          <h3 className="pcard-name">{product.name}</h3>
          {keySpecKey && keySpecVal && (
            <p className="pcard-meta">
              <span className="meta-key">{keySpecKey}:</span>
              <span className="meta-val">{keySpecVal}</span>
            </p>
          )}
          <div className="pcard-tap-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
            <span>View Details</span>
          </div>
        </div>
      </Link>

      <style jsx>{`
        /* ── Card Wrapper ── */
        .pcard {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 1rem;
          overflow: hidden;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          display: flex;
          flex-direction: column;
          width: 100%;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .pcard:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-3px);
        }

        .pcard:active {
          transform: scale(0.99);
        }

        /* ── Image Wrapper ── */
        .pcard-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          background: #f4f4f4;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
        }

        .pcard-img-link {
          display: block;
          width: 100%;
          height: 100%;
          text-decoration: none;
        }

        .pcard-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 1rem;
          transition: transform 0.35s ease;
          display: block;
        }

        .pcard:hover .pcard-img {
          transform: scale(1.04);
        }

        .pcard-no-img {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 0.5rem;
          color: var(--fg-muted);
          font-size: 0.75rem;
          opacity: 0.5;
        }

        /* ── Badge ── */
        .pcard-badge {
          position: absolute;
          top: 0.6rem;
          left: 0.6rem;
          z-index: 2;
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          background: rgba(11, 15, 25, 0.78);
          backdrop-filter: blur(6px);
          color: var(--primary);
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          border: 1px solid rgba(234, 88, 12, 0.35);
          pointer-events: none;
        }

        /* ── Image counter ── */
        .pcard-counter {
          position: absolute;
          bottom: 0.55rem;
          right: 0.65rem;
          z-index: 2;
          font-size: 0.65rem;
          font-weight: 600;
          background: rgba(0,0,0,0.55);
          color: #fff;
          padding: 0.15rem 0.45rem;
          border-radius: 9999px;
          pointer-events: none;
        }

        /* ── Slide Dots ── */
        .pcard-dots {
          position: absolute;
          bottom: 0.55rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          gap: 5px;
          align-items: center;
          pointer-events: auto;
        }

        .pdot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.45);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background 0.2s, width 0.2s;
          flex-shrink: 0;
        }

        .pdot.active {
          background: var(--primary);
          width: 16px;
          border-radius: 3px;
        }

        /* ── Card Body ── */
        .pcard-body-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .pcard-body {
          padding: 0.85rem 1rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .pcard-name {
          font-size: 0.97rem;
          font-weight: 700;
          color: var(--fg-main);
          margin: 0;
          line-height: 1.35;
        }

        .pcard-meta {
          font-size: 0.78rem;
          color: var(--fg-muted);
          margin: 0;
          display: flex;
          gap: 0.3rem;
          flex-wrap: wrap;
        }

        .meta-key {
          font-weight: 500;
        }

        .meta-val {
          color: var(--fg-main);
          font-weight: 600;
        }

        .pcard-tap-hint {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--primary);
          margin-top: 0.2rem;
          opacity: 0.8;
        }

        /* ── Mobile overrides ── */
        @media (max-width: 768px) {
          .pcard {
            border-radius: 0.85rem;
          }

          .pcard-img-wrap {
            aspect-ratio: 3/2;
          }

          .pcard-img {
            padding: 0.6rem;
          }

          .pcard-body {
            padding: 0.7rem 0.85rem 0.85rem;
          }

          .pcard-name {
            font-size: 0.92rem;
          }
        }
      `}</style>
    </div>
  );
}
