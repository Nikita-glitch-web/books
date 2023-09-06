import { useEffect, useContext } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import BooksContext from "./context/books";

//"server" : "json-server --port 3001 --watch db.json --host 127.0.0.1"

function App() {
    const { fetchBooks } = useContext(BooksContext);
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return (
    <div className="app">
        <h1>Reading List</h1>
        <BookList />
        <BookCreate />
    </div>
    );

};


export default App;