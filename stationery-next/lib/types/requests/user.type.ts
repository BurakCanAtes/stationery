export interface ISignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUpdateUserRequest {
  firstName: string;
  lastName: string;
}