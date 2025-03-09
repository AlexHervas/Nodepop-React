import { applyMiddleware, combineReducers, createStore } from "redux";
import * as reducers from "./reducers"; // Exporta tus reducers desde reducers.ts
import { useDispatch, useSelector } from "react-redux";
import type { State } from "./reducers";
import { composeWithDevTools } from "@redux-devtools/extension";
import * as thunk from "redux-thunk";
import { Actions } from "./actions";

import * as auth from "../pages/auth/service"; // Servicios de autenticación
import * as adverts from "../pages/adverts/service"; // Servicios para los anuncios
import { createBrowserRouter } from "react-router-dom";

// Definición del tipo Router
type Router = ReturnType<typeof createBrowserRouter>;

// Definimos el objeto Api con nuestros servicios
type Api = {
  auth: typeof auth;
  adverts: typeof adverts;
};

// Extra argument que se inyectará en los thunks
type ExtraArgument = {
  api: Api;
  router: Router;
};

// Middleware opcional para añadir un timestamp a cada acción
const timestamp = (_store: any) => (next: any) => (action: any) => {
  const newAction = {
    ...action,
    meta: {
      ...action.meta,
      timestamp: new Date(),
    },
  };
  return next(newAction);
};

// Middleware opcional para redireccionar según códigos de error en acciones rechazadas

const failureRedirects =
  (router: Router) => (_store: any) => (next: any) => (action: any) => {
    const result = next(action);

    if (!action.type.endsWith("/rejected")) {
      return result;
    }

    if (action.payload?.code === "NOT_FOUND") {
      return router.navigate("/404");
    }

    if (action.payload?.code === "UNAUTHORIZED") {
      return router.navigate("/login");
    }

    return result;
  };

// Configuración del store
export default function configureStore(
  preloadedState: Partial<State>,
  router: Router,
) {
  // Combinamos los reducers desde reducers.ts
  const rootReducer = combineReducers(reducers);

  const store = createStore(
    rootReducer,
    preloadedState as never,
    composeWithDevTools(
      applyMiddleware(
        // Inyectamos extraArgument para que los thunks puedan acceder a nuestros servicios y al router
        thunk.withExtraArgument<State, Actions, ExtraArgument>({
          api: { auth, adverts },
          router,
        }),
        timestamp,
        failureRedirects(router),
      ),
    ),
  );
  return store;
}

export type AppStore = ReturnType<typeof configureStore>;
export type AppGetState = AppStore["getState"];
export type RootState = ReturnType<AppGetState>;
export type AppDispatch = AppStore["dispatch"];

// Hooks tipados para usar en tus componentes
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// Tipo para las acciones asíncronas (thunks)
export type AppThunk<ReturnType = void> = thunk.ThunkAction<
  ReturnType,
  RootState,
  ExtraArgument,
  Actions
>;
