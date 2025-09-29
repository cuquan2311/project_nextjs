"use client";

import { DiscussTopics } from "@/data/discussData";
import { Box } from "@mui/material";
import Image from "next/image";
import { object } from "yup";
type Props = {
  topicId: number;
};
export default function DiscussionImages({ topicId }: Props) {
  const topic = DiscussTopics.find((t) => t.id === topicId);

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      {topic?.images.map((src, index) => (
        <Box
          key={index}
          sx={{
            flex: 1,
            position: "relative",
            height: 220,
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid #eee",
          }}
        >
          <Image
            src={src}
            alt={`discussion-img-${index + 1}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
      ))}
    </Box>
  );
}
