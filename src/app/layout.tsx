import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@/components/theme/ThemeProviders";
import { Toaster } from "react-hot-toast";
import { Box } from "@mui/material";
import "../styles/global.scss"
import ScrollToTop from "@/components/layout/ScrollToTop";
export default async function LocaleLayout({
  children, params
}: {
  children: React.ReactNode;
  params: { locale: string }
}) {
  const locale = params.locale || "en";
  const messages = await getMessages({ locale });
  return (
    <html lang={locale} suppressHydrationWarning>
      <body >
        <AppRouterCacheProvider>
          <ThemeProvider>
            <NextIntlClientProvider messages={messages} >
              <Toaster
                position="top-center"
                toastOptions={{
                  style: {
                    background: "#333",
                    color: "#fff",
                  },
                }}
              />
              <Box sx={{ flex: 1 }}>{children}</Box>
              <ScrollToTop />
            </NextIntlClientProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
