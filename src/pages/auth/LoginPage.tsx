import { useState } from "react";
import Button from "../../components/shared/Button";
import { ApiClientError } from "../../api/error";
import { isApiClientError } from "../../api/client";
import FormField from "../../components/shared/FormField";
import "./LoginPage.css";

// Importamos el hook tipado para dispatch y la acción asíncrona authLogin
import { useAppDispatch } from "../../store";
import { authLogin } from "../../store/actions";

function LoginPage() {
  // Hook para despachar acciones a Redux
  const dispatch = useAppDispatch();

  // Estados locales para email, password, checkbox de "save credentials", error y loading
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localSavedToken, setLocalSavedToken] = useState(false);
  const [error, setError] = useState<ApiClientError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Función que maneja el envío del formulario de login
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // Despachamos el thunk authLogin, pasándole las credenciales y el flag localSavedToken
      await dispatch(authLogin({ email, password }, localSavedToken) as any);
      // La acción authLogin se encarga de la navegación (redirige según el estado del router)
    } catch (error) {
      if (isApiClientError(error)) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Manejo de cambios en los campos de email y password, y el checkbox
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLocalSavedTokenChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLocalSavedToken(event.target.checked);
  };

  // Se deshabilita el botón de login si faltan datos o si está cargando
  const isDisabled = !email || !password || isLoading;

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
          {/* Campos para email y password */}
          <FormField
            type="email"
            name="email"
            label="Email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
          <FormField
            type="password"
            name="password"
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />

          {/* Opción para guardar credenciales localmente */}
          <div className="local-saved-token">
            <input
              type="checkbox"
              id="localSavedToken"
              checked={localSavedToken}
              onChange={handleLocalSavedTokenChange}
            />
            <label htmlFor="localSavedToken">Save credentials</label>
          </div>

          {/* Botón de envío */}
          <Button
            type="submit"
            disabled={isDisabled}
            className="loginBtn-submit"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </form>

        {/* Mensaje de error en el login */}
        {error && (
          <div className="login-error" onClick={() => setError(null)}>
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
