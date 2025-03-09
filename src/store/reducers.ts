import { Advert } from "../pages/adverts/types";
import { Actions } from "./actions";

// Definimos el estado global para esta parte de la aplicación
export type State = {
  auth: boolean;
  adverts: { data: Advert[] | null; loaded: boolean; tags: string[] };
  ui: {
    pending: boolean;
    error: Error | null;
  };
};

const defaultState: State = {
  auth: false,
  adverts: { data: null, loaded: false, tags: [] },
  ui: {
    pending: false,
    error: null,
  },
};

// Reducer para la autenticación
export function auth(
  state = defaultState.auth,
  action: Actions,
): State["auth"] {
  switch (action.type) {
    case "auth/login/fulfilled":
      return true;
    case "auth/logout":
      return false;
    default:
      return state;
  }
}

// Reducer para los anuncios
export function adverts(
  state = defaultState.adverts,
  action: Actions,
): State["adverts"] {
  switch (action.type) {
    case "adverts/loaded/fulfilled":
      return { ...action.payload, tags: state.tags };
    case "adverts/created/fulfilled":
      return { ...state, data: (state.data ?? []).concat(action.payload) };
    case "FETCH_TAGS_SUCCESS":
      return { ...state, tags: action.payload };
    case "adverts/deleted/fulfilled":
      return { 
        ...state, 
        data: state.data ? state.data.filter(advert => advert.id !== action.payload) : null 
      };
    default:
      return state;
  }
}

// Reducer para la UI
export function ui(state = defaultState.ui, action: Actions): State["ui"] {
  switch (action.type) {
    case "ui/reset-error":
      return { ...state, error: null };
    case "auth/login/pending":
      return { pending: true, error: null };
    case "auth/login/fulfilled":
      return { pending: false, error: null };
    case "auth/login/rejected":
      return { pending: false, error: action.payload };
    default:
      return state;
  }
}
