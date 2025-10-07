import { ContactMessage } from "@/types/contactMessageType";
import api from "./gobalAPI";

export const MailApi = {
  getAllMails: async (): Promise<ContactMessage[]> => {
    const res = await api.get("/mails");
    return res.data;
  },
};
