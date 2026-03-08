

import { useState, useEffect } from "react";

const ProductGallery = ({ product }) => {
  const [mainImage, setMainImage] = useState("");

  
  useEffect(() => {
    if (product?.image_url) {
      setMainImage(product.image_url);
    }
  }, [product]);

  return (
    <div className="main-image-wrap">
      
      <img
        className="main-img"
        src={`http://localhost:5001${mainImage}`}
        alt={product.name}
      />

      
      {product?.ProductImages?.length > 0 && (
        <div className="thumbs">
          {product.ProductImages.map((img) => (
            <img
              key={img.id}
              src={`http://localhost:5001${img.image_url}`}
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