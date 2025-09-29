// store/NotificationStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NotificationType = "mail" | "user" | "product";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (
    type: NotificationType,
    title: string,
    message: string
  ) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],

      addNotification: (type, title, message) => {
        const newNoti: Notification = {
          id: crypto.randomUUID(),
          type,
          title,
          message,
          createdAt: new Date().toISOString(),
          read: false,
        };
        set({ notifications: [...get().notifications, newNoti] });
      },

      markAsRead: (id) =>
        set({
          notifications: get().notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }),

      clearAll: () => set({ notifications: [] }),
    }),
    { name: "notifications" }
  )
);
