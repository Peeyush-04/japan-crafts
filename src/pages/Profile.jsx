import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./profile.css";

export default function Profile() {
  const { user, login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [userProducts, setUserProducts] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    if (user?.email) {
      const mine = stored.filter((p) => p.sellerEmail === user.email);
      setUserProducts(mine);
      setForm(user);
    }
  }, [user]);

  const handleDelete = (id) => {
    const all = JSON.parse(localStorage.getItem("products")) || [];
    const updated = all.filter((p) => p.id !== id);
    localStorage.setItem("products", JSON.stringify(updated));
    setUserProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill all fields");
      return;
    }

    localStorage.setItem("user", JSON.stringify(form));
    login(form);
    toast.success("Profile updated!");
  };

  return (
    <div className={`profile-page ${theme}`}>
      <h2>Your Profile</h2>

      {user ? (
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name || "N/A"}</p>
          <p><strong>Email:</strong> {user.email || "N/A"}</p>
          <p><strong>Phone:</strong> {user.phone || "Not Provided"}</p>
          <p><strong>Address:</strong> {user.address || "Not Provided"}</p>
          <p><strong>DOB:</strong> {user.dob || "N/A"}</p>
          <p><strong>Role:</strong> {user.role || "N/A"}</p>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}

      {user && (
        <div className="profile-edit-form">
          <h3>Edit Profile</h3>
          <input name="name" value={form.name || ""} onChange={handleChange} placeholder="Full Name" />
          <input name="phone" value={form.phone || ""} onChange={handleChange} placeholder="Phone" />
          <input name="address" value={form.address || ""} onChange={handleChange} placeholder="Address" />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          <button onClick={handleSave}>Save Changes</button>
        </div>
      )}

      {user?.role === "seller" && (
        <>
          <h3>Your Listed Products</h3>
          {userProducts.length === 0 ? (
            <p>No products listed yet.</p>
          ) : (
            <div className="profile-products">
              {userProducts.map((item) => (
                <div key={item.id} className="product-card">
                  {item.image && <img src={item.image} alt={item.title} />}
                  <h4>{item.title}</h4>
                  <p>₹{item.price}</p>
                  {item.description && <p>{item.description}</p>}
                  <button
                    className="edit-button"
                    onClick={() => navigate(`/edit/${item.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
