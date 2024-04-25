# Book Management API

This is a simple RESTful API for managing books, providing functionalities like user authentication, CRUD operations for managing book entries, filtering books by author or publication year, and basic security measures.

## Setup

1. **Clone the Repository**: 
   ```bash
   git clone <repository_url>

2. **Install Dependencies**:
   ```bash
   npm install

## Usage

1. **Running the server**
   ```bash
   npm start

2. **Authentication** \
   To authenticate, send a POST request to /auth/login with the following JSON payload:
   ```bash
   {
    "username": "admin",
    "password": "admin123"
   }
   ```
   You will receive a JWT token which should be included in the headers of subsequent requests.

3. **Endpoints**
   ```bash
   GET /books - Get all books.
   GET /books/author/:author - Get books by author.
   GET /books/year/:year - Get books by publication year.
   POST /books - Add a new book (Requires authentication).
   PUT /books/:id - Update a book (Requires authentication).
   DELETE /books/:id - Delete a book (Requires authentication).
   ```
   Example Usage:
   ```bash
   curl -X GET http://localhost:3000/books

   curl -X POST http://localhost:3000/books \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <your_jwt_token>" \
     -d '{"title": "New Book", "author": "New Author", "publicationYear": 2023}'
   ```

4. **Data Storage** \
   Books data is stored in **books.json** file at the root directory.
   Sample data is given as below:
   ```bash
   [
    {
     "id": 1,
     "title": "Book 1",
     "author": "Author 1",
     "publicationYear": 2020
    },
    {
     "id": 2,
     "title": "Book 2",
     "author": "Author 2",
     "publicationYear": 2019
    }
   ]
   ```