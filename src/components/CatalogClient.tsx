"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import productsData from "../data/products.json";

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

// Dynamically build categories list from products database
const uniqueCategories = Array.from(
  new Set(productsData.map((p) => p.category))
).map((catId) => {
  const p = productsData.find((p) => p.category === catId);
  return {
    id: catId,
    label: p ? p.categoryLabel : catId,
  };
});

const categoriesList = [
  { id: "all", label: "All Products" },
  ...uniqueCategories,
];

export default function CatalogClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialCat = searchParams.get("cat") || "all";
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Sync category state when URL changes
  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory("all");
    }
  }, [searchParams]);

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === "all") {
      router.push("/catalog");
    } else {
      router.push(`/catalog?cat=${catId}`);
    }
  };

  // Filter products based on search and category
  const filteredProducts = productsData.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Object.entries(product.specifications).some(([key, val]) =>
        val.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="catalog-container animate-fade">
      {/* Category Header */}
      <div className="catalog-hero">
        <div className="container">
          <span className="badge">Classic Racks Showcase</span>
          <h2>Our Complete Product Catalog</h2>
          <p>
            Browse our wide range of supermarket display fixtures, heavy-duty warehouse racking,
            and customized store checkout accessories. Select products to request a custom quote.
          </p>
        </div>
      </div>

      <div className="container catalog-body-layout">
        {/* Sidebar Filter / Search Bar */}
        <aside className="catalog-sidebar">
          <div className="sidebar-widget">
            <h4>Search Catalog</h4>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search specs, material, name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className="sidebar-widget">
            <h4>Categories</h4>
            <div className="category-buttons">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`category-filter-btn ${
                    selectedCategory === cat.id ? "active" : ""
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="catalog-products-main">
          <div className="catalog-results-header">
            <p>
              Showing <span>{filteredProducts.length}</span> products
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-results">
              <h4>No products match your search.</h4>
              <p>Try adjusting your filters or search keywords.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  handleCategorySelect("all");
                }}
                className="btn btn-primary"
                style={{ marginTop: "1rem" }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={() => setActiveProduct(product)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Product Specification Modal */}
      {activeProduct && (
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}

      <style jsx>{`
        .catalog-hero {
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border);
          padding: 4rem 0;
          text-align: center;
          margin-bottom: 3rem;
        }

        .catalog-hero h2 {
          font-size: 2.5rem;
          margin: 0.75rem 0;
          color: var(--fg-main);
        }

        .catalog-hero p {
          max-width: 700px;
          margin: 0 auto;
          color: var(--fg-muted);
          line-height: 1.6;
        }

        .catalog-body-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 3rem;
          padding-bottom: 6rem;
        }

        @media (max-width: 900px) {
          .catalog-body-layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .category-buttons {
            flex-direction: row !important;
            overflow-x: auto;
            padding-bottom: 0.5rem;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            gap: 0.5rem;
          }
          .category-filter-btn {
            text-align: center !important;
            flex-shrink: 0;
            padding: 0.5rem 1rem !important;
            font-size: 0.85rem;
          }
        }

        .sidebar-widget {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .sidebar-widget h4 {
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--fg-main);
          margin-bottom: 1rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.5rem;
        }

        .category-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .category-filter-btn {
          text-align: left;
          background: none;
          border: 1px solid transparent;
          color: var(--fg-muted);
          padding: 0.75rem 1rem;
          font-weight: 500;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .category-filter-btn:hover {
          color: var(--fg-main);
          background-color: var(--bg-card-hover);
        }

        .category-filter-btn.active {
          color: var(--primary);
          background-color: var(--primary-glow);
          border-color: rgba(245, 158, 11, 0.2);
          font-weight: 600;
        }

        .catalog-results-header {
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          color: var(--fg-muted);
        }

        .catalog-results-header span {
          color: var(--primary);
          font-weight: 700;
        }

        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 0.75rem;
        }

        .no-results h4 {
          font-size: 1.25rem;
          color: var(--fg-main);
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}
