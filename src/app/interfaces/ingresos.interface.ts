import { User } from '../models/user.model';

export interface Ingresos {
  transaction_id: string;
  amount: number;
  comment: string;
  createdDate: Date;
  sender: User;
  receiver: User;
}
