export type CardUserType = {
  id: number;
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  address: {
    country: string;
  };
  ip: string;
  image?: string;
  role?: string;
};
