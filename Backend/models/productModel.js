const { db } = require('../config/firebase');

const Product = {
  getAllProducts: async () => {
    try {
      const snapshot = await db.collection('products').get();
      const products = [];
      snapshot.forEach(doc => {
        products.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  
  getProductById: async (id) => {
    try {
      const doc = await db.collection('products').doc(id).get();
      if (!doc.exists) {
        throw new Error('Product not found');
      }
      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  
  createProduct: async (product) => {
    try {
      const productData = {
        ...product,
        created_at: new Date(),
        updated_at: new Date()
      };
      const docRef = await db.collection('products').add(productData);
      return {
        id: docRef.id,
        ...productData
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  
  updateProduct: async (id, product) => {
    try {
      const updateData = {
        ...product,
        updated_at: new Date()
      };
      await db.collection('products').doc(id).update(updateData);
      const updatedDoc = await db.collection('products').doc(id).get();
      return {
        id: updatedDoc.id,
        ...updatedDoc.data()
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  
  deleteProduct: async (id) => {
    try {
      await db.collection('products').doc(id).delete();
      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

module.exports = Product;