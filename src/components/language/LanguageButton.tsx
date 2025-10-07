"use client";

import { useRouter } from "next/navigation";
import { IconButton, Menu, MenuItem, Tooltip, Box } from "@mui/material";
import { useState, useTransition } from "react";
import { Icon } from "@iconify/react"; // ✅ Dùng iconify
import { routing } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];


const flagIcons: Record<Locale, string> = {
  vi: "flag:vn-4x3",
  en: "flag:gb-4x3", 
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

 
  const [currentLang, setCurrentLang] = useState<Locale>(() => {
    const match = document.cookie.match(/lang=(\w+)/);
    return (match?.[1] as Locale) || "en";
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelect = (lang: Locale) => {
    setCurrentLang(lang);
    document.cookie = `lang=${lang}; path=/`;
    startTransition(() => router.refresh());
    handleClose();
  };

  return (
    <>
      <Tooltip title={`Ngôn ngữ: ${currentLang.toUpperCase()}`}>
        <IconButton onClick={handleClick} size="small">
          <Box
            sx={{
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              icon={flagIcons[currentLang]}
              width="28"
              height="28"
              style={{ borderRadius: "8px"}}
            />
          </Box>
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{ mt: 1 }}>
        {routing.locales.map((loc) => (
          <MenuItem
            key={loc}
            onClick={() => handleSelect(loc)}
            selected={loc === currentLang}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Icon
                icon={flagIcons[loc]}
                width="28"
                height="28"
                style={{ borderRadius: "8px" }}
              />
              <span style={{ fontSize: "0.9rem" }}>
                {loc === "vi" ? "Tiếng Việt" : "English"}
              </span>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
