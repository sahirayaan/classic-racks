"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useInquiry } from "../context/InquiryContext";

export default function Navbar() {
  const pathname = usePathname();
  const { inquiryItems, setIsOpen } = useInquiry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Total count of items in inquiry cart
  const totalCount = inquiryItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/catalog", label: "Products" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      <header
        className="header"
        style={{
          boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.15)" : "none",
          borderBottom: isScrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
        }}
      >
        <div className="container header-container">
          <Link href="/" className="logo">
            <img
              src="/logo.png"
              alt="Classic Racks — We design a new way of your business"
              className="logo-img"
            />
          </Link>

          {/* Desktop & Mobile Navigation Wrapper */}
          <nav className={`nav-menu ${mobileMenuOpen ? "open" : ""}`}>
            <ul className="nav-links">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`nav-link ${
                      pathname === link.href ? "active" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-action">
            {/* Inquiry Cart Icon */}
            <button
              onClick={() => setIsOpen(true)}
              className="cart-btn"
              aria-label="Open Inquiry List"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
              {totalCount > 0 && <div className="cart-count">{totalCount}</div>}
            </button>

            {/* Mobile Hamburger Menu Icon */}
            <button
              className="cart-btn mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className={`mobile-toggle-icon ${mobileMenuOpen ? "open" : ""}`}></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
