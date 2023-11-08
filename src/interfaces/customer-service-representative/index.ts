import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CustomerServiceRepresentativeInterface {
  id?: string;
  user_id: string;
  availability_status?: boolean;
  total_tickets_solved?: number;
  average_rating?: number;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface CustomerServiceRepresentativeGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
