import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "./sell.css";

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

  const resizeImage = (file, maxSize = 800) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = Math.min(maxSize / img.width, maxSize / img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7); // 70% quality
        resolve(resizedBase64);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setError("Image is too large. Max allowed size is 3MB.");
      return;
    }
    if (file.size > 1.5 * 1024 * 1024) {
      alert("Warning: Large image selected. It will be compressed to reduce size.");
    }

    const resizedImage = await resizeImage(file);
    setProduct((prev) => ({ ...prev, image: resizedImage }));
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

  if (error) return <div className={`sell-page ${theme}`}><p className="sell-error">{error}</p></div>;
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
