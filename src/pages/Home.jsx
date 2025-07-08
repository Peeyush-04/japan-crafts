import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const { theme } = useTheme();
  const [products, setProducts] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);

    const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    setLikes(storedLikes);
  }, []);

  const toggleLike = (id) => {
    const updatedLikes = { ...likes, [id]: !likes[id] };
    setLikes(updatedLikes);
    localStorage.setItem("likes", JSON.stringify(updatedLikes));
  };

  return (
    <div className={`home ${theme}`}>
      <h2>Crafted with Passion</h2>
      <div className="product-list">
        {products.length === 0 ? (
          <p>No crafts available yet.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              {product.image && <img src={product.image} alt={product.title} />}
              <h3>{product.title}</h3>
              <p>₹{product.price}</p>
              <p>{product.description}</p>
              <button className="like-button" onClick={() => toggleLike(product.id)}>
                {likes[product.id] ? "Liked ❤️" : "Like 🤍"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
