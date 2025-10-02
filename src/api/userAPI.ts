import { User, UserInput, UpdateUser } from "@/types/userType";
import api from "./gobalAPI";

export const UserApi = {
  // Lấy tất cả users
  getAllUsers: async (): Promise<User[]> => {
    const res = await api.get("/users");
    return res.data;
  },

  // Lấy user theo id
  getUserByID: async (id: string): Promise<User> => {
    const res = await api.get(`/users/${id}`);
    return res.data;
  },

  // Thêm user
  addUser: async (user: UserInput): Promise<User> => {
    const res = await api.post("/users", user);
    return res.data;
  },

  // Cập nhật user
  updateUser: async (id: string, user: UpdateUser): Promise<User> => {
    const res = await api.put(`/users/${id}`, user);
    return res.data;
  },

  // Xóa user
  deleteUser: async (id: string): Promise<User> => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  },
};
