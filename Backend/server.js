const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// Define a simple route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
