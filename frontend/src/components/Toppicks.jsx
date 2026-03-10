import React, { useEffect, useState,useContext } from "react";
import { AppContext } from "../context/AppContext";
// import "../index.css";
import axios from "axios";
import Filters from "./Filters";
import { useNavigate } from "react-router-dom";
const API = "https://grocery-website-bjbz.onrender.com";

const Toppicks = () => {

  const [products, setProducts] = useState([]);
const [sort, setSort] = useState("");
const navigate = useNavigate();
const { addToWishlist, addToCart } = useContext(AppContext);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("${API}/api/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="products">
      <div className="container">
        <h2>Top Picks</h2>
<Filters sort={sort} setSort={setSort} />
        <div className="product-grid">

       {[...products]
  .sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  })
  .map((item) => (
            
            <div className="card" key={item.product_id}
             onClick={() => navigate(`/product/${item.product_id}`)}
            >
              {!item.is_available && (
  <div className="out-of-stock-badge">Out of Stock</div>
)}

{/* 
              <img
                src={`http://localhost:5001${item.image_url}`}
                alt={item.name}
              /> */}

{item.image_url && (
  <img
    src={`${API}${item.image_url}`}
    alt={item.name}
  />

  
)}

<div className="card-icons">
  {/* <button className="icon-btn">
    <i className="fa-solid fa-heart"></i>
  </button> */}


  <button
  className="icon-btn"
  onClick={(e) => {
    e.stopPropagation(); 

    addToWishlist({
      id: item.product_id,
      name: item.name,
      price: item.discount_price || item.price,
      stock: item.is_available,
      image: item.image_url,
      weight: item.unit
    });
  }}
>
  <i className="fa-solid fa-heart"></i>
</button>

 <button
  className="icon-btn"
  disabled={!item.is_available}
  onClick={(e) => {
    e.stopPropagation();

    addToCart({
      id: item.product_id,
      name: item.name,
      price: item.discount_price || item.price,
      stock: item.is_available,
      image: item.image_url,
      weight: item.unit
    });
  }}
>
  <i className="fa-solid fa-cart-plus"></i>
</button>
</div>
              {/* <span className="badge">Featured</span> */}

              <p className="category">{item.brand}</p>

              <h3>{item.name}</h3>

              {/* <p className="price">
                {item.discount_price ? (
                  <>
                    <span style={{ textDecoration: "line-through", color: "#999" }}>
                      Rs.{item.price}
                    </span>{" "}
                    Rs.{item.discount_price}
                  </>
                ) : (
                  <>Rs.{item.price}</>
                )}
                /{item.unit}
              </p> */}

              <p className="price">

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

export default Toppicks;
