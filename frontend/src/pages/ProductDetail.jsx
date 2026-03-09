import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../components/PDetail.css";
import Suggestions from "../components/Suggestions";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist } = useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
// const [category, setCategory] = useState(null);


  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/products/${id}`);

      const p = res.data.product;
      setProduct(p);

      // SAFE image fallback
      setMainImage(p.image_url || p.ProductImages?.[0]?.image_url || "");

      const cat = await axios.get(
      `http://localhost:5001/api/categories/${res.data.product.category_id}`
    );

    setCategory(cat.data.category);

    } catch (err) {
      console.log("Failed to fetch product");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="pdetail-wrapper">
      <div className="container">

      {/* <div className="breadcrumb">
  <span onClick={() => navigate("/")}>Home</span> /

  {category && (
    <span onClick={() => navigate(`/category/${category.category_id}`)}>
      {category.name}
    </span>
  )}

  / <span className="current">{product.name}</span>
</div> */}
        <div className="product-layout">

          {/* IMAGE */}
          <div className="main-image-wrap">
            <img
              className="main-img"
              src={`http://localhost:5001${mainImage}`}
              alt={product.name}
            />
          </div>

          {/* INFO */}
          <div>
            <h1>{product.name}</h1>

            <div className="price">
              {product.discount_price ? (
                <>
                  <span className="current">₹{product.discount_price}</span>
                  <span className="old">₹{product.price}</span>
                </>
              ) : (
                <span className="current">₹{product.price}</span>
              )}
            </div>
            {product.stock_quantity === 0 || product.is_available === false ? (
  <p className="out-stock">Out of stock</p>
) : (
  <p className="in-stock">In stock</p>
)} 
 <div className="btn-group">
  <button
    className={`buy ${!product.is_available ? "disabled-btn" : ""}`}
    disabled={!product.is_available}
    onClick={() => {
      if (product.is_available) {
        addToCart({
          id: product.product_id,
          name: product.name,
          price: product.discount_price || product.price,
          stock: product.is_available,
          image: product.image_url,
          weight: product.unit
        });
      }
    }}
  >
    Buy Now
  </button>

  <button
    className={`add ${!product.is_available ? "disabled-btn" : ""}`}
    disabled={!product.is_available}
    onClick={() => {
      if (product.is_available) {
        addToCart({
          id: product.product_id,
          name: product.name,
          price: product.discount_price || product.price,
          stock: product.is_available,
          image: product.image_url,
          weight: product.unit
        });
      }
    }}
  >
    {product.is_available ? "Add to cart" : "Out of Stock"}
  </button>
</div>
            {/* <button className="add">Add to cart</button> */}

            <div className="description-box">
              <h3>Description</h3>
              <p className="desc-text">
                {product.description || "No description available"}
              </p>

              <div className="extra-info-grid">

  <div className="info-card" style={{background:'#F2E711'}}>
    <h4>Brand</h4>
    <p>{product.brand || "Not specified"}</p>
  </div>

  <div className="info-card" style={{background:'#FCDEFF'}}>
    <h4>Expiry Date</h4>
    <p>
      {product.expiry_date
        ? new Date(product.expiry_date).toLocaleDateString()
        : "Not available"}
    </p>
  </div>

  <div className="info-card" style={{background:'#FCDEFF'}} >
    <h4>Unit</h4>
    <p>{product.unit}</p>
  </div>

   <div className="info-card" style={{background: '#DBF6FD'}}>
    <h4>Shelf Life</h4>
    <p>depends</p>
  </div>

</div>
            </div>
          </div>
        </div>

      {/* <Suggestions currentId={id} categoryId={product.category_id} /> */}
        <Suggestions currentProductId={id} categoryId={product.category_id} />
      </div>
    </div>
  );
};

export default ProductDetail;
