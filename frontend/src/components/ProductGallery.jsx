

import { useState, useEffect } from "react";

const ProductGallery = ({ product }) => {
  const [mainImage, setMainImage] = useState("");

  const API = "https://grocery-website-bjbz.onrender.com";
  useEffect(() => {
    if (product?.image_url) {
      setMainImage(product.image_url);
    }
  }, [product]);

  return (
    <div className="main-image-wrap">
      
      <img
        className="main-img"
        src={`${API}${mainImage}`}
        alt={product.name}
      />

      
      {product?.ProductImages?.length > 0 && (
        <div className="thumbs">
          {product.ProductImages.map((img) => (
            <img
              key={img.id}
              src={`${API}${img.image_url}`}
              alt=""
              className={mainImage === img.image_url ? "active" : ""}
              onClick={() => setMainImage(img.image_url)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
