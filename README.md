Flashcard Maker
A simple web app to create, edit, and delete flashcards using Node.js, Express, EJS, and MongoDB Atlas.

Features
Manage flashcards (add, edit, delete)

Data stored on MongoDB Atlas

Supports viewing and editing data with MongoDB Compass

Getting Started
Prerequisites
Node.js (v16+)

MongoDB Atlas account

Installation
Clone this repository:

git clone https://github.com/tanzibrk/flashcard-maker.git
cd flashcard-maker

Install dependencies:
npm install

Create a .env file in the project root:
MONGODB_URL=your-mongodb-atlas-connection-string
Start the server:

text
npm start
Visit http://localhost:3000

MongoDB Compass
Open Compass, paste your Atlas connection string, and connect to view your flashcardsdb database.

Author
tanzibrk
