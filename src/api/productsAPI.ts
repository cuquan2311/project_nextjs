import { Product, ProductInput, UpdateProduct } from "@/types/productType";
import api from "./gobalAPI";

export const ProductApi = {
  //Lấy tất cả products
  getAllProducts: async (): Promise<Product[]> => {
    const res = await api.get("/products");
    return res.data;
  },

  getProductByID: async (id: string): Promise<Product> => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },

  addProduct: async (product: ProductInput): Promise<Product> => {
    const res = await api.post("/products", product);
    return res.data;
  },

  updateProduct: async (
    id: string,
    product: UpdateProduct
  ): Promise<Product> => {
    const res = await api.put(`/products/${id}`, product);
    return res.data;
  },

  deleteProduct: async (id: string): Promise<Product> => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },
};
