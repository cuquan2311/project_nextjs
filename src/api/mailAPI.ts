import { ContactMessage } from "@/types/contactMessageType";
import api from "./gobalAPI";

export const MailApi = {
  getAllMails: async (): Promise<ContactMessage[]> => {
    const res = await api.get("/mails");
    return res.data;
  },

  createMail: async (
    mail: Omit<ContactMessage, "id" | "createdAt">
  ): Promise<ContactMessage> => {
    const res = await api.post("/mails", mail);
    return res.data;
  },

  deleteMail: async (id: string): Promise<void> => {
    await api.delete(`mails/${id}`);
  },

  updateMail: async (
    id: string,
    mail: Partial<ContactMessage>
  ): Promise<ContactMessage> => {
    const res = await api.put(`mails/${id}`, mail);
    return res.data;
  },
};
