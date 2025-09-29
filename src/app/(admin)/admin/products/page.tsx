import { ProductApi } from "@/api/productsAPI";
import ProductTable from "@/features/components/products/ProductTable";

export default async function ProductPage() {
  const products = await ProductApi.getAllProducts();
  console.log("🚀 ~ ProductPage ~ products:", products)
  return <ProductTable initialProducts={products} />;
}
