const fs = require('fs');
const path = require('path');

const booksFilePath = path.join(__dirname, '../books.json');

// Read books from JSON file
const getBooks = () => {
  try {
    const booksData = fs.readFileSync(booksFilePath, 'utf8');
    return JSON.parse(booksData);
  } catch (err) {
    console.error('Error reading books file:', err);
    return [];
  }
};

// Write books to JSON file
const saveBooks = (books) => {
  try {
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing books file:', err);
  }
};

const getAllBooks = (req, res) => {
  const books = getBooks();
  return res.json(books);
};

const getBooksByAuthor = (req, res) => {
  const books = getBooks();
  const author = req.params.author;

  const filteredBooks = books.filter(book => book.author === author);
  if (!filteredBooks.length) {
    return res.status(404).json({ message: 'Author not found' });
  }
  return res.json(filteredBooks);
};

const getBooksByYear = (req, res) => {
  const books = getBooks();
  const year = parseInt(req.params.year);

  const filteredBooks = books.filter(book => book.publicationYear === year);
  if (!filteredBooks.length) {
    return res.status(404).json({ message: `No books found for the year ${year}` });
  }
  return res.json(filteredBooks);
};

const addBook = (req, res) => {
  const books = getBooks();
  const { title, author, publicationYear } = req.body;

  const newBook = { id: books.length + 1, title, author, publicationYear: Number(publicationYear) };
  books.push(newBook);
  saveBooks(books);

  return res.status(201).json(newBook);
};

const updateBook = (req, res) => {
  const books = getBooks();
  const id = parseInt(req.params.id);
  const { title, author, publicationYear } = req.body;

  const index = books.findIndex(book => book.id === id);

  if (index !== -1) {
    books[index] = { id, title, author, publicationYear };
    saveBooks(books);

    return res.json(books[index]);
  } else {
    return res.status(404).json({ message: 'Book not found' });
  }
};

const deleteBook = (req, res) => {
  const books = getBooks();
  const id = parseInt(req.params.id);

  const index = books.findIndex(book => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    saveBooks(books);

    return res.json({ message: 'Book deleted successfully' });
  } else {
    return res.status(404).json({ message: 'Book not found' });
  }
};

module.exports = {
  getAllBooks,
  getBooksByAuthor,
  getBooksByYear,
  addBook,
  updateBook,
  deleteBook,
}