import { useState } from "react";
import Button from "../../components/shared/Button";
import ConfirmDialog from "../../components/shared/ConfirmDialog";
import { useAppDispatch, useAppSelector } from "../../store";
import { authLogout } from "../../store/actions"; // Acción de logout definida en actions.ts
import { logout } from "../../pages/auth/service"; // Servicio para logout

export default function AuthButton() {
  // Obtenemos el estado de autenticación desde Redux
  const isLogged = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  // Abre el diálogo de confirmación para logout
  const handleDialogOpen = () => {
    setIsLogoutDialogOpen(true);
  };

  // Si el usuario confirma, se realiza el logout
  const handleConfirmLogout = async () => {
    setIsLogoutDialogOpen(false);
    // Llamada al servicio para limpiar el token y la configuración del header
    await logout();
    // Despacha la acción para actualizar el estado de autenticación
    dispatch(authLogout());
  };

  // Cierra el diálogo sin realizar logout
  const handleCancelLogout = () => {
    setIsLogoutDialogOpen(false);
  };

  return isLogged ? (
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
    <Button $variant="primary">Login</Button>
  );
}
