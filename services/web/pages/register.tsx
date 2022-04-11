import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';

export const getServerSideProps: GetServerSideProps = async () => {
  console.log('Back Vars:', process.env.BACKEND_API);

  console.log('PATH URL', `${process.env.BACKEND_API}/auth/me`);
  let me = null;
  try {
    // let url = `${process.env.BACKEND_API}/auth/me`
    let url = 'http://localhost:5000/api/v1/auth/me';
    // me = await axios.get(url);
    me = await fetch(url).then((r) => r.json());
    console.log(
      '🚀 ~ file: register.tsx ~ line 10 ~ constgetServerSideProps:GetServerSideProps= ~ me',
      me
    );
  } catch (error) {
    console.log(
      '🚀 ~ file: register.tsx ~ line 17 ~ constgetServerSideProps:GetServerSideProps= ~ error',
      error
    );
  }

  return {
    props: { me },
  };
};

interface RegisterPageProps {
  me: any;
}
const RegisterPage: NextPage<RegisterPageProps> = ({ me }) => {
  console.log('🚀 ~ file: register.tsx ~ line 68 ~ me', me);
  type IFieldValues = { email: string; password: string };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFieldValues>();

  const onHandleValid: SubmitHandler<IFieldValues> = (data) => {
    console.log('Data:', data);
  };

  return (
    <>
      <Head>
        <title>Register | Chat app</title>
      </Head>
      <div className='w-screen h-screen bg-blue-600 flex justify-center items-center'>
        <form
          onSubmit={handleSubmit(onHandleValid)}
          className='grid grid-cols-1 place-items-center gap-3 bg-blue-300 rounded-lg w-96 h-fit py-6 px-3'
        >
          <input
            className='input input-bordered w-full max-w-xs'
            type='email'
            placeholder='Email'
            {...register('email', { required: { value: true, message: 'Email is required' } })}
          />
          <p className='text-red-500'>{errors.email?.message}</p>
          <input
            className='input input-bordered w-full max-w-xs'
            type='password'
            placeholder='Password'
            {...register('password', {
              minLength: {
                value: 6,
                message: "Password's length must 6 chars at least",
              },
            })}
          />
          <p className='text-red-500'>{errors.password?.message}</p>
          <button className='btn' type='submit'>
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
