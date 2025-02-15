import { client } from '../../api/client';
import type { Advert } from './types';

const advertsUrl = '/api/v1/adverts';

export const getLatestAdverts = async () => {
  const response = await client.get<Advert[]>(advertsUrl);
  console.log(response)
  return response.data;
};

export const createAdvert = async (advert: FormData) => {
    const response = await client.post<Advert>(advertsUrl, advert, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };