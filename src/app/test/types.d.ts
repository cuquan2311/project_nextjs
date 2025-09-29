export type Comment = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
  replies?: Comment[]; // ✅ đổi từ reply sang replies (nhiều cấp)
  isReply?: boolean;
  replyTo?: string;
};
