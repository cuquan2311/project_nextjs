"use client";

import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface OverviewChartProps {
  overviewData: { day: string; users: number; products: number }[];
}

export default function OverviewChart({ overviewData }: OverviewChartProps) {
  const categories = overviewData.map(d => d.day);
  const usersData = overviewData.map(d => d.users);
  const productsData = overviewData.map(d => d.products);

  const options: ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
      sparkline: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 5,
      hover: { size: 7 },
    },
    xaxis: {
      categories,
      labels: { style: { colors: "#555", fontSize: "12px" } },
      axisBorder: { show: true, color: "#ccc" },
    },
    yaxis: {
      labels: { style: { colors: "#555", fontSize: "12px" } },
    },
    colors: ["#388e3c", "#1976d2"],
    tooltip: { theme: "dark", marker: { show: true } },
    grid: {
      borderColor: "#eee",
      strokeDashArray: 4,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
  };

  const series = [
    { name: "Users", data: usersData },
    { name: "Products", data: productsData },
  ];

  return (
    <Box mb={3}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <Typography variant="h6" gutterBottom>
          Overview
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Users and Products trend over the last week
        </Typography>
        <Box height={300}>
          <Chart options={options} series={series} type="line" height={300} />
        </Box>
      </Paper>
    </Box>
  );
}
