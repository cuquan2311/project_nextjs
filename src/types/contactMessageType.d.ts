export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  subject?: string;
  preview: string;
  type: "inbox" | "deleted" | "spam";
  subType?: "feedback" | "bug" | "suggestion" | "share";
  createdAt: string;
  read: boolean;
}
