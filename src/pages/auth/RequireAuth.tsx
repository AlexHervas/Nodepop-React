import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store";
import { getIsLogged } from "../../store/selectors";

function RequireAuth({ children }: { children: ReactNode }) {
  // Extraemos isLogged desde el store de Redux
  const isLogged = useAppSelector(getIsLogged);
  const location = useLocation();

  return isLogged ? (
    children
  ) : (
    // Al redirigir, se guarda la ruta actual en state.from para volver a ella después del login
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}

export default RequireAuth;
