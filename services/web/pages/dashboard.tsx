import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { storageService } from '../app/services/storage';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

interface DashboardPageProps {}
const DashboardPage: NextPage<DashboardPageProps> = () => {
  useEffect(() => {
    // if (typeof window !== 'undefined') {
    //   console.log(
    //     'MY USER FROM LOCALSTORAGE:',
    //     storageService.local.getItem(storageService.storageKeys.user)
    //   );
    // }
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
