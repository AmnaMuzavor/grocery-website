import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Filters from "../components/Filters";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
const API = "https://grocery-website-bjbz.onrender.com";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  // const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();
  const { addToCart, addToWishlist } = useContext(AppContext);

  const query = new URLSearchParams(location.search);
  const search = query.get("search") || "";

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${API}/api/products?search=${search}`
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
     
        <h2 style={{margin: '15px 0px'}}>
          {search
            ? `Search Results for "${search}"`
            : "All Products"}
        </h2>
  <Filters sort={sort} setSort={setSort} />

        {/* <div className="product-grid">
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
        </div> */}


<div className="product-grid">
  {products.length === 0 ? (
    <p>No products found.</p>
  ) : (
    
    [...products]
      .sort((a, b) => {
        if (sort === "low") return a.price - b.price;
        if (sort === "high") return b.price - a.price;
        return 0;
      })
      .map((item) => (
        <div className="card" key={item.product_id} onClick={() => navigate(`/product/${item.product_id}`)} >
        
         {!item.is_available && (
  <div className="out-of-stock-badge">Out of Stock</div>
)}
          <img
            src={`${API}${item.image_url}`}
            alt={item.name}
          />
          <h3>{item.name}</h3>
          <div className="card-icons">
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
          <p>{item.brand}</p>
          <p>Rs.{item.price}</p>
        </div>
      ))
  )}
</div>
      </div>
      <Footer />
    </section>
  );
};

export default Shop;
