export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  discountPercentage: number;
  thumbnail: string;
  brand: string;
  category: string;
  rating: number;
}

export type ProductInput = Omit<ProductInput, "id" | "rating">;
export type UpdateProduct = Partial<CreateProduct>;
