import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <img
              src="/logo.png"
              alt="Classic Racks"
              style={{ height: "80px", width: "auto", marginBottom: "1rem", objectFit: "contain" }}
            />
            <p>
              Premium manufacturer of highly durable, fine-finished display
              racks and supermarket fixtures. Serving businesses since 2007
              from New Delhi, India.
            </p>
            <div className="gst-badge" style={{ display: "inline-block" }}>
              <span className="badge">GST: 07ACDPH0124M1ZX</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h5>Navigation</h5>
            <ul className="footer-list">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/catalog">All Products</Link>
              </li>
              <li>
                <Link href="/about">About Company</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="footer-links">
            <h5>Categories</h5>
            <ul className="footer-list">
              <li>
                <Link href="/catalog?cat=supermarket-display-rack">Supermarket Racks</Link>
              </li>
              <li>
                <Link href="/catalog?cat=industrial-rack">Industrial Racks</Link>
              </li>
              <li>
                <Link href="/catalog?cat=slotted-angle-rack">Specialty Shelves</Link>
              </li>
              <li>
                <Link href="/catalog?cat=cash-desk-counter">Cash Counters</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-links">
            <h5>Get In Touch</h5>
            <ul className="footer-list" style={{ fontSize: "0.9rem" }}>
              <li style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span>📍</span>
                <span>
                  G/F, Plot No-16, Bindapur Village, Uttam Nagar, New Delhi -
                  110059, India
                </span>
              </li>
              <li style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span>📞</span>
                <a href="tel:+919871718151">+91 9871718151</a>
              </li>
              <li style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span>💬</span>
                <a href="https://wa.me/919971464447" target="_blank" rel="noopener noreferrer">+91 9971464447 (WhatsApp)</a>
              </li>
              <li style={{ display: "flex", gap: "0.5rem" }}>
                <span>✉️</span>
                <a href="mailto:info@displayrack.co.in">info@displayrack.co.in</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Classic Racks. All Rights Reserved.</p>
          <div className="footer-credits">
            <span>Verified Manufacturer from Delhi</span> |{" "}
            <span>IndiaMART Member</span>
          </div>
      </div>
    </div>
  </footer>
  );
}
