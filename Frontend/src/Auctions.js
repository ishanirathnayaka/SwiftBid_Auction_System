import React from 'react';
import { Data } from './data/data'; 
import AuctionsItem from './components/AuctionsItem';
import './styles/Auctions.css';



function Auctions() {
  return (
    <div className="auctions">
      <h1 className='auctions-title'>Live Auctions</h1>
      <div className="auctions-container">
        <div className="auctions-list">
          {Data.map((item, key) => (
            <AuctionsItem
              key={key}
              id={item.id}
              image={item.imageUrl}
              name={item.name}
              startingPrice={item.startingPrice}
              topBid={item.topBid}
              bidsPlaced={item.bidsPlaced}
              condition={item.condition}
              timeRemaining={item.timeRemaining}
              button={item.button}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Auctions;
