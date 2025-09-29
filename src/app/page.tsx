import { Box, Toolbar } from "@mui/material";
import HeroBanner from "@/components/layout/HeroBanner";
import Features from "@/components/layout/Features";
import CLIPage from "@/components/layout/Cli";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ImageBanner from "@/components/layout/ImageBanner";

export default async function HomePage() {
  return (
    <Box>
      <Header />
      <Toolbar />
      <HeroBanner />
      <ImageBanner />
      <CLIPage />
      <Features />
      <Footer />
    </Box>
  );
}
