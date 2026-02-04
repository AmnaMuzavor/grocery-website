import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import '../components/admin.css'

export default function AddProductAdmin() {
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
    image: null,
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

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product.name || !product.productId) {
      alert("Product Name and Product ID are required");
      return;
    }

    console.log("Product Added:", product);
    alert("Product added successfully (check console)");

    
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
      image: null,
    });
  };

  return (
    <div className="admin-container">
      <AdminSidebar />

      <main className="content">
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

          <label>Product Image</label>
          <input type="file" onChange={handleImageChange} />

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
        </form>
      </main>
    </div>
  );
}
