"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Divider,
  IconButton,
  Tooltip,
  Chip,
  Grid,
  useTheme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { CardUserType } from "@/types/cardUserType";
import { User } from "@/types/userType";

export default function UserCard({ user }: { user: User }) {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
        },
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Header với avatar */}
      <Box
        sx={{
          position: "relative",
          height: 120,
          backgroundColor: theme.palette.primary.light,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          image={user.image || `https://via.placeholder.com/120?text=${user.firstName[0]}`}
          alt={`${user.firstName} ${user.lastName}`}
          sx={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            border: "3px solid #fff",
            position: "absolute",
            bottom: -48,
            boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
          }}
        />
      </Box>

      {/* Content */}
      <CardContent sx={{ pt: 6, px: 3, flexGrow: 1 }}>
        {/* Name & Chips */}
        <Typography
          variant="h6"
          align="center"
          fontWeight={600}
        >
          {user.firstName} {user.lastName}
        </Typography>
        <Box display="flex" justifyContent="center" gap={1} mt={1} flexWrap="wrap">
          <Chip label={`${user.age} yrs`} size="small" color="info" />
          <Chip label={user.gender} size="small" variant="outlined" />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Info (2 cột desktop / 1 cột mobile) */}
        <Grid container spacing={1}>
          <Grid size={{
            xs: 12
          }}>
            <InfoItem icon={<EmailIcon />} label="Email" value={user.email} tooltip />
          </Grid>
          <Grid size={{
            xs: 12
          }}>
            <InfoItem icon={<PhoneIcon />} label="Phone" value={user.phone} tooltip />
          </Grid>
          <Grid size={12}>
            <InfoItem icon={<VpnKeyIcon />} label="IP" value={user.id} tooltip />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}


interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isPassword?: boolean;
  showPassword?: boolean;
  togglePassword?: () => void;
  tooltip?: boolean;
}

function InfoItem({ icon, label, value, isPassword, showPassword, togglePassword, tooltip }: InfoItemProps) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      {icon}
      {isPassword ? (
        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <strong>{label}:</strong> {showPassword ? value : "••••••••"}
          <IconButton size="small" onClick={togglePassword}>
            {showPassword ? (
              <VisibilityOffIcon fontSize="small" />
            ) : (
              <VisibilityIcon fontSize="small" />
            )}
          </IconButton>
        </Typography>
      ) : tooltip ? (
        <Tooltip title={value}>
          <Typography variant="body2" noWrap>
            <strong>{label}:</strong> {value}
          </Typography>
        </Tooltip>
      ) : (
        <Typography variant="body2" noWrap>
          <strong>{label}:</strong> {value}
        </Typography>
      )}
    </Box>
  );
}
