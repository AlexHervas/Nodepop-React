import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import storage from "./utils/storage.ts";
import { setAuthorizationHeader } from "./api/client.ts";
import { AuthProvider } from "./pages/auth/AuthProvider.tsx";
import "./index.css";

// Obtiene el token de acceso desde el almacenamiento local (o de sesión) usando la clave 'auth'
const accessToken = storage.get("auth");

// Si el token de acceso existe, lo establece en los encabezados de autorización para futuras solicitudes
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

// Renderiza la aplicación en el DOM
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {" "}
    {/* Habilita el modo estricto para la aplicación, ayuda a detectar problemas en el desarrollo */}
    <BrowserRouter>
      {" "}
      {/* Configura el enrutamiento de la aplicación con React Router */}
      {/* El AuthProvider proporciona el estado de autenticación a toda la aplicación */}
      <AuthProvider defaultIsLogged={!!accessToken}>
        {" "}
        {/* Pasa el estado de autenticación basado en si hay un token */}
        <App /> {/* Renderiza el componente principal de la aplicación */}
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
