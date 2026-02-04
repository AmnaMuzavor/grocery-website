import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import '../components/admin.css'
import editicon from '../assets/editicon.png'
import removeicon from '../assets/removeicon.png'

export default function CategoriesAdmin() {
  const [showForm, setShowForm] = useState(false);

  // dummy data 
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Fruits & Vegetables",
      description: "Fresh fruits and vegetables",
    },
    {
      id: 2,
      name: "Dairy",
      description: "Milk, cheese and dairy products",
    },
    {
      id: 3,
      name: "Snacks",
      description: "Chips, biscuits and snacks",
    },
  ]);

  
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");

  
  const handleAddCategory = () => {
    if (!categoryName) {
      alert("Category name is required");
      return;
    }

    const newCategory = {
      id: Date.now(),
      name: categoryName,
      description: categoryDesc,
    };

    setCategories([...categories, newCategory]);
    setCategoryName("");
    setCategoryDesc("");
    setShowForm(false);
  };

  
  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className="admin-container">
      <AdminSidebar />

      <main className="content">

        {!showForm && (
          <>
            <div className="top-bar">
              <h3>Categories</h3>
              <button className="add-category-btn" onClick={() => setShowForm(true)}>
                Add Category
              </button>
            </div>

            <div className="category-grid">
              {categories.map((cat) => (
                <div className="category-card" key={cat.id}>
                  <h4>{cat.name}</h4>
                  <p>{cat.description}</p>

                 <div className="card-actions">
  <button className="edit-btn">
    <img src={editicon} alt="Edit"  />
  </button>
  <button
    className="delete-btn"
    onClick={() => handleDelete(cat.id)}
  >
    <img src={removeicon} alt="Delete"  />
  </button>
</div>

                </div>
              ))}
            </div>
          </>
        )}


        {showForm && (
          <>
            <h3>Add Category</h3>

            <div className="category-form">
              <label>Category name</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />

              <label>Category image</label>
              <input type="file" />

              <label>Description</label>
              <textarea
                value={categoryDesc}
                onChange={(e) => setCategoryDesc(e.target.value)}
              />

              <div className="form-actions">
                <button onClick={handleAddCategory}>Add</button>
                <button onClick={() => setShowForm(false)}>Back</button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
