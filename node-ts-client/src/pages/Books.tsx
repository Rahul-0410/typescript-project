import { useEffect, useState } from "react";
import { getErrorMessage } from "../utils/getErrorMessage";

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

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div>
            <h1>Books</h1>

            {canModifyBooks && (
                <BookForm
                    editingBook={editingBook}
                    onBookSaved={fetchBooks}
                    onCancelEdit={() =>
                        setEditingBook(null)
                    }
                />
            )}

            <hr />

            {books.length === 0 ? (
                <p>No books found.</p>
            ) : (
                books.map((book) => (
                    <div key={book._id}>
                        <h2>{book.name}</h2>

                        <p>
                            Author: {book.author}
                        </p>

                        <p>
                            Published: {book.publishYear}
                        </p>

                        <p>
                            {book.description}
                        </p>

                        {canModifyBooks && (
                            <>
                                <button
                                    onClick={() =>
                                        setEditingBook(book)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(book._id)
                                    }
                                >
                                    Delete
                                </button>
                            </>
                        )}

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
};

export default Books;