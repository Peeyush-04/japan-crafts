import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./buy.css";

export default function Buy() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [likes, setLikes] = useState({});
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(items);

    const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    setLikes(storedLikes);

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const toggleLike = (id) => {
    const newLikes = { ...likes, [id]: !likes[id] };
    setLikes(newLikes);
    localStorage.setItem("likes", JSON.stringify(newLikes));
  };

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      toast.error("Item already in cart");
      return;
    }

    const updatedCart = [...cart, { ...product, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Added to cart!");
  };

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`buy-page ${theme}`}>
      <h2>Explore Handmade Crafts</h2>

      <input
        className="buy-search"
        type="text"
        placeholder="Search by title or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="product-grid">
        {filtered.length === 0 ? (
          <p>No crafts match your search.</p>
        ) : (
          filtered.map((item) => (
            <div key={item.id} className="product-card">
              {item.image && <img src={item.image} alt={item.title} />}
              <h3>{item.title}</h3>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Price:</strong> ₹{item.price}</p>
              <p>{item.description}</p>

              <div className="buy-buttons">
                <button onClick={() => toggleLike(item.id)} className="like-btn">
                  {likes[item.id] ? "❤️ Liked" : "🤍 Like"}
                </button>
                <button onClick={() => addToCart(item)} className="cart-btn">
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
