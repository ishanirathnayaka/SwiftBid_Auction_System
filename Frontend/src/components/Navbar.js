import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import GavelIcon from '@mui/icons-material/Gavel';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo"> 
          <GavelIcon className="navbar-logoImage" fontSize='large' />
          <h2 className="navbar-logoText">SWIFTBID</h2>
        </div>
        
        {/* Desktop Navigation */}
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/auctions">Auctions</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        
        {/* Desktop Actions */}
        <div className='navbar-actions'>
          <Link to="/login" className="btn btn-secondary navbar-login">Login</Link>
          <Link to="/signup" className='btn btn-primary navbar-signup'>Sign up</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-button ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
      
      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      ></div>
      
      {/* Mobile Menu Panel */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="navbar-logo">
            <GavelIcon className="navbar-logoImage" fontSize='large' />
            <h2 className="navbar-logoText">SWIFTBID</h2>
          </div>
          <button 
            className="mobile-menu-close"
            onClick={closeMobileMenu}
            aria-label="Close mobile menu"
          >
            <CloseIcon />
          </button>
        </div>
        
        <div className="mobile-menu-links">
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
          <Link to="/auctions" onClick={closeMobileMenu}>Auctions</Link>
          <Link to="/about" onClick={closeMobileMenu}>About</Link>
          <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
        </div>
        
        <div className="mobile-menu-actions">
          <Link 
            to="/login" 
            className="btn btn-secondary navbar-login"
            onClick={closeMobileMenu}
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className='btn btn-primary navbar-signup'
            onClick={closeMobileMenu}
          >
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;

