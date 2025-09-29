"use client";

import { useState, MouseEvent } from "react";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNotificationStore } from "@/store/NotificationStore";

export default function NotificationMenu() {
  const { notifications, markAsRead, clearAll } = useNotificationStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "mail":
        return <MailIcon color="primary" />;
      case "user":
        return <PersonIcon color="secondary" />;
      case "product":
        return <ShoppingCartIcon color="success" />;
      default:
        return <NotificationsIcon />;
    }
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { width: 500, maxHeight: 400 } }}
      >
        <MenuItem disabled>
          <strong>Thông báo ({notifications.length})</strong>
        </MenuItem>
        <Divider />

        {notifications.length === 0 ? (
          <MenuItem disabled>Không có thông báo</MenuItem>
        ) : [
          ...notifications
            .slice()
            .reverse()
            .map((n) => (
              <MenuItem
                key={n.id}
                onClick={() => markAsRead(n.id)}
                sx={{ bgcolor: n.read ? "inherit" : "action.hover" }}
              >
                <ListItemIcon>{getIcon(n.type)}</ListItemIcon>
                <ListItemText
                  primary={n.title}
                  secondary={`${n.message} - ${new Date(
                    n.createdAt
                  ).toLocaleString()}`}
                />
              </MenuItem>
            )),
          <Divider key="divider" />,
          <MenuItem
            key="clear-all"
            onClick={() => {
              clearAll();
              handleClose();
            }}
            sx={{ justifyContent: "center" }}
          >
            <Typography fontWeight={500}>Xóa tất cả</Typography>
          </MenuItem>,
        ]}
      </Menu>
    </>
  );
}
