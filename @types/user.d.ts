export interface CreateUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface LoginUser {
  email: string;
  password: string;
}
