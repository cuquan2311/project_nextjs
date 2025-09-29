export type User = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  image: string;
  role?: string;
  country?: string;
};

export type UserInput = Omit<UserInput, "id">;
export type UpdateUser = Partial<UpdateUser>;
