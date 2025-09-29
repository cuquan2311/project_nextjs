"use client";

import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import {
  Storage,
  Security,
  Sync,
  AdminPanelSettings,
  Speed,
  IntegrationInstructions,
} from "@mui/icons-material";
import { useTranslations } from "next-intl";

export default function Features() {
  const t = useTranslations("features");

  const features = [
    { icon: <Storage fontSize="large" color="primary" />, key: "feature1" },
    { icon: <Security fontSize="large" color="primary" />, key: "feature2" },
    { icon: <Sync fontSize="large" color="primary" />, key: "feature3" },
    { icon: <AdminPanelSettings fontSize="large" color="primary" />, key: "feature4" },
    { icon: <Speed fontSize="large" color="primary" />, key: "feature5" },
    { icon: <IntegrationInstructions fontSize="large" color="primary" />, key: "feature6" },
  ];

  return (
    <Container sx={{ py: 10 }}>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        {t("sectionTitle")}
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {features.map((item) => (
          <Grid size={{
            xs: 12, md: 4
          }} key={item.key}>
            <Paper sx={{ p: 4, textAlign: "center", height: "100%", borderRadius: 4 }} elevation={3}>
              <Box sx={{ mb: 2 }}>{item.icon}</Box>
              <Typography variant="h6" fontWeight="bold">
                {t(`${item.key}.title`)}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t(`${item.key}.desc`)}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
