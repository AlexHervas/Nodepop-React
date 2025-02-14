import Button from "../../components/shared/Button";
import { useAuth } from "../../pages/auth/context";
import { logout } from "../../pages/auth/service";

export default function AuthButton() {
  const { isLogged, onLogout } = useAuth();

  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return isLogged ? (
    <Button onClick={handleLogoutClick} $variant="secondary">
      Logout
    </Button>
  ) : (
    <Button $variant="primary">Login</Button>
  );
}