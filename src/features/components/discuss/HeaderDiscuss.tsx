"use client";

import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";

export default function HeaderDiscuss() {
  const t = useTranslations("discussion")
  return (
    <Box>
      <Box>
        {/* Tiêu đề */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {t("title")}
        </Typography>

        {/* Breadcrumb */}
        <Breadcrumbs 
        aria-label="breadcrumb" 
        sx={{ mb: 2 }}
        separator = {<Icon icon="material-symbols:fiber-manual-record" fontSize="small"/>}
        >
          <Link variant="caption" underline="hover" color="inherit" href="/">
           {t("info")}
          </Link>
          <Typography variant="caption" color="text.primary">
             {t("title")}
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Thanh công cụ */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        sx={{ height: "40px" }}
      >
        <Box display="flex" alignItems="center" gap={1} flex={1}>
          {/* Ô tìm kiếm */}
          <TextField
            size="small"
            placeholder={t("placeholder")}
            variant="outlined"
            sx={{
              width: "20%",
              height: "35px",
              "& .MuiInputBase-root": {
                height: "35px",
              },
              "& fieldset" : {
                border : "1px solid #dadadaee"
              }
            }}
          />

          {/* Nút lịch */}
          <IconButton
            color="primary"
            sx={{
              border: "1px solid #dadadaee",
              borderRadius: "10px",
              height: "35px",
            }}
          >
            <Icon
              icon="material-symbols:calendar-month-rounded"
              width={20}
              height={20}
            />
          </IconButton>

          {/* Nút tìm kiếm */}
          <IconButton
            sx={{
              bgcolor: "primary.main",
              color: "white",
              "&:hover": { bgcolor: "primary.dark" },
              borderRadius: "10px",
              height: "35px",
            }}
          >
            <Icon
              icon="material-symbols:search-rounded"
              width={20}
              height={20}
            />
          </IconButton>
        </Box>

        {/* Nút thêm mới */}
        <Button
          variant="contained"
          color="primary"
          startIcon={
            <Icon icon="material-symbols:add-rounded" width={18} height={18} />
          }
          sx={{ whiteSpace: "nowrap" , height : "35px" , with : "110px" }}
        >
          {t("add")}
        </Button>
      </Box>
    </Box>
  );
}
