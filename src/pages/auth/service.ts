import {
  client,
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "../../api/client";
import storage from "../../utils/storage";
import { Credentials, Login } from "./types";

// URL para la API de login
const loginUrl = "api/auth/login";

// Función para realizar el login
export const login = async (
  credentials: Credentials, // Credenciales de acceso (email y password)
  localSavedToken: boolean, // Si el token debe guardarse localmente (en almacenamiento local)
) => {
  // Realiza una solicitud POST a la API de login con las credenciales
  const response = await client.post<Login>(loginUrl, credentials);

  // Desestructura el accessToken de la respuesta de la API
  const { accessToken } = response.data;

  // Guarda el token de acceso en el almacenamiento local si localSavedToken es true
  storage.set("auth", accessToken, localSavedToken);

  // Establece el token de autorización en los encabezados para futuras solicitudes
  setAuthorizationHeader(accessToken);
};

// Función para realizar el logout
export const logout = async () => {
  // Elimina el token de acceso del almacenamiento local
  storage.remove("auth");

  // Elimina el token de los encabezados de autorización
  removeAuthorizationHeader();
};
