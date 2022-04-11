import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

interface LoginPageProps {
  penis: string;
}
const LoginPage: NextPage<LoginPageProps> = ({ penis }) => {
  return (
    <>
      <Head>
        <title>Login | Chat app</title>
      </Head>
      <div>Login here</div>
    </>
  );
};

export default LoginPage;
