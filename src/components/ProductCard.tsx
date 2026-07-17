"use client";

import React from "react";
import { useInquiry } from "../context/InquiryContext";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    categoryLabel: string;
    description: string;
    specifications: Record<string, any>;
    image: string;
  };
  onViewDetails: () => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addItem } = useInquiry();

  // Pick the most informative spec to display on card preview
  const specKeys = Object.keys(product.specifications);
  const materialKey = specKeys.find((k) => k.toLowerCase().includes("material"));
  const capacityKey = specKeys.find((k) => k.toLowerCase().includes("capacity"));
  const keySpecKey = materialKey || capacityKey || specKeys[0];
  const keySpecVal = keySpecKey ? String(product.specifications[keySpecKey] || "").trim() : "";

  return (
    <div className="product-card">
      {/* Image Section */}
      <div className="card-image-wrap">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="card-img"
          />
        ) : (
          <div className="image-placeholder">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span>No Image</span>
          </div>
        )}
        <span className="card-badge">{product.categoryLabel}</span>
      </div>

      {/* Content Section */}
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-desc">{product.description}</p>

        {keySpecKey && keySpecVal && (
          <div className="card-spec-row">
            <span className="spec-key">{keySpecKey}:</span>
            <span className="spec-val">{keySpecVal}</span>
          </div>
        )}

        <div className="card-actions">
          <button onClick={onViewDetails} className="btn btn-secondary card-btn">
            View Details
          </button>
          <button
            onClick={() => addItem(product.id, product.name, product.categoryLabel)}
            className="btn btn-primary card-btn"
          >
            Add to Quote
          </button>
        </div>
      </div>

      <style jsx>{`
        /* ── Card Shell ── */
        .product-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 0.85rem;
          overflow: hidden;
          transition: var(--transition-smooth);
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow: var(--shadow-sm);
        }

        .product-card:hover {
          border-color: var(--border-hover);
          box-shadow: var(--shadow-md);
          transform: translateY(-4px);
        }

        /* ── Image Wrapper ── */
        .card-image-wrap {
          width: 100%;
          height: 220px;
          position: relative;
          background-color: #f9f9f9;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        /* Force image to fill and contain within wrapper */
        .card-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 12px;
          transition: transform 0.3s ease;
        }

        .product-card:hover .card-img {
          transform: scale(1.04);
        }

        .image-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--fg-muted);
          font-size: 0.75rem;
          opacity: 0.6;
        }

        /* ── Badge ── */
        .card-badge {
          position: absolute;
          top: 0.6rem;
          left: 0.6rem;
          z-index: 2;
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background-color: rgba(11, 15, 25, 0.82);
          backdrop-filter: blur(4px);
          color: var(--primary);
          padding: 0.2rem 0.55rem;
          border-radius: 9999px;
          border: 1px solid rgba(234, 88, 12, 0.3);
          pointer-events: none;
        }

        /* ── Body ── */
        .card-body {
          padding: 1.1rem 1.25rem 1.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          gap: 0.6rem;
        }

        .card-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--fg-main);
          line-height: 1.3;
          margin: 0;
        }

        .card-desc {
          font-size: 0.82rem;
          color: var(--fg-muted);
          line-height: 1.55;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex-grow: 1;
        }

        /* ── Spec Row ── */
        .card-spec-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background-color: rgba(234, 88, 12, 0.05);
          border: 1px dashed rgba(234, 88, 12, 0.2);
          border-radius: 0.35rem;
          padding: 0.4rem 0.65rem;
          font-size: 0.78rem;
          flex-wrap: wrap;
        }

        .spec-key {
          color: var(--fg-muted);
          font-weight: 500;
          flex-shrink: 0;
        }

        .spec-val {
          color: var(--fg-main);
          font-weight: 700;
        }

        /* ── Actions ── */
        .card-actions {
          display: flex;
          gap: 0.6rem;
          margin-top: auto;
          padding-top: 0.4rem;
        }

        .card-btn {
          flex: 1;
          padding: 0.55rem 0.5rem;
          font-size: 0.8rem;
          border-radius: 0.4rem;
          text-align: center;
        }

        /* ── Mobile: Horizontal layout ── */
        @media (max-width: 768px) {
          .product-card {
            flex-direction: row;
            height: auto;
            min-height: 140px;
            align-items: stretch;
          }

          .card-image-wrap {
            width: 130px;
            height: auto;
            min-height: 140px;
            flex-shrink: 0;
            border-bottom: none;
            border-right: 1px solid var(--border);
            border-radius: 0;
          }

          .card-body {
            padding: 0.9rem 1rem;
            gap: 0.45rem;
          }

          .card-title {
            font-size: 0.95rem;
          }

          .card-desc {
            font-size: 0.78rem;
            -webkit-line-clamp: 2;
          }

          .card-actions {
            gap: 0.4rem;
          }

          .card-btn {
            padding: 0.45rem 0.35rem;
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
