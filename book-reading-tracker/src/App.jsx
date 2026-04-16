import { useState } from "react";

export default function App() {
  const [books,setBooks]=useState([]);
  const [input,setInput]=useState("");
  const [error,setError]=useState("");

  const addBook=()=>{
    const trimmed=input.trim();
    if (!trimmed){
      setError("List cannot be empty");
      return;
    }
    const duplicate=books.find((item)=>{
      item.title.toLowerCase()===trimmed.toLowerCase();
    });

    if (duplicate){
      setError("Books cannot be duplicate");
      return;
    };
    setBooks([...books,{id:Date.now(),title:trimmed,completed:false}]);
    setInput("");
    setError("");
  };

  const deleteBook=(id)=>{
    setBooks(books.filter((book)=>book.id!==id));
  }

  const toggleStatus=(id)=>{
    setBooks(books.map((book)=>book.id===id?{...book,completed:book.completed}:book));
  };

  return (
    <div>
      <h1>Book Reading Tracker</h1>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter book title"
      />
      <button onClick={addBook}>Add Book</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <span>{book.title}</span>
            <span>{book.completed ? "Completed" : "Reading"}</span>
            <button onClick={() => toggleStatus(book.id)}>
              {book.completed ? "Mark Reading" : "Mark Completed"}
            </button>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}