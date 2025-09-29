"use client";

import { Box, Typography, List, ListItemButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { DiscussTopics } from "@/data/discussData";

type Props = {
  selectedTopicId: number | null;
  onSelect: (id: number) => void;
};

export default function SidebarDiscuss({ selectedTopicId, onSelect }: Props) {
  return (
    <Box
      sx={{
        width: 320,
        border: "1px solid #dadadaee",
        borderRadius: "10px",
        height: "100%",
        overflowY: "auto",
        bgcolor: "background.paper",
        p: 1.5,
      }}
    >
      <List
        disablePadding
        sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        {DiscussTopics.map((topic) => (
          <ListItemButton
            key={topic.id}
            selected={selectedTopicId === topic.id}
            onClick={() => onSelect(topic.id)}
            sx={{
              
              flexDirection: "column",
              alignItems: "flex-start",
              border: "1px solid #dadadaee",
              borderRadius: "10px",
              // padding: 2,
              "&.Mui-selected": {
                bgcolor: "primary.light",
                color: "inherit",
              },
              "&:hover": { bgcolor: "primary.light" },
            }}
          >
            {/* Tiêu đề */}
            <Typography fontWeight="bold" variant="subtitle1" color="success">
              {topic.title}
            </Typography>

            {/* Người tạo */}
            <Box display="flex" alignItems="center" gap={1} mb={0.5} color="text.secondary">
              <Icon icon="material-symbols:person" width={20} height={20} />
              <Typography variant="body2">
                {topic.user}
              </Typography>
            </Box> 

            {/* Thời gian */}
            <Box display="flex" alignItems="center" gap={1} color="text.secondary">
              <Icon
                icon="material-symbols:nest-clock-farsight-analog-outline-rounded"
                width={20}
                height={20}
                color="text.secondary"
              />
              <Typography variant="body2" >
                {topic.time}
              </Typography>
            </Box>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
