import axios from 'axios';
import { IUser } from '../interfaces/user';
import { getAxiosErrorResponse } from '../utils/getAxiosErrorResponse';

const register = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<IUser | null> => {
  try {
    const res = await axios.post(`/auth/register`, { email, password });
    return res.data;
  } catch (error) {
    console.error(
      '🚀 ~ file: auth.ts ~ line 11 ~ authApi.register ~ error',
      getAxiosErrorResponse(error)
    );
    return getAxiosErrorResponse(error);
  }
};

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<IUser | null> => {
  try {
    const res = await axios.post(`/auth/login`, { email, password });
    return res.data;
  } catch (error) {
    console.error('🚀 ~ file: auth.ts ~ authApi.login ~ error', getAxiosErrorResponse(error));
    return null;
  }
};

const getMe = async () => {
  try {
    const res = await axios.get(`/auth/me`);
    return res.data;
  } catch (error) {
    console.error('🚀 ~ file: auth.ts ~ authApi.getMe ~ error', getAxiosErrorResponse(error));
    return null;
  }
};

// const registerAtom = atom(
//   async (get) => {
//   try {
//     const res = await axios.post(environment.BACKEND_API, { email, password });
//     return res.data
//   } catch (error) {
//     console.log('🚀 ~ file: auth.ts ~ line 11 ~ authApi.register= ~ error', error);
//     return null;
//   }
//   }
// )

export const authApi = {
  register,
  login,
  getMe,
  // registerAtom
};
