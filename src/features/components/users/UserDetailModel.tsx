"use client";

import { User } from "@/types/userType";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import { useTranslations } from "next-intl";

export default function UserDetailModal({
  open,
  onClose,
  user,
}: {
  open: boolean;
  onClose: () => void;
  user: User | null;
}) {
  const t = useTranslations("userTable")
  if (!user) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Header */}
      <DialogTitle
        sx={{
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {user.firstName} {user.lastName}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          {/* Avatar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              style={{
                maxHeight: 200,
                maxWidth: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </Box>

          {/* Info */}
          <Stack spacing={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              {t("columns.email")}: <span style={{ color: "#2563eb" }}>{user.email}</span>
            </Typography>

            <Typography variant="subtitle1">{t("columns.phone")}: {user.phone}</Typography>
            <Typography variant="subtitle1">{t("columns.gender")}: {user.gender}</Typography>
            <Typography variant="subtitle1">{t("columns.age")}: {user.age}</Typography>

            <Divider />

            <Typography variant="body2" color="text.secondary">
              ID: {user.id}
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
