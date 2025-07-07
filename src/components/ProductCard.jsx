export default function ProductCard({ name, price }) {
  return(
    <div>
      <h3>{ name }</h3>
      <p>₹{ price }</p>
    </div>
  );
}