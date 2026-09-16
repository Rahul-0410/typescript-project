import { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import type { Book } from "../types/book";

const Books = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();

                if (response.success) {
                    setBooks(response.data || []);
                } else {
                    setError(response.message);
                }
            } catch (error: any) {
                setError(
                    error.response?.data?.message ||
                    "Failed to fetch books"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <h2>Loading books...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div>
            <h1>Books</h1>

            {books.length === 0 ? (
                <p>No books found.</p>
            ) : (
                books.map((book) => (
                    <div key={book._id}>
                        <h2>{book.name}</h2>
                        <p>Author: {book.author}</p>
                        <p>Year: {book.publishYear}</p>
                        <p>{book.description}</p>
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
};

export default Books;