import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import "./sell.css";

export default function Sell() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || !user.address || !user.phone) {
      setError("Please complete your profile before selling.");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.category) {
      setError("Please fill all required fields.");
      return;
    }

    const product = {
      ...form,
      id: Date.now(),
      sellerEmail: user.email,
    };

    const existing = JSON.parse(localStorage.getItem("products")) || [];
    existing.push(product);
    localStorage.setItem("products", JSON.stringify(existing));

    alert("Product added successfully!");
    setForm({
      title: "",
      price: "",
      description: "",
      category: "",
      image: null,
    });
    setPreview(null);
    navigate("/buy");
  };

  return (
    <div className={`sell-page ${theme}`}>
      <h2>List Your Craft</h2>

      {error ? (
        <p className="sell-error">{error}</p>
      ) : (
        <form className="sell-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Craft Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price (in INR)"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description (optional)"
            rows="3"
            value={form.description}
            onChange={handleChange}
          ></textarea>

          <input type="file" accept="image/*" onChange={handleImage} />
          {preview && <img src={preview} className="image-preview" alt="preview" />}

          <button type="submit" className="auth-button">Submit</button>
        </form>
      )}
    </div>
  );
}
