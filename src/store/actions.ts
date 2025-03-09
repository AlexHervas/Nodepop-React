import { isApiClientError } from "../api/client";
import { Credentials } from "../pages/auth/types";
import { getAdvert } from "./selectors"; // Selector para obtener un anuncio por id
import { Advert } from "../pages/adverts/types";
import { AppThunk } from ".";

// Tipos de acciones para autenticación
type AuthLoginPending = {
  type: "auth/login/pending";
};

type AuthLoginFulfilled = {
  type: "auth/login/fulfilled";
};

type AuthLoginRejected = {
  type: "auth/login/rejected";
  payload: Error;
};

type AuthLogout = {
  type: "auth/logout";
};

// Tipos de acciones para anuncios (adverts)
type AdvertsLoadedFulfilled = {
  type: "adverts/loaded/fulfilled";
  payload: { data: Advert[]; loaded: boolean };
};

type AdvertsCreatedFulfilled = {
  type: "adverts/created/fulfilled";
  payload: Advert;
};

type AdvertsDetailRejected = {
  type: "adverts/detail/rejected";
  payload: Error;
};

type AdvertsDeletedFulfilled = {
  type: "adverts/deleted/fulfilled";
  payload: string; // El id del anuncio borrado (en formato string)
};

// Tipo de acción para la UI (por ejemplo, para resetear errores)
type UiResetError = {
  type: "ui/reset-error";
};

type TagsLoadedFulfilled = {
  type: "FETCH_TAGS_SUCCESS";
  payload: string[];
};

// Acciones de autenticación
export const authLoginPending = (): AuthLoginPending => ({
  type: "auth/login/pending",
});

export const authLoginFulfilled = (): AuthLoginFulfilled => ({
  type: "auth/login/fulfilled",
});

export const authLoginRejected = (error: Error): AuthLoginRejected => ({
  type: "auth/login/rejected",
  payload: error,
});

export function authLogin(
  credentials: Credentials,
  localSavedToken: boolean,
): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api, router }) {
    dispatch(authLoginPending());
    try {
      // Se pasa el flag localSavedToken al servicio
      await api.auth.login(credentials, localSavedToken);
      dispatch(authLoginFulfilled());
      const to = router.state.location.state?.from ?? "/";
      router.navigate(to, { replace: true });
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(authLoginRejected(error));
      }
    }
  };
}

export const authLogout = (): AuthLogout => ({
  type: "auth/logout",
});

// Acciones para anuncios
export const advertsLoadedFulfilled = (
  adverts: Advert[],
  loaded?: boolean,
): AdvertsLoadedFulfilled => ({
  type: "adverts/loaded/fulfilled",
  payload: { data: adverts, loaded: !!loaded },
});

export function advertsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch, getState, { api }) {
    const state = getState();
    // Si ya se han cargado, no se vuelve a solicitar
    if (state.adverts.loaded) {
      return;
    }
    try {
      const adverts = await api.adverts.getLatestAdverts();
      dispatch(advertsLoadedFulfilled(adverts, true));
    } catch (error) {
      console.error(error);
      // Aquí podrías despachar una acción de error para adverts
    }
  };
}

export const advertsDetailRejected = (error: Error): AdvertsDetailRejected => ({
  type: "adverts/detail/rejected",
  payload: error,
});

export function advertLoaded(advertId: string): AppThunk<Promise<void>> {
  return async function (dispatch, getState, { api }) {
    const state = getState();
    if (getAdvert(advertId)(state)) {
      return;
    }
    try {
      const advert = await api.adverts.getAdvert(advertId);
      console.log("Advert loaded from API:", advert);
      dispatch(advertsLoadedFulfilled([advert], true));
    } catch (error) {
      if (isApiClientError(error)) {
        dispatch(advertsDetailRejected(error));
      }
    }
  };
}
export const advertsCreatedFulfilled = (
  advert: Advert,
): AdvertsCreatedFulfilled => ({
  type: "adverts/created/fulfilled",
  payload: advert,
});

export function advertsCreate(
  advertContent: FormData,
): AppThunk<Promise<Advert>> {
  return async function (dispatch, _getState, { api, router }) {
    try {
      const createdAdvert = await api.adverts.createAdvert(advertContent);
      const advert = await api.adverts.getAdvert(createdAdvert.id.toString());
      dispatch(advertsCreatedFulfilled(advert));
      await router.navigate(`/adverts/${createdAdvert.id}`);
      return advert;
    } catch (error) {
      if (isApiClientError(error)) {
        // Aquí podrías despachar una acción de error para creación de adverts
      }
      throw error;
    }
  };
}

export const advertsDeletedFulfilled = (
  advertId: string,
): AdvertsDeletedFulfilled => ({
  type: "adverts/deleted/fulfilled",
  payload: advertId,
});

export const uiResetError = (): UiResetError => ({
  type: "ui/reset-error",
});

export const tagsLoadedFulfilled = (tags: string[]): TagsLoadedFulfilled => ({
  type: "FETCH_TAGS_SUCCESS",
  payload: tags,
});

export function tagsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api }) {
    try {
      const data = await api.adverts.getTags();
      dispatch(tagsLoadedFulfilled(data.tags));
    } catch (error) {
      console.error("Error loading tags:", error);
    }
  };
}

export type Actions =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogout
  | AdvertsLoadedFulfilled
  | AdvertsCreatedFulfilled
  | AdvertsDetailRejected
  | AdvertsDeletedFulfilled
  | UiResetError
  | TagsLoadedFulfilled;
