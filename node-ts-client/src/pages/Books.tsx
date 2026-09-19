import { useEffect, useState } from "react";
import { getErrorMessage } from "../utils/getErrorMessage";
import "./Books.css"

import {
    getBooks,
    deleteBook,
} from "../services/bookService";

import { useAuth } from "../context/AuthContext";

import BookForm from "../components/BookForm";

import type { Book } from "../types/book";

const Books = () => {
    const { user } = useAuth();

    const [books, setBooks] = useState<Book[]>([]);

    const [editingBook, setEditingBook] =
        useState<Book | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBooks = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getBooks();

            if (response.success) {
                setBooks(response.data || []);
            } else {
                setError(response.message);
            }

        } catch (error: unknown) {
    setError(getErrorMessage(error, "Failed to fetch books"));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const canModifyBooks =
        user?.role === "admin" ||
        user?.role === "creator";

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await deleteBook(id);

            if (!response.success) {
                setError(response.message);
                return;
            }

            await fetchBooks();

        } catch (error: unknown) {
                setError(getErrorMessage(error, "Failed to delete book"));
        }
    };

    if (loading) {
        return <h2>Loading books...</h2>;
    }

    // if (error) {
    //     return <h2>{error}</h2>;
    // }

    return (
    <div className="books-page">
        <div className="books-container">

            <div className="books-header">
                <div>
                    <h1>Books</h1>

                    <p className="books-count">
                        {books.length} {books.length === 1 ? "book" : "books"} available
                    </p>
                </div>
            </div>
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {canModifyBooks && (
                <BookForm
                    editingBook={editingBook}
                    onBookSaved={fetchBooks}
                    onCancelEdit={() => setEditingBook(null)}
                />
            )}

            <br />

            {books.length === 0 ? (
                <div className="empty-books">
                    <h2>No books found</h2>
                    <p>There are currently no books available.</p>
                </div>
            ) : (
                <div className="books-grid">

                    {books.map((book) => (
                        <div
                            className="book-card"
                            key={book._id}
                        >
                            <h2>{book.name}</h2>

                            <p className="book-author">
                                By {book.author}
                            </p>

                            <p className="book-year">
                                Published: {book.publishYear}
                            </p>

                            <p className="book-description">
                                {book.description}
                            </p>

                            {canModifyBooks && (
                                <div className="book-actions">

                                    <button
                                        className="btn btn-edit"
                                        onClick={() =>
                                            setEditingBook(book)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-delete"
                                        onClick={() =>
                                            handleDelete(book._id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>
                            )}
                        </div>
                    ))}

                </div>
            )}

        </div>
    </div>
);
};

export default Books;