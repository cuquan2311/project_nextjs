import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserAccount = {
  fullName: string;
  email: string;
  password: string;
  avatar?: string;
  confirmPassword: string;
};

type AuthState = {
  userAcccout: UserAccount | null;
  registeredUsers: UserAccount[];
  isAuthenticated: boolean;
  register: (userAcccout: UserAccount) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (updatedUser: Partial<UserAccount>) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userAcccout: null,
      registeredUsers: [],
      isAuthenticated: false,

      register: (user) =>
        set((state) => ({
          registeredUsers: [...state.registeredUsers, user],
        })),

      login: (email, password) => {
        const foundUser = get().registeredUsers.find(
          (u) => u.email === email && u.password === password
        );
        if (foundUser) {
          set({
            userAcccout: foundUser,
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },

      logout: () => set({ userAcccout: null, isAuthenticated: false }),

      updateUser: (updatedUser) => {
        const current = get().userAcccout;
        if (!current) return;

        const newUser = { ...current, ...updatedUser };

        set((state) => ({
          userAcccout: newUser,
          registeredUsers: state.registeredUsers.map((u) =>
            u.email === current.email ? newUser : u
          ),
        }));
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
