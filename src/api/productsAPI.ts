import { Product } from "@/types/productType";
import { api } from "./gobalAPI";

export const ProductApi = {
  getAllProducts: async (): Promise<Product[]> => {
    const res = await api.get("/products?limit=10");
    return res.data.products;
  },
  getProductsByID: async (id: number): Promise<Product | null> => {
    const res = await api.get(`products/${id}`);
    return res.data;
  },
  addProduct: async (product: Product): Promise<Product> => {
    const res = await api.post("/products/add", product);
    return res.data;
  },
  updateProduct: async (id: number, product: Product): Promise<Product> => {
    const { id: _, ...updateProduct } = product;
    const res = await api.put(`/products/${id}`, updateProduct);
    return res.data;
  },
  deleteProduct: async (id: number): Promise<Product> => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },
};
