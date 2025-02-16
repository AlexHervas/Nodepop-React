import { useState } from "react";
import Button from "../../components/shared/Button";
import { login } from "./service";
import { useAuth } from "./context";
import { ApiClientError } from "../../api/error";
import { isApiClientError } from "../../api/client";
import { useLocation, useNavigate } from "react-router-dom";
import FormField from "../../components/shared/FormField";
import "./LoginPage.css";

function LoginPage() {
  // Obtiene la ubicación actual de la página (para redirigir al usuario después de login)
  const location = useLocation();
  // Hook para navegar a diferentes rutas
  const navigate = useNavigate();

  // Estados para gestionar el valor de los campos de entrada (email, password)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para almacenar si el usuario desea guardar el token localmente
  const [localSavedToken, setLocalSavedToken] = useState(false);

  // Función onLogin desde el contexto de autenticación para cambiar el estado de login
  const { onLogin } = useAuth();

  // Estado para manejar errores del API
  const [error, setError] = useState<ApiClientError | null>(null);

  // Estado para controlar el estado de carga durante el proceso de login
  const [isLoading, setIsLoading] = useState(false);

  // Función que maneja el envío del formulario de login
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Previene la recarga de la página al enviar el formulario

    try {
      setIsLoading(true); // Activa el estado de carga mientras se procesa el login
      // Llama a la función login (probablemente realiza una petición a un servidor)
      const response = await login(
        {
          email,
          password,
        },
        localSavedToken,
      );

      console.log(response); // Se puede agregar un manejo de la respuesta aquí
      onLogin(); // Cambia el estado de autenticación a 'logueado'
      // Redirige al usuario a la página que intentaba acceder antes de ser redirigido a login
      const to = location.state?.from ?? "/"; // Si no hay estado 'from', lo redirige al home
      navigate(to, { replace: true });
    } catch (error) {
      // Si ocurre un error durante el login, se maneja el error de cliente API
      if (isApiClientError(error)) {
        setError(error); // Almacena el error en el estado
      }
    } finally {
      // Independientemente de si el login fue exitoso o fallido, desactiva el estado de carga
      setIsLoading(false);
    }
  };

  // Maneja el cambio en el campo de email
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // Maneja el cambio en el campo de contraseña
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // Maneja el cambio en el checkbox de 'guardar credenciales localmente'
  const handleLocalSavedTokenChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLocalSavedToken(event.target.checked);
  };

  // Determina si el botón de login debe estar deshabilitado (si no hay email o password o si está cargando)
  const isDisabled = !email || !password || isLoading;

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
          {/* Campos de entrada para email y contraseña */}
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

          {/* Opción para guardar las credenciales localmente */}
          <div className="local-saved-token">
            <input
              type="checkbox"
              id="localSavedToken"
              checked={localSavedToken}
              onChange={handleLocalSavedTokenChange}
            />
            <label htmlFor="localSavedToken">Save credentials</label>
          </div>

          {/* Botón de envío del formulario, que se deshabilita si no hay email/password o si está cargando */}
          <Button
            type="submit"
            disabled={isDisabled}
            className="loginBtn-submit"
          >
            {isLoading ? "Logging in..." : "Log in"}{" "}
            {/* Muestra un texto diferente según el estado de carga */}
          </Button>
        </form>

        {/* Muestra un mensaje de error si ocurre un error en el login */}
        {error && (
          <div className="login-error" onClick={() => setError(null)}>
            {error.message} {/* Muestra el mensaje de error */}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
