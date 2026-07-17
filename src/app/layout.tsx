import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { InquiryProvider } from "../context/InquiryContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InquiryDrawer from "../components/InquiryDrawer";
import FloatingActions from "../components/FloatingActions";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Classic Racks | Supermarket Racks & Industrial Storage Manufacturer",
  description:
    "Classic Racks is a leading manufacturer of premium, highly durable display racks, supermarket racking systems, and industrial warehouse shelving from New Delhi, Delhi.",
  keywords: [
    "Supermarket Racks",
    "Display Racks",
    "Warehouse Racks",
    "Industrial Storage Racks",
    "Gondola Racks",
    "Vegetable Racks",
    "Slotted Angle Racks",
    "Cash Desk Counters",
    "Delhi Manufacturer",
  ],
  authors: [{ name: "Classic Racks" }],
  openGraph: {
    title: "Classic Racks | Supermarket Racks & Industrial Storage Manufacturer",
    description: "Premium manufacturer of display racks and supermarket fixtures since 2007 in New Delhi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <InquiryProvider>
          <Navbar />
          <main style={{ marginTop: "4.5rem", minHeight: "calc(100vh - 4.5rem)" }}>
            {children}
          </main>
          <InquiryDrawer />
          <FloatingActions />
          <Footer />
        </InquiryProvider>
      </body>
    </html>
  );
}

