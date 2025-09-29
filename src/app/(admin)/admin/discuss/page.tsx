"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import DiscussionDetail from "@/features/components/discuss/DiscussionDetail";
import HeaderDiscuss from "@/features/components/discuss/HeaderDiscuss";
import SidebarDiscuss from "@/features/components/discuss/SidebarDiscuss";

export default function DiscussionPage() {
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);

  return (
    <Box>
      {/* Header trên cùng */}
      <HeaderDiscuss />

      {/* Layout 2 cột với scroll ngang */}
      <Box
        display="flex"
        flexDirection="row" 
        gap={4}
        sx={{
          marginTop: 1,
          overflowX: "auto",
          overflowY: "hidden",
          pb: 1, 
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            flexShrink: 0,
            width: "300px", 
            height : "620px"
          }}
        >
          <SidebarDiscuss
            selectedTopicId={selectedTopicId}
            onSelect={setSelectedTopicId}
          />
        </Box>

        {/* Detail */}
        <Box
          flex={1}
          sx={{ 
            border: "1px solid #dadadaee",
            borderRadius: "8px",
            overflow: "hidden",
            height: "620px",
            minWidth: "600px", 
          }}
        >
          <DiscussionDetail topicId={selectedTopicId} />
        </Box>
      </Box>
    </Box>
  );
}
