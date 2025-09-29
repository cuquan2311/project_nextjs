"use client"
import { Fab, Zoom } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { animateScroll as scroll } from "react-scroll";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200)
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  const scrollToTop = () => {
    scroll.scrollToTop({ duration: 800, smooth: "easeInOutQuart" });
  }
  return (
    <Zoom in={showButton}>
      <Fab
        onClick={scrollToTop}
        size='medium'
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 3000,
        }}
        aria-label="scroll back to top"
      >
        <KeyboardArrowUpIcon fontSize="large" />
      </Fab>
    </Zoom>
  )
}
