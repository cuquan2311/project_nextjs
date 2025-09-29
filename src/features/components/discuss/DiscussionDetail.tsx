"use client";
import { Box, Typography } from "@mui/material";
import DiscussionHeader from "./discussionDetail/DiscussionHeader";
import DiscussionBody from "./discussionDetail/DiscussionBody";
import DiscussionImages from "./discussionDetail/DiscussionImages";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { DiscussTopics } from "@/data/discussData";
import { Comment } from "@/types/commentType";
import { useEffect, useState } from "react";
import FormActions from "./FormActions";

type Props = {
  topicId: number | null;
};

export default function DiscussionDetail({ topicId }: Props) {
  const start = topicId ?? DiscussTopics[0]?.id ?? null

  const topic = DiscussTopics.find((t) => t.id === start);

  const [comments, setComments] = useState<Comment[]>(topic?.replies ?? []);
  const [replyTo, setReplyTo] = useState<{ id: string; author: string } | null>(null);

  //  reset lại comments mỗi khi đổi topicId
  useEffect(() => {
    setComments(topic?.replies ?? []);
  }, [start]);

  // if (!topicId || !topic) {
  //   return (
  //     <Box p={4}>
  //       <Typography variant="h6" color="text.secondary">
  //         Chọn một chủ đề từ sidebar để xem chi tiết
  //       </Typography>
  //     </Box>
  //   );
  // }

  const handleAddComment = (
    content: string,
    reply?: { id: string; author: string } | null
  ) => {
    if (reply) {
      // reply vào 1 comment
      setComments((prev) =>
        prev.map((c) =>
          c.id === reply.id
            ? { 
                ...c,
                replies: [
                  ...(c.replies || []),
                  {
                    id: Date.now().toString(),
                    author: "Bạn",
                    avatar: "https://i.pravatar.cc/40?img=3",
                    content,
                    createdAt: {
                      date: new Date().toLocaleDateString(),
                      time: new Date().toLocaleTimeString()
                    },
                    isReply: true,
                    replyTo: c.author,
                  },
                ],
              }
            : c
        )
      );
    } else {
      // comment gốc
      setComments((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          author: "Bạn",
          avatar: "https://i.pravatar.cc/40?img=4",
          content,
          createdAt: {
           date: new Date().toLocaleDateString(),
           time: new Date().toLocaleTimeString()
                    },
          // replies: [],
        },
      ]);
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100%" >
      {/* Header */}
      <Box sx={{ borderBottom: "2px solid #dadadaee", p: 2 }}>
        <DiscussionHeader topicId={start} />
      </Box>

      {/* Body */}
      <Box sx={{ flex: 1, p: 2 , height : "100%", overflowY: "auto"}}>
        <DiscussionBody topicId={start} />
        <DiscussionImages topicId={start} />

        {/* Comments */}
        <CommentList
          comments={comments}
          onReplyRequest={(id, author) => setReplyTo({ id, author })}
        />
      </Box>
         <FormActions/>
      <CommentForm
        onAddComment={handleAddComment}
        replyTo={replyTo}
        onCancelReply={() => setReplyTo(null)}
      />
    </Box>
  );
}
