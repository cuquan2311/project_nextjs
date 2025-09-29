"use client";

import Header from "@/components/layout/Header";
import { Box, Container, Typography, Divider, List, ListItemButton } from "@mui/material";
import { useState } from "react";

const sections = [
  { id: "intro", title: "Giới thiệu", content: "Trang Admin giúp quản lý người dùng, sản phẩm, khuyến mãi, và cấu hình hệ thống. Hỗ trợ thao tác CRUD, giao diện trực quan, dễ sử dụng." },
  { id: "tech", title: "Công nghệ", content: "Frontend: React + TS + MUI + SCSS + Zustand. Backend: Spring Boot hoặc DummyJSON API mock." },
  { id: "structure", title: "Cấu trúc", content: "Gồm Dashboard, User Manager, Product Manager, Promotion Manager, Settings." },
  { id: "users", title: "Quản lý Người dùng", content: "Thêm, sửa, xóa, phân quyền người dùng. Hỗ trợ tìm kiếm, phân trang." },
  { id: "products", title: "Quản lý Sản phẩm", content: "Thêm sản phẩm mới, chỉnh sửa, xóa, phân loại theo danh mục." },
  { id: "advanced", title: "Tính năng nâng cao", content: "Hỗ trợ xuất CSV/Excel, responsive mobile, dark mode, thông báo realtime." },
];

export default function DocsPage() {
  const [active, setActive] = useState("intro");

  return (
    <Container maxWidth="lg" sx={{ display: "flex", py: 6 }}>
      <Header />
      {/* Sidebar */}
      <Box sx={{ mt: 10, display: "flex" }}>
        <Box
          sx={{
            width: "25%",
            marginTop: "10px",
            pr: 3,
            borderRight: "1px solid #ddd",
            position: "sticky",
            height: "100%",
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Mục lục
          </Typography>
          <List>
            {sections.map((s) => (
              <ListItemButton
                key={s.id}
                selected={active === s.id}
                onClick={() => setActive(s.id)}
              >
                {s.title}
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* Nội dung docs */}
        <Box sx={{ width: "75%", pl: 4 }}>
          {sections.map(
            (s) =>
              active === s.id && (
                <Box key={s.id}>
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {s.title}
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    {s.content}
                  </Typography>
                </Box>
              )
          )}
        </Box>
      </Box>

    </Container>
  );
}
