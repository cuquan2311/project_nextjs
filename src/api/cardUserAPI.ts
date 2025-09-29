import { CardUserType } from "@/types/cardUserType";
import { api } from "./gobalAPI";

export const getUsersCard = async (): Promise<CardUserType[]> => {
  const res = await api.get("/users?limit=15");
  return res.data.users;
};
