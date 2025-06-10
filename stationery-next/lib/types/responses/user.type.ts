export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

// TODO: update wishlist and addresses types
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string | null;
  role: UserRoles;
  wishlist: any[];
  addresses: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IAuthResponse {
  jwt?: {
    token: string;
  };
  user?: User;
  error?: string;
}