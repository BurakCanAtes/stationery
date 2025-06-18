import { Meta } from "../data.type";

export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

// TODO: update wishlist and addresses types
export interface User extends Meta {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string | null;
  role: UserRoles;
  wishlist: any[];
  addresses: any[];
}

export interface IAuthResponse {
  jwt?: {
    token: string;
  };
  user?: User;
  error?: string;
}

export interface IGetUserResponse {
  data: User;
}