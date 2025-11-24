const mongoose = require('mongoose');

// Define the structure of a flashcard document in the database
const flashcardSchema = new mongoose.Schema({
  // The question on the flashcard, required and trimmed of extra spaces
  question: {
    type: String,
    required: true,  // This field cannot be empty
    trim: true       // Remove leading/trailing spaces automatically
  },
  // The answer to the question, also required and trimmed
  answer: {
    type: String,
    required: true,
    trim: true
  },
  // Subject or category of the flashcard (like Math, History, etc), required and trimmed
  subject: {
    type: String,
    required: true,
    trim: true
  }
}, {
  // Auto-add createdAt and updatedAt timestamps to each card
  timestamps: true,
  // Optional: explicitly specify the MongoDB collection name
  // collection: 'flashcards'
});

// Create a model based on this schema to interact with the 'flashcards' collection in MongoDB
const Flashcard = mongoose.model('Flashcard', flashcardSchema);

// Export the model so we can use it elsewhere in the app (like in route handlers)
module.exports = Flashcard;
