import { client } from '../../api/client';
import type { Advert } from './types';

const advertsUrl = '/api/v1/adverts';

export const getLatestAdverts = async () => {
  const response = await client.get<Advert[]>(advertsUrl);
  console.log(response)
  return response.data;
};