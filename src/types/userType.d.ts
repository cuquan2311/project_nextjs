export interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  image: string;
  role?: string;
  country?: string;
}

export type UserInput = Omit<User, "id" | "rating">;
export type UpdateUser = Partial<UserInput>;
