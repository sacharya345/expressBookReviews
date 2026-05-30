const express = require('express');
let books = require("./booksdb.js");

const public_users = express.Router();

// ✅ Get all books (NO AXIOS)
public_users.get('/', (req, res) => {
  return res.status(200).json(books);
});

// Get book by ISBN
public_users.get('/isbn/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });

  return res.json(book);
});

// Get books by author
public_users.get('/author/:author', (req, res) => {
  let result = {};

  Object.keys(books).forEach((isbn) => {
    if (books[isbn].author === req.params.author) {
      result[isbn] = books[isbn];
    }
  });

  return res.json(result);
});

// Get books by title
public_users.get('/title/:title', (req, res) => {
  let result = {};

  Object.keys(books).forEach((isbn) => {
    if (books[isbn].title === req.params.title) {
      result[isbn] = books[isbn];
    }
  });

  return res.json(result);
});

// Get reviews
public_users.get('/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });

  return res.json(book.reviews);
});

module.exports.general = public_users;