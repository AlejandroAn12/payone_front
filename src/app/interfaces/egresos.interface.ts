import { Transaction } from '../models/transaction.model';
import { User } from '../models/user.model';

export interface Egresos {
  transaction_id: string;
  amount: number;
  comment: string;
  createdDate: Date;
  sender: User;
  type_movement: any;
  receiver: User;
  pdfFileName: string
}
