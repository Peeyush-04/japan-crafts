import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "./sell.css"; // Reuse styles from sell form

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("products")) || [];
    const match = all.find((p) => String(p.id) === id);
    if (match) {
      setProduct(match);
    } else {
      setError("Product not found.");
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.title || !product.price || !product.category) {
      setError("Please fill in all required fields.");
      return;
    }

    const all = JSON.parse(localStorage.getItem("products")) || [];
    const updated = all.map((p) => (String(p.id) === id ? product : p));
    localStorage.setItem("products", JSON.stringify(updated));
    navigate("/profile");
  };

  if (error) return <div className={`sell-page ${theme}`}><p>{error}</p></div>;
  if (!product) return null;

  return (
    <div className={`sell-page ${theme}`}>
      <h2>Edit Your Product</h2>
      <form className="sell-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          rows="3"
        />
        <input type="file" accept="image/*" onChange={handleImage} />
        {product.image && <img src={product.image} className="image-preview" alt="preview" />}
        <button type="submit" className="auth-button">Update Product</button>
      </form>
    </div>
  );
}
