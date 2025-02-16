import { ReactNode, useState } from "react";
import { AuthContext } from "./context";

// Definición de las propiedades que recibe el componente AuthProvider
interface Props {
  defaultIsLogged: boolean; // Valor inicial del estado de autenticación
  children: ReactNode; // Los componentes que se van a envolver y tendrán acceso al contexto
}

// Componente AuthProvider que proporciona el contexto de autenticación
export function AuthProvider({ defaultIsLogged, children }: Props) {
  // Estado para gestionar si el usuario está logueado o no
  const [isLogged, setIsLogged] = useState(defaultIsLogged);

  // Función para manejar el inicio de sesión (cambia el estado a 'true')
  const handleLogin = () => {
    setIsLogged(true);
  };

  // Función para manejar el cierre de sesión (cambia el estado a 'false')
  const handleLogout = () => {
    setIsLogged(false);
  };

  // Objeto que contiene el estado de autenticación y las funciones para modificarlo
  const authValue = {
    isLogged, // Estado actual de autenticación (si está logueado)
    onLogin: handleLogin, // Función para iniciar sesión
    onLogout: handleLogout, // Función para cerrar sesión
  };

  // El proveedor del contexto que hace disponible el valor authValue a los componentes hijos
  return (
    <AuthContext.Provider value={authValue}>
      {children} {/* Los componentes hijos que pueden acceder al contexto */}
    </AuthContext.Provider>
  );
}
