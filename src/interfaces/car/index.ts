import { BookingInterface } from 'interfaces/booking';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface CarInterface {
  id?: string;
  company_id: string;
  model: string;
  year: number;
  color: string;
  license_plate: string;
  availability_status?: boolean;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  company?: CompanyInterface;
  _count?: {
    booking?: number;
  };
}

export interface CarGetQueryInterface extends GetQueryInterface {
  id?: string;
  company_id?: string;
  model?: string;
  color?: string;
  license_plate?: string;
}
