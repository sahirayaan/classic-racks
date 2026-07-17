import { notFound } from "next/navigation";
import productsData from "../../../data/products.json";
import ProductDetailClient from "../../../components/ProductDetailClient";
import type { Metadata } from "next";

interface Props {
  params: { id: string };
}

// Generate static paths for all products
export async function generateStaticParams() {
  return productsData.map((p) => ({ id: p.id }));
}

// Dynamic SEO metadata per product
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = productsData.find((p) => p.id === params.id);
  if (!product) return { title: "Product Not Found | Classic Racks" };

  const specSummary = Object.entries(product.specifications)
    .slice(0, 3)
    .map(([k, v]) => `${k}: ${v}`)
    .join(" | ");

  return {
    title: `${product.name} | Classic Racks`,
    description: `${product.name} — ${specSummary}. ${product.description.slice(0, 120)}`,
    openGraph: {
      title: `${product.name} | Classic Racks`,
      description: product.description,
      images: product.image ? [product.image] : [],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = productsData.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <main style={{ paddingTop: "4.5rem" }}>
      <ProductDetailClient product={product} />
    </main>
  );
}
