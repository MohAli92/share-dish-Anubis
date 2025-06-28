const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// In-memory storage
let posts = [];
let users = [];
let messages = [];
let nextPostId = 1;
let nextUserId = 1;
let nextMessageId = 1;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Basic routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Share Dish API is running (In-Memory Mode)',
    status: 'working',
    posts: posts.length,
    users: users.length
  });
});

// User routes
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.post('/api/users', (req, res) => {
  const user = {
    id: nextUserId++,
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  users.push(user);
  res.json(user);
});

app.put('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body, updatedAt: new Date() };
    res.json(users[index]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Post routes
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

app.post('/api/posts', upload.single('image'), (req, res) => {
  const post = {
    id: nextPostId++,
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    authorId: req.body.authorId,
    image: req.file ? `/uploads/${req.file.filename}` : null,
    likes: [],
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  posts.push(post);
  res.json(post);
});

app.put('/api/posts/:id', upload.single('image'), (req, res) => {
  const index = posts.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };
    
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    
    posts[index] = { ...posts[index], ...updateData };
    res.json(posts[index]);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

app.delete('/api/posts/:id', (req, res) => {
  const index = posts.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    posts.splice(index, 1);
    res.json({ message: 'Post deleted successfully' });
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// Message routes
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  const message = {
    id: nextMessageId++,
    ...req.body,
    createdAt: new Date()
  };
  messages.push(message);
  res.json(message);
});

// Auth routes (simplified)
app.post('/api/auth/register', (req, res) => {
  const user = {
    id: nextUserId++,
    ...req.body,
    createdAt: new Date()
  };
  users.push(user);
  res.json({ user, message: 'User registered successfully' });
});

app.post('/api/auth/login', (req, res) => {
  const user = users.find(u => u.email === req.body.email);
  if (user) {
    res.json({ user, message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Chat routes
app.get('/api/chat/:postId', (req, res) => {
  const postMessages = messages.filter(m => m.postId == req.params.postId);
  res.json(postMessages);
});

app.post('/api/chat/:postId', (req, res) => {
  const message = {
    id: nextMessageId++,
    postId: req.params.postId,
    ...req.body,
    createdAt: new Date()
  };
  messages.push(message);
  res.json(message);
});

// Socket.io setup
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', ({ postId }) => {
    socket.join(postId);
  });

  socket.on('sendMessage', ({ postId, sender, text }) => {
    const message = {
      id: nextMessageId++,
      postId,
      sender,
      text,
      createdAt: new Date()
    };
    messages.push(message);

    io.to(postId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (In-Memory Mode)`);
  console.log(`API available at: http://localhost:${PORT}`);
  console.log(`Frontend will be available at: http://localhost:3000`);
  console.log(`Image uploads working in: uploads/`);
  console.log(`Data stored in memory (resets on restart)`);
}); 