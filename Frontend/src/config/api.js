// src/config/api.js
const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:5002/api",
  ENDPOINTS: {
    PRODUCTS: "/products",
    PRODUCT_BY_ID: (id) => `/products/${id}`,
    BIDS: "/bids",
    BID_BY_ID: (id) => `/bids/${id}`,
    AUCTIONS: "/auctions",
    AUCTION_BY_ID: (id) => `/auctions/${id}`,
    CATEGORIES: "/categories",
    USERS: "/users",
    USER_REGISTER: "/users/register",
    USER_LOGIN: "/users/login",
    USER_PROFILE: (id) => `/users/profile/${id}`
  }
};

export default API_CONFIG;