import { IUser } from './user';

export interface IRoom {
  id?: string;
  name?: string;
  description?: string;
  users?: IUser[];
  createdAt?: Date;
  updatedAt?: Date;
}
