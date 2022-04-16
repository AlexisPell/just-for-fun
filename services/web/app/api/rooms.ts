import axios from 'axios';
import { IRoom } from '../interfaces/room';
import { getAxiosErrorResponse, IHttpErrorResponse } from '../utils/getAxiosErrorResponse';

const getMyRooms = async (): Promise<IRoom[] | IHttpErrorResponse> => {
  try {
    const res = await axios.get('/');
    return res.data;
  } catch (error) {
    console.log('🚀 ~ file: rooms.ts ~ getMyRooms ~ error: ', getAxiosErrorResponse(error));
    return getAxiosErrorResponse(error);
  }
};

export const roomsApi = {
  getMyRooms,
};
