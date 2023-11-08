import { FeedbackInterface } from 'interfaces/feedback';
import { UserInterface } from 'interfaces/user';
import { CarInterface } from 'interfaces/car';
import { GetQueryInterface } from 'interfaces';

export interface BookingInterface {
  id?: string;
  user_id: string;
  car_id: string;
  start_time: any;
  end_time: any;
  booking_status: string;
  total_cost: number;
  created_at?: any;
  updated_at?: any;
  feedback?: FeedbackInterface[];
  user?: UserInterface;
  car?: CarInterface;
  _count?: {
    feedback?: number;
  };
}

export interface BookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  car_id?: string;
  booking_status?: string;
}
