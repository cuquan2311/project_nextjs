"use client";

import { Grid, Card, CardContent, Typography, Box, Stack, Chip } from "@mui/material";
import Chart from "react-apexcharts";
import { useTranslations } from "next-intl";
import { ApexOptions } from "apexcharts";

interface TopCardsProps {
  salesData: { name: string; value: number }[];
  usersData: { name: string; value: number }[];
  visitsData: { name: string; value: number }[];
}

export default function TopCards({ salesData, usersData, visitsData }: TopCardsProps) {
  const t = useTranslations("dashboard");

  // Helper chart options
  const sparklineOptions = (color: string): ApexOptions => ({
    chart: { sparkline: { enabled: true }, animations: { speed: 800 } },
    stroke: { curve: "smooth", width: 3 },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] },
    },
    colors: [color],
    tooltip: { theme: "dark" },
  });

  const cards = [
    {
      title: t("sales"),
      value: salesData.at(-1)?.value ?? 0,
      diff: +12.5,
      color: "#1976d2",
      series: [{ data: salesData.map((d) => d.value) }],
    },
    {
      title: t("users"),
      value: usersData.at(-1)?.value ?? 0,
      diff: -5.2,
      color: "#2e7d32",
      series: [{ data: usersData.map((d) => d.value) }],
    },
    {
      title: t("visits"),
      value: visitsData.at(-1)?.value ?? 0,
      diff: +8.7,
      color: "#ef6c00",
      series: [{ data: visitsData.map((d) => d.value) }],
    },
  ];

  return (
    <Grid container spacing={2} mb={3}>
      {cards.map((c, i) => (
        <Grid key={i} size={{
          xs: 12, sm: 4
        }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle2" color="text.secondary">
                  {c.title}
                </Typography>
                <Chip
                  label={`${c.diff > 0 ? "+" : ""}${c.diff}%`}
                  size="small"
                  sx={{
                    bgcolor: c.diff >= 0 ? "rgba(76, 175, 80, 0.1)" : "rgba(244, 67, 54, 0.1)",
                    color: c.diff >= 0 ? "success.main" : "error.main",
                    fontWeight: "bold",
                  }}
                />
              </Stack>
              <Typography variant="h4" fontWeight="bold" color={c.color} mb={1}>
                {c.value.toLocaleString()}
              </Typography>
              <Box height={80}>
                <Chart
                  options={sparklineOptions(c.color)}
                  series={c.series}
                  type="area"
                  height="100%"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
