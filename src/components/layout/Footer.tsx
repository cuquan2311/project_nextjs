import { Box, Typography, Container } from "@mui/material";

export default function Footer() {
  console.log("[FOOTER]");
  return (
    <Box className="footer" sx={{ py: 4, mt: 8 }}>
      <Container className="footer__container" sx={{ textAlign: "center" }}>
        <Typography className="footer__text" variant="body2">
          © 2025 User Manager. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
