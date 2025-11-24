require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
console.log('MONGODB_URL from env:', process.env.MONGODB_URL);

// ----- Connect to MongoDB Atlas -----
mongoose.connect(process.env.MONGODB_URL)

  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// ----- Mongoose Model -----
const Flashcard = require('./models/Flashcard');

// ----- Express App Setup -----
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// ----- Dummy User Array (for demo only) -----
const users = []; // Each user: { email, password }

// ----- ROUTES -----

// Home Page
app.get('/', (req, res) => {
  res.render('home');
});

// Show All Flashcards
app.get('/flashcards', async (req, res) => {
  const flashcards = await Flashcard.find();
  res.render('flashcards', { flashcards });
});

// Render Create Flashcard Form
app.get('/flashcards/new', (req, res) => {
  res.render('newFlashcard');
});

// Add New Flashcard
app.post('/flashcards', async (req, res) => {
  await Flashcard.create(req.body); // expects: question, answer, subject
  res.redirect('/flashcards');
});

// Render Edit Flashcard Form
app.get('/flashcards/:id/edit', async (req, res) => {
  const flashcard = await Flashcard.findById(req.params.id);
  if (!flashcard) return res.status(404).send('Flashcard not found');
  res.render('editFlashcard', { flashcard });
});

// Update Flashcard
app.post('/flashcards/:id', async (req, res) => {
  await Flashcard.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/flashcards');
});

// Delete Flashcard
app.post('/flashcards/:id/delete', async (req, res) => {
  await Flashcard.findByIdAndDelete(req.params.id);
  res.redirect('/flashcards');
});

// ----- DEMO USER SIGNUP/LOGIN -----
app.get('/signup', (req, res) => {
  res.render('signup');
});
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.send('User already exists. <a href="/signup">Try again</a>');
  }
  users.push({ email, password });
  res.redirect('/login');
});
app.get('/login', (req, res) => {
  res.render('login');
});
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    res.send(`Welcome, ${user.email}! <a href="/">Go to Home</a>`);
  } else {
    res.send('Invalid email or password. <a href="/login">Try again</a>');
  }
});

// ----- START SERVER -----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
