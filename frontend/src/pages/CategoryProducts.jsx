import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Filters from "../components/Filters";
import { useNavigate } from "react-router-dom";
const API = "https://grocery-website-bjbz.onrender.com";
const CategoryProducts = () => {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${API}/api/products/category/${id}`
      );
      setProducts(res.data.products);
    } catch (error) {
      console.log("Failed to fetch category products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

  return (
    <section className="products">
      <div className="container">
        <h2>Category Products</h2>

        <Filters sort={sort} setSort={setSort} />

        <div className="product-grid">
          {[...products]
            .sort((a, b) => {
              if (sort === "low") return a.price - b.price;
              if (sort === "high") return b.price - a.price;
              return 0;
            })
            .map((item) => (
              <div className="card" key={item.product_id}    onClick={() => navigate(`/product/${item.product_id}`)} >
                 {!item.is_available && (
  <div className="out-of-stock-badge">Out of Stock</div>
)}

                {item.image_url && (
                  <img
                    src={`${API}${item.image_url}`}
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

                <p className="price">
                  {item.discount_price ? (
                    <>
                      <span style={{ fontWeight: "600", fontSize: "16px" }}>
                        Rs.{item.discount_price}/{item.unit}
                      </span>

                      <br />

                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#999",
                          fontSize: "13px",
                        }}
                      >
                        Rs.{item.price}
                      </span>
                    </>
                  ) : (
                    <span style={{ fontWeight: "600" }}>
                      Rs.{item.price}/{item.unit}
                    </span>
                  )}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryProducts;
