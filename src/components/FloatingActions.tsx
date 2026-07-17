"use client";

import React from "react";

export default function FloatingActions() {
  return (
    <div className="floating-actions">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/918047823850?text=Hi%20Classic%20Racks%2C%20I%20am%20interested%20in%20your%20display%20racks."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp-btn"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Call Button */}
      <a
        href="tel:+918047823850"
        className="floating-btn call-btn"
        aria-label="Call Us"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
          <path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.72 11.72 0 003.79.6 1 1 0 011 1v3.5a1 1 0 01-1 1A16 16 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.6 3.79 1 1 0 01-.27 1.11l-2.22 2.22z" />
        </svg>
      </a>

      <style jsx>{`
        .floating-actions {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 999;
        }

        .floating-btn {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease;
          cursor: pointer;
          text-decoration: none;
        }

        .floating-btn:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .floating-btn:active {
          transform: translateY(-2px) scale(0.98);
        }

        .whatsapp-btn {
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
        }

        .call-btn {
          background: linear-gradient(135deg, #D64F7A 0%, #E04B2C 100%);
        }

        @media (max-width: 768px) {
          .floating-actions {
            bottom: 1.5rem;
            right: 1.5rem;
            gap: 0.75rem;
          }

          .floating-btn {
            width: 3.0rem;
            height: 3.0rem;
          }
        }
      `}</style>
    </div>
  );
}
