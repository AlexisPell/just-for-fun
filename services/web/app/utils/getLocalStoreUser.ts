import { LS_USER_KEY } from '../constants/localStoreKeys';
import { IUser } from '../interfaces/user';

export const getLocalStoreUser = (): IUser | null => {
  const user: string | null = localStorage.getItem(LS_USER_KEY);
  if (!user) return null;
  return JSON.parse(user);
};
