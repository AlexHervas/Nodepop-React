import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import configureStore from "./store";
import { Provider } from "react-redux";

// Obtiene el token de acceso desde el almacenamiento local
const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

// Crea el router; en este ejemplo se usa una ruta comodín que renderiza <App />
const router = createBrowserRouter([{ path: "*", element: <App /> }]);

// Configura el store, pasando el estado inicial (con autenticación según el token) y el router
const store = configureStore({ auth: !!accessToken }, router);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
