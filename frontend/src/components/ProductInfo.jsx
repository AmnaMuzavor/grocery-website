const ProductInfo = ({ product }) => {
  return (
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
 <p className="stock-text">
        {product.is_available
          ? `In Stock (${product.stock_quantity ?? 0})`
          : "Currently unavailable"}
      </p>

     
      {/* <button
        className={`add ${!product.is_available ? "disabled-btn" : ""}`}
        disabled={!product.is_available}
      >
        {product.is_available ? "Add to cart" : "Out of Stock"}
      </button> */}
      <button className="add">Add to cart</button>

      <div className="description-box">
        <h3>Description</h3>
        <p className="desc-text">
          {product.description || "No description available"}
        </p>

        <div className="extra-info-grid">

  <div className="info-card">
    <h4>Brand</h4>
    <p>{product.brand || "Not specified"}</p>
  </div>

  <div className="info-card">
    <h4>Expiry Date</h4>
    <p>
      {product.expiry_date
        ? new Date(product.expiry_date).toLocaleDateString()
        : "Not available"}
    </p>
  </div>

  <div className="info-card">
    <h4>Unit</h4>
    <p>{product.unit}</p>
  </div>

</div>
      </div>
    </div>
  );
};

export default ProductInfo;

