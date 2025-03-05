import { useState } from "react";
import Button from "../../components/shared/Button";
import { useAuth } from "../../pages/auth/context";
import { logout } from "../../pages/auth/service";
import ConfirmDialog from "../../components/shared/ConfirmDialog";

// Componente AuthButton que muestra un botón de "Login" o "Logout" según el estado de autenticación
export default function AuthButton() {
  // Accede al estado de autenticación y a la función onLogout desde el contexto de autenticación
  const { isLogged, onLogout } = useAuth();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  // Función para manejar la apertura del diálogo de confirmación cuando se hace click en logout
  const handleDialogOpen = () => {
    setIsLogoutDialogOpen(true);
  };

  // Si el usuario confirma, se realiza el logout y se actualiza el contexto
  const handleConfirmLogout = async () => {
    setIsLogoutDialogOpen(false);
    // Realiza el proceso de logout (puede ser una llamada a la API o lógica interna)
    await logout();
    // Actualiza el estado de autenticación en el contexto, marcando al usuario como no logueado
    onLogout();
  };

  const handleCancelLogout = () => {
    setIsLogoutDialogOpen(false);
  };

  // Renderiza el botón dependiendo de si el usuario está logueado o no
  return isLogged ? (
    // Si está logueado, muestra el botón de "Logout", se maneja la confirmación
    <>
      <Button onClick={handleDialogOpen} $variant="secondary">
        Logout
      </Button>
      <ConfirmDialog
        isOpen={isLogoutDialogOpen}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
        confirmButtonText="Logout"
      />
    </>
  ) : (
    // Si no está logueado, muestra el botón de "Login"
    <Button $variant="primary">Login</Button>
  );
}
