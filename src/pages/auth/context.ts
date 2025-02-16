import { createContext, useContext } from "react";

// Definimos la interfaz AuthContextValue, que representa el estado y las funciones de autenticación.
interface AuthContextValue {
  isLogged: boolean; // Indica si el usuario está autenticado (true) o no (false)
  onLogin: () => void; // Función que maneja el inicio de sesión
  onLogout: () => void; // Función que maneja el cierre de sesión
}

// Creamos el contexto de autenticación con un valor por defecto.
// El valor por defecto establece que el usuario no está autenticado (isLogged: false)
// y define las funciones onLogin y onLogout como vacías.
export const AuthContext = createContext<AuthContextValue>({
  isLogged: false,
  onLogin: () => {}, // Función vacía que será reemplazada por una implementación real
  onLogout: () => {}, // Función vacía que será reemplazada por una implementación real
});

// Hook personalizado para acceder al contexto de autenticación en cualquier parte de la aplicación.
export function useAuth() {
  const authValue = useContext(AuthContext); // Obtiene el valor del contexto de autenticación
  return authValue; // Devuelve el objeto con el estado y las funciones de autenticación
}
