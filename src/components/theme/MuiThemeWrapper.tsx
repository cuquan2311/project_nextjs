"use client";

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { darkTheme, lightTheme } from "./MuiRegistry"
import { CssBaseline } from "@mui/material"
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
export function MUIThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)


  useEffect(() => {
    setMounted(true)
  }, [])

  // Xử lý theme selection
  const currentTheme = theme === 'system' ? systemTheme : theme
  const muiTheme = currentTheme === 'dark' ? darkTheme : lightTheme

  if (!mounted) {
    return (
      <MUIThemeProvider theme={lightTheme}>
        <CssBaseline />
        <div className="mui-theme-hidden">
          {children}
        </div>
      </MUIThemeProvider>
    )
  }

  return (
    <MUIThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}