"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/userType";
import { useUserStore } from "@/store/userStore/userStore";
import toast from "react-hot-toast";
import { confirmDelete } from "@/components/utils/confirmDelete";
import { useTranslations } from "next-intl";

export function useUserTable(initialUsers: User[]) {
  const { users, deleteUser, isLoading, error } = useUserStore();

  const [openModal, setOpenModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [detailUser, setDetailUser] = useState<User | null>(null);
  const [searchText, setSearchText] = useState("");
  const t = useTranslations("confirmModal");
  useEffect(() => {
    if (users.length === 0 && initialUsers.length > 0) {
      useUserStore.setState({ users: initialUsers as User[] });
    }
  }, [initialUsers, users.length]);

  const handleDeleteUser = async (id: string) => {
    const confirmed = await confirmDelete(
      t("title"),
      t("message"),
      t("actions.confirm"),
      t("actions.cancel")
    );
    if (confirmed) {
      deleteUser(id);
      toast.success(t("success"));
    }
  };

  const filteredRows = users
    .filter((u) => {
      const query = searchText.toLowerCase();
      return (
        u.firstName.toLowerCase().includes(query) ||
        u.lastName.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.phone.toLowerCase().includes(query)
      );
    })
    .map((u) => ({ ...u, id: u.id }));

  return {
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
    isLoading,
    error,
  };
}
