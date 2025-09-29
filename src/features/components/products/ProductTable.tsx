"use client"
import { Box, Paper, Grid, CircularProgress, Alert, Stack, Button } from "@mui/material";
import { Product } from "@/types/productType";
import { useTranslations } from "next-intl";
import { useProductTable } from "./productTable/hooks/useProductTable";
import ProductToolbar from "./productTable/components/ProductToolbar";
import ProductDataGrid from "./productTable/components/ProductDataGrid";
import ProductModal from "./ProductModal";
import ProductDetailPanel from "./ProductDetailPanel";
import { AnimatePresence, motion } from "framer-motion";

export default function ProductTable({ initialProducts }: { initialProducts: Product[] }) {
  const t = useTranslations("productAdmin");

  const {
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
  } = useProductTable(initialProducts);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        <Stack direction="row" spacing={2} alignItems="center">
          <span>{error}</span>
          <Button
            variant="outlined"
            size="small"
            onClick={() => window.location.reload()}
          >
            Thử lại
          </Button>
        </Stack>
      </Alert>
    );
  }

  return (
    <Box sx={{ width: "100%", p: { xs: 2, md: 4 } }}>
      <Grid container spacing={2}>
        <Grid size={{
          xs: 12, md: detailProduct ? 8 : 12
        }}>
          <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <ProductToolbar
              title={t("title")}
              searchText={searchText}
              onSearchChange={setSearchText}
              onAdd={() => setOpenModal(true)}
            />

            <ProductDataGrid
              rows={filteredRows}
              detailProduct={detailProduct}
              onEdit={(p) => {
                setEditProduct(p);
                setOpenModal(true);
              }}
              onView={(p) => {
                setDetailProduct(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onDelete={handleDeleteProduct}
              columnsLabels={{
                id: t("ID"),
                image: t("image"),
                name: t("name"),
                price: t("price"),
                stock: t("stock"),
                brand: t("brand"),
                desc: t("desc"),
                action: t("action"),
              }}
            />
          </Paper>
        </Grid>

        {/* Panel chi tiết */}
        <AnimatePresence>
          {detailProduct && (
            <Grid size={{
              xs: 12, md: 4
            }}>
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
                  <ProductDetailPanel
                    product={detailProduct}
                    onEdit={(p) => {
                      setEditProduct(p);
                      setOpenModal(true);
                    }}
                    onClose={() => setDetailProduct(null)}
                  />
                </Paper>
              </motion.div>
            </Grid>
          )}
        </AnimatePresence>
      </Grid>

      {/* Modal thêm/sửa */}
      <ProductModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditProduct(null);
        }}
        editProduct={editProduct}
      />
    </Box>
  );
}
