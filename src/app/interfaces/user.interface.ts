export interface UserInterface {
  id?: string;
  code?: string;
  names?: string;
  surnames?: string;
  dni?: number;
  email?: string;
  phone?: string;
  isDelete?: boolean;
  admin?: null;
  createdDate?: Date;
  updatedDate?: Date;
}