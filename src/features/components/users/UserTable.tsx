"use client";

import { Box, Grid, Paper } from "@mui/material";
import { User } from "@/types/userType";
import { useTranslations } from "next-intl";
import { useUserTable } from "./hooks/useUserTable";
import UserToolbar from "./components/UserToolbar";
import UserDataGrid from "./components/UserDataGrid";
import UserModal from "./UserModal";
import UserDetailModel from "./UserDetailModel";
import { AnimatePresence, motion } from "framer-motion";
import UserDetailPanel from "./UserDetailPanel";

export default function UserTable({ initialUsers }: { initialUsers: User[] }) {
  const t = useTranslations("userTable");

  const {
    openModal,
    setOpenModal,
    editUser,
    setEditUser,
    detailUser,
    setDetailUser,
    searchText,
    setSearchText,
    handleDeleteUser,
    filteredRows,
  } = useUserTable(initialUsers);

  return (
    <Box sx={{ width: "100%", p: { xs: 2, md: 4 } }}>
      <Grid container spacing={2}>
        <Grid size={{
          xs: 12,
          md: detailUser ? 8 : 12
        }}>
          <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
            <UserToolbar
              title={t("title")}
              searchText={searchText}
              onSearchChange={setSearchText}
              onAdd={() => setOpenModal(true)}
            />

            <UserDataGrid
            
              rows={filteredRows}
              detailUser={detailUser}
              onEdit={(u) => {
                setEditUser(u);
                setOpenModal(true)
              }}
              onView={(u) => {
                setDetailUser(u);
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              onDelete={handleDeleteUser}
              columnsLabels={{
                image: t("columns.avatar"),
                firstName: t("columns.firstName"),
                lastName: t("columns.lastName"),
                email: t("columns.email"),
                phone: t("columns.phone"),
                gender: t("columns.gender"),
                action: t("columns.actions"),
              }}
            />
          </Paper>
        </Grid>

        {/* {Panel chi tiết} */}
        <AnimatePresence>
          {detailUser && (
            <Grid size={{
              xs: 12,
              md: 4
            }}>
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
                  <UserDetailPanel
                    user={detailUser}
                    onEdit={(u) => {
                      setEditUser(u);
                      setOpenModal(true);
                    }}
                    onClose={() => setDetailUser(null)}
                  />
                </Paper>
              </motion.div>
            </Grid>
          )}
        </AnimatePresence>
      </Grid>
      {/* Modal thêm/sửa */}
      <UserModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditUser(null);
        }}
        editUser={editUser}
      />
    </Box>
  )
}
