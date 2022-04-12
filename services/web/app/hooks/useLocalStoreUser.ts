import useLocalStorageState from 'use-local-storage-state';
import { LS_USER_KEY } from '../constants/localStoreKeys';
import { IUser } from '../interfaces/user';

type ReturnType = [user: IUser | null, setUser: (u: IUser) => IUser];
export const useLocalStoreUser = (): ReturnType => {
  const [user, setUser] = useLocalStorageState(LS_USER_KEY, { ssr: true });
  return [user, setUser] as ReturnType;
};
