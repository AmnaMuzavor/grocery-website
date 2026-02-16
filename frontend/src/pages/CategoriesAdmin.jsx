import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import '../components/admin.css';
import editicon from '../assets/editicon.png';
import removeicon from '../assets/removeicon.png';
import axios from "axios";

export default function CategoriesAdmin() {
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
const [categoryImage, setCategoryImage] = useState(null);
const [isEditing, setIsEditing] = useState(false);
const [editId, setEditId] = useState(null);


 
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5001/api/admin/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data.categories);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  // const handleAddCategory = async () => {
  //   if (!categoryName) {
  //     alert("Category name is required");
  //     return;
  //   }

  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await axios.post(
  //       "http://localhost:5001/api/admin/category",
  //       { name: categoryName, description: categoryDesc, image_url: "" },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     setCategories([res.data.category, ...categories]);
  //     setCategoryName("");
  //     setCategoryDesc("");
  //     setShowForm(false);
  //     alert("Category added successfully");
  //   } catch (error) {
  //     console.error(error);
  //     alert(error.response?.data?.message || "Failed to add category");
  //   }
  // };



const handleAddCategory = async () => {
  if (!categoryName) {
    alert("Category name is required");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("description", categoryDesc);

    if (categoryImage) {
      formData.append("image", categoryImage); 
    }

    const res = await axios.post(
      "http://localhost:5001/api/admin/category",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,

          // "Content-Type": "multipart/form-data",
    

        },
      }
    );

    alert("Category added successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to add category");
  }
};

const handleUpdateCategory = async () => {
  if (!categoryName) {
    alert("Category name is required");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("description", categoryDesc);

    if (categoryImage) {
      formData.append("image", categoryImage);
    }

    await axios.put(
      `http://localhost:5001/api/admin/category/${editId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Category updated successfully");

    setCategoryName("");
    setCategoryDesc("");
    setCategoryImage(null);
    setIsEditing(false);
    setShowForm(false);

    fetchCategories();
  } catch (error) {
    alert("Error updating category");
  }
};




  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/admin/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(categories.filter((cat) => cat.category_id !== id));
      alert("Category deleted");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete category");
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />

      <main className="content">
        {!showForm ? (
          <>
            <div className="top-bar">
              <h3>Categories</h3>
              <button className="add-category-btn" onClick={() => setShowForm(true)}>
                Add Category
              </button>
            </div>

            <div className="category-grid">
              {categories.map((cat) => (
                <div className="category-card" key={cat.category_id}>
                  

                  

  {cat.image_url && (
    <img
      src={`http://localhost:5001${cat.image_url}`}
      alt={cat.name}
      className="category-image"
    />
  )}
   <h4>{cat.name}</h4>

                  <div className="card-actions">
                    <button
  className="edit-btn"
  onClick={() => {
    setIsEditing(true);
    setEditId(cat.category_id);
    setCategoryName(cat.name);
    setCategoryDesc(cat.description || "");
    setShowForm(true);
  }}
>
  <img src={editicon} alt="Edit" />
</button>

                    
                    <button className="delete-btn" onClick={() => handleDelete(cat.category_id)}>
                      <img src={removeicon} alt="Delete" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* <h3>Add Category</h3> */}
            <h3>{isEditing ? "Edit Category" : "Add Category"}</h3>

            <div className="category-form">
              <label>Category name</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />


<label>Category image</label>
              <input type="file"   onChange={(e) => setCategoryImage(e.target.files[0])} />


              <label>Description</label>
              <textarea
                value={categoryDesc}
                onChange={(e) => setCategoryDesc(e.target.value)}
              />

              <div className="form-actions">
                {/* <button onClick={handleAddCategory}>Add</button> */}
                <button  className="add-category-btn " onClick={isEditing ? handleUpdateCategory : handleAddCategory}>

                  {/* class */}
  {isEditing ? "Update" : "Add"}
</button>

                <button  className="add-category-btn" onClick={() => setShowForm(false)}>Back</button>
                {/* class */}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
