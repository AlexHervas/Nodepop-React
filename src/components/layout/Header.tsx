import "./Header.css";
import AuthButton from "../../pages/auth/AuthButton";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        <NavLink
          to="/adverts/new"
          className={({ isActive }) => (isActive ? "selected" : "")}
        >
          New Advert
        </NavLink>
        <NavLink
          to="/adverts"
          className={({ isActive }) => (isActive ? "selected" : "")}
          end
        >
          Latest Adverts
        </NavLink>
      </nav>
        <AuthButton />
    </header>
  );
}