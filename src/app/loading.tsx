"use client";

import { Box, Fade, useTheme } from "@mui/material";
import { motion } from "framer-motion";

export default function FullScreenLoading() {
  const theme = useTheme();

  const rectangles = [0, 1, 2];

  return (
    <Fade in timeout={400}>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 1300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <Box sx={{ position: "relative", width: 120, height: 120 }}>
          {rectangles.map((i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: 12,
                boxSizing: "border-box",
                border: `4px solid transparent`,
                backgroundImage: `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.default}), linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
              animate={{
                rotate: 360,
                scale: [1, 0.9, 1], // co giãn nhẹ
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5 + i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Logo chữ Q */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 48,
              color: theme.palette.primary.main,
            }}
          >
            Q
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}
