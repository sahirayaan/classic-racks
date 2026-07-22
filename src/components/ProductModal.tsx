"use client";

import React, { useState, useEffect } from "react";
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

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem } = useInquiry();

  const [activeSlide, setActiveSlide] = useState(0);

  // When product changes, reset active slide to 0
  useEffect(() => {
    setActiveSlide(0);
  }, [product]);

  if (!product) return null;

  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        <div className="modal-body-grid">
          {/* Left Column: Image Slideshow & Action */}
          <div className="modal-image-sec">
            <div className="modal-img-slider-container">
              {productImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveSlide((prev) => (prev - 1 + productImages.length) % productImages.length)}
                    className="slider-nav-btn prev"
                    aria-label="Previous image"
                  >
                    &larr;
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSlide((prev) => (prev + 1) % productImages.length)}
                    className="slider-nav-btn next"
                    aria-label="Next image"
                  >
                    &rarr;
                  </button>
                  <div className="slider-counter">
                    {activeSlide + 1} / {productImages.length}
                  </div>
                </>
              )}

              <div className="modal-img-viewport">
                <img
                  src={productImages[activeSlide]}
                  alt={`${product.name} - View ${activeSlide + 1}`}
                  className="modal-slider-img animate-fade"
                  key={activeSlide}
                />
              </div>

              {productImages.length > 1 && (
                <div className="slider-dots">
                  {productImages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveSlide(idx)}
                      className={`slider-dot ${idx === activeSlide ? "active" : ""}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => {
                addItem(product.id, product.name, product.categoryLabel);
                onClose();
              }}
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "1.5rem" }}
            >
              Add to Inquiry Quote
            </button>
          </div>

          {/* Right Column: Title, Specs Table, and Features */}
          <div className="modal-details-sec">
            <span className="badge">{product.categoryLabel}</span>
            <h2 className="modal-title">{product.name}</h2>
            <p className="modal-desc">{product.description}</p>

            {/* Specifications Section */}
            <h3 className="section-title">Technical Specifications</h3>
            <table className="specs-table">
              <tbody>
                {Object.entries(product.specifications).map(([key, val]) => (
                  <tr key={key}>
                    <td className="spec-name">{key}</td>
                    <td className="spec-value">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Key Features Section */}
            {product.features && product.features.length > 0 && (
              <>
                <h3 className="section-title" style={{ marginTop: "1.5rem" }}>
                  Product Features
                </h3>
                <ul className="features-list">
                  {product.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="check-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(7, 10, 18, 0.85);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.25s ease-out forwards;
        }

        .modal-content {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 1rem;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: var(--shadow-lg);
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media (max-width: 768px) {
          .modal-backdrop {
            padding: 0;
            align-items: flex-end;
          }
          .modal-content {
            border-radius: 1.25rem 1.25rem 0 0;
            max-height: 93vh;
            width: 100%;
          }
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1.25rem;
          font-size: 2rem;
          background: none;
          border: none;
          color: var(--fg-muted);
          cursor: pointer;
          transition: var(--transition-fast);
          z-index: 10;
        }

        .modal-close:hover {
          color: var(--primary);
        }

        .modal-body-grid {
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          padding: 2.5rem;
          gap: 2.5rem;
        }

        @media (max-width: 768px) {
          .modal-body-grid {
            grid-template-columns: 1fr;
            padding: 1.75rem;
            gap: 1.75rem;
          }
          .modal-img-viewport {
            padding: 0.25rem;
          }
        }

        .modal-image-sec {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .modal-img-slider-container {
          width: 100%;
          aspect-ratio: 4/3;
          background-color: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-img-viewport {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .modal-slider-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 0.5rem;
        }

        .slider-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(11, 15, 25, 0.65);
          backdrop-filter: blur(4px);
          border: 1px solid var(--border);
          color: var(--fg-main);
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: var(--transition-fast);
          font-weight: bold;
          padding: 0;
          line-height: 1;
        }

        .slider-nav-btn:hover {
          background-color: var(--primary);
          border-color: var(--primary);
          color: #FFFFFF;
        }

        .slider-nav-btn.prev {
          left: 0.75rem;
        }

        .slider-nav-btn.next {
          right: 0.75rem;
        }

        .slider-counter {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          background: rgba(11, 15, 25, 0.85);
          backdrop-filter: blur(4px);
          color: var(--fg-muted);
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          border: 1px solid var(--border);
          z-index: 10;
        }

        .slider-dots {
          position: absolute;
          bottom: 0.75rem;
          display: flex;
          gap: 0.35rem;
          z-index: 10;
        }

        .slider-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.35);
          border: none;
          cursor: pointer;
          transition: var(--transition-fast);
          padding: 0;
        }

        .slider-dot.active {
          background: var(--primary);
          transform: scale(1.2);
          box-shadow: 0 0 6px var(--primary);
        }

        .modal-details-sec {
          display: flex;
          flex-direction: column;
        }

        .modal-title {
          font-size: 1.75rem;
          margin: 0.75rem 0;
          color: var(--fg-main);
        }

        .modal-desc {
          font-size: 0.95rem;
          color: var(--fg-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .section-title {
          font-size: 1.1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: var(--fg-main);
          margin-bottom: 0.75rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.35rem;
        }

        .specs-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }

        .specs-table td {
          padding: 0.65rem 0;
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
        }

        .spec-name {
          color: var(--fg-muted);
          font-weight: 500;
          width: 40%;
        }

        .spec-value {
          color: var(--fg-main);
          font-weight: 600;
        }

        .features-list {
          list-style: none;
          font-size: 0.9rem;
        }

        .features-list li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          color: var(--fg-muted);
        }

        .check-icon {
          color: var(--primary);
          font-weight: bold;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
