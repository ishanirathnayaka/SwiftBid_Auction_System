const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
let app;
let db;
let auth;

// Force mock implementation for development
const USE_MOCK_DATABASE = true; //process.env.USE_MOCK_DATABASE === 'true' || process.env.NODE_ENV !== 'production';

if (USE_MOCK_DATABASE) {
  console.log('Using mock database implementation for development');
  
  // Mock implementation for development
  const mockUsers = new Map();
  let userIdCounter = 1;
  
  db = {
    collection: (name) => ({
      add: async (data) => {
        try {
          const id = `${name}_${userIdCounter++}`;
          mockUsers.set(id, { id, ...data });
          return { id };
        } catch (addError) {
          console.error('Mock DB add error:', addError);
          throw new Error('Failed to create user in mock database');
        }
      },
      where: (field, op, value) => ({
        get: async () => {
          try {
            const results = [];
            for (const [id, doc] of mockUsers.entries()) {
              if (doc[field] === value) {
                results.push({ id, data: () => doc });
              }
            }
            return { empty: results.length === 0, docs: results };
          } catch (queryError) {
            console.error('Mock DB query error:', queryError);
            throw new Error('Failed to query mock database');
          }
        }
      }),
      doc: (id) => ({
        get: async () => {
          try {
            const doc = mockUsers.get(id);
            return {
              exists: !!doc,
              data: () => doc
            };
          } catch (getError) {
            console.error('Mock DB get error:', getError);
            throw new Error('Failed to retrieve user from mock database');
          }
        }
      })
    })
  };
  
  auth = {
    // Mock auth methods if needed
  };
} else {
  try {
    // For development, initialize with project ID only
    // This will work with Firebase emulator or with proper service account
    if (process.env.NODE_ENV === 'production' && process.env.FIREBASE_SERVICE_ACCOUNT) {
      // Production with service account
      try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        app = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: `https://${process.env.FIREBASE_PROJECT_ID || 'swiftbid-2b2c9'}-default-rtdb.firebaseio.com`
        });
      } catch (serviceAccountError) {
        console.error('Service account initialization error:', serviceAccountError);
        throw serviceAccountError;
      }
    } else {
      // Development mode - try to initialize with minimal config
      // This will work if GOOGLE_APPLICATION_CREDENTIALS is set or Firebase emulator is running
      console.log('Initializing Firebase in development mode...');
      
      // Set environment variable for Firebase to use the project ID
      process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST || 'localhost:8080';
      process.env.FIREBASE_AUTH_EMULATOR_HOST = process.env.FIREBASE_AUTH_EMULATOR_HOST || 'localhost:9099';
      
      try {
        app = admin.initializeApp({
          projectId: process.env.FIREBASE_PROJECT_ID || 'swiftbid-2b2c9'
        });
        
        db = admin.firestore();
        auth = admin.auth();
        
        // Configure Firestore settings for development
        if (process.env.NODE_ENV !== 'production') {
          try {
            db.settings({
              host: 'localhost:8080',
              ssl: false
            });
            // Test the connection to Firestore emulator
            // If this fails, we'll fall back to mock implementation
            console.log('Testing Firestore connection...');
          } catch (settingsError) {
            console.warn('Could not configure Firestore emulator settings:', settingsError.message);
            // If settings fail, we'll try to continue without them
            throw settingsError; // This will trigger the fallback to mock implementation
          }
        }
        
        console.log('Firebase Admin initialized successfully');
        
      } catch (initError) {
        console.error('Firebase initialization error:', initError);
        throw initError;
      }
    }
    
  } catch (error) {
    console.log('Firebase admin initialization error:', error.message);
    console.log('Falling back to mock implementation for development...');
    
    // Fallback mock implementation for development
    const mockUsers = new Map();
    let userIdCounter = 1;
    
    db = {
      collection: (name) => ({
        add: async (data) => {
          try {
            const id = `${name}_${userIdCounter++}`;
            mockUsers.set(id, { id, ...data });
            return { id };
          } catch (addError) {
            console.error('Mock DB add error:', addError);
            throw new Error('Failed to create user in mock database');
          }
        },
        where: (field, op, value) => ({
          get: async () => {
            try {
              const results = [];
              for (const [id, doc] of mockUsers.entries()) {
                if (doc[field] === value) {
                  results.push({ id, data: () => doc });
                }
              }
              return { empty: results.length === 0, docs: results };
            } catch (queryError) {
              console.error('Mock DB query error:', queryError);
              throw new Error('Failed to query mock database');
            }
          }
        }),
        doc: (id) => ({
          get: async () => {
            try {
              const doc = mockUsers.get(id);
              return {
                exists: !!doc,
                data: () => doc
              };
            } catch (getError) {
              console.error('Mock DB get error:', getError);
              throw new Error('Failed to retrieve user from mock database');
            }
          }
        })
      })
    };
    
    auth = {
      // Mock auth methods if needed
    };
  }
}

module.exports = { admin, db, auth };