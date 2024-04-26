const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const PORT = process.env.PORT || 3400;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

const books = [
  {id: 1, title: "The Great Gatsby", author: "F. Scott fitzgerald"},
  {id: 2, title: "Go shopping", author: "George Orwell"}
];

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  let id = req.params.id;
  const index = books.findIndex(book => book.id == id);
  if (index != -1) {
    res.json({"message": `This is the book with id ${id}`, "body": books[index]});
  }
  else{
    res.json({"message": `The book with id ${id} does not exist`});
  }
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(books);
});

app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const index = books.findIndex(book => book.id === bookId);
  if (index != -1) {
    books[index] = { id: bookId, title, author };
    res.json(books[index]);
  }
  else{
    res.status(404).json({message: "Book not found"});
  }
});

app.patch("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const index = books.findIndex(book => book.id === bookId);
  if (index != -1) {
    books[index] = { id: bookId, title, author };
    res.json(books[index]);
  }
  else{
    res.status(404).json({message: "Book not found"});
  }
});

app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === bookId)

  if (index != -1) {
    books.splice(index, 1)
    res.json("Book successfully deleted");
  } else {
    res.status(404).json({ message: "Book not found" });
  };
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})

