const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(
  "mongodb://admin:XQHygo08698@node86123-fullstack-10361.th.app.ruk-com.cloud:11829"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const Book = mongoose.model("Book", {
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  title: String,
  author: String,
});

const app = express();
app.use(bodyParser.json());

app.post("/books", async (req, res) => {
  try {
    const lastBook = await Book.findOne().sort({ id: -1 });
    const nextID = lastBook ? lastBook.id + 1 : 1;

    const book = new Book({
      id: nextID,
      ...req.body,
    });

    await book.save();
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findOne({ id: Number(req.params.id) });
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { id: Number(req.params.id) },
      req.body,
      { new: true }
    );
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ id: Number(req.params.id) });
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
