import { createContext, useContext } from "react";

// Interface to define the structure for the context of authentication
interface AuthContextValue {
  isLogged: false;
  onLogin: () => void;
  onLogout: () => void;
}

// Context creation with default values
export const AuthContext = createContext<AuthContextValue>({
  isLogged: false,
  onLogin: () => {},
  onLogout: () => {},
});

// Custom hook creation to use the context
export function useAuth() {
  const authValue = useContext(AuthContext);
  return authValue;
}
