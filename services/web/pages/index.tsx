import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

interface HomePageProps {
  penis: string;
}
const HomePage: NextPage<HomePageProps> = ({ penis }) => {
  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
      <div>
        <h1 className='text-3xl font-bold underline'>Goodbye world!</h1>
      </div>
    </>
  );
};

export default HomePage;
