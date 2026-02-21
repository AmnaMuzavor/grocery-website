import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SearchedProducts = () => {

  const [products, setProducts] = useState([]);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get("search") || "";

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/products?search=${search}`
      );

      setProducts(res.data.products);

    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  return (
    <section className="products">
      <div className="container">
        <h2>
          {search
            ? `Search Results for "${search}"`
            : "All Products"}
        </h2>

        <div className="product-grid">

          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map((item) => (
              <div className="card" key={item.product_id}>

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
                          fontSize: "13px"
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
            ))
          )}

        </div>
      </div>
    </section>
  );
};

export default SearchedProducts;