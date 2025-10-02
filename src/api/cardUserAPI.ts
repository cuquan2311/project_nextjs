import { CardUserType } from "@/types/cardUserType";
import api from "./gobalAPI";

export const getUsersCard = async (): Promise<CardUserType[]> => {
  const res = await api.get("http://localhost:4000/users");
  console.log("🚀 ~ getUsersCard ~ res:", res.data);
  return res.data.users;
};
