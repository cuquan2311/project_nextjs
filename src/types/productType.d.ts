export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  discountPercentage?: number;
  rating?: number;
  thumbnail?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductInput = InferType<typeof productSchema>;
export type UpdateProduct = Partial<ProductInput>;
