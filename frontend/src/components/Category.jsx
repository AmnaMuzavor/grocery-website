
import "./Category.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API = "https://grocery-website-bjbz.onrender.com";
function Category() {

  // const categories = [
  //   { id: 1, name: "Fruits & Veggies" },
  //   { id: 2, name: "Dairy" },
  //   { id: 3, name: "Snacks" },
  //   { id: 4, name: "Beverages" },
  //   { id: 5, name: "Bakery" },
  //   { id: 6, name: "Sweets" },
  //   { id: 7, name: "Frozen Foods"  },
  //   { id: 8, name: "Meat" },
  //   { id: 9, name: "Seafood" },
  //   { id: 10, name: "Cleaning" }
  // ];
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const colors = [
    "#d1fae5",
    "#dbeafe",
    "#fee2e2",
    "#ede9fe",
    "#fef9c3",
    "#fce7f3"
  ];

    const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "${API}/api/categories"
      );
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


 

  return (
    <section className="c-categories">
      <h2>Categories</h2>

       <div className="c-category-grid">
        {categories.map((cat, index) => (
  <div
    key={cat.category_id}
    className="c-category-card"
    style={{ backgroundColor: colors[index % colors.length] }}
    onClick={() => navigate(`/category/${cat.category_id}`)}
  >
    {cat.image_url ? (
      <img
        src={`${API}${cat.image_url}`}
        alt={cat.name}
      
      />
    ) : (
      <span>📦</span>
    )}

    <p>{cat.name}</p>
  </div>
))}

      </div>
    </section>
  );
}

export default Category;

