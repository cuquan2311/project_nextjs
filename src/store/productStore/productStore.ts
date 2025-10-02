import { ProductApi } from "@/api/productsAPI";
import { Product, ProductInput, UpdateProduct } from "@/types/productType";
import { create } from "zustand";
import { useNotificationStore } from "../NotificationStore";
import api from "@/api/gobalAPI";
interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

interface ProductActions {
  fetchProducts: () => Promise<void>;
  addProduct: (product: ProductInput) => Promise<void>;
  updateProduct: (id: string, data: UpdateProduct) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState & ProductActions>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get<Product[]>("/products");
      set({ products: data, isLoading: false });
    } catch {
      set({ error: "Failed to fetch products", isLoading: false });
    }
  },

  addProduct: async (product: ProductInput) => {
    try {
      const { data } = await api.post<Product>("/products", product);
      set((state) => ({ products: [...state.products, data] }));
    } catch (error) {
      set({ error: "Failed to add product." });
      console.error(error);
    }
  },

  updateProduct: async (id: string, product: UpdateProduct) => {
    try {
      const { data } = await api.put<Product>(`/products/${id}`, product);
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? data : p)),
      }));
    } catch (error) {
      set({ error: "Failed to update product." });
      console.error(error);
    }
  },

  deleteProduct: async (id) => {
    try {
      await api.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
    } catch {
      set({ error: "Failed to delete user." });
    }
  },
}));
