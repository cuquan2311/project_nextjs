import { AuthApi } from "@/api/authAPI";
import { UserAuth } from "@/types/authType";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: UserAuth | null;
  token: string | null;
  setAuth: (user: UserAuth, token: string) => void;
  updateUser: (data: Partial<UserAuth> | FormData) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        console.log("🚀 ~ user:", user);
        console.log("🚀 ~ token:", token);
        return set({ user, token });
      },
      updateUser: async (updatedUser: Partial<UserAuth> | FormData) => {
        const current = get().user;
        if (!current) return;

        try {
          let res;
          if (updatedUser instanceof FormData) {
            res = await AuthApi.updateUser(current._id, updatedUser, true);
          } else {
            res = await AuthApi.updateUser(current._id, updatedUser);
          }
          set({ user: res });
        } catch (err) {
          console.error("Lỗi khi cập nhật user:", err);
        }
      },
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "Data_user_Auth",
    }
  )
);
