import { User } from 'src/users/user.document';

export enum STRATEGIES {
  LOCAL = 'local',
  GOOGLE = 'google',
}

export type Done = (err: Error | null, user: User | null) => void;
