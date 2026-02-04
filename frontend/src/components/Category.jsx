import "./Category.css";
import { useContext } from "react"; 

function Categories() {

  const categories = [
    { id: 1, name: "Fruits & Veggies" },
    { id: 2, name: "Dairy" },
    { id: 3, name: "Snacks" },
    { id: 4, name: "Beverages" },
    { id: 5, name: "Bakery" },
    { id: 6, name: "Sweets" },
    { id: 7, name: "Frozen Foods"  },
    { id: 8, name: "Meat" },
    { id: 9, name: "Seafood" },
    { id: 10, name: "Cleaning" }
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
