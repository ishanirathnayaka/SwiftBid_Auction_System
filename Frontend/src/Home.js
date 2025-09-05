import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Home.css";
import Product from "./product";
import HomeImage from './assets/HomeImage.png'; 



function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auctions');
  };

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Winning bids, One click at a time</h1>
            <p className="hero-subtitle">
              Discover unique items, place your bids, and win amazing products in our secure and exciting online auction platform.
            </p>
            <button className="hero-button btn btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
          <div className="hero-image">
            <img src={HomeImage} alt="Home background" className="hero-img" />
          </div>
        </div>
      </div>

      <div className="products-section">
        <div className="container">
          <h2 className="section-title">Featured Categories</h2>
          <p className="section-subtitle">
            Explore our most popular auction categories
          </p>
          
          <div className="products-grid">
            <Product 
              id="123"
              title="SMART PHONES"
              rating={5}
              image="https://www.dennemeyer.com/fileadmin/a/blog/Everyday_IP_Spreading_the_word_about_mobile_phones/Everyday-IP_Spreading-the-word-about-mobile-phones_12.jpg"
            />
            <Product 
              id="1234"
              title="SMART WATCHES"
              rating={4}
              image="https://assets.bizclikmedia.net/668/4899a9f482fc5450a3c0b1e84c1e323e:d5ffa526724fa55d96c5af59e49618ef/apple-se-jpg.webp"
            />
            <Product
              id="12345"
              title="COMPUTERS"
              rating={3}
              image="https://media.licdn.com/dms/image/v2/C4D12AQE1GlwyRdoE2Q/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1616750668513?e=2147483647&v=beta&t=wuBeLViyWoMeAqoIemq7cbPF1GRZxVprdHs2QyFdGow"
            />
          </div>

          <div className="products-grid">
            <Product
              id="123456"
              title="SMART TVS"
              rating={5}
              image="https://pisces.bbystatic.com/image2/BestBuy_US/dam/HT_2MDFTCLStreaming892X_DER-6cd22a15-2c68-47b3-94f3-25534e0c5c13.jpg;maxHeight=455;maxWidth=815"
            />
            <Product
              id="1234567"
              title="CAMERAS"
              rating={4}
              image="https://pisces.bbystatic.com/image2/BestBuy_US/dam/pol-MMT-460876-211018_DER-31b340da-9840-40fc-a282-4f789d0a02ec.jpg;maxHeight=455;maxWidth=815"
            />
            <Product
              id="12345678"
              title="HEADPHONES"
              rating={3}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQbDwkVQ5byvsA13piEj8TtsSkrAeaRh74dg&s"
            />
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Home;
