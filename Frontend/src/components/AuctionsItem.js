import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TimerIcon from '@mui/icons-material/Timer';
import GavelIcon from '@mui/icons-material/Gavel';

function AuctionsItem({id, image, name, startingPrice, topBid, timeRemaining, button, icon}) {
  const [isHovered, setIsHovered] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const navigate = useNavigate();
  
  // Countdown timer effect
  useEffect(() => {
    // Parse time string like "6 day(s) 14 hour(s) 8 minute(s) 30 second(s)"
    const parseTime = (timeStr) => {
      const days = parseInt(timeStr.match(/(\d+)\s*day/) ? timeStr.match(/(\d+)\s*day/)[1] : '0');
      const hours = parseInt(timeStr.match(/(\d+)\s*hour/) ? timeStr.match(/(\d+)\s*hour/)[1] : '0');
      const minutes = parseInt(timeStr.match(/(\d+)\s*minute/) ? timeStr.match(/(\d+)\s*minute/)[1] : '0');
      const seconds = parseInt(timeStr.match(/(\d+)\s*second/) ? timeStr.match(/(\d+)\s*second/)[1] : '0');
      
      // Convert everything to seconds for easier countdown
      return days * 86400 + hours * 3600 + minutes * 60 + seconds;
    };
    
    // Format seconds to display string
    const formatTime = (totalSeconds) => {
      if (totalSeconds <= 0) {
        return 'Auction Ended';
      }
      
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);
      
      return `${days} day(s) ${hours} hour(s) ${minutes} minute(s) ${seconds} second(s)`;
    };
    
    // Get initial seconds
    let secondsLeft = parseTime(timeRemaining);
    
    // Set initial display
    setTimeLeft(formatTime(secondsLeft));
    setIsExpired(secondsLeft <= 0);
    
    // If already expired, don't start timer
    if (secondsLeft <= 0) {
      return;
    }
    
    // Start countdown
    const timer = setInterval(() => {
      secondsLeft--;
      setTimeLeft(formatTime(secondsLeft));
      
      if (secondsLeft <= 0) {
        setIsExpired(true);
        clearInterval(timer);
      }
    }, 1000);
    
    // Cleanup
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeRemaining]);
  
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
        timeRemaining: timeLeft // Pass the current time
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
            <span className='time-value'>{timeLeft}</span>
          </div>
        </div>
        
        <button 
          className='auction-bid-btn btn btn-primary'
          onClick={handleBidClick}
          aria-label={`Place bid on ${name}`}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          disabled={isExpired}
        >
          {isExpired ? 'Auction Ended' : (button || 'Place Bid')}
        </button>
      </div>
    </div>
  )
}

export default AuctionsItem