const express = require('express');
const booksController = require("../controllers/booksController");
const { verifyToken } = require('../middleware/authMiddleware');
const { validateBook, handleValidationErrors } = require('../middleware/validationMiddleware');

const router = express.Router();

// Get all books
router.get('/', booksController.getAllBooks);

// Get books by author
router.get('/author/:author', booksController.getBooksByAuthor);

// Get books by publication year
router.get('/year/:year', booksController.getBooksByYear);

// Add a new book (Requires authentication)
router.post('/', validateBook, handleValidationErrors, verifyToken, booksController.addBook);

// Update a book (Requires authentication)
router.put('/:id', validateBook, handleValidationErrors, verifyToken, booksController.updateBook);

// Delete a book (Requires authentication)
router.delete('/:id', verifyToken, booksController.deleteBook);

module.exports = router;
