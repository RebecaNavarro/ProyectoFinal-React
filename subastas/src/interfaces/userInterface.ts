export interface User {
  id: string;
  role: string;
  password: string;
  token?: string;
  name: string;
}