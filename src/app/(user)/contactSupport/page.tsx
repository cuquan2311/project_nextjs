"use client";

import { useState, FormEvent } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";
import { useContactStore } from "@/store/contactStore";
import Header from "@/components/layout/Header";

export default function ContactSupportPage() {
  const { addMessage } = useContactStore();
  const [form, setForm] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  }>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    addMessage({ ...form, read: false });
    alert("✅ Gửi liên hệ thành công!");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Box>
      <Header />
      {/* Hero */}
      <Box
        sx={{
          textAlign: "center",
          paddingTop: "120px",
        }}
      >
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Liên hệ với chúng tôi
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
        </Typography>
      </Box>

      {/* Content */}
      <Grid container spacing={4} sx={{ p: { xs: 2, md: 6 } }}>
        {/* Cột trái - thông tin liên hệ */}
        <Grid
          size={{
            xs: 12,
            md: 5
          }}
        >
          <Paper sx={{ p: 4, borderRadius: 3 }} elevation={3}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Thông tin liên hệ
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box display="flex" alignItems="center" mb={2}>
              <EmailIcon color="primary" sx={{ mr: 2 }} />
              <Typography variant="body1">support@yourcompany.com</Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={2}>
              <PhoneIcon color="primary" sx={{ mr: 2 }} />
              <Typography variant="body1">+84 123 456 789</Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={2}>
              <LocationIcon color="primary" sx={{ mr: 2 }} />
              <Typography variant="body1">
                123 Đường ABC, Quận 1, TP. Hồ Chí Minh
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <TimeIcon color="primary" sx={{ mr: 2 }} />
              <Typography variant="body1">
                Thứ 2 - Thứ 6: 8:00 - 18:00
              </Typography>
            </Box>
          </Paper>

          {/* Google Map */}
          <Paper
            sx={{ mt: 4, borderRadius: 3, overflow: "hidden" }}
            elevation={3}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.94830825964937!2d106.66857650872751!3d10.798063699440451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175292eeeb42b75%3A0xa8099e0baf8d2bb6!2zQ8O0bmcgVHkgQ1AgVGhp4bq_dCBL4bq_IFjDonkgROG7sW5nIFMgVsOgIEs!5e0!3m2!1svi!2s!4v1758703223765!5m2!1svi!2s"
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </Paper>
        </Grid>

        {/* Cột phải - form liên hệ */}
        <Grid
          size={{
            xs: 12,
            md: 7
          }}
        >
          <Paper sx={{ p: 4, borderRadius: 3 }} elevation={3}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Gửi tin nhắn cho chúng tôi
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Họ và tên"
                name="name"
                value={form.name}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                margin="normal"
                type="email"
                required
              />
              <TextField
                fullWidth
                label="Tiêu đề"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Nội dung"
                name="message"
                value={form.message}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, borderRadius: 2, py: 1.2, fontWeight: 600 }}
              >
                Gửi liên hệ
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
