export interface UserDto {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  phone: string;
  date_naissance?: string;
  tryCount?: number;
  lastConnection?: number;
  role: any;
  id?: string;
}
