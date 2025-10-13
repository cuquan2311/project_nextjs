import { AuthApi } from "@/api/authAPI";
import { UserAuth } from "@/types/authType";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: UserAuth | null;
  token: string | null;
  setAuth: (user: UserAuth, token: string) => void;
  updateUser: (updatedUser: Partial<UserAuth>) => void;
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
      updateUser: async (updateUser) => {
        const current = get().user;
        if (!current) return;

        try {
          const res = await AuthApi.updateUser(current._id, updateUser);
          set({ user: res });
        } catch (err) {
          console.error("Lỗi khi cập nhật User", err);
        }
      },
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "Data_user_Auth",
    }
  )
);
