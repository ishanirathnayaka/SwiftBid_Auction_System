const { db } = require('../config/firebase');
const bcrypt = require('bcrypt');

const User = {
  // Create a new user
  async createUser(userData) {
    try {
      const { username, email, password, address, contactNo } = userData;
      
      // Hash the password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      
      // Create user document for Firestore
      const userDoc = {
        email: email,
        password_hash: passwordHash,
        first_name: username,
        address: address || '',
        contact_no: contactNo || '',
        created_at: new Date(),
        updated_at: new Date()
      };
      
      // Save to Firestore
      const docRef = await db.collection('users').add(userDoc);
      
      // Return user data without password
      const { password_hash, ...userWithoutPassword } = userDoc;
      return {
        id: docRef.id,
        ...userWithoutPassword
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Find user by email
  async findUserByEmail(email) {
    try {
      const snapshot = await db.collection('users').where('email', '==', email).get();
      
      if (snapshot.empty) {
        return null;
      }
      
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  },

  // Verify user password
  async verifyPassword(plainPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      console.error('Error verifying password:', error);
      throw error;
    }
  },

  // Get user by ID
  async getUserById(userId) {
    try {
      const doc = await db.collection('users').doc(userId).get();
      
      if (!doc.exists) {
        return null;
      }
      
      const userData = doc.data();
      // Remove password_hash from response
      const { password_hash, ...userWithoutPassword } = userData;
      return {
        id: doc.id,
        ...userWithoutPassword
      };
    } catch (error) {
      console.error('Error getting user by ID:', error);
      throw error;
    }
  },

  // Login user
  async loginUser(email, password) {
    try {
      const user = await this.findUserByEmail(email);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      const isPasswordValid = await this.verifyPassword(password, user.password_hash);
      
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      
      // Remove password_hash from response
      const { password_hash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }
};

module.exports = User;