import { ProductApi } from "@/api/productsAPI";
import { Product, ProductInput, UpdateProduct } from "@/types/productType";
import { create } from "zustand";
import { useNotificationStore } from "../NotificationStore";
interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

interface ProductActions {
  fetchProducts: () => Promise<void>;
  addProduct: (product: ProductInput) => Promise<void>;
  updateProduct: (id: number, data: UpdateProduct) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductState & ProductActions>((set) => ({
  products: [],
  isLoading: false,
  error: null,
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const productApi = await ProductApi.getAllProducts();
      set({ products: productApi, isLoading: false });
    } catch {
      set({ error: "Failed to fetch products.", isLoading: false });
    }
  },

  addProduct: async (product) => {
    set({ isLoading: true, error: null });
    try {
      const newProduct = await ProductApi.addProduct(product);
      set((state) => ({
        products: [...state.products, newProduct],
        isLoading: false,
      }));
      useNotificationStore
        .getState()
        .addNotification(
          "product",
          `Bạn có thông báo Sản phẩm`,
          `Sản phểm "${newProduct.title}" đã được thêm`
        );
    } catch {
      set({ error: "Failed to add product." });
    }
  },

  updateProduct: async (id, product) => {
    try {
      const editProduct = await ProductApi.updateProduct(id, product);
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? editProduct : p)),
        isLoading: false,
      }));
      useNotificationStore
        .getState()
        .addNotification(
          "product",
          `Bạn có thông báo Sản phẩm`,
          `Sản phẩm "${editProduct.title}" đã được chỉnh sửa`
        );
    } catch {
      set({ error: "Failed to update product." });
    }
  },

  deleteProduct: async (id) => {
    try {
      await ProductApi.deleteProduct(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        isLoading: false,
      }));
      useNotificationStore
        .getState()
        .addNotification(
          "product",
          `Bạn có thông báo Sản phẩm`,
          `Sản phẩm đã được xóa thành công`
        );
    } catch {
      set({ error: "Failed to delete product." });
    }
  },
}));
