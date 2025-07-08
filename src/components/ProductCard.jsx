export default function ProductCard({ name, price, liked, onLike }) {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>₹{price}</p>
      <button onClick={onLike} className="like-button">
        {liked ? "Liked ❤️" : "Like 🤍"}
      </button>
    </div>
  );
}