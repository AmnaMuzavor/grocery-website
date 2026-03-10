import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../components/admin.css";
import toast from "react-hot-toast";
const API = "https://grocery-website-bjbz.onrender.com";
export default function AddProductAdmin() {

  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
 const [sidebarOpen, setSidebarOpen] = useState(false);
const [loadingStockId, setLoadingStockId] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    discount_price: "",
    stock: "",
    brand: "",
    expiry: "",
    description: "",
    unit: "",
    mainImage: null,
    images: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;




  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API}/api/admin/categories`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        setCategories(data.categories || data || []);
      } catch (error) {
        console.log(error);
        setCategories([]);
      }
    };

    fetchCategories();
    fetchProducts();

  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });

     setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleMainImageChange = (e) => {
    setProduct({
      ...product,
      mainImage: e.target.files[0] || null
    });
  };

  const handleImagesChange = (e) => {
    setProduct({
      ...product,
      images: Array.from(e.target.files)
    });
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/api/admin/products`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        setProducts(data.products);
      }

    } catch (error) {
      console.log(error);
    }
  };


  const handleEdit = (prod) => {

    setProduct({
      name: prod.name || "",
      category: prod.category_id || "",
      price: prod.price || "",
      discount_price: prod.discount_price || "",
      stock: prod.stock_quantity || "",
      brand: prod.brand || "",
      expiry: prod.expiry || "",
      description: prod.description || "",
      unit: prod.unit || "",
      mainImage: null,
      images: [],
    });

    setEditId(prod.product_id);
    setIsEditing(true);
    setShowForm(true);
    setErrors({});
  };
const validateProduct = () => {
  let newErrors = {};


  if (!product.name.trim()) {
    newErrors.name = "Product name required";
  }

 
if (!product.category || product.category === "") {
  newErrors.category = "Select category";
}

 
  if (!product.price || Number(product.price) <= 0) {
    newErrors.price = "Enter valid price";
  }

  
  if (
    product.discount_price !== "" &&
    Number(product.discount_price) >= Number(product.price)
  ) {
    newErrors.discount_price = "Discount must be less than price";
  }

 
  if (product.stock !== "" && Number(product.stock) < 0) {
    newErrors.stock = "Stock cannot be negative";
  }

  if (!product.unit.trim()) {
    newErrors.unit = "Unit required (kg, litre, pcs)";
  }


  if (product.expiry) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const exp = new Date(product.expiry);

    if (exp < today) {
      newErrors.expiry = "Expiry cannot be past date";
    }
  }

  
  if (!isEditing && !product.mainImage) {
    newErrors.mainImage = "Main image required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
  

    
  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log("PRODUCT STATE:", product);

    // if (!validateProduct()) return;
    
if (!validateProduct()) {
  console.log("Validation failed", errors);
  return;
}
    // if (!product.name || !product.category || !product.price) {
    //   alert("Please fill all required fields");
    //   return;
    // }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("discount_price", product.discount_price);

    formData.append("stock_quantity", product.stock);
    formData.append("unit", product.unit);
    formData.append("category_id", product.category);

    if (product.mainImage) {
      formData.append("mainImage", product.mainImage);
    }

    product.images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const token = localStorage.getItem("token");

      // const res = await fetch("http://localhost:5001/api/admin/product", {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   },
      //   body: formData
      // });


      let url = `${API}/api/admin/product`;
      let method = "POST";

      if (isEditing) {
        url = `${API}/api/admin/product/${editId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });


      const data = await res.json();

      
      if (res.ok) {
        // alert("Product added successfully");

        // alert(isEditing ? "Product updated successfully" : "Product added successfully");
toast.success(isEditing ? "Product updated successfully " : "Product added successfully ");

        // setProducts([...products, data.product]);
fetchProducts();
        setShowForm(false);

        setIsEditing(false);
        setEditId(null);

setProduct({
  name: "",
  category: "",
  price: "",
  discount_price: "",
  stock: "",
  brand: "",
  expiry: "",
  description: "",
  unit: "",
  mainImage: null,
  images: [],
});

        // setProduct({
        //   name: "",
        //   productId: "",
        //   category: "",
        //   price: "",
        //   quantity: "",
        //   stock: "",
        //   brand: "",
        //   expiry: "",
        //   description: "",
        //   mainImage: null,
        //   images: [],
        // });
      } else {
        // alert(data.message || "Error adding product");
        toast.error(data.message || "Error adding product");
      }

    } catch (error) {
      console.log(error);
      // alert("Server error");
     toast.error("Server error");
    }
  };



  const toggleAvailability = async (id, currentStatus) => {
    setLoadingStockId(id);
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${API}/api/admin/product/${id}/toggle`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ is_available: !currentStatus })
      }
    );

    if (res.ok) {
      // update state dynamically
      setProducts(products.map(p => 
        p.product_id === id ? { ...p, is_available: !currentStatus } : p
      ));
      toast.success("Stock status updated");
    } else {
      const data = await res.json();
      toast.error(data.message || "Failed to update status");
    }
  } catch (error) {
    console.log(error);
    toast.error("Server error");
  }finally {
  setLoadingStockId(null);
}
};

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);


  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="admin-container">
      {/* <AdminSidebar /> */}
       <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
       

      <main className="content">
        <button
    className="menu-btn"
    onClick={() => setSidebarOpen(true)}
  >
    Actions
  </button>

   
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
                  <th>Unit</th>
                  <th>Edit</th>
                  <th>Stock</th>
                </tr>
              </thead>

              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No products added
                    </td>
                  </tr>
                ) : (
                  currentProducts.map((prod, index) => (

                    // products.map((prod, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={
                            prod.image_url
                              ? `${API}${prod.image_url}`
                              : "https://via.placeholder.com/60"
                          }
                          alt="product"
                          className="product-image"
                        />
                      </td>
                      <td>{prod.name}</td>


                      {/* <td>
                Rs.{prod.price} / {prod.unit}
              </td> */}


                      <td>
                        {prod.discount_price ? (
                          <>
                            <span style={{ textDecoration: "line-through", color: "gray", marginRight: "6px" }}>
                              Rs.{prod.price}
                            </span>
                            <span style={{ color: "green", fontWeight: "bold" }}>
                              Rs.{prod.discount_price}
                            </span>
                            {" / "}
                            {prod.unit}
                          </>
                        ) : (
                          <>
                            Rs.{prod.price} / {prod.unit}
                          </>
                        )}
                      </td>

                      <td>
                        {prod.unit}
                      </td>
                      <td>
                        <button onClick={() => handleEdit(prod)} style={{background:'none', color:'green',border:'none'}}>
                          Edit
                        </button>
                      </td>

                      <td>
                        {/* <div className="stock-toggle">
                  {prod.stock_quantity}
                </div> */}


                        {/* <button
                          className={`stock-toggle ${prod.is_available ? "available" : "unavailable"}`}
                          onClick={() => toggleAvailability(prod.product_id, prod.is_available)}
                        >
                         {prod.is_available ? "Available" : "Out of Stock"}
                        </button> */}

                        <button
  className={`stock-toggle ${prod.is_available ? "available" : "unavailable"}`}
  onClick={() => toggleAvailability(prod.product_id, prod.is_available)}
  disabled={loadingStockId === prod.product_id}
>
  {loadingStockId === prod.product_id ? "Updating..." : (prod.is_available ? "Available" : "Out of Stock")}
</button>

                      </td>


                    </tr>
                  ))
                )}
              </tbody>
            </table>


            {/* page nos */}
            <div style={{ marginTop: "15px", textAlign: "center" }}>

              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              
              >
                Previous
              </button>

              <span style={{ margin: "0 10px" }}>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>

            </div>

          </>
        )}


        {showForm && (
          <>
            {/* <h3>Add Product</h3> */}
            <h3>{isEditing ? "Edit Product" : "Add Product"}</h3>


            <form className="product-form" onSubmit={handleSubmit}  noValidate>

              <label>Product Name *</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
               
              />
              {errors.name && <p className="error">{errors.name}</p>}
              <label>Main Image</label>
              <input type="file" onChange={handleMainImageChange} />
              {errors.mainImage && <p className="error">{errors.mainImage}</p>}
              <label>Additional Images</label>
              <input type="file" multiple onChange={handleImagesChange} />

              <label>Category *</label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                
              >

                <option value="">Select Category</option>

                {Array.isArray(categories) &&
                categories.map((cat) => (
                    <option
                      key={cat.category_id || cat.id}
                      value={cat.category_id || cat.id}
                    >
                      {cat.name}
                    </option>
                  ))}
              </select>
                {errors.category && <p className="error">{errors.category}</p>}


              <label>Price *</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
              />
               {errors.price && <p className="error">{errors.price}</p>}

              <label>Discount Price</label>
             
              <input
                type="number"
                name="discount_price"
                value={product.discount_price}
                onChange={handleChange}
                
              />
              {errors.discount_price && <p className="error">{errors.discount_price}</p>}

              <label>Stock</label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                 
              />
              {errors.stock && <p className="error">{errors.stock}</p>}

              <label>Unit *</label>

              <input
                type="text"
                name="unit"
                value={product.unit}
                onChange={handleChange}
                
              />
              {errors.unit && <p className="error">{errors.unit}</p>}

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
              {errors.expiry && <p className="error">{errors.expiry}</p>}
              <label>Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
              />

              {/* <button type="submit">Add Product</button> */}
              <button type="submit">
                {isEditing ? "Update Product" : "Add Product"}
              </button>


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
