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

  // Pick a main key specification to show on the card (like Load Capacity)
  const keySpecKey = Object.keys(product.specifications).find(
    (key) => key.toLowerCase().includes("capacity") || key.toLowerCase().includes("material")
  ) || Object.keys(product.specifications)[0];
  
  const keySpecVal = product.specifications[keySpecKey];

  return (
    <div className="product-card">
      <div className="card-image-container">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="card-img"
          />
        ) : (
          <div className="image-placeholder">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
              <line x1="15" y1="3" x2="15" y2="21" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="3" y1="15" x2="21" y2="15" />
            </svg>
            <span style={{ fontSize: "0.8rem", color: "var(--fg-muted)" }}>
              Classic Racks Steel Work
            </span>
          </div>
        )}
        <span className="card-badge">{product.categoryLabel}</span>
      </div>

      <div className="card-content">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-description">{product.description}</p>
        
        {keySpecKey && (
          <div className="card-spec">
            <span className="spec-label">{keySpecKey}:</span>
            <span className="spec-value">{keySpecVal}</span>
          </div>
        )}

        <div className="card-actions">
          <button onClick={onViewDetails} className="btn btn-secondary card-btn-view">
            Specs Details
          </button>
          <button
            onClick={() => addItem(product.id, product.name, product.categoryLabel)}
            className="btn btn-primary card-btn-add"
          >
            Add to Quote
          </button>
        </div>
      </div>

      <style jsx>{`
        .product-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          overflow: hidden;
          transition: var(--transition-smooth);
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .product-card:hover {
          transform: translateY(-5px);
          border-color: var(--border-hover);
          box-shadow: var(--shadow-md);
        }

        .card-image-container {
          height: 200px;
          position: relative;
          background-color: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 1rem;
          transition: var(--transition-smooth);
        }

        .product-card:hover .card-img {
          transform: scale(1.03);
        }

        .image-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          color: var(--primary);
          opacity: 0.85;
        }

        .card-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background-color: rgba(11, 15, 25, 0.85);
          backdrop-filter: blur(4px);
          color: var(--primary);
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-title {
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
          color: var(--fg-main);
          line-height: 1.3;
        }

        .card-description {
          font-size: 0.875rem;
          color: var(--fg-muted);
          margin-bottom: 1.25rem;
          line-height: 1.5;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-spec {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px dashed var(--border);
          padding: 0.5rem 0.75rem;
          border-radius: 0.35rem;
          font-size: 0.8rem;
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .spec-label {
          color: var(--fg-muted);
          font-weight: 500;
        }

        .spec-value {
          color: var(--fg-main);
          font-weight: 600;
        }

        .card-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: auto;
        }

        .card-btn-view {
          flex: 1;
          padding: 0.5rem;
          font-size: 0.85rem;
          border-radius: 0.375rem;
        }

        .card-btn-add {
          flex: 1.2;
          padding: 0.5rem;
          font-size: 0.85rem;
          border-radius: 0.375rem;
        }
      `}</style>
    </div>
  );
}
