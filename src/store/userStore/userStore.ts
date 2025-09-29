import { api } from "@/api/gobalAPI";
import { UpdateUser, User, UserInput } from "@/types/userType";
import { create } from "zustand";
interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

interface UserActions {
  fetchUsers: () => Promise<void>;
  addUser: (user: UserInput) => Promise<void>;
  updateUser: (id: number, data: UpdateUser) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const useUserStore = create<UserState & UserActions>((set) => ({
  users: [],
  isLoading: false,
  error: null,
  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/users?limit=10");
      set({ users: response.data.users, isLoading: false });
    } catch {
      set({ error: "Failed to fetch users.", isLoading: false });
    }
  },

  addUser: async (user) => {
    try {
      const response = await api.post("/users/add", JSON.stringify(user));
      set((state) => ({ users: [...state.users, response.data] }));
    } catch {
      set({ error: "Failed to add users." });
    }
  },

  updateUser: async (id, user) => {
    try {
      const response = await api.put(`/users/${id}`, JSON.stringify(user));
      set((state) => ({
        users: state.users.map((p) => (p.id === id ? response.data : p)),
      }));
    } catch {
      set({ error: "Failed to update users." });
    }
  },

  deleteUser: async (id) => {
    try {
      await api.delete(`/users/${id}`);
      set((state) => ({
        users: state.users.filter((p) => p.id !== id),
      }));
    } catch {
      set({ error: "Failed to delete product." });
    }
  },
}));
