import React from 'react';
import '../styles/Footer.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-about">
            <h3 className="footer-title">SWIFTBID</h3>
            <p className="footer-description">
              We strive to provide the highest level of service to our clients. With our
              extensive knowledge and experience in the industry, we offer a reliable
              and transparent auction process for both buyers and sellers.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Twitter">
                <TwitterIcon />
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">USEFUL LINKS</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/auctions">Auctions</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">OUR SERVICES</h3>
            <ul className="footer-links">
              <li>Promotion</li>
              <li>Live Auction Support</li>
              <li>Online Auction Platform</li>
              <li>Customer Support</li>
              <li>Marketing</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">CONTACT US</h3>
            <div className="contact-info">
              <p className="contact-item">
                32/1, Highlevel Road<br />
                Colombo, Sri Lanka
              </p>
              <p className="contact-item">
                Phone: +77 8703456<br />
                Email: info@swiftbid.com
              </p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 SwiftBid Auctioneers. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
