"use client";

import { useRouter } from "next/navigation";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useState, useTransition } from "react";
import { routing } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // currentLang = null trước khi người dùng chọn
  const [currentLang, setCurrentLang] = useState<Locale | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (lang: Locale) => {
    setCurrentLang(lang);
    document.cookie = `lang=${lang}; path=/`;

    startTransition(() => router.refresh());
    handleClose();
  };

  return (
    <>
      <Tooltip title={(currentLang ?? "Lang").toUpperCase()}>
        <IconButton size="small" onClick={handleClick}>
          <LanguageIcon />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {routing.locales.map((loc) => (
          <MenuItem key={loc} onClick={() => handleSelect(loc)}>
            {loc.toUpperCase()}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
