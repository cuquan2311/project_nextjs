import { User } from '@/types/userType'
import { AccountCircle, Close } from '@mui/icons-material';
import { Box, Button, DialogActions, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react'

export default function UserDetailPanel({
  user,
  onEdit,
  onClose
}: {
  user: User;
  onEdit: (u: User) => void,
  onClose: () => void

}) {
  const t = useTranslations("userTable")
  return (
    <Stack spacing={3}>
      {/*Header*/}
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      >
        <Typography variant='h6' fontWeight="bold">
          {user.firstName || user.lastName}
        </Typography>
        <IconButton size='small' onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      {/*Avatar*/}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          borderRadius: 2,
          boxShadow: 1
        }}
      >
        <img
          src={user.image}
          alt={user.firstName}
          style={{
            maxHeight: 200,
            maxWidth: "100%",
            objectFit: "contain",
            borderRadius: 8
          }}
        />
      </Box>

      {/*Thông tin*/}
      <Stack spacing={1}>
        <Typography variant='body2' color='text.secondary'>
          {user.email}
        </Typography>
        <Divider />
        <Typography variant="subtitle1" fontWeight="bold">
          {t("columns.phone")}: <span style={{ color: "#22c55e" }}>${user.phone}</span>
        </Typography>
        <Typography variant="subtitle2">{t("columns.gender")}: {user.gender}</Typography>
        <Typography variant="subtitle2">{t("columns.age")}: {user.age}</Typography>
        <Typography variant="subtitle2">{t("columns.country")}: {user.country}</Typography>

        <DialogActions>
          <Button onClick={onClose} className='user-modal__actions--cancel'>
            {t("actions.cancel")}
          </Button>
          <Button type='submit' variant='contained' onClick={() => onEdit(user)}>
            Sửa người dùng
          </Button>
        </DialogActions>
      </Stack>
    </Stack>
  )
}
