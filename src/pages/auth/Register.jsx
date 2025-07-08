import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import toast from "react-hot-toast";
import "./auth.css";

export default function Register() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("buyer");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !dob || !email || !password || !role || !phone || !address) {
      toast.error("Please fill out all fields.");
      return;
    }

    const userData = { name, email, dob, role, phone, address, password };
    localStorage.setItem("user", JSON.stringify(userData));
    toast.success("Account created successfully!");
    navigate("/profile");
  };


  return (
    <div className={`auth-container ${theme}`}>
      <h2>Create Your Account</h2>
      <form className="auth-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="role-select-buttons">
          <button
            type="button"
            className={role === "buyer" ? "role-button selected" : "role-button"}
            onClick={() => setRole("buyer")}
          >
            Buyer
          </button>
          <button
            type="button"
            className={role === "seller" ? "role-button selected" : "role-button"}
            onClick={() => setRole("seller")}
          >
            Seller
          </button>
        </div>

        <button className="auth-button" type="submit">Register</button>
        <p className="switch-text">
          Already have an account? <a href="/auth/login">Login</a>
        </p>
      </form>
    </div>
  );
}
