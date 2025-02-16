import Button from "../../components/shared/Button";
import { useAuth } from "../../pages/auth/context";
import { logout } from "../../pages/auth/service";

// Componente AuthButton que muestra un botón de "Login" o "Logout" según el estado de autenticación
export default function AuthButton() {
  // Accede al estado de autenticación y a la función onLogout desde el contexto de autenticación
  const { isLogged, onLogout } = useAuth();

  // Función para manejar el clic en el botón de logout
  const handleLogoutClick = async () => {
    // Realiza el proceso de logout (puede ser una llamada a la API o lógica interna)
    await logout();
    // Actualiza el estado de autenticación en el contexto, marcando al usuario como no logueado
    onLogout();
  };

  // Renderiza el botón dependiendo de si el usuario está logueado o no
  return isLogged ? (
    // Si está logueado, muestra el botón de "Logout"
    <Button onClick={handleLogoutClick} $variant="secondary">
      Logout
    </Button>
  ) : (
    // Si no está logueado, muestra el botón de "Login"
    <Button $variant="primary">Login</Button>
  );
}
