import api from "@/api/gobalAPI";
import { create } from "zustand";
import { UserInput, UpdateUser, User } from "@/types/userType";
import { UserApi } from "@/api/userAPI";

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

interface UserActions {
  fetchUsers: () => Promise<void>;
  addUser: (user: UserInput) => Promise<void>;
  updateUser: (id: string, user: UpdateUser) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

export const useUserStore = create<UserState & UserActions>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await UserApi.getAllUsers();
      set({ users: data, isLoading: false });
    } catch {
      set({ error: "Failed to fetch users.", isLoading: false });
    }
  },

  addUser: async (user: UserInput) => {
    try {
      const data = await UserApi.addUser(user);
      set((state) => ({ users: [...state.users, data] }));
    } catch {
      set({ error: "Failed to add user." });
    }
  },

  updateUser: async (id: string, user: UpdateUser) => {
    try {
      const data = await UserApi.updateUser(id, user);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? data : u)),
      }));
    } catch {
      set({ error: "Failed to update user." });
    }
  },

  deleteUser: async (id) => {
    try {
      await UserApi.deleteUser(id);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      }));
    } catch {
      set({ error: "Failed to delete user." });
    }
  },
}));
