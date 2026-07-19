"use client";

import React, { useState } from "react";
import { useInquiry } from "../context/InquiryContext";

export default function InquiryDrawer() {
  const {
    inquiryItems,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    clearCart,
  } = useInquiry();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const totalItems = inquiryItems.reduce((acc, item) => acc + item.quantity, 0);

  // Generate URL encoded query message for WhatsApp
  const generateMessageText = () => {
    let text = `Hello Classic Racks, I would like to request a quote for the following products:\n\n`;
    inquiryItems.forEach((item, idx) => {
      text += `${idx + 1}. ${item.name} (${item.categoryLabel}) - Qty: ${item.quantity}\n`;
    });
    text += `\n--- Customer Contact Info ---\n`;
    text += `Name: ${name}\n`;
    text += `Phone: ${phone}\n`;
    text += `Email: ${email || "Not Provided"}\n`;
    if (message) {
      text += `Additional Note: ${message}\n`;
    }
    return encodeURIComponent(text);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please fill in your Name and Phone Number.");
      return;
    }
    const waUrl = `https://wa.me/919971464447?text=${generateMessageText()}`;
    window.open(waUrl, "_blank");
    setSubmitted(true);
    clearCart();
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
    }, 2000);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please fill in your Name and Phone Number.");
      return;
    }
    const mailtoUrl = `mailto:info@displayrack.co.in?subject=Inquiry Request - Classic Racks&body=${generateMessageText()}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
    clearCart();
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <div className="drawer-backdrop" onClick={() => setIsOpen(false)}>
      <div className="drawer-container" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h3>
            Inquiry List <span>({totalItems})</span>
          </h3>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            &times;
          </button>
        </div>

        {submitted ? (
          <div className="success-screen">
            <span className="success-icon">✓</span>
            <h4>Inquiry Initiated!</h4>
            <p>Thank you. Your request is being redirected to our sales team.</p>
          </div>
        ) : inquiryItems.length === 0 ? (
          <div className="empty-cart-screen">
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <p>Your inquiry list is empty.</p>
            <button onClick={() => setIsOpen(false)} className="btn btn-primary" style={{ marginTop: "1rem" }}>
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="drawer-body">
            {/* Cart Items List */}
            <div className="items-list-container">
              {inquiryItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-details">
                    <span className="item-cat">{item.categoryLabel}</span>
                    <h4 className="item-name">{item.name}</h4>
                  </div>
                  <div className="item-controls">
                    <div className="quantity-selectors">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="delete-btn" title="Remove">
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Inquiry Form */}
            <div className="inquiry-form-container">
              <h4>Request Custom Specifications</h4>
              <form>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Requirements Note</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    placeholder="Enter sizes, quantity, load capacity requirements"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <div className="form-actions">
                  <button onClick={handleWhatsAppSubmit} className="btn wa-submit-btn">
                    💬 WhatsApp Quote
                  </button>
                  <button onClick={handleEmailSubmit} className="btn email-submit-btn">
                    ✉️ Email Quote
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .drawer-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(7, 10, 18, 0.7);
          backdrop-filter: blur(4px);
          z-index: 1100;
          display: flex;
          justify-content: flex-end;
          animation: fadeIn 0.2s ease-out forwards;
        }

        .drawer-container {
          width: 100%;
          max-width: 480px;
          height: 100%;
          background-color: var(--bg-card);
          border-left: 1px solid var(--border);
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .drawer-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .drawer-header h3 span {
          color: var(--primary);
        }

        .close-btn {
          font-size: 1.75rem;
          background: none;
          border: none;
          color: var(--fg-muted);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .close-btn:hover {
          color: var(--primary);
        }

        .drawer-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          padding: 1.5rem;
          gap: 1.5rem;
        }

        .items-list-container {
          flex: 1;
          overflow-y: auto;
          max-height: 250px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-radius: 0.5rem;
        }

        .item-cat {
          font-size: 0.65rem;
          color: var(--primary);
          text-transform: uppercase;
          font-weight: 700;
        }

        .item-name {
          font-size: 0.85rem;
          color: var(--fg-main);
          margin-top: 0.15rem;
        }

        .item-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .quantity-selectors {
          display: flex;
          align-items: center;
          border: 1px solid var(--border);
          border-radius: 0.35rem;
          background-color: var(--bg-main);
          overflow: hidden;
        }

        .quantity-selectors button {
          border: none;
          background: none;
          padding: 0.25rem 0.5rem;
          font-size: 0.9rem;
          font-weight: bold;
          cursor: pointer;
          color: var(--fg-muted);
        }

        .quantity-selectors button:hover {
          color: var(--primary);
          background-color: var(--bg-card-hover);
        }

        .quantity-selectors span {
          padding: 0.25rem 0.5rem;
          font-size: 0.85rem;
          font-weight: 600;
          min-width: 25px;
          text-align: center;
        }

        .delete-btn {
          background: none;
          border: none;
          cursor: pointer;
          opacity: 0.7;
          transition: var(--transition-fast);
        }

        .delete-btn:hover {
          opacity: 1;
          transform: scale(1.1);
        }

        .inquiry-form-container h4 {
          font-size: 1rem;
          color: var(--fg-main);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .form-actions {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }

        .wa-submit-btn {
          background-color: #25D366;
          color: white;
          font-size: 0.85rem;
          padding: 0.7rem;
        }

        .wa-submit-btn:hover {
          background-color: #128C7E;
          transform: translateY(-2px);
        }

        .email-submit-btn {
          background-color: var(--bg-card-hover);
          color: var(--fg-main);
          border: 1px solid var(--border);
          font-size: 0.85rem;
          padding: 0.7rem;
        }

        .email-submit-btn:hover {
          background-color: var(--border-hover);
          transform: translateY(-2px);
        }

        .empty-cart-screen, .success-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          text-align: center;
          padding: 2rem;
          color: var(--fg-muted);
        }

        .success-icon {
          font-size: 3.5rem;
          color: #25D366;
          margin-bottom: 1.5rem;
        }

        .success-screen h4 {
          font-size: 1.5rem;
          color: var(--fg-main);
          margin-bottom: 0.5rem;
        }

        .empty-cart-screen p {
          margin-top: 1rem;
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
