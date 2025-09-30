"use client";
import { Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import CommentActions from "./CommentActions";

type Props = {
  content: string;
  replyTo?: string;
  isReply?: boolean;
  onReply: () => void
};

export default function CommentContent({ content, isReply , onReply ,
  }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width : "100%" }}>
      {/* Nếu là reply → chỉ hiển thị content */}
      {isReply ? (
        <Box sx={{display: "flex" , gap : "120px"}}>
            <Typography 
            variant="body2"
            sx = {{
              whiteSpace: "pre-line",
              wordBreak: "break-word",
              overflowWrap: "anywhere"
            }}
            >
            {content}
          </Typography>
          <CommentActions
              isReply={isReply}
              onReply={() => onReply()}
            />
          </Box>
      ) : (
        // Nếu là comment gốc → có thêm "Nội dung cập nhật"
        <Box  >
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
            <Icon icon="emojione:pushpin" fontSize={18} />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Nội dung cập nhật:
            </Typography>
          </Box>
          <Box sx={{display: "flex " , gap : "50px"}}>
            <Typography 
            variant="body2" 
            sx={{ 
              color: "text.secondary" ,
              whiteSpace: "pre-line",
              wordBreak: "break-word",
              overflowWrap: "anywhere"
              }}>
            {content}
          </Typography>
          <CommentActions
              isReply={isReply}
              onReply={() => onReply()}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
