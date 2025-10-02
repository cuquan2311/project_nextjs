// types/userType.ts
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  image: string;
}

// Kiểu dùng trên FE có id (từ BE)
export type UserInput = Omit<User, "id" | "rating">;
export type UpdateUser = Partial<UserInput>;
