"use client";
import { Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

type Props = {
  author: string;
  date : string;
  time : string
};

export default function CommentHeader({ author , date , time }: Props) {
  return (
    <Box width="100%">
      <Box display="flex" sx ={{width: "100%"}}>
        <Typography fontWeight="bold" color="success" >{author}</Typography>
        <Box display="flex" gap={1} ml="auto"  color= "text.secondary">
          <Typography variant="caption" >{date}</Typography>
          <Typography  variant="caption">{time}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 0.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Icon icon="material-symbols:bookmark-outline" fontSize={18} />
          <Typography variant="caption">IDECO</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Icon icon="material-symbols:sell-outline" fontSize={18} />
          <Typography variant="caption">TV BIM</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Icon
            icon="material-symbols:nest-clock-farsight-analog-outline-rounded"
            fontSize={18}
          />
          <Typography variant="caption">Dưới 1 phút trước</Typography>
        </Box>
      </Box>
    </Box>
  );
}
