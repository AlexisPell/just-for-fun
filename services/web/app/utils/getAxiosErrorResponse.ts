import { get } from 'lodash';

export const getAxiosErrorResponse = (error: any): IHttpErrorResponse => {
  return get(error, 'response') && get(error, 'response');
};
export interface IHttpErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
