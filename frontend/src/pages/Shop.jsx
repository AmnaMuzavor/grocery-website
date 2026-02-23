import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Filters from "../components/Filters.jsx";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [category, setCategory] = useState("");
const [sort, setSort] = useState("");

  const query = new URLSearchParams(location.search);
  const search = query.get("search") || "";

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/products?search=${search}`
      );
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  return (
    <section className="shop">
      <div className="container">
        <button className="filter-btn">
  <FontAwesomeIcon icon={faFilter} />
  Filters
</button>
        <Filters
  category={category}
  setCategory={setCategory}
  sort={sort}
  setSort={setSort}
/>
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
                <img
                  src={`http://localhost:5001${item.image_url}`}
                  alt={item.name}
                />
                <h3>{item.name}</h3>
                <p>{item.brand}</p>
                <p>Rs.{item.price}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Shop;