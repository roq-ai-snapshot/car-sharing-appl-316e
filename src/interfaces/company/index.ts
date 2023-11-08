import { CarInterface } from 'interfaces/car';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  location?: string;
  established_year?: number;
  contact_number?: string;
  website_url?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  car?: CarInterface[];
  user?: UserInterface[];

  _count?: {
    car?: number;
    user?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  location?: string;
  contact_number?: string;
  website_url?: string;
  name?: string;
}
