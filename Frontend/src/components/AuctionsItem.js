import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TimerIcon from '@mui/icons-material/Timer';
import GavelIcon from '@mui/icons-material/Gavel';

function AuctionsItem({id, image, name, startingPrice, topBid, timeRemaining, button, icon}) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const handleBidClick = () => {
    // Navigate to bid page with product-specific information
    navigate(`/bid/${id}`, { 
      state: { 
        id,
        title: name,
        image,
        rating: 5, // Default rating for auction items
        startingPrice,
        topBid,
        timeRemaining
      }
    });
  };
  
  const formatPrice = (price) => {
    if (typeof price === 'string' && price.startsWith('$')) {
      return price;
    }
    return `$${price}`;
  };
  
  return (
    <div 
      className='auction-item-card'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='auction-image' style={{backgroundImage: `url(${image})`}}>
        <div className='auction-overlay'>
          <GavelIcon className='cart-icon'/>
        </div>
      </div>
      
      <div className='auction-content'>
        <h3 className='auction-name'>{name}</h3>
        
        <div className='auction-details'>
          <div className='price-info'>
            <p className='starting-price'>Starting: <span>{formatPrice(startingPrice)}</span></p>
            <p className='top-bid'>Top Bid: <span>{formatPrice(topBid)}</span></p>
          </div>
          
          <div className='time-remaining'>
            <TimerIcon className='time-icon' style={{fontSize: '1rem', marginRight: '0.5rem'}} />
            <span className='time-label'>Time Left:</span>
            <span className='time-value'>{timeRemaining}</span>
          </div>
        </div>
        
        <button 
          className='auction-bid-btn btn btn-primary'
          onClick={handleBidClick}
          aria-label={`Place bid on ${name}`}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
        >
          {button || 'Place Bid'}
        </button>
      </div>
    </div>
  )
}

export default AuctionsItem