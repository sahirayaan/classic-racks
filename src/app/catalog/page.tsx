import React, { Suspense } from "react";
import CatalogClient from "../../components/CatalogClient";

export const metadata = {
  title: "Product Catalog | Classic Racks",
  description: "Browse our entire product catalog of supermarket shelves, industrial racks, gondolas, slotted angles, and retail checkouts.",
};

export default function Catalog() {
  return (
    <Suspense fallback={
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        flexDirection: "column",
        gap: "1rem",
        color: "var(--fg-muted)"
      }}>
        <div className="spinner" style={{
          width: "40px",
          height: "40px",
          border: "4px solid var(--border)",
          borderTopColor: "var(--primary)",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}></div>
        <p>Loading Product Catalog...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    }>
      <CatalogClient />
    </Suspense>
  );
}
