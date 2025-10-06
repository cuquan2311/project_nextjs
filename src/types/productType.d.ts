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

// ✅ Input type khớp với schema (InferType)
export type ProductInput = InferType<typeof productSchema>;

// Input khi update product
export type UpdateProduct = Partial<ProductInput>;
