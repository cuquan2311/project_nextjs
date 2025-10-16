import { AuthApi } from "@/api/authAPI";
import { UserAuth } from "@/types/authType";
import { create } from "zustand";

interface AuthState {
  user: UserAuth | null;
  token: string | null;
  setAuth: (user: UserAuth, token: string) => void;
  updateUser: (
    _id: string,
    data: Partial<UserAuth> | FormData
  ) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  setAuth: (user, token) => {
    console.log("🚀 ~ user:", user);
    console.log("🚀 ~ token:", token);
    return set({ user, token });
  },
  updateUser: async (
    _id: string,
    updatedUser: Partial<UserAuth> | FormData
  ) => {
    try {
      let res;
      if (updatedUser instanceof FormData) {
        res = await AuthApi.updateUser(_id, updatedUser, true);
      } else {
        res = await AuthApi.updateUser(_id, updatedUser);
      }
      set({ user: res });
    } catch (err) {
      console.error("Lỗi khi cập nhật user:", err);
    }
  },
  logout: () => set({ user: null, token: null }),
}));
