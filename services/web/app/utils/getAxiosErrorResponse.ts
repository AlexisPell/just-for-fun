import { get } from 'lodash';

export const getAxiosErrorResponse = (error: any) => {
  return get(error, 'response') && get(error, 'response');
};
