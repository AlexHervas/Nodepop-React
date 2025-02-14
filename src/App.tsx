import { useState } from "react";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  const [isLogged, setIsLogged] = useState(true);

  const handleLogin = () => {
    setIsLogged(true);
  };

  // const handleLogout = () => {
  //   setIsLogged(false)
  // }

  return isLogged ? <LoginPage onLogin={handleLogin} /> : null;
}

export default App;
