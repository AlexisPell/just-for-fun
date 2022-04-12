import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';
import { authApi } from '../app/api/auth';
import { useState } from 'react';
import { storageService } from '../app/services/storage';

interface LoginPageProps {}
const LoginPage: NextPage<LoginPageProps> = () => {
  const router = useRouter();
  type IFieldValues = { email: string; password: string };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFieldValues>();
  const [error, setError] = useState('');

  const onHandleValid: SubmitHandler<IFieldValues> = async (data) => {
    const user = await authApi.login(data);
    if ((user as any)?.status) {
      return setError((user as any).data.message);
    }
    storageService.local.setItem(storageService.storageKeys.user, user);
    return router.push('dashboard');
  };

  return (
    <>
      <Head>
        <title>Login | Chat app</title>
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
            Login
          </button>
          <p className='text-red-500'>{error}</p>
          <div
            className='text-gray-700 text-sm w-full text-right pr-6 cursor-pointer'
            onClick={() => router.push('register')}
          >
            Dont have an account? <span className='underline'>Sign up</span>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
