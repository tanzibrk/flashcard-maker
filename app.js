// Import required packages
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

// Create the Express app
const app = express();

// --- TEMPORARY IN-MEMORY FLASHCARDS DB --- //
let flashcards = [
  { _id: '1', question: 'What is Node.js?', answer: 'A JavaScript runtime.', subject: 'Programming' },
  { _id: '2', question: 'Capital of France?', answer: 'Paris', subject: 'Geography' }
];

// --- TEMPORARY IN-MEMORY USER DB --- // 
const users = []; // Each user: { email, password }

// ---- SETUP ---- //
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// ---- ROUTES ---- //

// HOME PAGE
app.get('/', (req, res) => {
  res.render('home');
});

// ---- FLASHCARD ROUTES ---- //

// Show all flashcards
app.get('/flashcards', (req, res) => {
  res.render('flashcards', { flashcards });
});

// Render create flashcard form
app.get('/flashcards/new', (req, res) => {
  res.render('newFlashcard');
});

// Add new flashcard
app.post('/flashcards', (req, res) => {
  const { question, answer, subject } = req.body;
  flashcards.push({
    _id: (flashcards.length + 1).toString(),
    question,
    answer,
    subject
  });
  res.redirect('/flashcards');
});

// Render flashcard edit form
app.get('/flashcards/:id/edit', (req, res) => {
  const flashcard = flashcards.find(card => card._id === req.params.id);
  if (!flashcard) return res.status(404).send('Flashcard not found');
  res.render('editFlashcard', { flashcard });
});

// Update flashcard
app.put('/flashcards/:id', (req, res) => {
  const idx = flashcards.findIndex(card => card._id === req.params.id);
  if (idx === -1) return res.status(404).send('Flashcard not found');
  flashcards[idx] = {
    _id: req.params.id,
    question: req.body.question,
    answer: req.body.answer,
    subject: req.body.subject
  };
  res.redirect('/flashcards');
});

// ---- USER SIGNUP/LOGIN ROUTES ---- //

// Show signup form
app.get('/signup', (req, res) => {
  res.render('signup'); // loads views/signup.ejs
});

// Handle signup form POST: basic demo signup
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  // Check if user already exists (case-sensitive)
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.send('User already exists. <a href="/signup">Try again</a>');
  }
  users.push({ email, password }); // DO NOT use plain-text passwords in real apps!
  res.redirect('/login');
});

// Show login form
app.get('/login', (req, res) => {
  res.render('login'); // loads views/login.ejs
});

// Handle login form POST: basic demo login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    res.send(`Welcome, ${user.email}! <a href="/">Go to Home</a>`);
  } else {
    res.send('Invalid email or password. <a href="/login">Try again</a>');
  }
});

// ---- START SERVER ---- //
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
