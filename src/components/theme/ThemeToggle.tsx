"use client";

import { Brightness4, Brightness7 } from "@mui/icons-material"
import { IconButton, Tooltip } from "@mui/material"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function SimpleThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <IconButton size="large" disabled>
        <Brightness7 />
      </IconButton>
    )
  }

  const isDark = resolvedTheme === 'dark'

  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <Tooltip title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
      <IconButton
        onClick={handleToggle}
        size="large"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        sx={{
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'rotate(180deg)',
          },
        }}
      >
        {isDark ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  )
}