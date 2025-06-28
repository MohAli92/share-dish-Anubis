const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Simple in-memory storage for testing
let posts = [];
let users = [];

// Basic routes for testing
app.get('/', (req, res) => {
  res.json({ message: 'Share Dish API is running (Simple Mode)' });
});

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  const post = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date()
  };
  posts.push(post);
  res.json(post);
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const user = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date()
  };
  users.push(user);
  res.json(user);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (Simple Mode - No Database)`);
  console.log(`API available at: http://localhost:${PORT}`);
}); 