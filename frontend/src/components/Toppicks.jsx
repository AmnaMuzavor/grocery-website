import React, { useEffect, useState } from "react";
// import "../index.css";
import axios from "axios";
import Filters from "./Filters";

const Toppicks = () => {

  const [products, setProducts] = useState([]);
const [sort, setSort] = useState("");
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/products");
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
            
            <div className="card" key={item.product_id}>
{/* 
              <img
                src={`http://localhost:5001${item.image_url}`}
                alt={item.name}
              /> */}

{item.image_url && (
  <img
    src={`http://localhost:5001${item.image_url}`}
    alt={item.name}
  />

  
)}

<div className="card-icons">
  <button className="icon-btn">
    <i className="fa-solid fa-heart"></i>
  </button>

  <button className="icon-btn">
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
      <span style={{ fontWeight: "600", fontSize: "16px" }}>
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