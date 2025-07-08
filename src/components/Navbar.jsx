import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "./navbar.css";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="nav-top">
        <Link to="/home" className="nav-logo">Japan Crafts</Link>
        <div className="hamburger" onClick={handleToggleMenu}>
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </div>
      </div>

      <div className={`nav-links ${menuOpen ? "show" : ""}`}>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/buy" onClick={() => setMenuOpen(false)}>Buy</Link>
        {user?.role === "seller" && (
          <Link to="/sell" onClick={() => setMenuOpen(false)}>Sell</Link>
        )}

        <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>

        {user ? (
          <>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="logout-button"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/auth/login"
              className="auth-link"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="auth-link"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </>
        )}

        <button className="theme-toggle-icon" onClick={toggleTheme}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </nav>
  );
}
