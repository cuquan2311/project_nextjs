// store/useContactStore.ts
import { create } from "zustand";
import { ContactMessage } from "@/types/contactMessageType";
import { useNotificationStore } from "./NotificationStore";
import { MailApi } from "@/api/mailAPI";

interface ContactState {
  messages: ContactMessage[];
  loading: boolean;
  error: string | null;

  fetchMessages: () => Promise<void>;
  addMessage: (msg: Omit<ContactMessage, "id" | "createdAt">) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  clearMessages: () => void;
  setMessages: (messages: ContactMessage[]) => void;
}

export const useContactStore = create<ContactState>((set, get) => ({
  messages: [],
  loading: false,
  error: null,

  fetchMessages: async () => {
    set({ loading: true, error: null });
    try {
      const res = await MailApi.getAllMails();

      const mappedData: ContactMessage[] = res.data.map((item: any) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        subject: item.subject,
        message: item.message,
        preview: item.message?.slice(0, 50) || "",
        read: item.read,
        type: item.type,
        subType: item.subType,
        createdAt: item.createdAt,
      }));

      set({ messages: mappedData, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch messages", loading: false });
    }
  },
  addMessage: async (msg) => {
    try {
      set({ loading: true, error: null });
      const data = await MailApi.createMail(msg);

      useNotificationStore
        .getState()
        .addNotification(
          "mail",
          `Bạn có mail từ ${msg.name}`,
          msg.subject ?? ""
        );

      set({ messages: [...get().messages, data] });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message });
        console.error("Add message failed:", err.message);
      } else {
        set({ error: "Unknown error occurred" });
      }
    } finally {
      set({ loading: false });
    }
  },

  deleteMessage: async (id) => {
    try {
      await MailApi.deleteMail(id);
      set({
        messages: get().messages.filter((m) => m.id !== id),
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message });
        console.error("Delete message failed:", err.message);
      } else {
        set({ error: "Unknown error occurred" });
      }
    }
  },

  clearMessages: () => set({ messages: [] }),
  setMessages: (messages) => set({ messages }),
}));
