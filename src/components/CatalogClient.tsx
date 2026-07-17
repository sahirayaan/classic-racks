"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "./ProductCard";
import productsData from "../data/products.json";

// Build unique categories from data
const uniqueCategories = Array.from(new Set(productsData.map((p) => p.category))).map((catId) => {
  const p = productsData.find((p) => p.category === catId);
  return { id: catId, label: p ? p.categoryLabel : catId };
});

const categoriesList = [{ id: "all", label: "All" }, ...uniqueCategories];

export default function CatalogClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCat = searchParams.get("cat") || "all";
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const cat = searchParams.get("cat");
    setSelectedCategory(cat || "all");
  }, [searchParams]);

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    router.push(catId === "all" ? "/catalog" : `/catalog?cat=${catId}`);
  };

  const filteredProducts = productsData.filter((product) => {
    const matchesCat = selectedCategory === "all" || product.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      product.name.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      Object.values(product.specifications).some((v) =>
        String(v).toLowerCase().includes(q)
      );
    return matchesCat && matchesSearch;
  });

  return (
    <div className="catalog-page animate-fade">
      {/* ── Page Hero ── */}
      <div className="catalog-hero">
        <div className="container">
          <span className="badge">Classic Racks Showcase</span>
          <h1>Our Complete Product Catalog</h1>
          <p>
            Browse supermarket display fixtures, heavy-duty warehouse racking, and custom store
            checkout accessories. Tap any product to explore details.
          </p>
        </div>
      </div>

      {/* ── Mobile: Sticky Top Toolbar ── */}
      <div className="mobile-toolbar">
        <div className="mobile-search-row">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control mobile-search-input"
          />
        </div>
        <div className="mobile-chips-scroll">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`chip${selectedCategory === cat.id ? " chip-active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Desktop: Sidebar + Grid ── */}
      <div className="container catalog-layout">
        {/* Sidebar (desktop only) */}
        <aside className="catalog-sidebar desktop-only">
          <div className="sidebar-widget">
            <h4>Search</h4>
            <input
              type="text"
              placeholder="Name, material, specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="sidebar-widget">
            <h4>Categories</h4>
            <div className="sidebar-cats">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`sidebar-cat-btn${selectedCategory === cat.id ? " active" : ""}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Area */}
        <main className="catalog-main">
          <p className="results-count">
            Showing <strong>{filteredProducts.length}</strong> products
          </p>

          {filteredProducts.length === 0 ? (
            <div className="no-results">
              <h4>No products found</h4>
              <p>Try a different search term or category.</p>
              <button
                className="btn btn-primary"
                style={{ marginTop: "1rem" }}
                onClick={() => { setSearchQuery(""); handleCategorySelect("all"); }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        /* ── Page ── */
        .catalog-page {
          min-height: 100vh;
        }

        /* ── Hero ── */
        .catalog-hero {
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border);
          padding: 4rem 0 3rem;
          text-align: center;
        }

        .catalog-hero h1 {
          font-size: 2.4rem;
          margin: 0.75rem 0 0.65rem;
          color: var(--fg-main);
        }

        .catalog-hero p {
          max-width: 680px;
          margin: 0 auto;
          color: var(--fg-muted);
          line-height: 1.65;
          font-size: 0.95rem;
        }

        /* ── Mobile Toolbar (hidden on desktop) ── */
        .mobile-toolbar {
          display: none;
          position: sticky;
          top: 4.5rem;
          z-index: 50;
          background: var(--bg-main);
          border-bottom: 1px solid var(--border);
          padding: 0.65rem 0.85rem 0;
          backdrop-filter: blur(8px);
          gap: 0;
        }

        .mobile-search-row {
          margin-bottom: 0.5rem;
        }

        .mobile-search-input {
          width: 100%;
          font-size: 0.9rem;
        }

        .mobile-chips-scroll {
          display: flex;
          gap: 0.45rem;
          overflow-x: auto;
          padding-bottom: 0.65rem;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .mobile-chips-scroll::-webkit-scrollbar {
          display: none;
        }

        .chip {
          flex-shrink: 0;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 600;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--fg-muted);
          cursor: pointer;
          transition: all 0.18s ease;
          white-space: nowrap;
        }

        .chip:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .chip.chip-active {
          background: var(--primary);
          border-color: var(--primary);
          color: #000;
        }

        /* ── Layout ── */
        .catalog-layout {
          display: grid;
          grid-template-columns: 270px 1fr;
          gap: 2.5rem;
          padding-top: 3rem;
          padding-bottom: 6rem;
          align-items: start;
        }

        /* ── Desktop Sidebar ── */
        .catalog-sidebar {
          position: sticky;
          top: 7rem;
        }

        .sidebar-widget {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          padding: 1.25rem;
          margin-bottom: 1.25rem;
        }

        .sidebar-widget h4 {
          font-size: 0.88rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--fg-main);
          margin-bottom: 0.85rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.5rem;
        }

        .sidebar-cats {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .sidebar-cat-btn {
          text-align: left;
          background: none;
          border: 1px solid transparent;
          color: var(--fg-muted);
          padding: 0.6rem 0.85rem;
          font-weight: 500;
          font-size: 0.88rem;
          border-radius: 0.45rem;
          cursor: pointer;
          transition: all 0.15s ease;
          width: 100%;
        }

        .sidebar-cat-btn:hover {
          color: var(--fg-main);
          background: var(--bg-card-hover);
        }

        .sidebar-cat-btn.active {
          color: var(--primary);
          background: var(--primary-glow);
          border-color: rgba(234, 88, 12, 0.2);
          font-weight: 700;
        }

        /* ── Products Main ── */
        .catalog-main {
          min-width: 0;
        }

        .results-count {
          font-size: 0.85rem;
          color: var(--fg-muted);
          margin-bottom: 1.25rem;
        }

        .results-count strong {
          color: var(--primary);
        }

        /* ── Products Grid ── */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        /* ── No Results ── */
        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 0.85rem;
        }

        .no-results h4 {
          font-size: 1.2rem;
          color: var(--fg-main);
          margin-bottom: 0.5rem;
        }

        /* ── Desktop-only elements ── */
        .desktop-only {
          display: block;
        }

        /* ────────────────────────────────────────
           RESPONSIVE BREAKPOINTS
        ──────────────────────────────────────── */

        /* 3-col → 2-col at 1100px */
        @media (max-width: 1100px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Switch to mobile layout at 900px */
        @media (max-width: 900px) {
          .catalog-layout {
            grid-template-columns: 1fr;
            padding-top: 1rem;
            gap: 1.25rem;
          }

          .desktop-only {
            display: none;
          }

          .mobile-toolbar {
            display: flex;
            flex-direction: column;
          }

          .products-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .catalog-hero {
            padding: 2.5rem 0 2rem;
          }

          .catalog-hero h1 {
            font-size: 1.7rem;
          }

          .catalog-hero p {
            font-size: 0.875rem;
          }
        }

        /* Fine-tune small phones */
        @media (max-width: 480px) {
          .catalog-hero {
            padding: 2rem 0 1.5rem;
          }

          .catalog-hero h1 {
            font-size: 1.45rem;
          }
        }
      `}</style>
    </div>
  );
}
