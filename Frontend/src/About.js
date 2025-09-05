import React from 'react';
import aboutImage from './assets/about.png';
import './styles/About.css';

function About() {
  return (
    <div className='about'>
        <div
        className='about-top'
        style={{ backgroundImage: `url(${aboutImage})` }} 
      ></div>
      <div className='about-bottom'></div>
      
          <h1 className='about-text'>About Us</h1>
          <p>
          An auction is usually a process of buying and selling goods or
          services by offering them up for bids, taking bids, and then selling
          the item to the highest bidder or buying the item from the lowest
          bidder. Some exceptions to this definition exist and are described in
          the section about different types. The branch of economic theory
          dealing with auction types and participants' behavior in auctions is
          called auction theory. The open ascending price auction is arguably
          the most common form of auction and has been used throughout history.
          [1] Participants bid openly against one another, with each subsequent
          bid being higher than the previous bid. [2] An auctioneer may
          announce prices, while bidders submit bids vocally or electronically.
          [2]Auctions are applied for trade in diverse contexts. These contexts
          include antiques, paintings, rare collectibles, expensive wines,
          commodities, livestock, radio spectrum, used cars, real estate,
          online advertising, vacation packages, emission trading, and many
          more.
         </p>
      </div>
   
  );
}

export default About;
