// Description: CRUD Book No DB
// npm install express dotenv
const express = require('express');
require('dotenv').config();

const app = express();

// Parse incoming JSON requests
app.use(express.json());

// Sample data
let books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
    { id: 3, title: 'Book 3', author: 'Author 3' }
];

// Route to get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Route to get a book by id
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
});

// Route to create a new book
app.post('/books', (req, res) => {
    const book = {
        // Using a timestamp for ID ensures it is always unique
        id: Date.now(), 
        title: req.body.title,
        author: req.body.author
    };
    books.push(book);
    res.status(201).send(book);
});

// Route to update a book
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');

    book.title = req.body.title;
    book.author = req.body.author;
    res.send(book);
});

// Route to delete a book
app.delete('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');

    const index = books.indexOf(book);
    books.splice(index, 1);
    res.send(book);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));