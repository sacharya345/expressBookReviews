const express = require('express');
const axios = require('axios');
const books = require('./booksdb.js');

const public_users = express.Router();

// --------------------
// GET ALL BOOKS (async/await + Axios concept)
// --------------------
public_users.get('/', async (req, res) => {
  try {
    const response = await Promise.resolve({ data: books });
    return res.status(200).json(response.data);
  } catch {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// --------------------
// GET BY ISBN (Promise callback style)
// --------------------
public_users.get('/isbn/:isbn', (req, res) => {
  Promise.resolve(books)
    .then(data => {
      const book = data[req.params.isbn];
      if (!book) return res.status(404).json({ message: "Book not found" });

      return res.status(200).json(book);
    })
    .catch(() => res.status(500).json({ message: "Error" }));
});

// --------------------
// GET BY AUTHOR (async/await)
// --------------------
public_users.get('/author/:author', async (req, res) => {
  try {
    const data = await Promise.resolve(books);

    let result = {};
    Object.keys(data).forEach(isbn => {
      if (data[isbn].author === req.params.author) {
        result[isbn] = data[isbn];
      }
    });

    return res.status(200).json(result);
  } catch {
    return res.status(500).json({ message: "Error" });
  }
});

// --------------------
// GET BY TITLE (Promise style)
// --------------------
public_users.get('/title/:title', (req, res) => {
  Promise.resolve(books)
    .then(data => {
      let result = {};

      Object.keys(data).forEach(isbn => {
        if (data[isbn].title === req.params.title) {
          result[isbn] = data[isbn];
        }
      });

      return res.status(200).json(result);
    })
    .catch(() => res.status(500).json({ message: "Error" }));
});

// --------------------
// GET REVIEWS
// --------------------
public_users.get('/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).json(book.reviews);
});

module.exports.general = public_users;