import { User } from '../models/user.model';

export interface Egresos {
  transaction_id: string;
  amount: number;
  comment: string;
  createdDate: Date;
  sender: User;
  receiver: User;
}
