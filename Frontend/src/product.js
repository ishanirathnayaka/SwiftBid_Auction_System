import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/product.css";

function Product({id, title, image, rating}) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    // Navigate to auctions page for now, can be enhanced later to show specific product details
    navigate('/auctions');
  };

  const handlePlaceBid = () => {
    // Navigate to bid page with product-specific information
    navigate(`/bid/${id}`, { 
      state: { 
        id,
        title,
        image,
        rating
      }
    });
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={image}
          alt={title}
          className="product-image"
        />
        <div className="product-overlay">
          <button 
            className="btn btn-primary product-btn"
            onClick={handleViewDetails}
            aria-label={`View details for ${title}`}
          >
            View Details
          </button>
        </div>
      </div>
      
      <div className="product-content">
        <h3 className="product-title">{title}</h3>
        <div className="product-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <span key={i} className="product-star" role="img" aria-label="star">⭐</span>
            ))}
          <span className="product-rating-text">({rating}/5)</span>
        </div>
        <div className="product-actions">
          <button 
            className="btn btn-primary product-bid-btn"
            onClick={handlePlaceBid}
            aria-label={`Place bid on ${title}`}
          >
            Place Bid
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
