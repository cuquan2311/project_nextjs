export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  read: boolean;
  type?: "inbox" | "deleted" | "spam";
  subType?: "feedback" | "bug" | "suggestion" | "share";
  preview: string;
}
