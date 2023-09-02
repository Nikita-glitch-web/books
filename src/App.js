import { useState, useEffect } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

//"server" : "json-server --port 3001 --watch db.json --host 127.0.0.1"

function App() {
    const [books, setBooks] = useState([]);

    

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3002/books');

        setBooks(response.data);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const editBookById = (id, newTitle) => {
        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                return { ...book, title: newTitle }
            }

            return book;
        });

        setBooks(updatedBooks)
    }

    const deleteBookById = () => {
        const updatedBooks = books.filter((book, id) => {
            return book.id !== id;
        })

        setBooks(updatedBooks)
    };

    const createBook = async (title) => {
        const response = await axios.post('http://localhost:3002/books', {
            title
        });

        const updatedBooks = [
            ...books,
            response.data
        ]
        setBooks(updatedBooks)
        console.log(response)
        // const updatedBooks = [
        //     ...books,
        //     { id: Math.round(Math.random() * 9999), title: title }
        // ];
        // setBooks(updatedBooks);
    };

    return (
    <div className="app">
        <h1>Reading List</h1>
        <BookList onEdit = {editBookById} books={books} onDelete={deleteBookById}/>
        <BookCreate onCreate={createBook} />
    </div>
    );
}



export default App;