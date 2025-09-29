import { User } from '@/types/userType';
import { Delete, Edit, Info, MoreVert } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react'

export default function RowActions({
  user,
  onEdit,
  onView,
  onDelete,
  isCompact
}: {
  user: User;
  onEdit: (u: User) => void;
  onView: (u: User) => void;
  onDelete: (id: number) => void
  isCompact?: boolean;
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"))
  const [menu, setMenu] = useState<null | HTMLElement>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenu(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setMenu(null)
  }

  if (isCompact || isMobile) {
    return (
      <Box  >
        <IconButton size='small' onClick={handleOpenMenu} sx={{ justifyContent: "flex-end" }}>
          <MoreVert />
        </IconButton>

        <Menu
          anchorEl={menu}
          open={Boolean(menu)}
          onClose={handleCloseMenu}
        >
          <MenuItem
            onClick={() => {
              onEdit(user);
              handleCloseMenu();
            }}
          >
            <Edit fontSize='small' style={{ marginRight: 8 }} />
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDelete(user.id)
              handleCloseMenu();
            }}
          >
            <Delete fontSize='small' style={{ marginRight: 8 }} />
            Delete
          </MenuItem>
          <MenuItem
            onClick={() => {
              onView(user);
              handleCloseMenu();
            }}
          >
            <Info fontSize='small' style={{ marginRight: 8 }} />
            View
          </MenuItem>
        </Menu>
      </Box>
    )
  }
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Tooltip title="Chỉnh sửa">
        <IconButton size='small' onClick={() => onEdit(user)}>
          <Edit fontSize='small' />
        </IconButton>
      </Tooltip>
      <Tooltip title="Xóa">
        <IconButton size='small' onClick={() => onDelete(user.id)}>
          <Delete fontSize='small' />
        </IconButton>
      </Tooltip>
      <Tooltip title="Chi tiết">
        <IconButton size='small' onClick={() => onView(user)}>
          <Info fontSize='small' />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
