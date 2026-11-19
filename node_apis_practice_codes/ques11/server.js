// Develop a NodeJS API for a small digital library. Books are stored in memory and can be viewed, added, borrowed, and returned while maintaining their availability.

const express = require('express');
const app = express();
app.use(express.json());

let books = [];
let counter = 1;

// 1. GET /api/books: Return all books and their current availability.
app.get('/api/books',(req,res)=>{
    res.status(200).json(books);
})

// 2. GET /api/books/:id: Return details for one book. Unknown ids should produce 404 with "Book not found".
app.get('/api/books/:id',(req,res)=>{
    const bookId=parseInt(req.params.id);
    if (!bookId){
        return res.status(404).json({message:"Book not found"});
    }
    const book=books.find(b=>b.id===bookId);
    res.status(200).json(book);
})

// 3. POST /api/books: Accept title and author. Both are mandatory. Invalid data returns 400 with "Please provide valid book details". New books begin as available.
app.post('/api/books',(req,res)=>{
    const {title,author}=req.body;
    if (!title || !author){
        return res.status(400).json({message:"Please provide valid book details"});
    }
    const book={id:counter++,title,author,availability:true};
    books.push(book);
    res.status(200).json(book);
})



// 4. POST /api/books/issue: Accept bookId. Missing id returns 400 with "bookId is required". Unknown books return 404 with "Book not found". An already issued book returns 400 with "Book is already issued". Otherwise mark it unavailable.
app.post('/api/books/issue',(req,res)=>{
    const {bookId}=req.body;
    if (boodId===undefined){
        return res.status(400).json({message:"bookId is required"});
    }
    const book=books.find(b=>b.id===bookId);
    if (!book){
        return res.status(404).json({message:"Book not found"});
    }
    if (book.availability===false){
        return res.status(400).json({message:"Book is already issued"});
    }
    book.availability=false;
    res.status(200).json(book);
})


// 5. POST /api/books/return: Accept bookId and make the corresponding book available again.
app.post('/api/books/return',(req,res)=>{
    const {bookId}=req.body;
    if (bookId === undefined) return res.status(400).json({ message: "bookId is required" });
    const book=books.find(b=>b.id===bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    book.available = true;
    res.status(200).json(book);
})


// 6. All responses must be JSON.


app.use((req, res) => res.status(404).json({ message: "Route not found" }));
app.listen(8000);