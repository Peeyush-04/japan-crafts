import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";
import "./cart.css";

export default function Cart() {
  const { theme } = useTheme();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(items);
  }, []);

  const updateQuantity = (id, delta) => {
    const updated = cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.success("Removed from cart");
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`cart-page ${theme}`}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              {item.image && <img src={item.image} alt={item.title} />}
              <div className="cart-info">
                <h4>{item.title}</h4>
                <p>₹{item.price} × {item.quantity}</p>
                <div className="cart-actions">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <strong>Total:</strong> ₹{total}
          </div>
        </div>
      )}
    </div>
  );
}
