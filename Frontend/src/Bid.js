import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./styles/Bid.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GavelIcon from '@mui/icons-material/Gavel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import SecurityIcon from '@mui/icons-material/Security';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';

const AuctionItem = () => {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [bidAmount, setBidAmount] = useState(1300);
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get product data from navigation state or set default
  useEffect(() => {
    setTimeout(() => {
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
      setIsLoading(false);
    }, 500);
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="bid-container">
        <div className="loading-card">
          <div className="loading-spinner"></div>
          <p>Loading auction details...</p>
        </div>
      </div>
    );
  }

  // Show error state if no product data
  if (!productData) {
    return (
      <div className="bid-container">
        <div className="error-card">
          <h2>Product Not Found</h2>
          <p>Sorry, we couldn't find the auction details.</p>
          <button onClick={() => navigate('/auctions')} className="btn btn-primary">
            <ArrowBackIcon /> Back to Auctions
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
        condition: 'Brand New',
        warranty: '2 Years',
        shipping: 'Free Express Shipping',
        features: [
          'High-resolution display with vibrant colors',
          'Advanced camera system with multiple lenses',
          'Fast processor for smooth performance',
          'Long-lasting battery life',
          '5G connectivity for ultra-fast internet',
          'Water and dust resistant design'
        ]
      },
      'SMART WATCHES': {
        brand: 'Tech Brands',
        category: 'Wearables - Smart Watches',
        description: 'Advanced smartwatches with health monitoring, fitness tracking, and seamless connectivity to your smartphone.',
        condition: 'Brand New',
        warranty: '1 Year',
        shipping: 'Free Standard Shipping',
        features: [
          'Heart rate and fitness monitoring',
          'GPS tracking for outdoor activities',
          'Water-resistant design',
          'Multiple watch faces and customization',
          'Smartphone notifications and calls',
          'Long battery life up to 7 days'
        ]
      },
      'COMPUTERS': {
        brand: 'Leading Manufacturers',
        category: 'Electronics - Computers',
        description: 'High-performance computers designed for professional work, gaming, and creative tasks with powerful processors and graphics.',
        condition: 'Brand New',
        warranty: '3 Years',
        shipping: 'Free Express Shipping',
        features: [
          'High-speed processors for multitasking',
          'Advanced graphics capabilities',
          'Large storage capacity',
          'Multiple connectivity ports',
          'High-resolution displays',
          'Advanced cooling systems'
        ]
      },
      'SMART TVS': {
        brand: 'Entertainment Brands',
        category: 'Electronics - Smart TVs',
        description: 'Smart TVs with stunning picture quality, streaming capabilities, and smart home integration for the ultimate entertainment experience.',
        condition: 'Brand New',
        warranty: '2 Years',
        shipping: 'Free Express Shipping',
        features: [
          '4K Ultra HD resolution',
          'HDR support for vivid colors',
          'Built-in streaming apps',
          'Voice control capabilities',
          'Smart home integration',
          'Multiple HDMI and USB ports'
        ]
      },
      'CAMERAS': {
        brand: 'Photography Brands',
        category: 'Electronics - Cameras',
        description: 'Professional cameras for photography enthusiasts and professionals, featuring advanced lens systems and image processing.',
        condition: 'Brand New',
        warranty: '2 Years',
        shipping: 'Free Standard Shipping',
        features: [
          'High-resolution image sensors',
          'Interchangeable lens system',
          'Advanced autofocus technology',
          'Image stabilization',
          '4K video recording capability',
          'Weather-sealed body'
        ]
      },
      'HEADPHONES': {
        brand: 'Audio Brands',
        category: 'Electronics - Audio',
        description: 'Premium headphones delivering exceptional sound quality with noise cancellation and comfortable design for extended use.',
        condition: 'Brand New',
        warranty: '1 Year',
        shipping: 'Free Standard Shipping',
        features: [
          'Active noise cancellation',
          'High-fidelity audio drivers',
          'Comfortable over-ear design',
          'Long battery life up to 30 hours',
          'Wireless Bluetooth connectivity',
          'Quick charge functionality'
        ]
      },
      'GENERAL': {
        brand: 'Premium Brands',
        category: 'Electronics - General',
        description: 'High-quality electronic device with advanced features and reliable performance.',
        condition: 'Brand New',
        warranty: '1 Year',
        shipping: 'Free Standard Shipping',
        features: [
          'Advanced technology integration',
          'User-friendly interface',
          'Durable construction',
          'Energy-efficient design',
          'Modern connectivity options',
          'Reliable performance'
        ]
      }
    };
    return descriptions[category] || descriptions['GENERAL'];
  };

  const productInfo = getProductDescription(productData);

  return (
    <div className="bid-container">
      {/* Header Card */}
      <div className="bid-header-card">
        <button 
          onClick={() => navigate('/auctions')} 
          className="back-btn"
          aria-label="Back to auctions"
        >
          <ArrowBackIcon />
          <span>Back to Auctions</span>
        </button>
        <div className="auction-status">
          <AccessTimeIcon className="status-icon" />
          <span>Auction Ending Soon</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="bid-content-grid">
        {/* Product Image Card */}
        <div className="product-image-card">
          <div className="image-container">
            <img 
              src={productData.image} 
              alt={productData.title || productData.name}
              onError={(e) => {
                e.target.src = '/default-product.png';
              }}
            />
            <div className="image-badges">
              <span className="verified-badge">
                <VerifiedIcon />
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Product Details Card */}
        <div className="product-details-card">
          <div className="product-header">
            <h1 className="product-title">{productData.title || productData.name}</h1>
            <div className="product-meta">
              <span className="brand-tag">{productInfo.brand}</span>
              <div className="rating-section">
                <div className="stars">
                  {Array(productData.rating || 5)
                    .fill()
                    .map((_, i) => (
                      <StarIcon key={i} className="star-icon" />
                    ))}
                </div>
                <span className="rating-text">({productData.rating || 5}/5)</span>
              </div>
            </div>
          </div>

          <div className="pricing-section">
            {productData.topBid && (
              <div className="current-bid-info">
                <TrendingUpIcon className="trend-icon" />
                <span>Current Top Bid</span>
                <span className="bid-amount">${productData.topBid}</span>
              </div>
            )}
            
            <div className="your-bid-section">
              <h3>Your Bid</h3>
              <div className="bid-controls">
                <button onClick={decreaseBid} className="bid-btn decrease">
                  -
                </button>
                <div className="bid-display">
                  <span className="currency">$</span>
                  <span className="amount">{bidAmount}</span>
                </div>
                <button onClick={increaseBid} className="bid-btn increase">
                  +
                </button>
              </div>
              <button className="place-bid-btn" onClick={placeBid}>
                <GavelIcon />
                Place Bid
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="trust-indicators">
            <div className="trust-item">
              <SecurityIcon />
              <span>Secure Payment</span>
            </div>
            <div className="trust-item">
              <LocalShippingIcon />
              <span>{productInfo.shipping}</span>
            </div>
            <div className="trust-item">
              <VerifiedIcon />
              <span>{productInfo.warranty} Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information Cards */}
      <div className="info-cards-grid">
        {/* Description Card */}
        <div className="info-card description-card">
          <h3>Product Description</h3>
          <p>{productInfo.description}</p>
          <div className="category-tag">
            <span>{productInfo.category}</span>
          </div>
        </div>

        {/* Features Card */}
        <div className="info-card features-card">
          <h3>Key Features</h3>
          <ul className="features-list">
            {productInfo.features.map((feature, index) => (
              <li key={index}>
                <VerifiedIcon className="feature-icon" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Auction Info Card */}
        <div className="info-card auction-info-card">
          <h3>Auction Information</h3>
          <div className="auction-details">
            <div className="detail-item">
              <span className="label">Condition:</span>
              <span className="value">{productInfo.condition}</span>
            </div>
            <div className="detail-item">
              <span className="label">Starting Bid:</span>
              <span className="value">
                ${productData.startingPrice || bidAmount - 200}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Time Left:</span>
              <span className="value">
                {productData.timeRemaining || '2 days 15 hours'}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Total Bids:</span>
              <span className="value">23 bids</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionItem;
