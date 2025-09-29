import { MUIThemeWrapper } from "./MuiThemeWrapper";
import { ThemeProvider as NextThemeProvider } from 'next-themes'
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MUIThemeWrapper>{children}</MUIThemeWrapper>
    </NextThemeProvider>
  )
}