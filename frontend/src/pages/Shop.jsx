import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
// dummy
// import { useContext } from "react";
// import { AppContext } from "../context/AppContext";
// dummy end



const Shop = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
// dummy
// const { addToWishlist, addToCart } = useContext(AppContext);
// dummy end
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

  {/* dummy */}
      {/* <button
  onClick={() =>
    addToWishlist({
      id: 1,
      name: "Mini Oranges",
      price: 120,
      weight: "(200-230) g",
      stock: true,
      image: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15"
    })
  }
>
  Add Test Item to Wishlist
</button>

<button
  onClick={() =>
    addToCart({
      id: 1,
      name: "Mini Oranges",
      price: 120,
      weight: "(200-230) g",
      stock: true,
      image: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15"
    })
  }
>
  Add Test Item to Cart
</button>


<button
  onClick={() =>
    addToCart({
      id: 2,
      name: "kiwi",
      price: 100,
      weight: "(200-230) g",
      stock: true,
      image: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15"
    })
  }
>
</button> */}
{/* dummy end */}
    </section>
  );
};

export default Shop;