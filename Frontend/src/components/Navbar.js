import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import GavelIcon from '@mui/icons-material/Gavel';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo"> 
        <GavelIcon className="navbar-logoImage"fontSize='large' />
        <h2 className="navbar-logoText">SWIFTBID</h2>
           
        </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/auctions">Auctions</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className='navbar-actions'>
        <Link to="/login" className="btn btn-secondary navbar-login">Login</Link>
        <Link to="/signup" className='btn btn-primary navbar-signup'>Sign up</Link>
      </div>
    </nav>
  );
};

export default Navbar;

