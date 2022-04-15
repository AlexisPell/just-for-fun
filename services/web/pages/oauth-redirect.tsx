import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { authApi } from '../app/api/auth';
import { useLocalStoreUser } from '../app/hooks/useLocalStoreUser';
import { IUser } from '../app/interfaces/user';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

interface OAuthRedirectPageProps {}
const OAuthRedirectPage: NextPage<OAuthRedirectPageProps> = () => {
  const [user, setUser] = useLocalStoreUser();
  const router = useRouter();
  useEffect(() => {
    async function fetchMe() {
      const me = await authApi.getMe();
      if (me.id) {
        setUser(me as IUser);
        router.replace('dashboard');
      }
    }
    fetchMe();
  }, []);

  return (
    <>
      <Head>
        <title>Authorization | Chat App</title>
      </Head>
      <div>Loading...</div>
    </>
  );
};

export default OAuthRedirectPage;
