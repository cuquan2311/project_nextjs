"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Card,
  Grid,
  Container,
  Stack,
} from "@mui/material";
import { useTranslations } from "next-intl";

export default function SecuritySection() {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [progress, setProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const t = useTranslations("cli");
  const script = [
    "$ Connecting to secure-server...",
    "Authentication successful",
    "$ sudo dataguard scan --deep --network --fix --log /var/log/dataguard/report.json",
    "→ Scanning system files...",
    "Scan complete.",
    "✅ No critical vulnerabilities found",
    "⚠️  2 medium risks | 12 low risks",
    "📂 Report saved: /var/log/dataguard/report.json",
    "",
    "Sample log output:",
    '{ "user": "root", "lastLogin": "2025-09-12T10:00:00Z", "status": "ok" }',
    '{ "port": 8080, "protocol": "http", "status": "⚠ weak cipher" }',
  ];

  // typing effect từng dòng
  useEffect(() => {
    let line = 0;
    let char = 0;
    const interval = setInterval(() => {
      if (line < script.length) {
        if (char < script[line].length) {
          setCurrentLine((prev) => prev + script[line][char]);
          char++;
        } else {
          setDisplayedLogs((prev) => [...prev, script[line]]);
          setCurrentLine("");
          char = 0;
          line++;

          if (script[line - 1].includes("scan --deep")) {
            setIsScanning(true);
          }
        }
      } else {
        clearInterval(interval);
        setIsScanning(false);
      }
    }, 55);
    return () => clearInterval(interval);
  }, []);

  // progress bar chạy dần
  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          return 100;
        }
        return old + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isScanning]);

  // highlight cơ bản
  const highlight = (line?: string) => {
    if (!line) return null;

    if (line.startsWith("{")) {
      return <span style={{ color: "#38bdf8" }}>{line}</span>;
    }
    if (line.startsWith("$")) {
      return <span style={{ color: "#22c55e" }}>{line}</span>;
    }
    if (line.includes("⚠")) {
      return <span style={{ color: "#facc15" }}>{line}</span>;
    }
    if (line.includes("✅")) {
      return <span style={{ color: "#4ade80" }}>{line}</span>;
    }
    return line;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={6} alignItems="center">
        {/* LEFT */}
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h3" fontWeight={700}>
              {t("title")}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {t("subtitle1")}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {t("subtitle2")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              • {t("point1")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              • {t("point2")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              • {t("point3")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              • {t("point4")}
            </Typography>
          </Stack>
        </Grid>
        {/* RIGHT */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "monospace",
            }}
          >

            <Card
              sx={{
                width: "100%",
                maxWidth: 520,
                minHeight: 350,
                bgcolor: "#000",
                color: "#00ff00",
                p: 2,
                border: "1px solid #00ff00",
                borderRadius: 1,
                boxShadow: "0 0 15px rgba(0,255,0,0.3)",
              }}
            >

              {displayedLogs.map((line, i) => (
                <Typography key={i} sx={{ fontSize: 14, mb: 0.5 }}>

                  {highlight(line)}
                </Typography>
              ))}
              {/* dòng đang gõ */}
              {currentLine && (
                <Typography sx={{ fontSize: 14 }}>

                  {currentLine} <span className="cursor">█</span>
                </Typography>
              )}
              {/* progress bar */}
              {isScanning && (
                <Box sx={{ mt: 2 }}>

                  <Typography sx={{ fontSize: 13, mb: 1 }}>

                    [
                    {Array(Math.floor(progress / 5))
                      .fill("█")
                      .join("")}
                    {Array(20 - Math.floor(progress / 5))
                      .fill("░")
                      .join("")}
                    ] {progress}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 8,
                      bgcolor: "#111",
                      "& .MuiLinearProgress-bar": {
                        transition: "width 0.2s ease",
                      },
                    }}
                  />
                </Box>
              )}
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* CSS hiệu ứng cursor */}
      <style jsx global>{`
        .cursor {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </Container>
  );
}
