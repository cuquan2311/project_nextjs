import { Product, ProductInput, UpdateProduct } from "@/types/productType";
import { create } from "zustand";
import api from "@/api/gobalAPI";
import axios, { AxiosError } from "axios";
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

  addProduct: async (data: ProductInput) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post<Product>(
        "http://localhost:4000/products",
        data
      );
      set((state) => ({
        products: [...state.products, res.data],
        isLoading: false,
      }));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        console.error(
          "Add product error:",
          axiosErr.response?.data || axiosErr.message
        );
        set({
          error: axiosErr.response?.data?.message || "Failed to add product.",
          isLoading: false,
        });
      } else {
        console.error("Add product error:", err);
        set({ error: "Unknown error occurred.", isLoading: false });
      }
    }
  },

  updateProduct: async (id: string, product: UpdateProduct) => {
    try {
      const {
        _id,
        id: productId,
        createdAt,
        updatedAt,
        __v,
        ...cleanProduct
      } = product;

      const { data } = await api.put<Product>(`/products/${id}`, cleanProduct);

      set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? { ...p, ...data } : p
        ),
      }));
    } catch (error) {
      console.error(" Failed to update product:", error);
      set({ error: "Failed to update product." });
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
