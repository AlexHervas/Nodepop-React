import { useState } from "react";
import Button from "../../components/shared/Button";
import { login } from "./service";

interface Props {
  onLogin: (message: string) => void;
}

function LoginPage({ onLogin }: Props) {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await login({
        email,
        password,
      });
      console.log(response);
      onLogin("Hello");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const isDisabled = !email || !password;
  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label className="block">
          Username:
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleUsernameChange}
          />
        </label>
        <label className="block">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <Button type="submit" $variant="primary" disabled={isDisabled}>
          Log in
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
