"use client";
import { useState, useEffect } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  brand: string;
  category: string;
}

export interface CartProduct {
  id: number;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  products: CartProduct[];
  total: number;
}

export const useDummyData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("https://dummyjson.com/products?limit=100").then((res) =>
        res.json()
      ),
      fetch("https://dummyjson.com/carts?limit=100").then((res) => res.json()),
    ])
      .then(([pRes, cRes]) => {
        setProducts(pRes.products);
        setCarts(cRes.carts);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return { products, carts, loading };
};
