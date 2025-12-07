const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, address, contactNo } = req.body;
    
    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ 
        error: 'Username, email, and password are required' 
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ 
        error: 'User with this email already exists' 
      });
    }
    
    // Create new user
    const newUser = await User.createUser({
      username,
      email,
      password,
      address,
      contactNo
    });
    
    res.status(201).json({
      message: 'User registered successfully',
      user: newUser
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: 'Registration failed',
      details: error.message 
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }
    
    // Attempt to login
    const user = await User.loginUser(email, password);
    
    res.status(200).json({
      message: 'Login successful',
      user: user
    });
  } catch (error) {
    console.error('Login error:', error);
    if (error.message === 'User not found' || error.message === 'Invalid password') {
      res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    } else {
      res.status(500).json({ 
        error: 'Login failed',
        details: error.message 
      });
    }
  }
});

// Get user profile
router.get('/profile/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.getUserById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }
    
    res.status(200).json({
      user: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch user profile',
      details: error.message 
    });
  }
});

module.exports = router;