import { useState } from "react";
import ProductCard from "./ProductCard";

const initialProducts = [
  { id: 1, name: "Origami Crane", price: 299 },
  { id: 2, name: "Ceramic Tea Cup", price: 499 },
  { id: 3, name: "Bamboo Chopsticks", price: 199 },
  { id: 4, name: "Japanese Lantern", price: 799 },
];

function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [likes, setLikes] = useState({});

  const toggleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredProducts = initialProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search crafts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="product-list">
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              liked={likes[product.id]}
              onLike={() => toggleLike(product.id)}
            />
          ))
        ) : (
          <p>No matching crafts found</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
