import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../components/admin.css";

export default function AddProductAdmin() {

  const [showForm, setShowForm] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    productId: "",
    category: "",
    price: "",
    quantity: "",
    stock: "",
    brand: "",
    expiry: "",
    description: "",
    mainImage: null,
    images: [],
  });

  const categories = [
    "Fruits & Vegetables",
    "Dairy",
    "Snacks",
    "Beverages",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleMainImageChange = (e) => {
    setProduct({ ...product, mainImage: e.target.files[0] });
  };

  const handleImagesChange = (e) => {
    setProduct({ ...product, images: Array.from(e.target.files) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product.name || !product.productId) {
      alert("Product Name and Product ID are required");
      return;
    }

    console.log("Product Added:", product);
    alert("Product added successfully");

    setShowForm(false);

    setProduct({
      name: "",
      productId: "",
      category: "",
      price: "",
      quantity: "",
      stock: "",
      brand: "",
      expiry: "",
      description: "",
      mainImage: null,
      images: [],
    });
  };

  return (
    <div className="admin-container">
      <AdminSidebar />

      <main className="content">

        {!showForm && (
          <>
            <button
              className="add-product-btn"
              onClick={() => setShowForm(true)}
            >
              Add Product
            </button>

            <table className="product-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <img
                      src="https://via.placeholder.com/60"
                      alt="product"
                      className="product-image"
                    />
                  </td>
                  <td>Fruits & Vegetables</td>
                  <td>Rs.150 / kg</td>
                  <td>
                    <div className="stock-toggle"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {showForm && (
          <>
            <h3>Add Product</h3>

            <form className="product-form" onSubmit={handleSubmit}>
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
              />

              <label>Product ID</label>
              <input
                type="text"
                name="productId"
                value={product.productId}
                onChange={handleChange}
              />

              <label>Main Product Image</label>
              <input type="file" onChange={handleMainImageChange} />

              <label>Additional Product Images</label>
              <input type="file" multiple onChange={handleImagesChange} />

              <label>Category</label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                {categories.map((cat, index) => (
                  <option key={index}>{cat}</option>
                ))}
              </select>

              <label>Price</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
              />

              <div className="row">
                <div>
                  <label>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={product.quantity}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <label>Brand</label>
              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
              />

              <label>Expiry Date</label>
              <input
                type="date"
                name="expiry"
                value={product.expiry}
                onChange={handleChange}
              />

              <label>Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
              />

              <button type="submit">Add Product</button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </form>
          </>
        )}

      </main>
    </div>
  );
}
