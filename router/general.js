const express = require('express');
const axios = require('axios');

const public_users = express.Router();

const BASE_URL = 'http://localhost:5000';

// ✅ Get all books (async/await + axios)
public_users.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// ✅ Get book by ISBN using Axios (REQUIRED TASK)
public_users.get('/isbn/:isbn', (req, res) => {
  axios.get(`${BASE_URL}/`)
    .then(response => {
      const books = response.data;
      const book = books[req.params.isbn];

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      return res.status(200).json(book);
    })
    .catch(() => {
      return res.status(500).json({ message: "Error fetching book" });
    });
});

// Get books by author (async/await)
public_users.get('/author/:author', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    const books = response.data;

    let result = {};
    Object.keys(books).forEach(isbn => {
      if (books[isbn].author === req.params.author) {
        result[isbn] = books[isbn];
      }
    });

    return res.json(result);
  } catch {
    return res.status(500).json({ message: "Error" });
  }
});

// Get books by title (async/await)
public_users.get('/title/:title', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    const books = response.data;

    let result = {};
    Object.keys(books).forEach(isbn => {
      if (books[isbn].title === req.params.title) {
        result[isbn] = books[isbn];
      }
    });

    return res.json(result);
  } catch {
    return res.status(500).json({ message: "Error" });
  }
});

// Get reviews
public_users.get('/review/:isbn', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    const books = response.data;

    const book = books[req.params.isbn];

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.json(book.reviews);
  } catch {
    return res.status(500).json({ message: "Error fetching reviews" });
  }
});

module.exports.general = public_users;