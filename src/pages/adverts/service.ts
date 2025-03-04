import { client } from "../../api/client";
import type { Advert } from "./types";

// Definimos la URL base de la API para los anuncios
const advertsUrl = "/api/v1/adverts";

// Definimos la URL base para obtener los tags de la API
const tagsUrl = "/api/v1/adverts/tags";

/**
 * Obtiene la lista de los anuncios más recientes {Promise<Advert[]>} - Una promesa que resuelve con un array de anuncios.
 */
export const getLatestAdverts = async () => {
  const response = await client.get<Advert[]>(advertsUrl);
  console.log(response); // Muestra la respuesta en la consola (puede ser útil para depuración).
  return response.data; // Devuelve los datos obtenidos de la API.
};

/**
 * Crea un nuevo anuncio. {FormData} advert - Los datos del anuncio en formato FormData. {Promise<Advert>} - Una promesa que resuelve con el anuncio creado.
 */
export const createAdvert = async (advert: FormData) => {
  const response = await client.post<Advert>(advertsUrl, advert, {
    headers: {
      "Content-Type": "multipart/form-data", // Indica que se está enviando un formulario con archivos.
    },
  });
  return response.data;
};

/**
 * Obtiene un anuncio específico por su ID. {string} advertId - El ID del anuncio que se desea obtener. {Promise<Advert>} - Una promesa que resuelve con los datos del anuncio.
 */
export const getAdvert = async (advertId: string) => {
  const response = await client.get<Advert>(`${advertsUrl}/${advertId}`);
  return response.data;
};

/**
 * Elimina un anuncio por su ID. {string} advertId - El ID del anuncio que se desea eliminar. {Promise<Advert>} - Una promesa que resuelve con los datos del anuncio eliminado.
 */
export const deleteAdvert = async (advertId: string) => {
  const response = await client.delete<Advert>(`${advertsUrl}/${advertId}`);
  return response.data;
};

/**
 * Obtiene la lista de tags de la API.
 */

export const getTags = async () => {
  const response = await client.get<string[]>(`${tagsUrl}`);
  return { tags: response.data };
};
