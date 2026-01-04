import "./Category.css";
import { useContext } from "react"; 

function Categories() {

  const categories = [
    { id: 1, name: "Fruits & Veggies", icon: "🥕" },
    { id: 2, name: "Dairy", icon: "🥛" },
    { id: 3, name: "Snacks", icon: "🍿" },
    { id: 4, name: "Beverages", icon: "🥤" },
    { id: 5, name: "Bakery", icon: "🍞" },
    { id: 6, name: "Sweets", icon: "🍫" },
    { id: 7, name: "Frozen Foods", icon: "🧊" },
    { id: 8, name: "Meat", icon: "🍗" },
    { id: 9, name: "Seafood", icon: "🐟" },
    { id: 10, name: "Cleaning", icon: "🧼" }
  ];

  const colors = [
    "#d1fae5",
    "#dbeafe",
    "#fee2e2",
    "#ede9fe",
    "#fef9c3",
    "#fce7f3"
  ];

  return (
    <section className="categories">
      <h2>Categories</h2>

      <div className="category-grid">
        {categories.map((item, index) => (
          <div
            key={item.id}
            className="category-card"
            style={{ backgroundColor: colors[index % colors.length] }}
          >
            <span>{item.icon}</span>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
