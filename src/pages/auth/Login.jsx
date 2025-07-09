import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import './auth.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      toast.error("User not found. Please register first.");
      return;
    }

    if (storedUser.email === email && storedUser.password === password) {
      login(storedUser);
      toast.success("Login successful!");
      navigate("/profile");
    } else {
      toast.error("Incorrect email or password.");
    }
  };

  return (
    <div className={`auth-container ${theme}`}>
      <h2>Welcome Back</h2>
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="auth-button" type="submit">Login</button>
        <p className="switch-text">
          Don’t have an account? <Link href="/auth/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}
