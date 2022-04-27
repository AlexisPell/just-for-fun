import { useEffect, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { LS_USER_KEY } from '../constants/localStoreKeys';
import { IUser } from '../interfaces/user';

// Doesnot prevent fails on window === 'undefined'
type ReturnType = [user: IUser | null, setUser: (u: IUser) => boolean];
export const useLocalStoreUser = (): ReturnType => {
  const [user, setUser] = useLocalStorageState<any>(LS_USER_KEY, { ssr: true });

  return [user, setUser] as ReturnType;
};

// Suits Front needs. Without SSR rendering problems
// Pulls user from LS and works with it in component
// Non permanent (in terms of LS)
export const useUser = (): ReturnType => {
  const [user, setUser] = useState<IUser | null>(null);
  const [_user, _setUser] = useLocalStoreUser();
  useEffect(() => {
    setUser(_user);
  }, [_setUser, _user]);

  return [user, _setUser] as ReturnType;
};
