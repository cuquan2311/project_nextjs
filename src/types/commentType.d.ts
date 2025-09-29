export type Comment = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: {
    date: string;
    time: string;
  };
  replies?: Comment[]; // nhiều replies
  isReply?: boolean;
  replyTo?: string;
};
