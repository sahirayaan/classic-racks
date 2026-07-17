"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface InquiryItem {
  id: string;
  name: string;
  categoryLabel: string;
  quantity: number;
}

interface InquiryContextType {
  inquiryItems: InquiryItem[];
  addItem: (id: string, name: string, categoryLabel: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("classic_racks_inquiry");
    if (saved) {
      try {
        setInquiryItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse inquiry storage", e);
      }
    }
  }, []);

  // Save cart to localStorage when changed
  const saveCart = (items: InquiryItem[]) => {
    setInquiryItems(items);
    localStorage.setItem("classic_racks_inquiry", JSON.stringify(items));
  };

  const addItem = (id: string, name: string, categoryLabel: string) => {
    const existing = inquiryItems.find((item) => item.id === id);
    if (existing) {
      saveCart(
        inquiryItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      saveCart([...inquiryItems, { id, name, categoryLabel, quantity: 1 }]);
    }
    // Open drawer on add
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    saveCart(inquiryItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    saveCart(
      inquiryItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    saveCart([]);
  };

  return (
    <InquiryContext.Provider
      value={{
        inquiryItems,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error("useInquiry must be used within an InquiryProvider");
  }
  return context;
}
