import { Box, Typography } from "@mui/material";
import React from "react";

export default function ToltalComments() {
  return (
    <Box
      sx={{
        border: "1px solid #dadadaee",
        borderRadius: "10px",
        fontWeight : "bold",
        marginBottom: "15px"
      }}
    >
      <Typography sx = {{margin:"10px"}}>20 Bình luận</Typography>
    </Box>
  );
} 
