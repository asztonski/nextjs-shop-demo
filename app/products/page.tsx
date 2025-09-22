import React from "react";
import { headers } from "next/headers";
import type { Product } from "@/types/Product";

// Refresh the page every 60 seconds to show updated product data
export const revalidate = 60;

async function getProducts(): Promise<Product[]> {
  const header = await headers();
  const host = header.get("host");
  const protocol = header.get("x-forwarded-proto") ?? "http";

  const res = await fetch(`${protocol}://${host}/api/products`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

function formatPrice(minor: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(minor / 100);
}

export const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <section className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <li key={p.id} className="rounded-xl border p-4">
            <div className="font-medium">{p.name}</div>
            <div className="text-sm opacity-80">{formatPrice(p.price)}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};
