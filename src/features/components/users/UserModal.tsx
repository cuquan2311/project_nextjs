"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "@/types/userType";
import { useUserStore } from "@/store/userStore/userStore";
import { userSchema } from "@/schemas/UserSchemas";

export default function UserModal({
  open,
  onClose,
  editUser,
}: {
  open: boolean;
  onClose: () => void;
  editUser?: User | null;
}) {
  const { addUser, updateUser } = useUserStore();
  const t = useTranslations("userTable");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 0,
      gender: "",
      email: "",
      phone: "",
      image: "",
    },
  });


  useEffect(() => {
    if (editUser) {
      reset(editUser);
    } else {
      reset({
        firstName: "",
        lastName: "",
        age: 0,
        gender: "",
        email: "",
        phone: "",
        image: "",
      });
    }
  }, [editUser, reset]);

  const onSubmit = (data: User) => {
    if (editUser) {
      updateUser(editUser.id, data);
    } else {
      addUser(data);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editUser ? "Edit User" : "Add User"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={6}>
              <TextField
                label={t("columns.firstName")}
                fullWidth
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                label={t("columns.lastName")}
                fullWidth
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>

            <Grid size={6}>
              <TextField
                label={t("columns.age")}
                type="number"
                fullWidth
                {...register("age")}
                error={!!errors.age}
                helperText={errors.age?.message}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                label={t("columns.gender")}
                fullWidth
                {...register("gender")}
                error={!!errors.gender}
                helperText={errors.gender?.message}
              />
            </Grid>

            <Grid size={6}>
              <TextField
                label={t("columns.email")}
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                label={t("columns.phone")}
                fullWidth
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                label={t("columns.avatar")}
                fullWidth
                {...register("image")}
                error={!!errors.image}
                helperText={errors.image?.message}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
