import { RootState } from ".";

// Selector para obtener el estado de autenticación
export const getIsLogged = (state: RootState) => state.auth;

// Selector para obtener la lista de anuncios
export const getAdverts = (state: RootState) => state.adverts.data || [];

// Selector para obtener un anuncio en particular por su id
export const getAdvert = (advertId: string) => (state: RootState) =>
  state.adverts.data?.find((advert) => advert.id === advertId);

// Selector para obtener la información de la UI (estado de error, pending, etc.)
export const getUi = (state: RootState) => state.ui;
