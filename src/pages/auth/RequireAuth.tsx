import type { ReactNode } from "react";
import { useAuth } from "./context";
import { Navigate, useLocation } from "react-router-dom";

// Componente RequireAuth que protege rutas y asegura que solo los usuarios autenticados puedan acceder a ciertos contenidos
function RequireAuth({ children }: { children: ReactNode }) {
  // Accede al estado de autenticación desde el contexto de autenticación
  const { isLogged } = useAuth();

  // Obtiene la ubicación actual de la página usando 'useLocation' (necesario para redirigir después del login)
  const location = useLocation();

  // Si el usuario está logueado, renderiza los 'children' (componente protegido)
  return isLogged ? (
    children
  ) : (
    // Si el usuario no está logueado, redirige a la página de login
    // 'state' se usa para almacenar la URL de la página que el usuario intentaba visitar antes de ser redirigido
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}

export default RequireAuth;
