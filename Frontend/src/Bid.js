import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./styles/Bid.css";

const AuctionItem = () => {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [bidAmount, setBidAmount] = useState(1300);
  const [productData, setProductData] = useState(null);

  // Get product data from navigation state or set default
  useEffect(() => {
    if (location.state) {
      setProductData(location.state);
      // Set initial bid based on product type or use provided data
      if (location.state.topBid) {
        // For auction items, start with current top bid + 50
        setBidAmount(parseInt(location.state.topBid) + 50);
      } else {
        // For product categories from home page
        const categoryBids = {
          'SMART PHONES': 800,
          'SMART WATCHES': 350,
          'COMPUTERS': 1200,
          'SMART TVS': 600,
          'CAMERAS': 450,
          'HEADPHONES': 200
        };
        setBidAmount(categoryBids[location.state.title] || 500);
      }
    } else {
      // Fallback data if accessed directly
      setProductData({
        id: productId,
        title: 'Product Not Found',
        image: '/default-product.png',
        rating: 0
      });
    }
  }, [location.state, productId]);

  const increaseBid = () => setBidAmount(bidAmount + 50);
  const decreaseBid = () => {
    let minBid;
    if (productData?.topBid) {
      // For auction items, minimum is current top bid + 1
      minBid = parseInt(productData.topBid) + 1;
    } else {
      // For product categories, use category-based minimums
      minBid = productData?.title === 'SMART PHONES' ? 800 : 
               productData?.title === 'SMART WATCHES' ? 350 :
               productData?.title === 'COMPUTERS' ? 1200 :
               productData?.title === 'SMART TVS' ? 600 :
               productData?.title === 'CAMERAS' ? 450 :
               productData?.title === 'HEADPHONES' ? 200 : 500;
    }
    setBidAmount(bidAmount > minBid ? bidAmount - 50 : minBid);
  };
  const placeBid = () => {
    alert(`Your bid of $${bidAmount} has been placed on ${productData?.title || 'this item'}!`);
    // Could navigate back to auctions or show success page
    navigate('/auctions');
  };

  // Show loading or error state if no product data
  if (!productData) {
    return (
      <div className="auction-container">
        <div className="loading-message">
          <p>Loading product information...</p>
          <button onClick={() => navigate('/auctions')} className="back-button">
            Back to Auctions
          </button>
        </div>
      </div>
    );
  }

  // Get product description based on category or auction item
  const getProductDescription = (productData) => {
    const { title, name } = productData;
    const productTitle = title || name;
    
    // Check if it's an auction item (has specific product names)
    if (name && !title) {
      // Determine category from auction item name
      let category = 'GENERAL';
      const lowerName = name.toLowerCase();
      
      if (lowerName.includes('iphone') || lowerName.includes('phone')) {
        category = 'SMART PHONES';
      } else if (lowerName.includes('watch')) {
        category = 'SMART WATCHES';
      } else if (lowerName.includes('macbook') || lowerName.includes('laptop') || lowerName.includes('computer')) {
        category = 'COMPUTERS';
      } else if (lowerName.includes('tv') || lowerName.includes('television')) {
        category = 'SMART TVS';
      } else if (lowerName.includes('camera')) {
        category = 'CAMERAS';
      } else if (lowerName.includes('headphone') || lowerName.includes('earphone')) {
        category = 'HEADPHONES';
      }
      
      return getDescriptionForCategory(category, productTitle);
    }
    
    // Handle product categories from home page
    return getDescriptionForCategory(productTitle, productTitle);
  };
  
  const getDescriptionForCategory = (category, displayName) => {
    const descriptions = {
      'SMART PHONES': {
        brand: 'Various Brands',
        category: 'Electronics - Mobile Phones',
        description: 'Latest smartphones with advanced features, high-quality cameras, and cutting-edge technology. Perfect for communication, entertainment, and productivity.',
        features: [
          'High-resolution display with vibrant colors',
          'Advanced camera system with multiple lenses',
          'Fast processor for smooth performance',
          'Long-lasting battery life',
          '5G connectivity for ultra-fast internet',
          'Water and dust resistant design',
          'Secure biometric authentication',
          'Expandable storage options'
        ]
      },
      'SMART WATCHES': {
        brand: 'Tech Brands',
        category: 'Wearables - Smart Watches',
        description: 'Advanced smartwatches with health monitoring, fitness tracking, and seamless connectivity to your smartphone.',
        features: [
          'Heart rate and fitness monitoring',
          'GPS tracking for outdoor activities',
          'Water-resistant design',
          'Multiple watch faces and customization',
          'Smartphone notifications and calls',
          'Long battery life up to 7 days',
          'Sleep tracking and health insights',
          'Voice assistant integration'
        ]
      },
      'COMPUTERS': {
        brand: 'Leading Manufacturers',
        category: 'Electronics - Computers',
        description: 'High-performance computers designed for professional work, gaming, and creative tasks with powerful processors and graphics.',
        features: [
          'High-speed processors for multitasking',
          'Advanced graphics capabilities',
          'Large storage capacity',
          'Multiple connectivity ports',
          'High-resolution displays',
          'Ergonomic design for comfort',
          'Advanced cooling systems',
          'Upgradeable components'
        ]
      },
      'SMART TVS': {
        brand: 'Entertainment Brands',
        category: 'Electronics - Smart TVs',
        description: 'Smart TVs with stunning picture quality, streaming capabilities, and smart home integration for the ultimate entertainment experience.',
        features: [
          '4K Ultra HD resolution',
          'HDR support for vivid colors',
          'Built-in streaming apps',
          'Voice control capabilities',
          'Smart home integration',
          'Multiple HDMI and USB ports',
          'Wireless connectivity',
          'Energy-efficient design'
        ]
      },
      'CAMERAS': {
        brand: 'Photography Brands',
        category: 'Electronics - Cameras',
        description: 'Professional cameras for photography enthusiasts and professionals, featuring advanced lens systems and image processing.',
        features: [
          'High-resolution image sensors',
          'Interchangeable lens system',
          'Advanced autofocus technology',
          'Image stabilization',
          '4K video recording capability',
          'Weather-sealed body',
          'Professional manual controls',
          'Wireless image transfer'
        ]
      },
      'HEADPHONES': {
        brand: 'Audio Brands',
        category: 'Electronics - Audio',
        description: 'Premium headphones delivering exceptional sound quality with noise cancellation and comfortable design for extended use.',
        features: [
          'Active noise cancellation',
          'High-fidelity audio drivers',
          'Comfortable over-ear design',
          'Long battery life up to 30 hours',
          'Wireless Bluetooth connectivity',
          'Quick charge functionality',
          'Built-in microphone for calls',
          'Foldable design for portability'
        ]
      },
      'GENERAL': {
        brand: 'Premium Brands',
        category: 'Electronics - General',
        description: 'High-quality electronic device with advanced features and reliable performance.',
        features: [
          'Advanced technology integration',
          'User-friendly interface',
          'Durable construction',
          'Energy-efficient design',
          'Modern connectivity options',
          'Reliable performance',
          'Warranty coverage included',
          'Professional customer support'
        ]
      }
    };
    return descriptions[category] || descriptions['GENERAL'];
  };

  const productInfo = getProductDescription(productData);

  return (
    <div className="auction-container">
      <div className="auction-item">
        <img 
          src={productData.image} 
          alt={productData.title} 
          className="product-image"
          onError={(e) => {
            e.target.src = '/default-product.png'; // Fallback image
          }}
        />
        <div className="product-details">
          <h2>{productData.title || productData.name}</h2>
          <p className="brand">{productInfo.brand}</p>
          <div className="product-rating">
            {Array(productData.rating || 5)
              .fill()
              .map((_, i) => (
                <span key={i} className="rating-star" role="img" aria-label="star">⭐</span>
              ))}
            <span className="rating-text">({productData.rating || 5}/5)</span>
          </div>
          {productData.topBid && (
            <p className="current-top-bid">Current Top Bid: <span>${productData.topBid}</span></p>
          )}
          <p className="current-bid">Your bid: <span>${bidAmount}</span></p>
          
          <div className="bid-controls">
            <button onClick={decreaseBid} className="bid-button">-</button>
            <span className="bid-amount">{bidAmount}</span>
            <button onClick={increaseBid} className="bid-button">+</button>
          </div>
          
          <button className="place-bid" onClick={placeBid}>Bid</button>
          <p className="category">Category: <span>{productInfo.category}</span></p>
          <button className="back-button" onClick={() => navigate('/auctions')}>
            Back to Auctions
          </button>
        </div>
      </div>

      <div className="auction-description">
        <h3>Description</h3>
        <p>{productInfo.description}</p>
        <h4>Key Features:</h4>
        <ul>
          {productInfo.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AuctionItem;
