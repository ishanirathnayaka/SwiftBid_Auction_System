# SwiftBid Backend

This directory contains the Node.js backend for the SwiftBid application.

## Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)

## Getting Started

1.  **Navigate to the backend directory:**
    ```bash
    cd SwiftBid/Backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the server:**
    ```bash
    node server.js
    ```
    The server will start and listen on port 3001 (or the port specified by the `PORT` environment variable). You should see the message "Server listening at http://localhost:3001" in your console.

## API Endpoints

-   `GET /api`: Returns a simple JSON message: `{ "message": "Hello from the backend!" }`
