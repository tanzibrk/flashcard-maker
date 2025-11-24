const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  question: String,
  answer: String,
  subject: String
});

module.exports = mongoose.model('Flashcard', flashcardSchema);
