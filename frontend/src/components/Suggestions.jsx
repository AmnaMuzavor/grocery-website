import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API = "https://grocery-website-bjbz.onrender.com";

const Suggestions = ({ categoryId, currentId }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchSuggestions = async () => {
    try {
      const res = await axios.get(
        `${API}/api/products/category/${categoryId}`
      );

      // remove current product
      const filtered = res.data.products.filter(
        (p) => p.product_id !== currentId
      );

      setProducts(filtered.slice(0, 4));
    } catch {
      console.log("Suggestions error");
    }
  };

  useEffect(() => {
    if (categoryId) fetchSuggestions();
  }, [categoryId]);

  if (!products.length) return null;

  return (
    <section className="suggestions">
      
      <h3>You may also like</h3>

      <div className="product-grid">
        {products.map((item) => (
          <div
            className="card"
            key={item.product_id}
            onClick={() => navigate(`/product/${item.product_id}`)}
          >
                  
 {!item.is_available && (
  <div className="out-of-stock-badge">Out of Stock</div>
)}

            {item.image_url && (
              <img
                src={`${API}{item.image_url}`}
                alt={item.name}
              />
            )}

            <div className="card-icons">
  <button className="icon-btn">
    <i className="fa-solid fa-heart"></i>
  </button>

  <button className="icon-btn"
    disabled={!item.is_available}

  >
    <i className="fa-solid fa-cart-plus"></i>
  </button>
</div>

            <p className="category">{item.brand}</p>
            <h3>{item.name}</h3>
{/* <p className="price">
  {item.discount_price ? (
    <>
      <span style={{ fontWeight: "600" }}>
        Rs.{item.discount_price}/{item.unit}
      </span>
      <br />
      <span style={{ textDecoration: "line-through", color: "#999", fontSize: "13px" }}>
        Rs.{item.price}
      </span>
    </>
  ) : (
    <span>
      Rs.{item.price}/{item.unit}
    </span>
  )}
</p> */}

<div className="price-box">
  {item.discount_price ? (
    <>
      <span className="discount">
        Rs.{item.discount_price}/{item.unit}
      </span>

      <span className="actual">
        Rs.{item.price}
      </span>
    </>
  ) : (
    <span className="discount">
      Rs.{item.price}/{item.unit}
    </span>
  )}
</div>

        
          </div>
        ))}
      </div>
    </section>
  );
};

export default Suggestions;
