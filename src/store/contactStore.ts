// store/useContactStore.ts
import { ContactMessage } from "@/types/contactMessageType";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useNotificationStore } from "./NotificationStore";

interface ContactState {
  messages: ContactMessage[];
  addMessage: (msg: Omit<ContactMessage, "id" | "createdAt">) => void;
  clearMessages: () => void;
}

export const useContactStore = create<ContactState>()(
  persist(
    (set, get) => ({
      messages: [],

      addMessage: (msg) => {
        const newMessage: ContactMessage = {
          id: crypto.randomUUID(),
          ...msg,
          createdAt: new Date().toISOString(),
        };
        const updated = [...get().messages, newMessage];

        // thêm notification khi có mail mới
        useNotificationStore
          .getState()
          .addNotification(
            "mail",
            `Bạn có mail từ ${msg.name}`,
            msg.subject ?? ""
          );

        set({ messages: updated });
      },

      clearMessages: () => set({ messages: [] }),
    }),
    { name: "contact-messages" }
  )
);
