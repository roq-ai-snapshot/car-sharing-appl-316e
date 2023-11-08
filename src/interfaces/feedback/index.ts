import { UserInterface } from 'interfaces/user';
import { BookingInterface } from 'interfaces/booking';
import { GetQueryInterface } from 'interfaces';

export interface FeedbackInterface {
  id?: string;
  user_id: string;
  booking_id: string;
  rating: number;
  comments?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  booking?: BookingInterface;
  _count?: {};
}

export interface FeedbackGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  booking_id?: string;
  comments?: string;
}
