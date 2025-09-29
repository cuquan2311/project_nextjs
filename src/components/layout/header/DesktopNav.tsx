import { Box, Button } from '@mui/material';
import Link from 'next/link';
import React from 'react'

export default function DesktopNav({
  linkStyle,
  t
}: {
  linkStyle: React.CSSProperties;
  t: (key: string) => string;
}) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        gap: 2,
        ml: 2
      }}
    >
      <Link href="/" style={linkStyle}>
        <Button>{t("home")}</Button>
      </Link>
      <Link href="/features" style={linkStyle}>
        <Button>{t("features")}</Button>
      </Link>
    </Box>
  )
}
