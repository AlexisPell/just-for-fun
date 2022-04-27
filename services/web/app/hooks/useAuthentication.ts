import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLocalStoreUser } from './useLocalStoreUser';

export function useAuthentication() {
  const [user, setUser] = useLocalStoreUser();
  console.log('🚀 ~ file: useAuthentication.ts ~ line 7 ~ useAuthentication ~ user', user);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace('login');
  }, []);
}
