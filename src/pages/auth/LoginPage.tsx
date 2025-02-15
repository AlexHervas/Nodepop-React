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
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localSavedToken, setLocalSavedToken] = useState(false);
  const { onLogin } = useAuth();
  const [error, setError] = useState<ApiClientError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await login(
        {
          email,
          password,
        },
        localSavedToken,
      );

      console.log(response);
      onLogin();
      const to = location.state?.from ?? "/";
      navigate(to, { replace: true });
    } catch (error) {
      if (isApiClientError(error)) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

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

  const isDisabled = !email || !password || isLoading;

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
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

          <div className="local-saved-token">
            <input
              type="checkbox"
              id="localSavedToken"
              checked={localSavedToken}
              onChange={handleLocalSavedTokenChange}
            />
            <label htmlFor="localSavedToken">Save credentials</label>
          </div>

          <Button
            type="submit"
            disabled={isDisabled}
            className="loginBtn-submit"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </form>

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
