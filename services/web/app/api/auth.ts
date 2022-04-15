import axios from 'axios';
import { IUser } from '../interfaces/user';
import { getAxiosErrorResponse, IHttpErrorResponse } from '../utils/getAxiosErrorResponse';

const register = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<IUser | IHttpErrorResponse> => {
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
}): Promise<IUser | IHttpErrorResponse> => {
  try {
    const res = await axios.post(`/auth/login`, { email, password });
    return res.data;
  } catch (error) {
    console.error('🚀 ~ file: auth.ts ~ authApi.login ~ error', getAxiosErrorResponse(error));
    return getAxiosErrorResponse(error);
  }
};

const getMe = async (): Promise<IUser | IHttpErrorResponse> => {
  try {
    const res = await axios.get(`/auth/me`);
    return res.data as IUser;
  } catch (error) {
    console.error('🚀 ~ file: auth.ts ~ authApi.getMe ~ error', getAxiosErrorResponse(error));
    return getAxiosErrorResponse(error);
  }
};

export const authApi = {
  register,
  login,
  getMe,
};
