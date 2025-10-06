import { useEffect, useState } from "react";
import { Product } from "@/types/productType";
import { useProductStore } from "@/store/productStore/productStore";
import toast from "react-hot-toast";
import { confirmDelete } from "@/components/utils/confirmDelete";
import { useTranslations } from "next-intl";

export function useProductTable(initialProducts: Product[]) {
  const { products, deleteProduct, isLoading, error } = useProductStore();

  const [openModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [searchText, setSearchText] = useState("");
  const t = useTranslations("confirmModal");
  useEffect(() => {
    if (products.length === 0 && initialProducts.length > 0) {
      useProductStore.setState({ products: initialProducts });
    }
  }, [initialProducts, products.length]);

  const handleDeleteProduct = async (id: string) => {
    const confirmed = await confirmDelete(
      t("title"),
      t("message"),
      t("actions.confirm"),
      t("actions.cancel")
    );
    if (confirmed) {
      deleteProduct(id);
      toast.success(t("success"));
    }
  };

  const filteredRows = products
    .filter((p) => {
      const query = searchText.toLowerCase();
      return (
        p.title.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    })
    .map((p) => ({ ...p, id: p.id }));

  return {
    isLoading,
    error,
    openModal,
    setOpenModal,
    editProduct,
    setEditProduct,
    detailProduct,
    setDetailProduct,
    searchText,
    setSearchText,
    handleDeleteProduct,
    filteredRows,
  };
}
