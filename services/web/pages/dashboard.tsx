import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLocalStoreUser } from '../app/hooks/useLocalStoreUser';
import { SocketClient } from '../app/services/ws';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

interface DashboardPageProps {}
const DashboardPage: NextPage<DashboardPageProps> = () => {
  useAuthentication();

  useEffect(() => {
    const socket = new SocketClient();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard | Chat app</title>
      </Head>
      <div>My dashboard</div>
    </>
  );
};

export default DashboardPage;

function useAuthentication() {
  const [user, setUser] = useLocalStoreUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace('login');
  }, [user]);
}
